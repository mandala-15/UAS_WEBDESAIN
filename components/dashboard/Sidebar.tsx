import Link from "next/link";
import { BarChart3, CalendarDays, ChevronRight, Image, LayoutDashboard, PlusCircle, ReceiptText, ShieldCheck } from "lucide-react";
import { LogoutButtonNoSsr } from "./LogoutButtonNoSsr";

const menus = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Kas Masuk", href: "/dashboard/kas-masuk", icon: PlusCircle },
  { label: "Kas Keluar", href: "/dashboard/kas-keluar", icon: ReceiptText },
  { label: "Laporan", href: "/dashboard/laporan", icon: BarChart3 },
  { label: "Kegiatan", href: "/dashboard/kegiatan", icon: CalendarDays },
  { label: "Galeri", href: "/dashboard/galeri", icon: Image },
];

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 overflow-hidden bg-[linear-gradient(160deg,#08110f_0%,#10251f_52%,#1d3c34_100%)] p-5 text-white shadow-[18px_0_45px_rgba(15,23,42,0.16)] md:block">
      <div className="pointer-events-none absolute -left-20 top-12 h-52 w-52 rounded-full bg-emerald-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-24 h-60 w-60 rounded-full bg-amber-300/10 blur-3xl" />
      <Link href="/" className="relative block rounded-[22px] border border-white/10 bg-white/[0.07] px-4 py-4 backdrop-blur-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-200">Admin Panel</p>
        <h1 className="mt-1 text-xl font-semibold text-white">Kas Mesjid</h1>
      </Link>
      <div className="relative my-6 h-px bg-white/10" />
      <nav className="relative space-y-2">
        {menus.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-emerald-50/80 hover:bg-white/10 hover:text-white hover:shadow-[0_0_28px_rgba(52,211,153,0.18)]"
            >
              <span className="flex items-center gap-3">
                <span className="rounded-xl bg-white/8 p-2 text-emerald-100 group-hover:bg-emerald-300/20">
                  <Icon size={18} />
                </span>
                {item.label}
              </span>
              <ChevronRight size={16} className="opacity-0 group-hover:opacity-100" />
            </Link>
          );
        })}
      </nav>
      <div className="relative mt-7 rounded-[22px] border border-white/10 bg-white/[0.07] p-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <span className="rounded-2xl bg-emerald-300/20 p-3 text-emerald-100">
            <ShieldCheck size={20} />
          </span>
          <div>
            <p className="text-sm font-semibold text-white">Admin Mesjid</p>
            <p className="text-xs text-emerald-100/70">Secure session</p>
          </div>
        </div>
      </div>
      <LogoutButtonNoSsr />
    </aside>
  );
}

export function MobileNav() {
  return (
    <nav className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-5 rounded-[22px] border border-white/60 bg-white/85 shadow-[0_18px_50px_rgba(15,23,42,0.18)] backdrop-blur-xl md:hidden">
      {menus.slice(0, 5).map((item) => {
        const Icon = item.icon;
        return (
          <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1 px-2 py-3 text-[11px] font-medium text-stone-700">
            <Icon size={18} />
            <span className="truncate">{item.label.replace("Kas ", "")}</span>
          </Link>
        );
      })}
    </nav>
  );
}
