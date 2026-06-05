import bcrypt from "bcryptjs";
import postgres from "postgres";
import { cleanEnvValue, loadLocalEnv, postgresOptions } from "./load-env.mjs";

loadLocalEnv();

const connectionString = cleanEnvValue(process.env.DATABASE_URL);
const email = cleanEnvValue(process.env.ADMIN_EMAIL);
const password = cleanEnvValue(process.env.ADMIN_PASSWORD);
const name = cleanEnvValue(process.env.ADMIN_NAME) || "Administrator";

if (!connectionString || !email || !password) {
  console.error("Set DATABASE_URL, ADMIN_EMAIL, dan ADMIN_PASSWORD sebelum menjalankan seed.");
  process.exit(1);
}

const sql = postgres(connectionString, postgresOptions(connectionString));
const passwordHash = await bcrypt.hash(password, 12);

await sql`
  insert into users (name, email, password_hash, role)
  values (${name}, ${email}, ${passwordHash}, 'admin')
  on conflict (email)
  do update set name = excluded.name, password_hash = excluded.password_hash
`;

await sql.end();
console.log(`Admin siap: ${email}`);
