import { NextRequest, NextResponse } from "next/server";
import { getNeonSql } from "@/lib/db/neon";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const userId = request.cookies.get("bcs_user_id")?.value;
    const userDataCookie = request.cookies.get("bcs_user_data")?.value;

    if (!userId && !userDataCookie) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    // 1. If Neon is connected, fetch fresh user data from database
    const sql = getNeonSql();
    if (sql && userId) {
      try {
        const rows = await sql`
          SELECT id, name, identifier, identifier_type AS "identifierType", created_at AS "createdAt"
          FROM app_users
          WHERE id = ${userId}
          LIMIT 1;
        `;

        if (rows.length > 0) {
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
        }
      } catch (err) {
        console.warn("Neon query in /api/auth/me fallback:", err);
      }
    }

    // 2. Fallback to decoded bcs_user_data cookie (offline / local storage mode)
    if (userDataCookie) {
      try {
        const parsed = JSON.parse(decodeURIComponent(userDataCookie));
        if (parsed && parsed.id) {
          return NextResponse.json({ authenticated: true, user: parsed });
        }
      } catch {}
    }

    // 3. Fallback to bcs_user_id cookie
    if (userId) {
      return NextResponse.json({
        authenticated: true,
        user: {
          id: userId,
          name: "Doctor",
          identifier: "Candidate",
          identifierType: "phone",
          createdAt: Date.now(),
        },
      });
    }

    return NextResponse.json({ authenticated: false, user: null });
  } catch (error: any) {
    return NextResponse.json({ authenticated: false, user: null });
  }
}
