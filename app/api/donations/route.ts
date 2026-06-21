import { desc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { donations } from "@/db/schema";
import { invalidJsonResponse, readJson } from "@/lib/api";
import { donationSchema } from "@/lib/validators";

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function GET() {
  try {
    const latest = await db
      .select({
        id: donations.id,
        donorName: donations.donorName,
        amount: donations.amount,
        purpose: donations.purpose,
        status: donations.status,
        donatedAt: donations.donatedAt,
        isAnonymous: donations.isAnonymous,
      })
      .from(donations)
      .where(eq(donations.status, "verified"))
      .orderBy(desc(donations.donatedAt))
      .limit(8);

    const [stats] = await db
      .select({
        totalDonors: sql<number>`count(${donations.id})::int`,
        totalCollected: sql<string>`coalesce(sum(${donations.amount}), 0)`,
      })
      .from(donations)
      .where(eq(donations.status, "verified"));

    return NextResponse.json({ latest, stats });
  } catch {
    return NextResponse.json({ message: "Database donasi belum tersedia." }, { status: 503 });
  }
}

export async function POST(req: Request) {
  const body = await readJson(req);
  if (!body) return invalidJsonResponse();

  const parsed = donationSchema.safeParse({
    programId: body.programId || null,
    purpose: cleanText(body.purpose),
    donorName: cleanText(body.donorName),
    amount: body.amount,
    whatsapp: cleanText(body.whatsapp),
    message: cleanText(body.message),
    paymentMethod: body.paymentMethod,
    isAnonymous: body.isAnonymous,
  });

  if (!parsed.success) {
    return NextResponse.json({ message: "Input tidak valid", errors: parsed.error.flatten() }, { status: 422 });
  }

  try {
    const [created] = await db
      .insert(donations)
      .values({
        ...parsed.data,
        amount: parsed.data.amount.toString(),
        message: parsed.data.message || null,
      })
      .returning();

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Create donation failed", error);
    return NextResponse.json({ message: "Database donasi belum tersedia." }, { status: 503 });
  }
}
