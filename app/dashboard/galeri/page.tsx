import { desc } from "drizzle-orm";
import { Image } from "lucide-react";
import { GalleryUploadForm } from "@/components/dashboard/GalleryUploadForm";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { db } from "@/db";
import { galeri } from "@/db/schema";
import { sampleGaleri } from "@/lib/sample-data";

export const dynamic = "force-dynamic";

async function getGalleryItems() {
  try {
    const rows = await db.select().from(galeri).orderBy(desc(galeri.createdAt)).limit(10);
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
  const items = await getGalleryItems();

  return (
    <div className="space-y-7">
      <PageHeader eyebrow="Galeri" title="Dokumentasi mesjid" description="Kelola foto kegiatan dengan grid visual, filter kategori, dan upload aman ke Supabase Storage." icon={Image} />
      <div className="grid gap-6 xl:grid-cols-[390px_1fr]">
        <GalleryUploadForm />
        <section>
          <div className="mb-4 flex flex-wrap gap-2">
            {["Semua", "Kajian", "Sosial", "TPA"].map((filter) => (
              <button key={filter} className="rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-stone-700 shadow-sm hover:bg-stone-950 hover:text-white">{filter}</button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {items.map((item, index) => (
              <div key={item.id} className={`group relative overflow-hidden rounded-[26px] bg-stone-200 shadow-[0_18px_45px_rgba(15,23,42,0.08)] ${index % 3 === 1 ? "lg:mt-8" : ""}`}>
                <div
                  className="aspect-[4/5] bg-cover bg-center transition duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url("${item.gambarUrl}")` }}
                />
                <div className="absolute left-3 top-3 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-stone-700 backdrop-blur">
                  {item.kategori}
                </div>
                <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-stone-950/70 p-3 text-white opacity-0 backdrop-blur-xl transition group-hover:opacity-100">
                  <p className="text-sm font-semibold">{item.judul}</p>
                  <p className="text-xs text-stone-300">Dokumentasi kegiatan</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
