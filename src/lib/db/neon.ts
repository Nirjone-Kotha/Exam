import { neon, NeonQueryFunction } from "@neondatabase/serverless";

/**
 * Returns a Neon SQL query function if DATABASE_URL is configured.
 * Otherwise returns null to enable graceful fallback to client-side storage.
 */
export function getNeonSql(): NeonQueryFunction<false, false> | null {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl || databaseUrl.trim() === "") {
    return null;
  }
  try {
    return neon(databaseUrl);
  } catch (error) {
    console.error("Failed to initialize Neon Postgres client:", error);
    return null;
  }
}

/**
 * Initializes the required relational database schema in Neon Postgres if not exists.
 */
export async function initializeNeonSchema(): Promise<boolean> {
  const sql = getNeonSql();
  if (!sql) return false;

  try {
    // Create subject_notes table
    await sql`
      CREATE TABLE IF NOT EXISTS subject_notes (
        id VARCHAR(64) PRIMARY KEY,
        subject_id VARCHAR(64) NOT NULL,
        subject_name VARCHAR(128) NOT NULL,
        topic TEXT NOT NULL,
        page_number INTEGER NOT NULL,
        category VARCHAR(64) NOT NULL,
        created_at BIGINT NOT NULL
      );
    `;

    // Create index for fast page number and subject queries
    await sql`
      CREATE INDEX IF NOT EXISTS idx_subject_notes_page 
      ON subject_notes (subject_id, page_number ASC);
    `;

    // Create collected_notes table
    await sql`
      CREATE TABLE IF NOT EXISTS collected_notes (
        id VARCHAR(64) PRIMARY KEY,
        subject_id VARCHAR(64) NOT NULL,
        subject_name VARCHAR(128) NOT NULL,
        topic TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at BIGINT NOT NULL,
        updated_at BIGINT NOT NULL
      );
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_collected_notes_subject 
      ON collected_notes (subject_id, created_at DESC);
    `;

    // Create app_users table for persistent cross-device authentication
    await sql`
      CREATE TABLE IF NOT EXISTS app_users (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        identifier VARCHAR(128) UNIQUE NOT NULL,
        identifier_type VARCHAR(16) NOT NULL,
        password_hash TEXT NOT NULL,
        created_at BIGINT NOT NULL,
        updated_at BIGINT NOT NULL
      );
    `;

    return true;
  } catch (error) {
    console.error("Error initializing Neon database schema:", error);
    return false;
  }
}
