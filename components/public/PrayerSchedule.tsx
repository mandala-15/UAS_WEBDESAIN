import { CalendarDays, MapPin, Mic2, MoonStar, UserRound } from "lucide-react";
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

function formatHijriDate(date: string) {
  try {
    return new Intl.DateTimeFormat("id-ID-u-ca-islamic", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  } catch {
    return "Kalender Hijriah";
  }
}

export async function PrayerSchedule() {
  const data = await getSchedule();
  const items = prayerLabels.map(([label, key]) => ({ label, time: data.jadwal[key] }));
  const tomorrowItems = data.jadwalBesok
    ? prayerLabels.map(([label, key]) => ({ label, time: data.jadwalBesok?.[key] ?? "--:--" }))
    : undefined;
  const hijriDate = formatHijriDate(data.jadwal.tanggal_iso);

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
            <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-yellow-100">
              <MoonStar size={13} /> {hijriDate}
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

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
          <p className="flex items-center gap-2 text-xs font-semibold text-slate-500"><UserRound size={14} /> Imam Hari Ini</p>
          <p className="mt-2 font-semibold text-slate-950">Ust. Muhammad Ridwan</p>
        </div>
        <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
          <p className="flex items-center gap-2 text-xs font-semibold text-slate-500"><Mic2 size={14} /> Khatib Jumat</p>
          <p className="mt-2 font-semibold text-slate-950">Ust. Ahmad Syukri</p>
        </div>
        <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
          <p className="flex items-center gap-2 text-xs font-semibold text-slate-500"><MapPin size={14} /> Lokasi Masjid</p>
          <p className="mt-2 font-semibold text-slate-950">Pekanbaru, Riau</p>
        </div>
      </div>
    </section>
  );
}
