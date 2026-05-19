import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { kegiatan } from "@/db/schema";
import { validateId } from "@/lib/api";
import { getSession } from "@/lib/auth";

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  if (!validateId(id).success) {
    return NextResponse.json({ message: "ID tidak valid." }, { status: 400 });
  }

  let deleted: { id: string } | undefined;
  try {
    [deleted] = await db.delete(kegiatan).where(eq(kegiatan.id, id)).returning({ id: kegiatan.id });
  } catch {
    return NextResponse.json({ message: "Database kegiatan belum tersedia." }, { status: 503 });
  }
  if (!deleted) {
    return NextResponse.json({ message: "Kegiatan tidak ditemukan." }, { status: 404 });
  }

  return NextResponse.json({ message: "Kegiatan dihapus." });
}
