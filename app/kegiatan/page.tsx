import Link from "next/link";
import { desc } from "drizzle-orm";
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";
import { db } from "@/db";
import { kegiatan } from "@/db/schema";
import { sampleKegiatan } from "@/lib/sample-data";

export const dynamic = "force-dynamic";

async function getActivities() {
  try {
    const rows = await db.select().from(kegiatan).orderBy(desc(kegiatan.tanggalMulai));
    if (rows.length === 0) {
      return sampleKegiatan.map((item) => ({
        ...item,
        deskripsi: item.status,
      }));
    }

    return rows.map((row) => ({
      id: row.id,
      judul: row.judul,
      tanggalMulai: row.tanggalMulai.toLocaleString("id-ID", {
        dateStyle: "full",
        timeStyle: "short",
      }),
      lokasi: row.lokasi,
      deskripsi: row.deskripsi,
    }));
  } catch {
    return sampleKegiatan.map((item) => ({
      ...item,
      deskripsi: item.status,
    }));
  }
}

export default async function KegiatanPage() {
  const activities = await getActivities();

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-stone-950">
      <section className="bg-[linear-gradient(135deg,#071A14,#0F3D2E)] px-4 py-10 text-white">
        <div className="mx-auto max-w-6xl">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-100 hover:text-white">
            <ArrowLeft size={17} /> Kembali ke portal
          </Link>
          <h1 className="mt-8 text-4xl font-semibold">Semua Kegiatan</h1>
          <p className="mt-3 max-w-2xl text-white/75">Agenda dan program masjid yang dapat diikuti jamaah.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-8 md:grid-cols-2">
        {activities.map((item) => (
          <article key={item.id} className="rounded-[22px] border border-stone-200 bg-white p-5 shadow-[0_14px_38px_rgba(15,23,42,0.07)]">
            <h2 className="text-xl font-semibold text-stone-950">{item.judul}</h2>
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-stone-600">{item.deskripsi}</p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs text-stone-500">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-2 text-emerald-800">
                <CalendarDays size={13} /> {item.tanggalMulai}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-3 py-2">
                <MapPin size={13} /> {item.lokasi}
              </span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
