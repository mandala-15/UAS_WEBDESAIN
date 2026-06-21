"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bell, Menu, Search, X } from "lucide-react";
import { MosqueLogo } from "./MosqueLogo";

const links = [
  { label: "Beranda", href: "/#beranda" },
  { label: "Jadwal Sholat", href: "/#jadwal" },
  { label: "Kegiatan", href: "/#kegiatan" },
  { label: "Donasi", href: "/#donasi" },
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
        <Link href="/#beranda" className="min-w-0 text-white">
          <MosqueLogo />
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
          <button className="hidden h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.06] hover:bg-white/12 md:grid" aria-label="Notifikasi">
            <Bell size={18} />
          </button>
          <Link href="/#donasi" className="hidden rounded-full bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-yellow-300 md:inline-flex">
            Donasi
          </Link>
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
