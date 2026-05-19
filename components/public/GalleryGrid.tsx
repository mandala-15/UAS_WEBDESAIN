import Link from "next/link";
import { desc } from "drizzle-orm";
import { ArrowRight, ImageIcon } from "lucide-react";
import { db } from "@/db";
import { galeri } from "@/db/schema";
import { sampleGaleri } from "@/lib/sample-data";
import { MotionCard, Stagger } from "./MotionPrimitives";

async function getPublicGallery() {
  try {
    const rows = await db.select().from(galeri).orderBy(desc(galeri.createdAt)).limit(6);
    if (rows.length === 0) return sampleGaleri.slice(0, 6);

    return rows.map((row) => ({
      id: row.id,
      judul: row.judul,
      gambarUrl: row.gambarUrl,
      kategori: row.mimeType.replace("image/", "").toUpperCase(),
    }));
  } catch {
    return sampleGaleri.slice(0, 6);
  }
}

export async function GalleryGrid() {
  const gallery = await getPublicGallery();

  return (
    <section id="galeri" className="scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-700">Dokumentasi</p>
            <h2 className="mt-2 flex items-center gap-3 text-3xl font-semibold text-slate-950 md:text-4xl">
              <ImageIcon className="text-emerald-700" size={28} />
              Galeri kegiatan
            </h2>
          </div>
          <Link href="/galeri" className="inline-flex w-fit items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50">
            Lihat semua <ArrowRight size={15} />
          </Link>
        </div>

        <Stagger className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {gallery.map((item, index) => (
            <MotionCard
              key={item.id}
              className={`group relative overflow-hidden rounded-[20px] bg-slate-200 shadow-[0_18px_50px_rgba(15,23,42,0.10)] ${
                index === 0 ? "h-[360px] sm:col-span-2 lg:col-span-2 lg:h-[430px]" : "h-[300px] lg:h-[430px]"
              }`}
            >
              <article className="absolute inset-0">
                <div
                  className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url("${item.gambarUrl}")` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/12 to-transparent opacity-90" />
                <div className="absolute inset-x-3 bottom-3 translate-y-1 rounded-2xl bg-black/20 p-3 text-white backdrop-blur-sm transition duration-300 group-hover:translate-y-0 group-hover:bg-black/28">
                  <span className="rounded-full bg-white/18 px-2.5 py-1 text-[11px] font-semibold backdrop-blur">{item.kategori}</span>
                  <p className="mt-2 truncate text-base font-semibold">{item.judul}</p>
                </div>
              </article>
            </MotionCard>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
