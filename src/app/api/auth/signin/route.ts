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

    const rows = await sql`
      SELECT id, name, identifier, identifier_type AS "identifierType", created_at AS "createdAt"
      FROM app_users
      WHERE LOWER(identifier) = ${cleanIdentifier} AND password_hash = ${passwordHash}
      LIMIT 1;
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "ভুল ইমেইল/ফোন অথবা পাসওয়ার্ড। অনুগ্রহ করে আবার চেষ্টা করুন।" },
        { status: 401 }
      );
    }

    const dbUser = rows[0];
    const user = {
      id: dbUser.id,
      name: dbUser.name,
      identifier: dbUser.identifier,
      identifierType: dbUser.identifierType,
      createdAt: Number(dbUser.createdAt),
    };

    const response = NextResponse.json({ success: true, user });
    response.cookies.set("bcs_user_id", user.id, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
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
