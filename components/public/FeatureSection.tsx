import { CalendarClock, HandHeart, ReceiptText, TimerReset } from "lucide-react";

const features = [
  {
    title: "Jadwal Sholat Realtime",
    description: "Countdown sholat berikutnya dengan lokasi Pekanbaru.",
    icon: TimerReset,
    color: "text-emerald-700",
    bg: "bg-emerald-50",
  },
  {
    title: "Program Donasi",
    description: "Target dana, progress, dan jumlah donatur tampil transparan.",
    icon: HandHeart,
    color: "text-yellow-700",
    bg: "bg-yellow-50",
  },
  {
    title: "Agenda Kegiatan",
    description: "Kajian, sosial, pendidikan, dan agenda jamaah tersaji rapi.",
    icon: CalendarClock,
    color: "text-sky-700",
    bg: "bg-sky-50",
  },
  {
    title: "Transparansi Kas",
    description: "Grafik keuangan dan laporan publik mudah dibaca jamaah.",
    icon: ReceiptText,
    color: "text-emerald-700",
    bg: "bg-emerald-50",
  },
];

export function FeatureSection() {
  return (
    <section id="fitur" className="scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold text-emerald-700">Fitur Utama</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-950 md:text-4xl">Semua Informasi Masjid Dalam Satu Portal</h2>
          <p className="mt-4 text-sm leading-7 text-slate-500">
            Pengalaman digital jamaah dibuat ringkas, bersih, dan mudah digunakan dari desktop maupun mobile.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group rounded-[24px] border border-slate-200/70 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(15,23,42,0.10)]"
              >
                <article>
                  <span className={`grid h-12 w-12 place-items-center rounded-2xl ${item.bg} ${item.color} transition duration-300 group-hover:scale-105`}>
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">{item.description}</p>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
