import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, hasDatabaseUrl } from "@/db";
import { users } from "@/db/schema";
import { invalidJsonResponse, readJson } from "@/lib/api";
import { hashPassword, setAuthCookie, signSession } from "@/lib/auth";
import { cleanEnvValue } from "@/lib/env";
import { registerSchema } from "@/lib/validators";

export async function POST(req: Request) {
  const body = await readJson(req);
  if (!body) return invalidJsonResponse();

  const parsed = registerSchema.safeParse({
    name: typeof body.name === "string" ? body.name.trim() : "",
    email: typeof body.email === "string" ? body.email.trim().toLowerCase() : "",
    password: body.password,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Nama, email, atau password tidak valid. Password minimal 8 karakter." },
      { status: 422 },
    );
  }

  if (!hasDatabaseUrl) {
    return NextResponse.json(
      { message: "DATABASE_URL belum diatur. Akun baru membutuhkan database aktif." },
      { status: 500 },
    );
  }

  const jwtSecret = cleanEnvValue(process.env.JWT_SECRET);
  if (!jwtSecret || jwtSecret.length < 32) {
    return NextResponse.json(
      { message: "JWT_SECRET belum diatur atau kurang dari 32 karakter." },
      { status: 500 },
    );
  }

  const credentials = parsed.data;

  try {
    const [existingUser] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, credentials.email))
      .limit(1);

    if (existingUser) {
      return NextResponse.json({ message: "Email sudah terdaftar." }, { status: 409 });
    }

    const passwordHash = await hashPassword(credentials.password);
    const [user] = await db
      .insert(users)
      .values({
        name: credentials.name,
        email: credentials.email,
        passwordHash,
        role: "admin",
      })
      .returning({
        id: users.id,
        email: users.email,
        role: users.role,
      });

    const token = signSession({ sub: user.id, email: user.email, role: user.role });
    await setAuthCookie(token);

    return NextResponse.json({ message: "Akun berhasil dibuat." }, { status: 201 });
  } catch (error) {
    console.error("Register failed", error);
    const detail = error instanceof Error ? error.message : "Koneksi database gagal.";
    return NextResponse.json(
      { message: `Akun gagal dibuat. Detail: ${detail}` },
      { status: 500 },
    );
  }
}
