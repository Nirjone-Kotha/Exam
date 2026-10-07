import { NextRequest, NextResponse } from "next/server";
import { getNeonSql } from "@/lib/db/neon";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const userId = request.cookies.get("bcs_user_id")?.value;
    if (!userId) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    const sql = getNeonSql();
    if (!sql) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    const rows = await sql`
      SELECT id, name, identifier, identifier_type AS "identifierType", created_at AS "createdAt"
      FROM app_users
      WHERE id = ${userId}
      LIMIT 1;
    `;

    if (rows.length === 0) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    const dbUser = rows[0];
    return NextResponse.json({
      authenticated: true,
      user: {
        id: dbUser.id,
        name: dbUser.name,
        identifier: dbUser.identifier,
        identifierType: dbUser.identifierType,
        createdAt: Number(dbUser.createdAt),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ authenticated: false, user: null });
  }
}
