"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { SafeInput, SafeTextarea } from "@/components/ui/SafeFields";
import { DateInput } from "./DateInput";
import { CalendarDays, FileText, Tags, Wallet } from "lucide-react";

export function CashForm({ type }: { type: "masuk" | "keluar" }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const endpoint = type === "masuk" ? "/api/kas-masuk" : "/api/kas-keluar";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload =
      type === "masuk"
        ? {
            tanggal: formData.get("tanggal"),
            sumber: formData.get("sumber"),
            jumlah: formData.get("jumlah"),
            keterangan: formData.get("keterangan"),
          }
        : {
            tanggal: formData.get("tanggal"),
            kategori: formData.get("kategori"),
            jumlah: formData.get("jumlah"),
            keterangan: formData.get("keterangan"),
          };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setMessage(data?.message ?? "Data gagal disimpan. Periksa konfigurasi server.");
      return;
    }

    setMessage("Data berhasil disimpan.");
    router.refresh();
  }

  return (
    <form onSubmit={submit} suppressHydrationWarning className="mt-6 space-y-5">
      <div className="group relative">
        <CalendarDays className="pointer-events-none absolute left-4 top-10 text-stone-400 group-focus-within:text-emerald-600" size={18} />
        <label className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">Tanggal</label>
        <DateInput name="tanggal" />
      </div>
      {type === "masuk" ? (
        <div className="group relative">
          <Tags className="pointer-events-none absolute left-4 top-10 text-stone-400 group-focus-within:text-emerald-600" size={18} />
          <label className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">Sumber</label>
          <SafeInput name="sumber" required className="mt-2 h-[52px] w-full rounded-2xl border border-stone-200 bg-white/85 px-4 py-3 pl-11 text-sm shadow-[0_10px_28px_rgba(15,23,42,0.05)] focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10" placeholder="Infak Jumat" />
        </div>
      ) : (
        <div className="group relative">
          <Tags className="pointer-events-none absolute left-4 top-10 text-stone-400 group-focus-within:text-emerald-600" size={18} />
          <label className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">Kategori</label>
          <SafeInput name="kategori" required className="mt-2 h-[52px] w-full rounded-2xl border border-stone-200 bg-white/85 px-4 py-3 pl-11 text-sm shadow-[0_10px_28px_rgba(15,23,42,0.05)] focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10" placeholder="Operasional" />
        </div>
      )}
      <div className="group relative">
        <Wallet className="pointer-events-none absolute left-4 top-10 text-stone-400 group-focus-within:text-emerald-600" size={18} />
        <label className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">Jumlah</label>
        <SafeInput name="jumlah" required type="number" min="1" className="mt-2 h-[52px] w-full rounded-2xl border border-stone-200 bg-white/85 px-4 py-3 pl-11 text-sm shadow-[0_10px_28px_rgba(15,23,42,0.05)] focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10" placeholder="1000000" />
      </div>
      <div className="group relative">
        <FileText className="pointer-events-none absolute left-4 top-10 text-stone-400 group-focus-within:text-emerald-600" size={18} />
        <label className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">Keterangan</label>
        <SafeTextarea name="keterangan" required className="mt-2 min-h-28 w-full rounded-2xl border border-stone-200 bg-white/85 px-4 py-3 pl-11 text-sm shadow-[0_10px_28px_rgba(15,23,42,0.05)] focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10" />
      </div>
      {message ? <p className="rounded-md bg-stone-50 p-3 text-sm text-stone-700">{message}</p> : null}
      <Button disabled={loading} className="w-full">
        {loading ? "Menyimpan..." : "Simpan Data"}
      </Button>
    </form>
  );
}
