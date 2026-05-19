"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Landmark, Menu, Search, X } from "lucide-react";

const links = [
  { label: "Beranda", href: "/" },
  { label: "Fitur", href: "/#fitur" },
  { label: "Jadwal", href: "/#jadwal" },
  { label: "Kegiatan", href: "/#kegiatan" },
  { label: "Laporan", href: "/#laporan" },
  { label: "Galeri", href: "/#galeri" },
  { label: "Tentang", href: "/#tentang" },
];

export function PortalNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-white/12 bg-[#052e2b]/82 shadow-[0_14px_45px_rgba(2,44,34,0.18)] backdrop-blur-2xl"
          : "border-white/10 bg-[#052e2b]/38 backdrop-blur-xl"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex min-w-0 items-center gap-3 text-white">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-yellow-300/35 bg-white/10 text-yellow-300 shadow-[0_0_28px_rgba(234,179,8,0.14)]">
            <Landmark size={22} />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-lg font-semibold leading-5">Portal Masjid</span>
            <span className="block truncate text-sm text-emerald-50/72">Pekanbaru</span>
          </span>
        </Link>

        <div className="hidden items-center rounded-full border border-white/10 bg-white/[0.06] p-1 lg:flex">
          {links.map((link, index) => (
            <Link
              key={link.label}
              href={link.href}
              className={`group relative rounded-full px-4 py-2 text-sm font-medium text-white/74 transition hover:text-white ${
                index === 0 ? "bg-white/14 text-white shadow-[0_0_24px_rgba(255,255,255,0.10)]" : ""
              }`}
            >
              {link.label}
              <span className="absolute inset-x-4 -bottom-1 h-px scale-x-0 bg-yellow-300/80 transition group-hover:scale-x-100" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 text-white">
          <button className="hidden h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.06] hover:bg-white/12 md:grid" aria-label="Cari">
            <Search size={18} />
          </button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.08] lg:hidden"
            aria-label={open ? "Tutup menu" : "Buka menu"}
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-white/10 bg-[#052e2b]/96 px-4 py-4 backdrop-blur-2xl lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-semibold text-white/82 hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
