import { NextResponse } from "next/server";
import { getNeonSql, initializeNeonSchema } from "@/lib/db/neon";
import { getUpstashRedis } from "@/lib/db/upstash";

export const dynamic = "force-dynamic";

export async function GET() {
  const result: {
    neon: { configured: boolean; connected: boolean; message: string; tableReady?: boolean };
    upstash: { configured: boolean; connected: boolean; message: string };
  } = {
    neon: { configured: false, connected: false, message: "DATABASE_URL not configured" },
    upstash: { configured: false, connected: false, message: "UPSTASH_REDIS credentials not configured" },
  };

  // 1. Test Neon Postgres
  const sql = getNeonSql();
  if (sql) {
    result.neon.configured = true;
    try {
      const dbCheck = await sql`SELECT 1 as connected;`;
      if (dbCheck && dbCheck.length > 0) {
        result.neon.connected = true;
        // Test/initialize schema
        const schemaInit = await initializeNeonSchema();
        result.neon.tableReady = schemaInit;
        result.neon.message = "Successfully connected to Neon Postgres. subject_notes table is ready.";
      }
    } catch (err: any) {
      result.neon.message = `Neon connection error: ${err.message || err}`;
    }
  }

  // 2. Test Upstash Redis
  const redis = getUpstashRedis();
  if (redis) {
    result.upstash.configured = true;
    try {
      const pingRes = await redis.ping();
      if (pingRes === "PONG") {
        result.upstash.connected = true;
        result.upstash.message = "Successfully connected to Upstash Redis cache.";
      }
    } catch (err: any) {
      result.upstash.message = `Upstash Redis connection error: ${err.message || err}`;
    }
  }

  return NextResponse.json(result);
}
