import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { kasMasuk } from "@/db/schema";
import { invalidJsonResponse, readJson, validateId } from "@/lib/api";
import { getSession } from "@/lib/auth";
import { sanitizeText } from "@/lib/sanitize";
import { kasMasukSchema } from "@/lib/validators";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  if (!validateId(id).success) {
    return NextResponse.json({ message: "ID tidak valid." }, { status: 400 });
  }

  const body = await readJson(req);
  if (!body) return invalidJsonResponse();

  const parsed = kasMasukSchema.safeParse({
    tanggal: body.tanggal,
    sumber: sanitizeText(body.sumber),
    keterangan: sanitizeText(body.keterangan),
    jumlah: body.jumlah,
  });

  if (!parsed.success) {
    return NextResponse.json({ message: "Input tidak valid", errors: parsed.error.flatten() }, { status: 422 });
  }

  let updated: typeof kasMasuk.$inferSelect | undefined;
  try {
    [updated] = await db
      .update(kasMasuk)
      .set({ ...parsed.data, jumlah: parsed.data.jumlah.toString(), updatedAt: new Date() })
      .where(eq(kasMasuk.id, id))
      .returning();
  } catch {
    return NextResponse.json({ message: "Database kas masuk belum tersedia." }, { status: 503 });
  }

  if (!updated) {
    return NextResponse.json({ message: "Data kas masuk tidak ditemukan." }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  if (!validateId(id).success) {
    return NextResponse.json({ message: "ID tidak valid." }, { status: 400 });
  }

  let deleted: { id: string } | undefined;
  try {
    [deleted] = await db.delete(kasMasuk).where(eq(kasMasuk.id, id)).returning({ id: kasMasuk.id });
  } catch {
    return NextResponse.json({ message: "Database kas masuk belum tersedia." }, { status: 503 });
  }
  if (!deleted) {
    return NextResponse.json({ message: "Data kas masuk tidak ditemukan." }, { status: 404 });
  }

  return NextResponse.json({ message: "Data kas masuk dihapus." });
}
