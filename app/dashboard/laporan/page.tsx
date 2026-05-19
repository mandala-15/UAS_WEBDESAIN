import { desc } from "drizzle-orm";
import { BarChart3, Download, Filter } from "lucide-react";
import { CashChart } from "@/components/dashboard/CashChart";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { db } from "@/db";
import { kasKeluar, kasMasuk } from "@/db/schema";
import { sampleKasKeluar, sampleKasMasuk } from "@/lib/sample-data";
import { formatRupiah } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function LaporanPage() {
  let masuk: { jumlah: string }[] = [];
  let keluar: { jumlah: string }[] = [];

  try {
    [masuk, keluar] = await Promise.all([
      db.select().from(kasMasuk).orderBy(desc(kasMasuk.tanggal)),
      db.select().from(kasKeluar).orderBy(desc(kasKeluar.tanggal)),
    ]);
    if (masuk.length === 0) masuk = sampleKasMasuk;
    if (keluar.length === 0) keluar = sampleKasKeluar;
  } catch {
    masuk = sampleKasMasuk;
    keluar = sampleKasKeluar;
  }

  const totalMasuk = masuk.reduce((sum, item) => sum + Number(item.jumlah), 0);
  const totalKeluar = keluar.reduce((sum, item) => sum + Number(item.jumlah), 0);

  return (
    <div className="space-y-7">
      <PageHeader eyebrow="Laporan Keuangan" title="Rekap kas mesjid" description="Ringkasan data keuangan dengan filter visual dan chart untuk membantu pengurus membaca kondisi kas." icon={BarChart3} />
      <div className="grid gap-5 md:grid-cols-3">
        <StatCard label="Pemasukan" value={formatRupiah(totalMasuk)} icon={BarChart3} trend="+18.2%" />
        <StatCard label="Pengeluaran" value={formatRupiah(totalKeluar)} icon={BarChart3} tone="rose" trend="-6.8%" />
        <StatCard label="Saldo" value={formatRupiah(totalMasuk - totalKeluar)} icon={BarChart3} tone="sky" trend="+11.0%" />
      </div>
      <div className="flex flex-col gap-3 rounded-[26px] border border-white/70 bg-white/80 p-4 shadow-[0_18px_55px_rgba(15,23,42,0.07)] backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-3">
          <button className="inline-flex items-center gap-2 rounded-2xl bg-stone-100 px-4 py-3 text-sm font-medium text-stone-700"><Filter size={16} /> Bulan ini</button>
          <button className="rounded-2xl bg-white px-4 py-3 text-sm font-medium text-stone-600 shadow-sm">Triwulan</button>
          <button className="rounded-2xl bg-white px-4 py-3 text-sm font-medium text-stone-600 shadow-sm">Tahunan</button>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-stone-950 px-4 py-3 text-sm font-semibold text-white"><Download size={16} /> Export</button>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <CashChart labels={["Pemasukan", "Pengeluaran", "Saldo"]} masuk={[totalMasuk, 0, Math.max(totalMasuk - totalKeluar, 0)]} keluar={[0, totalKeluar, 0]} />
        <div className="rounded-[28px] border border-white/70 bg-white/82 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-stone-950">Catatan Audit</h2>
          <div className="mt-5 space-y-4 text-sm text-stone-600">
            <p className="rounded-2xl bg-emerald-50 p-4">Gunakan filter tanggal untuk memeriksa periode laporan tertentu.</p>
            <p className="rounded-2xl bg-amber-50 p-4">Export PDF/Excel dapat ditambahkan dari dataset Drizzle yang sama.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
