import Link from "next/link";
import { ArrowRight, BarChart3, CalendarDays, ShieldCheck, Sparkles } from "lucide-react";
import { FadeIn, FloatingPanel } from "./MotionPrimitives";

export function Hero() {
  return (
    <section id="beranda" className="portal-hero relative -mt-20 overflow-hidden pt-20 text-white">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,46,43,0.96)_0%,rgba(4,120,87,0.78)_46%,rgba(15,23,42,0.32)_100%)]" />
      <div className="absolute inset-0 portal-pattern opacity-30" />
      <div className="absolute inset-0 portal-noise opacity-35" />
      <div className="absolute inset-0 portal-glow-field" />

      <div className="relative mx-auto grid min-h-[760px] max-w-7xl items-center gap-10 px-4 pb-24 pt-32 lg:grid-cols-12">
        <FadeIn className="lg:col-span-7">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-yellow-300/22 bg-white/[0.10] px-4 py-2 text-sm font-semibold text-yellow-100 shadow-[0_16px_45px_rgba(0,0,0,0.18)] backdrop-blur-xl">
            <Sparkles size={16} className="shrink-0 text-yellow-300" />
            <span className="truncate">Portal Informasi Jamaah Pekanbaru</span>
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-normal text-white md:text-6xl lg:text-7xl">
            Transparansi Kas & Kegiatan Masjid dalam Satu Portal Digital
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-emerald-50/82 md:text-lg">
            Pantau jadwal sholat, agenda kegiatan, galeri, dan laporan kas masjid secara transparan, rapi, dan mudah diakses oleh jamaah.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#jadwal" className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_55px_rgba(16,185,129,0.28)] hover:bg-emerald-400">
              Lihat Jadwal Sholat <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </Link>
            <Link href="#laporan" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/24 bg-white/[0.10] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(0,0,0,0.16)] backdrop-blur-xl hover:bg-white/[0.16]">
              <BarChart3 size={18} /> Lihat Laporan Kas
            </Link>
          </div>

          <div className="mt-10 grid max-w-2xl gap-3 text-sm text-emerald-50/78 sm:grid-cols-3">
            {["Data kas transparan", "Agenda rutin jamaah", "Jadwal sholat realtime"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/12 bg-white/[0.08] px-4 py-3 backdrop-blur-xl">
                {item}
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="lg:col-span-5">
          <FloatingPanel className="mx-auto max-w-md">
            <div className="relative overflow-hidden rounded-[28px] border border-white/20 bg-white/[0.13] p-6 shadow-[0_34px_90px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-300/70 to-transparent" />
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-sm text-emerald-50/76">Saldo kas masjid</p>
                  <h2 className="mt-2 text-4xl font-semibold text-white">Amanah</h2>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-emerald-50/72">
                    Dikelola terbuka untuk mendukung ibadah, pendidikan, sosial, dan pelayanan jamaah.
                  </p>
                </div>
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-yellow-300/24 bg-yellow-300/14 text-yellow-200 shadow-[0_0_34px_rgba(234,179,8,0.22)]">
                  <ShieldCheck />
                </span>
              </div>

              <div className="mt-7">
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-50/70">
                  <span>Target transparansi</span>
                  <span>82%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/18">
                  <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-emerald-300 via-emerald-400 to-yellow-300" />
                </div>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/12 bg-white/[0.08] p-4">
                  <p className="text-xs text-emerald-50/65">Pemasukan bulan ini</p>
                  <p className="mt-1 text-xl font-semibold text-emerald-100">Rp 18.56 jt</p>
                </div>
                <div className="rounded-2xl border border-white/12 bg-white/[0.08] p-4">
                  <p className="text-xs text-emerald-50/65">Pengeluaran</p>
                  <p className="mt-1 text-xl font-semibold text-yellow-200">Rp 6.57 jt</p>
                </div>
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
