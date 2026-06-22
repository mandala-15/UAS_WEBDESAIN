import { Landmark } from "lucide-react";

type MosqueLogoProps = {
  compact?: boolean;
};

export function MosqueLogo({ compact = false }: MosqueLogoProps) {
  return (
    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
      <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-[#D4AF37]/40 bg-[#064E3B] text-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.18)] sm:h-12 sm:w-12">
        <span className="absolute inset-x-3 top-2 h-3 rounded-t-full border border-[#D4AF37]/55" />
        <Landmark size={22} className="relative z-10 sm:size-6" />
        <span className="absolute bottom-2 text-[8px] font-semibold leading-none text-[#D4AF37]/80 sm:text-[9px]">Allah</span>
      </span>
      {!compact ? (
        <span className="min-w-0">
          <span className="block max-w-[180px] truncate text-xs font-semibold uppercase leading-5 tracking-[0.08em] sm:max-w-none sm:text-sm">Masjid Mitfhaul Jannah</span>
          <span className="block truncate text-xs text-emerald-50/72 sm:text-sm">Pekanbaru</span>
        </span>
      ) : null}
    </div>
  );
}
