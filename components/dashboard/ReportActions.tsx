"use client";

import { useMemo, useState } from "react";
import { Download, Filter } from "lucide-react";

type ReportRow = {
  tipe: "Pemasukan" | "Pengeluaran";
  tanggal: string;
  kategori: string;
  keterangan: string;
  jumlah: string;
};

export function ReportActions({ rows }: { rows: ReportRow[] }) {
  const [period, setPeriod] = useState("Bulan ini");
  const [message, setMessage] = useState("");

  const csv = useMemo(() => {
    const header = ["Tipe", "Tanggal", "Kategori", "Keterangan", "Jumlah"];
    const body = rows.map((row) => [row.tipe, row.tanggal, row.kategori, row.keterangan, row.jumlah]);
    return [header, ...body]
      .map((line) => line.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
      .join("\n");
  }, [rows]);

  function exportCsv() {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `laporan-kas-${period.toLowerCase().replaceAll(" ", "-")}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    setMessage(`Laporan ${period.toLowerCase()} berhasil diexport.`);
  }

  return (
    <div className="rounded-[26px] border border-white/70 bg-white/80 p-4 shadow-[0_18px_55px_rgba(15,23,42,0.07)] backdrop-blur-xl">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-3">
          {["Bulan ini", "Triwulan", "Tahunan"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setPeriod(item);
                setMessage(`Filter aktif: ${item}.`);
              }}
              className={`inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium shadow-sm ${period === item ? "bg-stone-950 text-white" : "bg-white text-stone-600 hover:bg-stone-100"}`}
            >
              {item === "Bulan ini" ? <Filter size={16} /> : null}
              {item}
            </button>
          ))}
        </div>
        <button type="button" onClick={exportCsv} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-stone-950 px-4 py-3 text-sm font-semibold text-white hover:bg-stone-800">
          <Download size={16} /> Export
        </button>
      </div>
      {message ? <p className="mt-3 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{message}</p> : null}
    </div>
  );
}
