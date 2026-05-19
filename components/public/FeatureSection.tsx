import { CalendarClock, GalleryHorizontalEnd, ReceiptText, TimerReset } from "lucide-react";
import { MotionCard, Stagger } from "./MotionPrimitives";

const features = [
  {
    title: "Jadwal Sholat Realtime",
    description: "Jadwal harian Pekanbaru dengan countdown menuju waktu sholat berikutnya.",
    icon: TimerReset,
    color: "text-emerald-700",
    bg: "bg-emerald-50",
  },
  {
    title: "Transparansi Kas",
    description: "Ringkasan pemasukan, pengeluaran, saldo, dan tren kas untuk jamaah.",
    icon: ReceiptText,
    color: "text-yellow-700",
    bg: "bg-yellow-50",
  },
  {
    title: "Agenda Kegiatan",
    description: "Informasi kegiatan rutin, sosial, kajian, dan program kemasjidan.",
    icon: CalendarClock,
    color: "text-sky-700",
    bg: "bg-sky-50",
  },
  {
    title: "Galeri Dokumentasi",
    description: "Dokumentasi visual kegiatan masjid dalam tampilan yang rapi.",
    icon: GalleryHorizontalEnd,
    color: "text-rose-700",
    bg: "bg-rose-50",
  },
];

export function FeatureSection() {
  return (
    <section id="fitur" className="scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold text-emerald-700">Fitur Portal</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-950 md:text-4xl">Informasi masjid tersaji jelas untuk jamaah</h2>
          <p className="mt-4 text-sm leading-7 text-slate-500">
            Portal publik dirancang agar jamaah bisa memahami jadwal, agenda, dokumentasi, dan kondisi kas tanpa masuk ke dashboard admin.
          </p>
        </div>

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <MotionCard key={item.title} className="rounded-[24px] border border-slate-200/70 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.07)]">
                <article>
                  <span className={`grid h-12 w-12 place-items-center rounded-2xl ${item.bg} ${item.color}`}>
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">{item.description}</p>
                </article>
              </MotionCard>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
