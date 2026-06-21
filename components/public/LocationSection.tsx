import Link from "next/link";
import { ExternalLink, MapPin, Navigation } from "lucide-react";
import { FadeIn } from "./MotionPrimitives";

const mapsUrl = "https://maps.app.goo.gl/zYWwrbUyvjLKyHXE6?g_st=ic";

export function LocationSection() {
  return (
    <section id="lokasi" className="scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <FadeIn className="flex flex-col justify-center rounded-[30px] bg-[#064E3B] p-6 text-white shadow-[0_28px_80px_rgba(6,78,59,0.22)] md:p-8">
            <p className="text-sm font-semibold text-yellow-200">Lokasi Masjid</p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Lokasi Masjid Mitfhaul Jannah</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-emerald-50/76">
              Masjid Mitfhaul Jannah berada di lingkungan jamaah Jalan Budi Daya Gang Bayu, Pekanbaru.
            </p>
            <div className="mt-6 rounded-2xl border border-white/12 bg-white/10 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-yellow-100">
                <MapPin size={17} /> Alamat
              </p>
              <p className="mt-2 text-lg font-semibold">Jalan Budi Daya Gang Bayu</p>
              <p className="text-sm text-emerald-50/70">Pekanbaru, Riau</p>
            </div>
            <Link href={mapsUrl} target="_blank" className="mt-6 inline-flex w-fit items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-yellow-300">
              <Navigation size={17} /> Buka Maps
            </Link>
          </FadeIn>

          <FadeIn delay={0.1} className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
            <div className="relative min-h-[360px] bg-[linear-gradient(135deg,rgba(6,78,59,0.92),rgba(5,150,105,0.72)),url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center">
              <div className="absolute inset-0 portal-pattern opacity-20" />
              <div className="absolute left-1/2 top-1/2 w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-white/24 bg-white/14 p-5 text-white shadow-[0_22px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl md:w-[68%]">
                <div className="flex items-start gap-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#D4AF37] text-slate-950">
                    <MapPin size={22} />
                  </span>
                  <div>
                    <p className="text-sm text-emerald-50/78">Google Maps preview</p>
                    <h3 className="mt-1 text-2xl font-semibold">Masjid Mitfhaul Jannah</h3>
                    <p className="mt-2 text-sm leading-6 text-emerald-50/76">Jalan Budi Daya Gang Bayu, Pekanbaru</p>
                  </div>
                </div>
                <Link href={mapsUrl} target="_blank" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-yellow-100">
                  Buka lokasi lengkap <ExternalLink size={15} />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
