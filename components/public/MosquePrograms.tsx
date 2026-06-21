import { BookOpenText, HandHeart, Landmark, MoonStar, Soup, WalletCards } from "lucide-react";
import { MotionCard, Stagger } from "./MotionPrimitives";

const programs = [
  { title: "Kajian Rutin", description: "Kajian tematik, tafsir, dan pembinaan keluarga setiap pekan.", icon: MoonStar, color: "text-emerald-700", bg: "bg-emerald-50" },
  { title: "Pendidikan Al-Quran", description: "Kelas tahsin, tahfidz, dan TPA untuk anak serta remaja.", icon: BookOpenText, color: "text-sky-700", bg: "bg-sky-50" },
  { title: "Santunan Sosial", description: "Distribusi bantuan untuk yatim, dhuafa, dan warga sekitar.", icon: HandHeart, color: "text-rose-700", bg: "bg-rose-50" },
  { title: "Jumat Berkah", description: "Makan siang jamaah dan paket berbagi setelah sholat Jumat.", icon: Soup, color: "text-yellow-700", bg: "bg-yellow-50" },
  { title: "Wakaf Masjid", description: "Program wakaf produktif untuk fasilitas ibadah jangka panjang.", icon: WalletCards, color: "text-violet-700", bg: "bg-violet-50" },
];

export function MosquePrograms() {
  return (
    <section id="program" className="scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold text-emerald-700">Program Unggulan Masjid</p>
          <h2 className="mt-2 flex items-center gap-3 text-3xl font-semibold text-slate-950 md:text-4xl">
            <Landmark className="text-[#D4AF37]" size={30} />
            Ekosistem ibadah dan sosial
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-500">
            Program masjid dirancang sebagai layanan jamaah yang aktif, terukur, dan mudah diikuti.
          </p>
        </div>

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {programs.map((item) => {
            const Icon = item.icon;
            return (
              <MotionCard key={item.title} className="group rounded-[24px] border border-slate-200/70 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.07)]">
                <article>
                  <span className={`grid h-13 w-13 place-items-center rounded-2xl ${item.bg} ${item.color} transition group-hover:scale-110`}>
                    <Icon size={23} />
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
