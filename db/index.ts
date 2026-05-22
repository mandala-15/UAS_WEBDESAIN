import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

function cleanConnectionString(value: string | undefined) {
  const connectionString = value?.trim();
  if (!connectionString) return "postgresql://postgres:postgres@localhost:5432/postgres";

  if (
    (connectionString.startsWith('"') && connectionString.endsWith('"')) ||
    (connectionString.startsWith("'") && connectionString.endsWith("'"))
  ) {
    return connectionString.slice(1, -1);
  }

  return connectionString;
}

const connectionString =
  cleanConnectionString(process.env.DATABASE_URL);

const client = postgres(connectionString, {
  prepare: false,
  ssl: "require",
});

export const db = drizzle(client, { schema });
