import { NextRequest, NextResponse } from "next/server";
import { getNeonSql, initializeNeonSchema } from "@/lib/db/neon";
import { redisGet, redisSet, redisDel } from "@/lib/db/upstash";
import { CollectedNote } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const subjectId = searchParams.get("subjectId");

    const sql = getNeonSql();
    if (!sql) {
      return NextResponse.json({
        configured: false,
        message: "Neon DATABASE_URL is not configured. Falling back to local storage.",
        notes: [],
      });
    }

    const cacheKey = subjectId ? `collected_notes:subject:${subjectId}` : "collected_notes:all";

    // 1. Try Upstash Redis cache
    const cached = await redisGet<CollectedNote[]>(cacheKey);
    if (cached) {
      return NextResponse.json({
        configured: true,
        source: "upstash_cache",
        notes: cached,
      });
    }

    // 2. Query Neon Postgres
    await initializeNeonSchema();

    let rows: any[] = [];
    if (subjectId) {
      rows = await sql`
        SELECT id, subject_id AS "subjectId", subject_name AS "subjectName", 
               topic, content, created_at AS "createdAt", updated_at AS "updatedAt"
        FROM collected_notes
        WHERE subject_id = ${subjectId}
        ORDER BY created_at DESC;
      `;
    } else {
      rows = await sql`
        SELECT id, subject_id AS "subjectId", subject_name AS "subjectName", 
               topic, content, created_at AS "createdAt", updated_at AS "updatedAt"
        FROM collected_notes
        ORDER BY created_at DESC;
      `;
    }

    const notes: CollectedNote[] = rows.map((r) => ({
      id: r.id,
      subjectId: r.subjectId,
      subjectName: r.subjectName,
      topic: r.topic,
      content: r.content,
      createdAt: Number(r.createdAt),
      updatedAt: Number(r.updatedAt),
    }));

    // Cache in Upstash Redis for 10 minutes
    await redisSet(cacheKey, notes, 600);

    return NextResponse.json({
      configured: true,
      source: "neon_postgres",
      notes,
    });
  } catch (error: any) {
    console.error("API GET /api/collected-notes error:", error);
    return NextResponse.json(
      { configured: false, error: error.message || "Failed to fetch collected notes", notes: [] },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, subjectId, subjectName, topic, content, createdAt, updatedAt } = body;

    if (!topic || !content || !subjectId) {
      return NextResponse.json(
        { success: false, error: "Topic, content, and subjectId are required." },
        { status: 400 }
      );
    }

    const sql = getNeonSql();
    if (!sql) {
      return NextResponse.json({
        success: true,
        savedToDb: false,
        message: "Neon DATABASE_URL is not set. Saved to client-side storage only.",
      });
    }

    await initializeNeonSchema();

    const noteId = id || `col_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = Date.now();
    const cAt = createdAt || now;
    const uAt = updatedAt || now;

    await sql`
      INSERT INTO collected_notes (id, subject_id, subject_name, topic, content, created_at, updated_at)
      VALUES (${noteId}, ${subjectId}, ${subjectName || subjectId}, ${topic}, ${content}, ${cAt}, ${uAt})
      ON CONFLICT (id) DO UPDATE
      SET topic = EXCLUDED.topic,
          content = EXCLUDED.content,
          updated_at = ${uAt};
    `;

    // Invalidate Upstash cache
    await redisDel(`collected_notes:subject:${subjectId}`);
    await redisDel("collected_notes:all");

    return NextResponse.json({
      success: true,
      savedToDb: true,
      noteId,
    });
  } catch (error: any) {
    console.error("API POST /api/collected-notes error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save collected note" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const subjectId = searchParams.get("subjectId");

    if (!id) {
      return NextResponse.json({ success: false, error: "Note ID is required" }, { status: 400 });
    }

    const sql = getNeonSql();
    if (!sql) {
      return NextResponse.json({
        success: true,
        deletedFromDb: false,
        message: "Database not configured. Deleted from local storage only.",
      });
    }

    await sql`
      DELETE FROM collected_notes WHERE id = ${id};
    `;

    if (subjectId) {
      await redisDel(`collected_notes:subject:${subjectId}`);
    }
    await redisDel("collected_notes:all");

    return NextResponse.json({ success: true, deletedFromDb: true });
  } catch (error: any) {
    console.error("API DELETE /api/collected-notes error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete collected note" },
      { status: 500 }
    );
  }
}
