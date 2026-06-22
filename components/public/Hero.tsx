import Link from "next/link";
import { ArrowRight, BarChart3, CalendarDays, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { AnimatedAmount } from "./AnimatedAmount";
import { FadeIn, FloatingPanel } from "./MotionPrimitives";

const financials = [
  { label: "Total Pemasukan", value: 16_560_000 },
  { label: "Total Pengeluaran", value: 6_570_000 },
  { label: "Saldo Aktif", value: 9_990_000 },
  { label: "Total Donasi", value: 5_299_200 },
];

export function Hero() {
  return (
    <section id="beranda" className="portal-hero relative -mt-16 overflow-hidden pt-16 text-white sm:-mt-20 sm:pt-20">
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(6,78,59,0.96)_0%,rgba(5,150,105,0.78)_48%,rgba(212,175,55,0.30)_100%)]" />
      <div className="absolute inset-0 portal-pattern opacity-30" />
      <div className="absolute inset-0 portal-noise opacity-35" />
      <div className="absolute inset-0 portal-glow-field" />

      <div className="relative mx-auto grid min-h-[auto] max-w-7xl items-center gap-8 px-4 pb-20 pt-20 sm:min-h-[760px] sm:gap-10 sm:pb-24 sm:pt-32 lg:grid-cols-12">
        <FadeIn className="lg:col-span-7">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-yellow-300/22 bg-white/[0.10] px-3 py-2 text-xs font-semibold text-yellow-100 shadow-[0_16px_45px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:px-4 sm:text-sm">
            <Sparkles size={16} className="shrink-0 text-yellow-300" />
            <span className="truncate">Modern Islamic Digital Experience Platform</span>
          </div>

          <h1 className="mt-5 max-w-4xl text-[2.35rem] font-semibold leading-[1.08] tracking-normal text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Portal Digital Masjid Mitfhaul Jannah
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-emerald-50/82 sm:text-base md:text-lg md:leading-8">
            Informasi ibadah, kegiatan jamaah, donasi, dan transparansi keuangan dalam satu platform digital.
          </p>

          <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
            <Link href="#jadwal" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_55px_rgba(16,185,129,0.28)] hover:bg-emerald-400">
              Lihat Jadwal Sholat <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </Link>
            <Link href="#donasi" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_45px_rgba(212,175,55,0.24)] hover:bg-yellow-300">
              <HeartHandshake size={18} /> Donasi Sekarang
            </Link>
            <Link href="#laporan" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/24 bg-white/[0.10] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(0,0,0,0.16)] backdrop-blur-xl hover:bg-white/[0.16]">
              <BarChart3 size={18} /> Lihat Laporan Kas
            </Link>
          </div>

          <div className="mt-8 grid max-w-2xl gap-3 text-sm text-emerald-50/78 sm:mt-10 sm:grid-cols-3">
            {["Donasi terpantau", "Agenda rutin jamaah", "Jadwal sholat realtime"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/12 bg-white/[0.08] px-4 py-3 backdrop-blur-xl">
                {item}
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="min-w-0 lg:col-span-5">
          <FloatingPanel className="mx-auto max-w-md">
            <div className="relative overflow-hidden rounded-[24px] border border-white/20 bg-white/[0.13] p-4 shadow-[0_34px_90px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:rounded-[28px] sm:p-6">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-300/70 to-transparent" />
              <div className="flex items-start justify-between gap-4 sm:gap-5">
                <div>
                  <p className="text-sm text-emerald-50/76">Floating dashboard</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Transparansi Keuangan</h2>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-emerald-50/72">
                    Ringkasan amanah jamaah Masjid Mitfhaul Jannah.
                  </p>
                </div>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-yellow-300/24 bg-yellow-300/14 text-yellow-200 shadow-[0_0_34px_rgba(234,179,8,0.22)] sm:h-14 sm:w-14">
                  <ShieldCheck />
                </span>
              </div>

              <div className="mt-7">
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-50/70">
                  <span>Donasi renovasi</span>
                  <span>78%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/18">
                  <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-emerald-300 via-emerald-400 to-yellow-300" />
                </div>
              </div>

              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {financials.map((item, index) => (
                  <div key={item.label} className="rounded-2xl border border-white/12 bg-white/[0.08] p-4">
                    <p className="text-xs text-emerald-50/65">{item.label}</p>
                    <p className={`mt-1 break-words text-base font-semibold sm:text-lg ${index === 1 ? "text-yellow-200" : "text-emerald-100"}`}>
                      <AnimatedAmount value={item.value} />
                    </p>
                  </div>
                ))}
              </div>

              <Link href="#laporan" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white">
                Lihat ringkasan keuangan <ArrowRight size={16} />
              </Link>
            </div>
          </FloatingPanel>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#f8fafc] to-transparent" />
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/12 bg-black/28 px-4 py-2 text-xs text-white/72 backdrop-blur-xl md:flex">
        <CalendarDays size={14} /> Informasi jamaah diperbarui berkala
      </div>
    </section>
  );
}
