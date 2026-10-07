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
    const { name, identifier, password } = body;

    if (!name || !identifier || !password) {
      return NextResponse.json(
        { success: false, error: "Name, email/phone and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 6 digits/characters." },
        { status: 400 }
      );
    }

    const cleanIdentifier = identifier.trim().toLowerCase();
    const isEmail = cleanIdentifier.includes("@");
    const identifierType = isEmail ? "email" : "phone";

    const sql = getNeonSql();
    if (!sql) {
      // Database not connected, inform client to proceed with local user state
      return NextResponse.json({
        success: false,
        noDatabase: true,
        message: "Neon DATABASE_URL is not configured.",
      });
    }

    await initializeNeonSchema();

    // Check if user already exists
    const existing = await sql`
      SELECT id FROM app_users 
      WHERE LOWER(identifier) = ${cleanIdentifier}
      LIMIT 1;
    `;

    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, error: "এই ইমেইল বা ফোন নম্বরটি দিয়ে ইতোমধ্যে একাউন্ট খোলা হয়েছে।" },
        { status: 400 }
      );
    }

    const userId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const passwordHash = hashServerPassword(password);
    const now = Date.now();

    await sql`
      INSERT INTO app_users (id, name, identifier, identifier_type, password_hash, created_at, updated_at)
      VALUES (${userId}, ${name.trim()}, ${cleanIdentifier}, ${identifierType}, ${passwordHash}, ${now}, ${now});
    `;

    const user = {
      id: userId,
      name: name.trim(),
      identifier: cleanIdentifier,
      identifierType,
      createdAt: now,
    };

    const response = NextResponse.json({ success: true, user });
    response.cookies.set("bcs_user_id", userId, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("API POST /api/auth/signup error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Signup failed" },
      { status: 500 }
    );
  }
}
