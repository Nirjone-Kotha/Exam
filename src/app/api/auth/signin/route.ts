import { NextRequest, NextResponse } from "next/server";
import { getNeonSql, initializeNeonSchema } from "@/lib/db/neon";
import crypto from "crypto";

export const dynamic = "force-dynamic";

function hashServerPassword(password: string): string {
  return crypto
    .createHash("sha256")
    .update(password + "_bcs_medical_salt")
    .digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { identifier, password } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, error: "ইমেইল/ফোন নম্বর এবং পাসওয়ার্ড দিন।" },
        { status: 400 }
      );
    }

    const cleanIdentifier = identifier.trim().toLowerCase();
    const isEmail = cleanIdentifier.includes("@");
    const identifierType = isEmail ? "email" : "phone";

    const sql = getNeonSql();
    if (!sql) {
      // Database not connected, inform client to proceed with local check
      return NextResponse.json({
        success: false,
        noDatabase: true,
        message: "Neon DATABASE_URL is not configured.",
      });
    }

    await initializeNeonSchema();

    const passwordHash = hashServerPassword(password);

    // 1. Check if user already exists
    const rows = await sql`
      SELECT id, name, identifier, identifier_type AS "identifierType", created_at AS "createdAt", password_hash AS "passwordHash"
      FROM app_users
      WHERE LOWER(identifier) = ${cleanIdentifier}
      LIMIT 1;
    `;

    let user: any;

    if (rows.length > 0) {
      const dbUser = rows[0];
      if (dbUser.passwordHash !== passwordHash) {
        return NextResponse.json(
          { success: false, error: "ভুল পাসওয়ার্ড। অনুগ্রহ করে আবার চেষ্টা করুন।" },
          { status: 401 }
        );
      }
      user = {
        id: dbUser.id,
        name: dbUser.name,
        identifier: dbUser.identifier,
        identifierType: dbUser.identifierType,
        createdAt: Number(dbUser.createdAt),
      };
    } else {
      // 2. Auto-register new user on sign in
      const userId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const displayName = isEmail ? cleanIdentifier.split("@")[0] : `Dr. ${cleanIdentifier.slice(-4)}`;
      const now = Date.now();

      await sql`
        INSERT INTO app_users (id, name, identifier, identifier_type, password_hash, created_at, updated_at)
        VALUES (${userId}, ${displayName}, ${cleanIdentifier}, ${identifierType}, ${passwordHash}, ${now}, ${now});
      `;

      user = {
        id: userId,
        name: displayName,
        identifier: cleanIdentifier,
        identifierType,
        createdAt: now,
      };
    }

    const response = NextResponse.json({ success: true, user });

    // Set both cookies with 30-day lifetime
    response.cookies.set("bcs_user_id", user.id, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
    });

    response.cookies.set("bcs_user_data", encodeURIComponent(JSON.stringify(user)), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (error: any) {
    console.error("API POST /api/auth/signin error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Signin failed" },
      { status: 500 }
    );
  }
}
