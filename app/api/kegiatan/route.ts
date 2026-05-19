import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { kegiatan } from "@/db/schema";
import { invalidJsonResponse, readJson } from "@/lib/api";
import { getSession } from "@/lib/auth";
import { sanitizeOptionalText, sanitizeText } from "@/lib/sanitize";
import { slugify } from "@/lib/utils";
import { kegiatanSchema } from "@/lib/validators";

export async function GET() {
  try {
    const data = await db.select().from(kegiatan).orderBy(desc(kegiatan.tanggalMulai));
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ message: "Database kegiatan belum tersedia." }, { status: 503 });
  }
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await readJson(req);
  if (!body) return invalidJsonResponse();

  const parsed = kegiatanSchema.safeParse({
    judul: sanitizeText(body.judul),
    deskripsi: sanitizeText(body.deskripsi),
    tanggalMulai: body.tanggalMulai,
    tanggalSelesai: body.tanggalSelesai || null,
    lokasi: sanitizeText(body.lokasi),
    gambarUrl: sanitizeOptionalText(body.gambarUrl),
  });

  if (!parsed.success) {
    return NextResponse.json({ message: "Input tidak valid", errors: parsed.error.flatten() }, { status: 422 });
  }

  let created: typeof kegiatan.$inferSelect;
  try {
    [created] = await db
      .insert(kegiatan)
      .values({
        ...parsed.data,
        slug: `${slugify(parsed.data.judul)}-${Date.now()}`,
        gambarUrl: parsed.data.gambarUrl || null,
        createdBy: session.sub,
      })
      .returning();
  } catch {
    return NextResponse.json({ message: "Database kegiatan belum tersedia." }, { status: 503 });
  }

  return NextResponse.json(created, { status: 201 });
}
