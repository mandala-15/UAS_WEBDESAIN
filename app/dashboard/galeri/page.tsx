import { desc } from "drizzle-orm";
import { Image } from "lucide-react";
import { GalleryGrid } from "@/components/dashboard/GalleryGrid";
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
        <GalleryGrid items={items} />
      </div>
    </div>
  );
}
