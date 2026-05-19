"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock, Landmark } from "lucide-react";
import { PEKANBARU_TIME_ZONE, PEKANBARU_UTC_OFFSET } from "@/lib/prayer-schedule";

type PrayerTime = {
  label: string;
  time: string;
};

type PrayerCountdownProps = {
  todayDate: string;
  todayTimes: PrayerTime[];
  tomorrowDate?: string;
  tomorrowTimes?: PrayerTime[];
};

function parsePekanbaruDateTime(date: string, time: string) {
  return new Date(`${date}T${time}:00${PEKANBARU_UTC_OFFSET}`);
}

function formatDuration(target: Date, now: Date) {
  const totalSeconds = Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds].map((part) => part.toString().padStart(2, "0")).join(" : ");
}

function formatClock(now: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
    second: "2-digit",
    timeZone: PEKANBARU_TIME_ZONE,
  })
    .format(now)
    .replace(/\./g, ":");
}

function getNextPrayer(
  now: Date,
  todayDate: string,
  todayTimes: PrayerTime[],
  tomorrowDate?: string,
  tomorrowTimes?: PrayerTime[],
) {
  const validTodayTimes = todayTimes.filter((item) => /^\d{2}:\d{2}$/.test(item.time));
  const validTomorrowTimes = tomorrowTimes?.filter((item) => /^\d{2}:\d{2}$/.test(item.time)) ?? [];
  const candidates = [
    ...validTodayTimes.map((item) => ({
      label: item.label,
      target: parsePekanbaruDateTime(todayDate, item.time),
    })),
    ...validTomorrowTimes.map((item) => ({
      label: `${item.label} besok`,
      target: parsePekanbaruDateTime(tomorrowDate ?? todayDate, item.time),
    })),
  ].sort((a, b) => a.target.getTime() - b.target.getTime());

  return candidates.find((item) => item.target.getTime() > now.getTime()) ?? null;
}

export function PrayerCountdown({
  todayDate,
  todayTimes,
  tomorrowDate,
  tomorrowTimes,
}: PrayerCountdownProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const updateClock = () => setNow(new Date());

    updateClock();
    const timer = window.setInterval(updateClock, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const nextPrayer = useMemo(() => {
    if (!now) return null;
    return getNextPrayer(now, todayDate, todayTimes, tomorrowDate, tomorrowTimes);
  }, [now, todayDate, todayTimes, tomorrowDate, tomorrowTimes]);

  return (
    <div className="mt-4 flex items-center gap-3 rounded-[22px] border border-emerald-100 bg-emerald-50/80 p-4 shadow-[0_12px_34px_rgba(16,185,129,0.08)]">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-emerald-800 shadow-sm">
        <Landmark size={19} />
      </span>
      <div className="min-w-0">
        <p className="flex items-center gap-1.5 text-sm font-semibold text-stone-900">
          <Clock size={14} /> {nextPrayer ? `Menuju ${nextPrayer.label}` : "Jam Pekanbaru"}
        </p>
        <p className="text-xs text-stone-500">WIB {now ? formatClock(now) : "--:--:--"}</p>
      </div>
      <p className="ml-auto whitespace-nowrap text-lg font-semibold text-emerald-900 sm:text-xl">
        {now && nextPrayer ? formatDuration(nextPrayer.target, now) : "-- : -- : --"}
      </p>
    </div>
  );
}
