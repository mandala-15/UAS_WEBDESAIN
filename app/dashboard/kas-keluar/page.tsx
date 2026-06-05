import { desc } from "drizzle-orm";
import { ArrowDownCircle } from "lucide-react";
import { CashTable } from "@/components/dashboard/CashTable";
import { CashForm } from "@/components/dashboard/CashForm";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { db } from "@/db";
import { kasKeluar } from "@/db/schema";
import { sampleKasKeluar } from "@/lib/sample-data";

export const dynamic = "force-dynamic";

async function getRows() {
  try {
    const rows = await db.select().from(kasKeluar).orderBy(desc(kasKeluar.tanggal)).limit(10);
    return rows.length > 0 ? rows : sampleKasKeluar;
  } catch {
    return sampleKasKeluar;
  }
}

export default async function KasKeluarPage() {
  const rows = await getRows();

  return (
    <div className="space-y-7">
      <PageHeader eyebrow="Kas Keluar" title="Kelola pengeluaran" description="Rekam kebutuhan operasional, sosial, dan perawatan mesjid secara transparan." icon={ArrowDownCircle} />
      <div className="grid gap-6 lg:grid-cols-[410px_1fr]">
      <section className="rounded-[28px] border border-white/70 bg-white/82 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <h2 className="text-xl font-semibold text-stone-950">Tambah Kas Keluar</h2>
        <p className="mt-2 text-sm text-stone-500">Pastikan kategori dan keterangan mudah diaudit.</p>
        <CashForm type="keluar" />
      </section>
      <section>
        <CashTable
          type="keluar"
          rows={rows}
          empty="Belum ada data kas keluar atau database belum dikonfigurasi."
        />
      </section>
      </div>
    </div>
  );
}
