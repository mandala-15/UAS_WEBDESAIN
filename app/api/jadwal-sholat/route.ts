import { NextResponse } from "next/server";
import { getPekanbaruPrayerSchedule } from "@/lib/prayer-schedule";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const schedule = await getPekanbaruPrayerSchedule();
    return NextResponse.json(schedule);
  } catch {
    return NextResponse.json({ message: "Gagal mengambil jadwal sholat." }, { status: 502 });
  }
}
