import Link from "next/link";
import { MapPin, MessageCircle, Phone, Send, Video } from "lucide-react";
import { MosqueLogo } from "./MosqueLogo";

const menus = [
  { label: "Beranda", href: "/#beranda" },
  { label: "Jadwal", href: "/#jadwal" },
  { label: "Kegiatan", href: "/#kegiatan" },
  { label: "Donasi", href: "/#donasi" },
  { label: "Laporan", href: "/#laporan" },
];

export function PremiumFooter() {
  return (
    <footer className="bg-[#052e2b] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-[1.2fr_0.7fr_1fr]">
        <div>
          <div className="text-white">
            <MosqueLogo />
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-emerald-50/72">
            Portal informasi digital jamaah untuk jadwal ibadah, donasi, agenda kegiatan, galeri, dan laporan keuangan yang transparan.
          </p>
        </div>

        <div>
          <p className="font-semibold text-yellow-200">Menu</p>
          <div className="mt-4 grid gap-3">
            {menus.map((menu) => (
              <Link key={menu.label} href={menu.href} className="text-sm text-emerald-50/72 hover:text-white">
                {menu.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="font-semibold text-yellow-200">Kontak</p>
          <div className="mt-4 grid gap-3 text-sm text-emerald-50/72">
            <p className="flex items-center gap-2"><MapPin size={16} /> Jalan Budi Daya Gang Bayu</p>
            <p className="flex items-center gap-2"><Phone size={16} /> +62 812-3456-7890</p>
          </div>
          <div className="mt-5 flex gap-2">
            {[Send, MessageCircle, Video].map((Icon, index) => (
              <a key={index} href="#" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/16" aria-label="Media sosial">
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-emerald-50/58">
        2026 Masjid Mitfhaul Jannah. Semua informasi dikelola untuk jamaah.
      </div>
    </footer>
  );
}
