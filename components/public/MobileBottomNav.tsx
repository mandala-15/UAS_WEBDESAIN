import Link from "next/link";
import { BarChart3, CalendarDays, HandHeart, Home, Images, Landmark } from "lucide-react";

const items = [
  { label: "Beranda", href: "/#beranda", icon: Home },
  { label: "Jadwal", href: "/#jadwal", icon: CalendarDays },
  { label: "Donasi", href: "/#donasi", icon: HandHeart },
  { label: "Laporan", href: "/#laporan", icon: BarChart3 },
  { label: "Galeri", href: "/#galeri", icon: Images },
];

export function MobileBottomNav() {
  return (
    <nav className="fixed inset-x-3 bottom-3 z-50 rounded-[24px] border border-white/60 bg-white/92 px-2 py-2 shadow-[0_18px_50px_rgba(15,23,42,0.16)] backdrop-blur-2xl md:hidden" aria-label="Navigasi mobile">
      <div className="grid grid-cols-5 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.label} href={item.href} className="flex min-w-0 flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-[11px] font-semibold text-slate-600 hover:bg-emerald-50 hover:text-emerald-800">
              <Icon size={18} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
      <span className="pointer-events-none absolute -top-4 left-1/2 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full bg-[#064E3B] text-[#D4AF37] shadow-lg">
        <Landmark size={15} />
      </span>
    </nav>
  );
}
