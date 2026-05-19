import { CalendarDays, MapPin } from "lucide-react";
import { getPekanbaruFallbackSchedule, getPekanbaruPrayerSchedule } from "@/lib/prayer-schedule";
import { PrayerBoard } from "./PrayerBoard";
import { PrayerCountdown } from "./PrayerCountdown";

const prayerLabels = [
  ["Imsak", "imsak"],
  ["Subuh", "subuh"],
  ["Dzuhur", "dzuhur"],
  ["Ashar", "ashar"],
  ["Maghrib", "maghrib"],
  ["Isya", "isya"],
] as const;

async function getSchedule() {
  try {
    return await getPekanbaruPrayerSchedule();
  } catch {
    return getPekanbaruFallbackSchedule();
  }
}

export async function PrayerSchedule() {
  const data = await getSchedule();
  const items = prayerLabels.map(([label, key]) => ({ label, time: data.jadwal[key] }));
  const tomorrowItems = data.jadwalBesok
    ? prayerLabels.map(([label, key]) => ({ label, time: data.jadwalBesok?.[key] ?? "--:--" }))
    : undefined;

  return (
    <section id="jadwal" className="h-fit scroll-mt-28 overflow-hidden rounded-[28px] border border-white bg-white/92 p-5 shadow-[0_22px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      <div className="relative overflow-hidden rounded-[24px] bg-[#052e2b] p-5 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(234,179,8,0.20),transparent_30%),radial-gradient(circle_at_10%_90%,rgba(16,185,129,0.24),transparent_28%)]" />
        <div className="relative flex items-start gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-emerald-200/20 bg-white/10 text-emerald-100">
            <MapPin size={20} />
          </span>
          <div>
            <p className="text-sm font-semibold text-emerald-100/82">Digital Prayer Board</p>
            <h2 className="mt-1 text-2xl font-semibold text-white">{data.wilayah}</h2>
            <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-emerald-50/72">
              {data.jadwal.hari}, {data.jadwal.tanggal_lengkap} <CalendarDays size={14} />
            </p>
          </div>
        </div>
      </div>

      <PrayerBoard todayDate={data.jadwal.tanggal_iso} items={items} />

      <PrayerCountdown
        todayDate={data.jadwal.tanggal_iso}
        todayTimes={items}
        tomorrowDate={data.jadwalBesok?.tanggal_iso}
        tomorrowTimes={tomorrowItems}
      />
    </section>
  );
}
