"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { SafeInput, SafeTextarea } from "@/components/ui/SafeFields";
import { DateInput } from "./DateInput";

export function KegiatanForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/kegiatan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          judul: formData.get("judul"),
          tanggalMulai: formData.get("tanggalMulai"),
          tanggalSelesai: formData.get("tanggalSelesai"),
          lokasi: formData.get("lokasi"),
          deskripsi: formData.get("deskripsi"),
          gambarUrl: formData.get("gambarUrl"),
        }),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setMessage(data?.message ?? "Kegiatan gagal disimpan.");
        return;
      }

      form.reset();
      setMessage("Kegiatan berhasil disimpan.");
      router.refresh();
    } catch {
      setMessage("Kegiatan gagal disimpan. Server tidak merespons.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5 rounded-[28px] border border-white/70 bg-white/82 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      <h2 className="text-xl font-semibold text-stone-950">Tambah Kegiatan</h2>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">Judul</label>
        <SafeInput name="judul" required className="mt-2 h-[52px] w-full rounded-2xl border border-stone-200 bg-white/85 px-4 py-3 text-sm shadow-[0_10px_28px_rgba(15,23,42,0.05)] focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10" />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">Tanggal Mulai</label>
        <DateInput name="tanggalMulai" enableTime />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">Tanggal Selesai</label>
        <DateInput name="tanggalSelesai" enableTime />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">Lokasi</label>
        <SafeInput name="lokasi" required className="mt-2 h-[52px] w-full rounded-2xl border border-stone-200 bg-white/85 px-4 py-3 text-sm shadow-[0_10px_28px_rgba(15,23,42,0.05)] focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10" />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">URL Gambar</label>
        <SafeInput name="gambarUrl" type="url" className="mt-2 h-[52px] w-full rounded-2xl border border-stone-200 bg-white/85 px-4 py-3 text-sm shadow-[0_10px_28px_rgba(15,23,42,0.05)] focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10" />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">Deskripsi</label>
        <SafeTextarea name="deskripsi" required className="mt-2 min-h-32 w-full rounded-2xl border border-stone-200 bg-white/85 px-4 py-3 text-sm shadow-[0_10px_28px_rgba(15,23,42,0.05)] focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10" />
      </div>
      {message ? <p className="rounded-2xl bg-stone-50 p-3 text-sm text-stone-700">{message}</p> : null}
      <Button disabled={loading} className="w-full">
        {loading ? "Menyimpan..." : "Simpan Kegiatan"}
      </Button>
    </form>
  );
}
