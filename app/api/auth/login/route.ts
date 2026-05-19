import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { invalidJsonResponse, readJson } from "@/lib/api";
import { setAuthCookie, signSession, verifyPassword } from "@/lib/auth";
import { isDemoLoginEnabled } from "@/lib/env";
import { sanitizeText } from "@/lib/sanitize";
import { loginSchema } from "@/lib/validators";

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

  if (!process.env.DATABASE_URL && isDemoLoginEnabled() && demoEmail && demoPassword) {
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

  let user: typeof users.$inferSelect | undefined;
  try {
    [user] = await db.select().from(users).where(eq(users.email, parsed.data.email)).limit(1);
  } catch {
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
