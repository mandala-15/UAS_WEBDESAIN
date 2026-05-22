import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { kasMasuk } from "@/db/schema";
import { invalidJsonResponse, readJson } from "@/lib/api";
import { getSession } from "@/lib/auth";
import { kasMasukSchema } from "@/lib/validators";

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function GET() {
  try {
    const data = await db.select().from(kasMasuk).orderBy(desc(kasMasuk.tanggal));
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ message: "Database kas masuk belum tersedia." }, { status: 503 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await readJson(req);
    if (!body) return invalidJsonResponse();

    const parsed = kasMasukSchema.safeParse({
      tanggal: body.tanggal,
      sumber: cleanText(body.sumber),
      keterangan: cleanText(body.keterangan),
      jumlah: body.jumlah,
    });

    if (!parsed.success) {
      return NextResponse.json({ message: "Input tidak valid", errors: parsed.error.flatten() }, { status: 422 });
    }

    const [created] = await db
      .insert(kasMasuk)
      .values({ ...parsed.data, jumlah: parsed.data.jumlah.toString(), createdBy: session.sub })
      .returning();

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Create kas masuk failed", error);
    return NextResponse.json({ message: "Database kas masuk belum tersedia." }, { status: 503 });
  }
}
