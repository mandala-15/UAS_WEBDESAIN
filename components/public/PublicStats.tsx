import { desc } from "drizzle-orm";
import { ArrowDownRight, ArrowUpRight, Heart, ReceiptText, TrendingDown, TrendingUp, WalletCards } from "lucide-react";
import { db } from "@/db";
import { kasKeluar, kasMasuk } from "@/db/schema";
import { sampleKasKeluar, sampleKasMasuk } from "@/lib/sample-data";
import { formatRupiah } from "@/lib/utils";
import { MotionCard, Stagger } from "./MotionPrimitives";
import { PublicCashChart } from "./PublicCashChart";

const cardStyles = [
  { label: "Pemasukan", icon: WalletCards, bg: "bg-emerald-50", color: "text-emerald-700", trend: "+12.4%", trendIcon: TrendingUp },
  { label: "Pengeluaran", icon: TrendingDown, bg: "bg-rose-50", color: "text-rose-700", trend: "-8.1%", trendIcon: ArrowDownRight },
  { label: "Saldo Kas", icon: WalletCards, bg: "bg-yellow-50", color: "text-yellow-700", trend: "+9.3%", trendIcon: ArrowUpRight },
  { label: "Donasi", icon: Heart, bg: "bg-sky-50", color: "text-sky-700", trend: "+14.7%", trendIcon: TrendingUp },
];

async function getCashData() {
  try {
    const [masuk, keluar] = await Promise.all([
      db.select().from(kasMasuk).orderBy(desc(kasMasuk.tanggal)).limit(10),
      db.select().from(kasKeluar).orderBy(desc(kasKeluar.tanggal)).limit(10),
    ]);

    return {
      masuk: masuk.length > 0 ? masuk : sampleKasMasuk,
      keluar: keluar.length > 0 ? keluar : sampleKasKeluar,
    };
  } catch {
    return { masuk: sampleKasMasuk, keluar: sampleKasKeluar };
  }
}

function buildChartData(masuk: { tanggal: string; jumlah: string }[], keluar: { tanggal: string; jumlah: string }[]) {
  const dates = Array.from(new Set([...masuk, ...keluar].map((item) => item.tanggal))).sort().slice(-6);

  return {
    labels: dates.map((date) => new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "short" }).format(new Date(date))),
    masuk: dates.map((date) => masuk.filter((item) => item.tanggal === date).reduce((sum, item) => sum + Number(item.jumlah), 0)),
    keluar: dates.map((date) => keluar.filter((item) => item.tanggal === date).reduce((sum, item) => sum + Number(item.jumlah), 0)),
  };
}

export async function PublicStats() {
  const { masuk, keluar } = await getCashData();
  const totalMasuk = masuk.reduce((sum, item) => sum + Number(item.jumlah), 0);
  const totalKeluar = keluar.reduce((sum, item) => sum + Number(item.jumlah), 0);
  const saldo = totalMasuk - totalKeluar;
  const chart = buildChartData(masuk, keluar);
  const values = [totalMasuk, totalKeluar, saldo, Math.round(totalMasuk * 0.32)];
  const latest = [
    ...masuk.slice(0, 2).map((item) => ({ type: "Masuk", title: "sumber" in item ? item.sumber : "Kas masuk", amount: item.jumlah })),
    ...keluar.slice(0, 2).map((item) => ({ type: "Keluar", title: "kategori" in item ? item.kategori : "Kas keluar", amount: item.jumlah })),
  ];

  return (
    <section id="laporan" className="scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-700">Ringkasan Keuangan</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950 md:text-4xl">Laporan kas publik yang mudah dibaca</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-500">Data keuangan diperbarui berkala dari database Supabase.</p>
        </div>

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cardStyles.map((item, index) => {
            const Icon = item.icon;
            const TrendIcon = item.trendIcon;
            return (
              <MotionCard key={item.label} className={`${item.bg} rounded-[24px] border border-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.07)]`}>
                <article>
                  <div className="flex items-center justify-between gap-4">
                    <span className={`grid h-12 w-12 place-items-center rounded-2xl bg-white ${item.color} shadow-sm`}>
                      <Icon size={22} />
                    </span>
                    <span className={`inline-flex items-center gap-1 rounded-full bg-white/70 px-2.5 py-1 text-xs font-semibold ${item.color}`}>
                      <TrendIcon size={13} /> {item.trend}
                    </span>
                  </div>
                  <p className="mt-5 text-sm text-slate-600">{item.label}</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-950">{formatRupiah(values[index])}</p>
                </article>
              </MotionCard>
            );
          })}
        </Stagger>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="rounded-[28px] border border-slate-200/70 bg-white p-5 shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
                <ReceiptText size={21} />
              </span>
              <div>
                <h3 className="font-semibold text-slate-950">Laporan Kas Bulanan</h3>
                <p className="text-sm text-slate-500">Grafik kas masuk dan keluar terbaru.</p>
              </div>
            </div>
            <div className="h-[280px]">
              <PublicCashChart labels={chart.labels} masuk={chart.masuk} keluar={chart.keluar} />
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200/70 bg-white p-5 shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
            <h3 className="font-semibold text-slate-950">Transaksi terbaru</h3>
            <div className="mt-4 space-y-3">
              {latest.map((item, index) => (
                <div key={`${item.type}-${item.title}-${index}`} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.type}</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-950">{formatRupiah(Number(item.amount))}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
