import Link from "next/link";
import { desc } from "drizzle-orm";
import { ArrowRight, Brush, CalendarDays, HandHeart, MapPin, MoonStar } from "lucide-react";
import { db } from "@/db";
import { kegiatan } from "@/db/schema";
import { sampleKegiatan } from "@/lib/sample-data";
import { MotionCard, Stagger } from "./MotionPrimitives";

const styles = [
  {
    icon: Brush,
    badge: "Terjadwal",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    gradient: "from-emerald-600 to-emerald-400",
  },
  {
    icon: MoonStar,
    badge: "Rutin",
    className: "bg-yellow-50 text-yellow-700 ring-yellow-100",
    gradient: "from-yellow-500 to-amber-300",
  },
  {
    icon: HandHeart,
    badge: "Sosial",
    className: "bg-sky-50 text-sky-700 ring-sky-100",
    gradient: "from-sky-600 to-sky-400",
  },
];

async function getActivities() {
  try {
    const rows = await db.select().from(kegiatan).orderBy(desc(kegiatan.tanggalMulai)).limit(3);
    if (rows.length === 0) return sampleKegiatan.slice(0, 3);

    return rows.map((row) => ({
      id: row.id,
      judul: row.judul,
      tanggalMulai: row.tanggalMulai.toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" }),
      lokasi: row.lokasi,
      status: row.deskripsi,
    }));
  } catch {
    return sampleKegiatan.slice(0, 3);
  }
}

export async function ActivityList() {
  const activities = await getActivities();

  return (
    <section id="kegiatan" className="h-fit scroll-mt-28 rounded-[28px] border border-white bg-white/92 p-5 shadow-[0_22px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-emerald-700">Agenda Jamaah</p>
          <h2 className="mt-1 flex items-center gap-3 text-2xl font-semibold text-slate-950">
            <CalendarDays className="text-emerald-700" size={23} />
            Kegiatan terbaru
          </h2>
        </div>
        <Link href="/kegiatan" className="inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50">
          Lihat semua <ArrowRight size={15} />
        </Link>
      </div>

      <Stagger className="space-y-3">
        {activities.map((item, index) => {
          const style = styles[index % styles.length];
          const Icon = style.icon;

          return (
            <MotionCard
              key={item.id}
              className="group rounded-[22px] border border-slate-200/80 bg-white p-4 shadow-[0_12px_32px_rgba(15,23,42,0.05)]"
            >
              <article className="flex gap-4">
                <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${style.gradient} text-white shadow-lg`}>
                  <Icon size={23} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-slate-950">{item.judul}</h3>
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${style.className}`}>
                      {style.badge}
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{item.status || "Kegiatan jamaah masjid."}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1.5"><CalendarDays size={12} /> {item.tanggalMulai}</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1.5"><MapPin size={12} /> {item.lokasi}</span>
                  </div>
                </div>
                <ArrowRight className="mt-2 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-700" size={18} />
              </article>
            </MotionCard>
          );
        })}
      </Stagger>
    </section>
  );
}
