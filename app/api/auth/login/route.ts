import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { invalidJsonResponse, readJson } from "@/lib/api";
import { setAuthCookie, signSession, verifyPassword } from "@/lib/auth";
import { isDemoLoginEnabled } from "@/lib/env";
import { sanitizeText } from "@/lib/sanitize";
import { loginSchema } from "@/lib/validators";

function cleanEnv(value: string | undefined) {
  const cleanValue = value?.trim();
  if (!cleanValue) return "";

  if (
    (cleanValue.startsWith('"') && cleanValue.endsWith('"')) ||
    (cleanValue.startsWith("'") && cleanValue.endsWith("'"))
  ) {
    return cleanValue.slice(1, -1);
  }

  return cleanValue;
}

export async function POST(req: Request) {
  const body = await readJson(req);
  if (!body) return invalidJsonResponse();

  const parsed = loginSchema.safeParse({
    email: sanitizeText(body.email),
    password: body.password,
  });

  if (!parsed.success) {
    return NextResponse.json({ message: "Email atau password tidak valid." }, { status: 422 });
  }

  const demoEmail = process.env.DEMO_ADMIN_EMAIL;
  const demoPassword = process.env.DEMO_ADMIN_PASSWORD;

  const databaseUrl = cleanEnv(process.env.DATABASE_URL);
  const jwtSecret = cleanEnv(process.env.JWT_SECRET);

  if (!databaseUrl && isDemoLoginEnabled() && demoEmail && demoPassword) {
    if (parsed.data.email !== demoEmail || parsed.data.password !== demoPassword) {
      return NextResponse.json({ message: "Email atau password salah." }, { status: 401 });
    }

    const token = signSession({
      sub: "00000000-0000-0000-0000-000000000001",
      email: demoEmail,
      role: "admin",
    });
    await setAuthCookie(token);

    return NextResponse.json({ message: "Login demo berhasil." });
  }

  if (!databaseUrl) {
    return NextResponse.json(
      { message: "DATABASE_URL belum diatur di environment server." },
      { status: 500 },
    );
  }

  if (!jwtSecret || jwtSecret.length < 32) {
    return NextResponse.json(
      { message: "JWT_SECRET belum diatur atau kurang dari 32 karakter." },
      { status: 500 },
    );
  }

  let user: typeof users.$inferSelect | undefined;
  try {
    [user] = await db.select().from(users).where(eq(users.email, parsed.data.email)).limit(1);
  } catch (error) {
    console.error("Login database query failed", error);
    return NextResponse.json(
      { message: "Database belum tersambung. Isi DATABASE_URL di .env.local atau gunakan akun demo development." },
      { status: 500 },
    );
  }

  if (!user) {
    return NextResponse.json({ message: "Email atau password salah." }, { status: 401 });
  }

  const validPassword = await verifyPassword(parsed.data.password, user.passwordHash);
  if (!validPassword) {
    return NextResponse.json({ message: "Email atau password salah." }, { status: 401 });
  }

  const token = signSession({ sub: user.id, email: user.email, role: user.role });
  await setAuthCookie(token);

  return NextResponse.json({ message: "Login berhasil." });
}
