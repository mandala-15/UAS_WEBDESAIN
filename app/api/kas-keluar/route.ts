import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { kasKeluar } from "@/db/schema";
import { invalidJsonResponse, readJson } from "@/lib/api";
import { getSession } from "@/lib/auth";
import { kasKeluarSchema } from "@/lib/validators";

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function GET() {
  try {
    const data = await db.select().from(kasKeluar).orderBy(desc(kasKeluar.tanggal));
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ message: "Database kas keluar belum tersedia." }, { status: 503 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await readJson(req);
    if (!body) return invalidJsonResponse();

    const parsed = kasKeluarSchema.safeParse({
      tanggal: body.tanggal,
      kategori: cleanText(body.kategori),
      keterangan: cleanText(body.keterangan),
      jumlah: body.jumlah,
    });

    if (!parsed.success) {
      return NextResponse.json({ message: "Input tidak valid", errors: parsed.error.flatten() }, { status: 422 });
    }

    const [created] = await db
      .insert(kasKeluar)
      .values({ ...parsed.data, jumlah: parsed.data.jumlah.toString(), createdBy: session.sub })
      .returning();

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Create kas keluar failed", error);
    return NextResponse.json({ message: "Database kas keluar belum tersedia." }, { status: 503 });
  }
}
