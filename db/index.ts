import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { getDatabaseUrl } from "@/lib/env";
import * as schema from "./schema";

export const databaseUrl = getDatabaseUrl();
export const hasDatabaseUrl = Boolean(databaseUrl);
const connectionString = databaseUrl || "postgresql://postgres:postgres@localhost:5432/postgres";

export const sql = postgres(connectionString, {
  prepare: false,
  ssl: connectionString.includes("localhost") || connectionString.includes("127.0.0.1") ? false : "require",
  max: 5,
  idle_timeout: 20,
  connect_timeout: 10,
});

export const db = drizzle(sql, { schema });

export async function checkDatabaseConnection() {
  if (!hasDatabaseUrl) {
    return {
      ok: false,
      message: "DATABASE_URL belum diatur di environment server.",
    };
  }

  try {
    const [result] = await sql<{ ok: number }[]>`select 1 as ok`;
    return { ok: result?.ok === 1, message: "Database tersambung." };
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Koneksi database gagal.";
    return {
      ok: false,
      message: `Database gagal tersambung: ${detail}`,
    };
  }
}
