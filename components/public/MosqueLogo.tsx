import { Landmark } from "lucide-react";

type MosqueLogoProps = {
  compact?: boolean;
};

export function MosqueLogo({ compact = false }: MosqueLogoProps) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[#D4AF37]/40 bg-[#064E3B] text-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.18)]">
        <span className="absolute inset-x-3 top-2 h-3 rounded-t-full border border-[#D4AF37]/55" />
        <Landmark size={24} className="relative z-10" />
        <span className="absolute bottom-2 text-[9px] font-semibold leading-none text-[#D4AF37]/80">Allah</span>
      </span>
      {!compact ? (
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold uppercase tracking-[0.08em] leading-5">Masjid Mitfhaul Jannah</span>
          <span className="block truncate text-sm text-emerald-50/72">Pekanbaru</span>
        </span>
      ) : null}
    </div>
  );
}
