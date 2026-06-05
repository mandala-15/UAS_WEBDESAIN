import { NextResponse } from "next/server";
import { checkDatabaseConnection, hasDatabaseUrl } from "@/db";
import { cleanEnvValue } from "@/lib/env";

export async function GET() {
  const database = await checkDatabaseConnection();

  return NextResponse.json({
    status: database.ok ? "ok" : "degraded",
    app: "masjid-kas-portal",
    env: {
      DATABASE_URL: hasDatabaseUrl,
      JWT_SECRET: cleanEnvValue(process.env.JWT_SECRET).length >= 32,
      NEXT_PUBLIC_APP_URL: Boolean(cleanEnvValue(process.env.NEXT_PUBLIC_APP_URL)),
      NEXT_PUBLIC_SUPABASE_URL: Boolean(cleanEnvValue(process.env.NEXT_PUBLIC_SUPABASE_URL)),
      NEXT_PUBLIC_SUPABASE_ANON_KEY: Boolean(cleanEnvValue(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)),
      SUPABASE_SERVICE_ROLE_KEY: Boolean(cleanEnvValue(process.env.SUPABASE_SERVICE_ROLE_KEY)),
    },
    database,
  });
}
