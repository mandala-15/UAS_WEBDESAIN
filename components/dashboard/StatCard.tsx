import type { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  icon: Icon,
  tone = "emerald",
  trend = "+12.4%",
  caption = "bulan ini",
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  tone?: "emerald" | "rose" | "amber" | "sky";
  trend?: string;
  caption?: string;
}) {
  const tones = {
    emerald: "from-emerald-500/14 to-teal-300/10 text-emerald-700 bg-emerald-500/12",
    rose: "from-rose-500/14 to-orange-300/10 text-rose-700 bg-rose-500/12",
    amber: "from-amber-500/16 to-yellow-300/10 text-amber-700 bg-amber-500/14",
    sky: "from-sky-500/14 to-indigo-300/10 text-sky-700 bg-sky-500/12",
  };

  return (
    <div className={`group rounded-[26px] border border-white/70 bg-gradient-to-br ${tones[tone].split(" ").slice(0, 2).join(" ")} bg-white/80 p-6 shadow-[0_20px_55px_rgba(15,23,42,0.08)] backdrop-blur-xl hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(15,23,42,0.13)]`}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-stone-500">{label}</p>
        <span className={`rounded-2xl p-3 shadow-inner backdrop-blur ${tones[tone].split(" ").slice(2).join(" ")}`}>
          <Icon size={20} />
        </span>
      </div>
      <p className="mt-5 text-3xl font-semibold tracking-tight text-stone-950">{value}</p>
      <div className="mt-5 flex items-center gap-2 text-xs">
        <span className="rounded-full bg-white/80 px-2.5 py-1 font-semibold text-emerald-700 shadow-sm">{trend}</span>
        <span className="text-stone-500">{caption}</span>
      </div>
    </div>
  );
}
