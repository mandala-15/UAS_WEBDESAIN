import type { LucideIcon } from "lucide-react";

export function PageHeader({
  eyebrow,
  title,
  description,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <div className="overflow-hidden rounded-[30px] border border-white/70 bg-white/75 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">{eyebrow}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-950 md:text-4xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-500">{description}</p>
        </div>
        <div className="flex h-16 w-16 items-center justify-center rounded-[24px] bg-[linear-gradient(135deg,#064e3b,#34d399)] text-white shadow-[0_18px_45px_rgba(16,185,129,0.28)]">
          <Icon size={28} />
        </div>
      </div>
    </div>
  );
}

