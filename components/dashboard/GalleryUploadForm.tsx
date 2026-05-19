"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SafeInput } from "@/components/ui/SafeFields";

export function GalleryUploadForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setMessage(data.message ?? "Upload gagal.");
      return;
    }

    setMessage("Gambar berhasil diupload dan tersimpan.");
    router.refresh();
  }

  return (
    <form
      onSubmit={submit}
      suppressHydrationWarning
      className="space-y-5 rounded-[28px] border border-white/70 bg-white/82 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl"
      encType="multipart/form-data"
    >
      <h2 className="text-xl font-semibold text-stone-950">Upload Gambar</h2>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">Judul</label>
        <SafeInput name="judul" required className="mt-2 h-[52px] w-full rounded-2xl border border-stone-200 bg-white/85 px-4 py-3 text-sm shadow-[0_10px_28px_rgba(15,23,42,0.05)] focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10" />
      </div>
      <label className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-emerald-300 bg-emerald-50/60 p-6 text-center hover:bg-emerald-50">
        <UploadCloud className="text-emerald-700" />
        <span className="mt-3 text-sm font-semibold text-stone-800">Pilih gambar</span>
        <span className="mt-1 text-xs text-stone-500">JPG, PNG, WEBP maksimal 2MB</span>
        <SafeInput name="file" type="file" accept="image/jpeg,image/png,image/webp" required className="sr-only" />
      </label>
      {message ? <p className="rounded-2xl bg-stone-50 p-3 text-sm text-stone-700">{message}</p> : null}
      <Button disabled={loading} className="w-full">
        {loading ? "Mengupload..." : "Upload Galeri"}
      </Button>
    </form>
  );
}
