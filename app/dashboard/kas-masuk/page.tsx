import { desc } from "drizzle-orm";
import { ArrowUpCircle } from "lucide-react";
import { CashForm } from "@/components/dashboard/CashForm";
import { ModernTable } from "@/components/dashboard/ModernTable";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { db } from "@/db";
import { kasMasuk } from "@/db/schema";
import { sampleKasMasuk } from "@/lib/sample-data";
import { formatRupiah } from "@/lib/utils";

export const dynamic = "force-dynamic";

async function getRows() {
  try {
    const rows = await db.select().from(kasMasuk).orderBy(desc(kasMasuk.tanggal)).limit(10);
    return rows.length > 0 ? rows : sampleKasMasuk;
  } catch {
    return sampleKasMasuk;
  }
}

export default async function KasMasukPage() {
  const rows = await getRows();

  return (
    <div className="space-y-7">
      <PageHeader eyebrow="Kas Masuk" title="Kelola pemasukan" description="Catat infak, donasi, dan pemasukan operasional mesjid dengan validasi aman." icon={ArrowUpCircle} />
      <div className="grid gap-6 lg:grid-cols-[410px_1fr]">
      <section className="rounded-[28px] border border-white/70 bg-white/82 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <h2 className="text-xl font-semibold text-stone-950">Tambah Kas Masuk</h2>
        <p className="mt-2 text-sm text-stone-500">Gunakan nominal asli tanpa titik atau koma.</p>
        <CashForm type="masuk" />
      </section>
      <section>
        <ModernTable
          columns={["Tanggal", "Sumber", "Keterangan", "Jumlah"]}
          rows={rows.map((row) => [row.tanggal, row.sumber, row.keterangan, <span key={row.id} className="font-semibold text-emerald-700">{formatRupiah(row.jumlah)}</span>])}
          empty="Belum ada data kas masuk atau database belum dikonfigurasi."
        />
      </section>
      </div>
    </div>
  );
}
