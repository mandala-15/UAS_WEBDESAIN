"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function logout() {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        cache: "no-store",
      });

      try {
        localStorage.removeItem("masjid_session");
        localStorage.removeItem("token");
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
        sessionStorage.clear();
      } catch {
        // Storage can be unavailable in private browsing; cookie logout still succeeds.
      }

      if (!res.ok) {
        setMessage("Logout gagal. Coba ulangi.");
        setLoading(false);
        return;
      }

      router.replace("/login");
      router.refresh();
    } catch {
      setMessage("Logout gagal. Server tidak merespons.");
      setLoading(false);
    }
  }

  return (
    <div className="absolute bottom-4 left-4 right-4">
      <button
        type="button"
        suppressHydrationWarning
        disabled={loading}
        onClick={logout}
        className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-emerald-50/80 hover:bg-rose-400/15 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        <LogOut size={18} />
        {loading ? "Logout..." : "Logout"}
      </button>
      {message ? <p className="mt-2 rounded-xl bg-rose-400/15 px-3 py-2 text-xs text-rose-100">{message}</p> : null}
    </div>
  );
}
