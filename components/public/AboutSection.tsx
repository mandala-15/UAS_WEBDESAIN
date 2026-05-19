import Link from "next/link";
import { CheckCircle2, Landmark, Mail, MapPin, Phone, UsersRound } from "lucide-react";
import { FadeIn } from "./MotionPrimitives";

const points = [
  "Transparansi informasi kas dan kegiatan jamaah.",
  "Portal publik yang nyaman diakses dari desktop dan mobile.",
  "Data galeri dan agenda terhubung dengan dashboard admin.",
];

export function AboutSection() {
  return (
    <section id="tentang" className="scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn className="relative min-h-[420px] overflow-hidden rounded-[28px] bg-[url('https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center shadow-[0_24px_70px_rgba(15,23,42,0.14)]">
            <div className="absolute inset-0 bg-gradient-to-t from-[#052e2b]/90 via-[#052e2b]/30 to-transparent" />
            <div className="absolute bottom-0 p-6 text-white">
              <Landmark className="text-yellow-300" size={34} />
              <h2 className="mt-4 text-3xl font-semibold">Portal Masjid Pekanbaru</h2>
              <p className="mt-3 max-w-md text-sm leading-7 text-emerald-50/78">
                Ruang informasi publik untuk mendekatkan pengurus dan jamaah melalui data yang rapi, terbuka, dan mudah dipahami.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="flex flex-col justify-center">
            <p className="text-sm font-semibold text-emerald-700">Tentang Masjid</p>
            <h3 className="mt-2 text-3xl font-semibold leading-tight text-slate-950 md:text-4xl">
              Melayani jamaah dengan informasi yang terbuka dan tertata.
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Portal ini membantu jamaah melihat agenda terbaru, jadwal ibadah, dokumentasi kegiatan, dan ringkasan kas tanpa perlu mengakses halaman pengelolaan. Dashboard admin tetap terpisah untuk pengurus.
            </p>

            <div className="mt-6 grid gap-3">
              {points.map((point) => (
                <div key={point} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
                  <CheckCircle2 className="shrink-0 text-emerald-700" size={18} />
                  {point}
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-emerald-50 p-4">
                <UsersRound className="text-emerald-700" size={20} />
                <p className="mt-2 text-sm font-semibold text-slate-950">Untuk jamaah</p>
              </div>
              <div className="rounded-2xl bg-yellow-50 p-4">
                <MapPin className="text-yellow-700" size={20} />
                <p className="mt-2 text-sm font-semibold text-slate-950">Pekanbaru</p>
              </div>
              <div className="rounded-2xl bg-sky-50 p-4">
                <Mail className="text-sky-700" size={20} />
                <p className="mt-2 text-sm font-semibold text-slate-950">Info publik</p>
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn className="mt-12 overflow-hidden rounded-[30px] bg-[#052e2b] p-6 text-white shadow-[0_28px_80px_rgba(5,46,43,0.24)] md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-semibold text-yellow-200">Call To Action</p>
              <h2 className="mt-2 text-3xl font-semibold">Mari bersama menjaga transparansi dan kemakmuran masjid.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-emerald-50/72">
                Dukung pengelolaan yang terbuka melalui informasi kas, agenda, dan dokumentasi yang dapat dipantau jamaah.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/#laporan" className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold hover:bg-emerald-400">
                Lihat Laporan
              </Link>
              <Link href="mailto:pengurus@mesjid.test" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/18 bg-white/10 px-5 py-3 text-sm font-semibold hover:bg-white/16">
                <Phone size={17} /> Hubungi Pengurus
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
