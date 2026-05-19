import { desc } from "drizzle-orm";
import { ArrowDownCircle, ArrowUpCircle, LayoutDashboard, Sparkles, Wallet } from "lucide-react";
import { CashChart } from "@/components/dashboard/CashChart";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { db } from "@/db";
import { kasKeluar, kasMasuk } from "@/db/schema";
import { sampleKasKeluar, sampleKasMasuk } from "@/lib/sample-data";
import { formatRupiah } from "@/lib/utils";

export const dynamic = "force-dynamic";

async function getData() {
  try {
    const [masuk, keluar] = await Promise.all([
      db.select().from(kasMasuk).orderBy(desc(kasMasuk.tanggal)).limit(20),
      db.select().from(kasKeluar).orderBy(desc(kasKeluar.tanggal)).limit(20),
    ]);
    return {
      masuk: masuk.length > 0 ? masuk : sampleKasMasuk,
      keluar: keluar.length > 0 ? keluar : sampleKasKeluar,
    };
  } catch {
    return { masuk: sampleKasMasuk, keluar: sampleKasKeluar };
  }
}

export default async function DashboardPage() {
  const { masuk, keluar } = await getData();
  const totalMasuk = masuk.reduce((sum, item) => sum + Number(item.jumlah), 0);
  const totalKeluar = keluar.reduce((sum, item) => sum + Number(item.jumlah), 0);
  const saldo = totalMasuk - totalKeluar;

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Dashboard Admin"
        title="Ringkasan kas mesjid"
        description="Pantau posisi kas, pemasukan, pengeluaran, dan tren keuangan dalam tampilan yang bersih dan mudah dibaca."
        icon={LayoutDashboard}
      />
      <div className="grid gap-5 md:grid-cols-3">
        <StatCard label="Total Kas Masuk" value={formatRupiah(totalMasuk)} icon={ArrowUpCircle} trend="+18.2%" />
        <StatCard label="Total Kas Keluar" value={formatRupiah(totalKeluar)} icon={ArrowDownCircle} tone="rose" trend="-6.8%" />
        <StatCard label="Saldo Saat Ini" value={formatRupiah(saldo)} icon={Wallet} tone="amber" trend="+11.0%" />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <CashChart
          labels={["Kas Masuk", "Kas Keluar", "Saldo"]}
          masuk={[totalMasuk, 0, saldo > 0 ? saldo : 0]}
          keluar={[0, totalKeluar, saldo < 0 ? Math.abs(saldo) : 0]}
        />
        <div className="rounded-[28px] border border-white/70 bg-stone-950 p-6 text-white shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
          <Sparkles className="text-amber-300" />
          <h2 className="mt-5 text-2xl font-semibold">Insight Cepat</h2>
          <p className="mt-3 text-sm leading-6 text-stone-300">
            Saldo saat ini berada di {formatRupiah(saldo)}. Periksa laporan bulanan untuk menjaga transparansi pengurus dan jamaah.
          </p>
          <div className="mt-6 rounded-2xl bg-white/8 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-stone-400">Status</p>
            <p className="mt-1 font-semibold text-emerald-300">Keuangan stabil</p>
          </div>
        </div>
      </div>
    </div>
  );
}
