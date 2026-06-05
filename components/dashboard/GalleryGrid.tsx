"use client";

import { useMemo, useState } from "react";

type GalleryItem = {
  id: string;
  judul: string;
  gambarUrl: string;
  kategori: string;
};

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState("Semua");
  const filters = ["Semua", "Kajian", "Sosial", "TPA"];
  const filteredItems = useMemo(
    () => (filter === "Semua" ? items : items.filter((item) => item.kategori.toLowerCase().includes(filter.toLowerCase()))),
    [filter, items],
  );

  return (
    <section>
      <div className="mb-4 flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`rounded-full px-4 py-2 text-sm font-medium shadow-sm ${filter === item ? "bg-stone-950 text-white" : "bg-white/80 text-stone-700 hover:bg-stone-950 hover:text-white"}`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {filteredItems.map((item, index) => (
          <div key={item.id} className={`group relative overflow-hidden rounded-[26px] bg-stone-200 shadow-[0_18px_45px_rgba(15,23,42,0.08)] ${index % 3 === 1 ? "lg:mt-8" : ""}`}>
            <div
              className="aspect-[4/5] bg-cover bg-center transition duration-300 group-hover:scale-105"
              style={{ backgroundImage: `url("${item.gambarUrl}")` }}
            />
            <div className="absolute left-3 top-3 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-stone-700 backdrop-blur">
              {item.kategori}
            </div>
            <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-stone-950/70 p-3 text-white opacity-0 backdrop-blur-xl transition group-hover:opacity-100">
              <p className="text-sm font-semibold">{item.judul}</p>
              <p className="text-xs text-stone-300">Dokumentasi kegiatan</p>
            </div>
          </div>
        ))}
      </div>
      {filteredItems.length === 0 ? (
        <p className="rounded-2xl bg-white/80 p-5 text-sm text-stone-600">Tidak ada galeri untuk filter {filter}.</p>
      ) : null}
    </section>
  );
}
