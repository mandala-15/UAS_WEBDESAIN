import { desc } from "drizzle-orm";
import { CalendarCheck, Clock, MapPin, Sparkles } from "lucide-react";
import { DateInput } from "@/components/dashboard/DateInput";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { SafeInputNoSsr, SafeTextareaNoSsr } from "@/components/ui/SafeFieldsNoSsr";
import { db } from "@/db";
import { kegiatan } from "@/db/schema";
import { sampleKegiatan } from "@/lib/sample-data";

export const dynamic = "force-dynamic";

async function getActivities() {
  try {
    const rows = await db.select().from(kegiatan).orderBy(desc(kegiatan.tanggalMulai)).limit(10);
    if (rows.length === 0) return sampleKegiatan;

    return rows.map((row) => ({
      id: row.id,
      judul: row.judul,
      tanggalMulai: row.tanggalMulai.toLocaleString("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
      lokasi: row.lokasi,
      status: "Aktif",
    }));
  } catch {
    return sampleKegiatan;
  }
}

export default async function KegiatanPage() {
  const activities = await getActivities();

  return (
    <div className="space-y-7">
      <PageHeader eyebrow="Kegiatan" title="Kelola kegiatan mesjid" description="Susun agenda dengan timeline visual, status kegiatan, dan form publikasi yang rapi." icon={CalendarCheck} />
      <div className="grid gap-6 xl:grid-cols-[430px_1fr]">
        <form className="space-y-5 rounded-[28px] border border-white/70 bg-white/82 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-stone-950">Tambah Kegiatan</h2>
          <div><label className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">Judul</label><SafeInputNoSsr name="judul" className="mt-2 h-[52px] w-full rounded-2xl border border-stone-200 bg-white/85 px-4 py-3 text-sm shadow-[0_10px_28px_rgba(15,23,42,0.05)] focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10" /></div>
          <div><label className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">Tanggal Mulai</label><DateInput name="tanggalMulai" enableTime /></div>
          <div><label className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">Tanggal Selesai</label><DateInput name="tanggalSelesai" enableTime /></div>
          <div><label className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">Lokasi</label><SafeInputNoSsr name="lokasi" className="mt-2 h-[52px] w-full rounded-2xl border border-stone-200 bg-white/85 px-4 py-3 text-sm shadow-[0_10px_28px_rgba(15,23,42,0.05)] focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10" /></div>
          <div><label className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">Deskripsi</label><SafeTextareaNoSsr name="deskripsi" className="mt-2 min-h-32 w-full rounded-2xl border border-stone-200 bg-white/85 px-4 py-3 text-sm shadow-[0_10px_28px_rgba(15,23,42,0.05)] focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10" /></div>
        </form>
        <div className="rounded-[28px] border border-white/70 bg-white/82 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-stone-950">Timeline Kegiatan</h2>
          <div className="mt-6 space-y-5">
            {activities.map((item) => (
              <div key={item.id} className="relative rounded-[24px] border border-stone-100 bg-white/75 p-5 shadow-sm hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <span className="rounded-2xl bg-emerald-50 p-3 text-emerald-700"><Sparkles size={18} /></span>
                    <div>
                      <h3 className="font-semibold text-stone-950">{item.judul}</h3>
                      <p className="mt-2 flex items-center gap-2 text-sm text-stone-500"><Clock size={15} /> {item.tanggalMulai}</p>
                      <p className="mt-1 flex items-center gap-2 text-sm text-stone-500"><MapPin size={15} /> {item.lokasi}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
