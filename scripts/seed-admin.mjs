import bcrypt from "bcryptjs";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;
const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
const name = process.env.ADMIN_NAME ?? "Administrator";

if (!connectionString || !email || !password) {
  console.error("Set DATABASE_URL, ADMIN_EMAIL, dan ADMIN_PASSWORD sebelum menjalankan seed.");
  process.exit(1);
}

const sql = postgres(connectionString, { ssl: "require", prepare: false });
const passwordHash = await bcrypt.hash(password, 12);

await sql`
  insert into users (name, email, password_hash, role)
  values (${name}, ${email}, ${passwordHash}, 'admin')
  on conflict (email)
  do update set name = excluded.name, password_hash = excluded.password_hash
`;

await sql.end();
console.log(`Admin siap: ${email}`);

