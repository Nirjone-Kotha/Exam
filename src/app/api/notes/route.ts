import { NextRequest, NextResponse } from "next/server";
import { getNeonSql, initializeNeonSchema } from "@/lib/db/neon";
import { redisGet, redisSet, redisDel } from "@/lib/db/upstash";
import { SubjectNote } from "@/lib/types";

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

    const cacheKey = subjectId ? `notes:subject:${subjectId}` : "notes:all";

    // 1. Try Upstash Redis cache
    const cached = await redisGet<SubjectNote[]>(cacheKey);
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
               topic, page_number AS "pageNumber", category, created_at AS "createdAt"
        FROM subject_notes
        WHERE subject_id = ${subjectId}
        ORDER BY page_number ASC, created_at ASC;
      `;
    } else {
      rows = await sql`
        SELECT id, subject_id AS "subjectId", subject_name AS "subjectName", 
               topic, page_number AS "pageNumber", category, created_at AS "createdAt"
        FROM subject_notes
        ORDER BY page_number ASC, created_at ASC;
      `;
    }

    const notes: SubjectNote[] = rows.map((r) => ({
      id: r.id,
      subjectId: r.subjectId,
      subjectName: r.subjectName,
      topic: r.topic,
      pageNumber: Number(r.pageNumber),
      category: r.category,
      createdAt: Number(r.createdAt),
    }));

    // Cache in Upstash Redis for 10 minutes
    await redisSet(cacheKey, notes, 600);

    return NextResponse.json({
      configured: true,
      source: "neon_postgres",
      notes,
    });
  } catch (error: any) {
    console.error("API GET /api/notes error:", error);
    return NextResponse.json(
      { configured: false, error: error.message || "Failed to fetch notes", notes: [] },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, subjectId, subjectName, topic, pageNumber, category, createdAt } = body;

    if (!topic || pageNumber === undefined || !subjectId) {
      return NextResponse.json(
        { success: false, error: "Topic, pageNumber and subjectId are required." },
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

    const noteId = id || `note_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = createdAt || Date.now();
    const pNum = Number(pageNumber);

    await sql`
      INSERT INTO subject_notes (id, subject_id, subject_name, topic, page_number, category, created_at)
      VALUES (${noteId}, ${subjectId}, ${subjectName || subjectId}, ${topic}, ${pNum}, ${category || "Important to read"}, ${now})
      ON CONFLICT (id) DO UPDATE
      SET topic = EXCLUDED.topic,
          page_number = EXCLUDED.page_number,
          category = EXCLUDED.category;
    `;

    // Invalidate Upstash cache
    await redisDel(`notes:subject:${subjectId}`);
    await redisDel("notes:all");

    return NextResponse.json({
      success: true,
      savedToDb: true,
      noteId,
    });
  } catch (error: any) {
    console.error("API POST /api/notes error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save note" },
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
      DELETE FROM subject_notes WHERE id = ${id};
    `;

    if (subjectId) {
      await redisDel(`notes:subject:${subjectId}`);
    }
    await redisDel("notes:all");

    return NextResponse.json({ success: true, deletedFromDb: true });
  } catch (error: any) {
    console.error("API DELETE /api/notes error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete note" },
      { status: 500 }
    );
  }
}
