import { asc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { donationPrograms } from "@/db/schema";

export async function GET() {
  try {
    const data = await db
      .select()
      .from(donationPrograms)
      .where(eq(donationPrograms.isActive, true))
      .orderBy(asc(donationPrograms.createdAt));

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ message: "Database program donasi belum tersedia." }, { status: 503 });
  }
}
