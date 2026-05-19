"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { PEKANBARU_UTC_OFFSET } from "@/lib/prayer-schedule";

type PrayerTime = {
  label: string;
  time: string;
};

type PrayerBoardProps = {
  todayDate: string;
  items: PrayerTime[];
};

function parseDateTime(date: string, time: string) {
  return new Date(`${date}T${time}:00${PEKANBARU_UTC_OFFSET}`);
}

function getNextLabel(now: Date, todayDate: string, items: PrayerTime[]) {
  return items
    .filter((item) => /^\d{2}:\d{2}$/.test(item.time))
    .map((item) => ({ ...item, target: parseDateTime(todayDate, item.time) }))
    .find((item) => item.target.getTime() > now.getTime())?.label;
}

export function PrayerBoard({ todayDate, items }: PrayerBoardProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const nextLabel = useMemo(() => (now ? getNextLabel(now, todayDate, items) : undefined), [now, todayDate, items]);

  return (
    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
      {items.map(({ label, time }, index) => {
        const active = label === nextLabel;

        return (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.04 }}
            whileHover={{ y: -4, scale: 1.03 }}
            className={`rounded-2xl border p-4 transition ${
              active
                ? "border-emerald-300 bg-gradient-to-br from-emerald-600 to-emerald-400 text-white shadow-[0_18px_45px_rgba(16,185,129,0.25)]"
                : "border-slate-200 bg-white text-slate-950 shadow-[0_10px_28px_rgba(15,23,42,0.04)]"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <p className={`text-xs font-semibold ${active ? "text-emerald-50" : "text-slate-500"}`}>{label}</p>
              {active ? <span className="rounded-full bg-white/18 px-2 py-1 text-[10px] font-semibold">Berikutnya</span> : null}
            </div>
            <p className="mt-2 text-2xl font-semibold">{time}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
