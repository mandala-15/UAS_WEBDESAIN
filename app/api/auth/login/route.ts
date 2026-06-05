import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, hasDatabaseUrl } from "@/db";
import { users } from "@/db/schema";
import { invalidJsonResponse, readJson } from "@/lib/api";
import { setAuthCookie, signSession, verifyPassword } from "@/lib/auth";
import { cleanEnvValue, isDemoLoginEnabled } from "@/lib/env";
import { loginSchema } from "@/lib/validators";

type LoginUser = {
  id: string;
  email: string;
  role: "admin";
  passwordHash: string;
};

export async function POST(req: Request) {
  const body = await readJson(req);
  if (!body) return invalidJsonResponse();

  const parsed = loginSchema.safeParse({
    email: typeof body.email === "string" ? body.email.trim() : "",
    password: body.password,
  });

  if (!parsed.success) {
    return NextResponse.json({ message: "Email atau password tidak valid." }, { status: 422 });
  }
  const credentials = parsed.data;

  const demoEmail = cleanEnvValue(process.env.DEMO_ADMIN_EMAIL);
  const demoPassword = cleanEnvValue(process.env.DEMO_ADMIN_PASSWORD);

  const jwtSecret = cleanEnvValue(process.env.JWT_SECRET);

  if (!jwtSecret || jwtSecret.length < 32) {
    return NextResponse.json(
      { message: "JWT_SECRET belum diatur atau kurang dari 32 karakter." },
      { status: 500 },
    );
  }

  async function loginWithDemo(message = "Login demo berhasil.") {
    if (credentials.email !== demoEmail || credentials.password !== demoPassword) {
      return NextResponse.json({ message: "Email atau password salah." }, { status: 401 });
    }

    const token = signSession({
      sub: "00000000-0000-0000-0000-000000000001",
      email: demoEmail,
      role: "admin",
    });
    await setAuthCookie(token);

    return NextResponse.json({ message });
  }

  if (!hasDatabaseUrl) {
    if (isDemoLoginEnabled()) {
      return loginWithDemo("Login demo berhasil karena database development belum tersedia.");
    }

    return NextResponse.json({ message: "DATABASE_URL belum diatur di environment server." }, { status: 500 });
  }

  try {
    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
        role: users.role,
        passwordHash: users.passwordHash,
      })
      .from(users)
      .where(eq(users.email, credentials.email))
      .limit(1) as LoginUser[];

    if (!user) {
      return NextResponse.json({ message: "Email atau password salah." }, { status: 401 });
    }

    const validPassword = await verifyPassword(credentials.password, user.passwordHash);
    if (!validPassword) {
      return NextResponse.json({ message: "Email atau password salah." }, { status: 401 });
    }

    const token = signSession({ sub: user.id, email: user.email, role: user.role });
    await setAuthCookie(token);

    return NextResponse.json({ message: "Login berhasil." });
  } catch (error) {
    console.error("Login database query failed", error);
    if (isDemoLoginEnabled()) {
      return loginWithDemo("Login demo berhasil karena koneksi database development gagal.");
    }

    const detail = error instanceof Error ? error.message : "Koneksi database gagal.";
    return NextResponse.json(
      { message: `Database gagal tersambung. Periksa DATABASE_URL dan migration. Detail: ${detail}` },
      { status: 500 },
    );
  }
}
