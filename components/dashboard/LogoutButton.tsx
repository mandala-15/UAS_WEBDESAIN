"use client";

import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <form action="/api/logout" method="post" className="absolute bottom-4 left-4 right-4">
      <button
        suppressHydrationWarning
        className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-emerald-50/80 hover:bg-rose-400/15 hover:text-white"
      >
        <LogOut size={18} />
        Logout
      </button>
    </form>
  );
}
