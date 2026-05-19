import Link from "next/link";
import { desc } from "drizzle-orm";
import { ArrowLeft, ImageIcon } from "lucide-react";
import { db } from "@/db";
import { galeri } from "@/db/schema";
import { sampleGaleri } from "@/lib/sample-data";

export const dynamic = "force-dynamic";

async function getGallery() {
  try {
    const rows = await db.select().from(galeri).orderBy(desc(galeri.createdAt));
    if (rows.length === 0) return sampleGaleri;

    return rows.map((row) => ({
      id: row.id,
      judul: row.judul,
      gambarUrl: row.gambarUrl,
      kategori: row.mimeType.replace("image/", "").toUpperCase(),
    }));
  } catch {
    return sampleGaleri;
  }
}

export default async function GaleriPage() {
  const gallery = await getGallery();

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-stone-950">
      <section className="bg-[linear-gradient(135deg,#071A14,#0F3D2E)] px-4 py-10 text-white">
        <div className="mx-auto max-w-6xl">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-100 hover:text-white">
            <ArrowLeft size={17} /> Kembali ke portal
          </Link>
          <h1 className="mt-8 text-4xl font-semibold">Galeri Kegiatan</h1>
          <p className="mt-3 max-w-2xl text-white/75">Dokumentasi kegiatan dan suasana masjid.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-8 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((item) => (
          <article key={item.id} className="overflow-hidden rounded-[22px] border border-stone-200 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.07)]">
            <div
              className="aspect-[4/3] bg-stone-200 bg-cover bg-center"
              style={{ backgroundImage: `url("${item.gambarUrl}")` }}
            />
            <div className="flex items-center justify-between gap-3 p-4">
              <h2 className="truncate font-semibold text-stone-950">{item.judul}</h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                <ImageIcon size={13} /> {item.kategori}
              </span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
