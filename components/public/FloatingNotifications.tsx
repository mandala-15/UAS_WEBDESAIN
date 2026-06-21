"use client";

import { Bell, X } from "lucide-react";
import { useState } from "react";

const notifications = [
  "Kajian malam ini pukul 19.30",
  "Donasi renovasi mencapai 80%",
  "Jadwal imam terbaru sudah diperbarui",
];

export function FloatingNotifications() {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <aside className="fixed bottom-28 right-4 z-40 w-[calc(100%-2rem)] max-w-sm rounded-[24px] border border-white/40 bg-white/88 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.18)] backdrop-blur-2xl md:bottom-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
            <Bell size={18} />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-950">Informasi terbaru</p>
            <p className="text-xs text-slate-500">Notifikasi jamaah</p>
          </div>
        </div>
        <button type="button" onClick={() => setOpen(false)} className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200" aria-label="Tutup notifikasi">
          <X size={15} />
        </button>
      </div>
      <div className="mt-4 space-y-2">
        {notifications.map((item) => (
          <p key={item} className="rounded-2xl bg-slate-50 px-3 py-2 text-sm text-slate-700">
            {item}
          </p>
        ))}
      </div>
    </aside>
  );
}
