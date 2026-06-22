"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { formatRupiah } from "@/lib/utils";

type CashRow = {
  id: string;
  tanggal: string;
  keterangan: string;
  jumlah: string;
  sumber?: string;
  kategori?: string;
};

export function CashTable({
  type,
  rows,
  empty,
}: {
  type: "masuk" | "keluar";
  rows: CashRow[];
  empty: string;
}) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [busyId, setBusyId] = useState("");
  const [detailId, setDetailId] = useState("");
  const endpoint = type === "masuk" ? "/api/kas-masuk" : "/api/kas-keluar";
  const label = type === "masuk" ? "Sumber" : "Kategori";
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  async function editRow(row: CashRow) {
    const nameValue = window.prompt(label, type === "masuk" ? row.sumber : row.kategori);
    if (nameValue === null) return;

    const jumlah = window.prompt("Jumlah", String(Number(row.jumlah)));
    if (jumlah === null) return;

    const keterangan = window.prompt("Keterangan", row.keterangan);
    if (keterangan === null) return;

    setBusyId(row.id);
    setMessage("");

    const payload =
      type === "masuk"
        ? { tanggal: row.tanggal, sumber: nameValue, jumlah, keterangan }
        : { tanggal: row.tanggal, kategori: nameValue, jumlah, keterangan };

    const res = await fetch(`${endpoint}/${row.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setBusyId("");
    const data = await res.json().catch(() => null);

    if (!res.ok) {
      setMessage(data?.message ?? "Data gagal diperbarui.");
      return;
    }

    setMessage("Data berhasil diperbarui.");
    router.refresh();
  }

  async function deleteRow(row: CashRow) {
    const confirmed = window.confirm(`Hapus data ${type === "masuk" ? row.sumber : row.kategori}?`);
    if (!confirmed) return;

    setBusyId(row.id);
    setMessage("");

    const res = await fetch(`${endpoint}/${row.id}`, { method: "DELETE" });
    setBusyId("");
    const data = await res.json().catch(() => null);

    if (!res.ok) {
      setMessage(data?.message ?? "Data gagal dihapus.");
      return;
    }

    setMessage(data?.message ?? "Data berhasil dihapus.");
    router.refresh();
  }

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/70 bg-white/82 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      {message ? <p className="m-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{message}</p> : null}
      <div className="grid gap-3 p-4 md:hidden">
        {rows.map((row) => {
          const primary = type === "masuk" ? row.sumber : row.kategori;
          const isPersisted = uuidPattern.test(row.id);
          const disabled = busyId === row.id || !isPersisted;

          return (
            <article key={row.id} className="rounded-2xl border border-stone-100 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-400">{row.tanggal}</p>
                  <h3 className="mt-1 break-words text-sm font-semibold text-stone-950">{primary}</h3>
                </div>
                <p className={`shrink-0 text-right text-sm font-semibold ${type === "masuk" ? "text-emerald-700" : "text-rose-700"}`}>
                  {formatRupiah(row.jumlah)}
                </p>
              </div>
              <p className="mt-3 text-sm leading-6 text-stone-600">
                {detailId === row.id ? row.keterangan : `${row.keterangan.slice(0, 96)}${row.keterangan.length > 96 ? "..." : ""}`}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" onClick={() => setDetailId((value) => (value === row.id ? "" : row.id))} className="inline-flex items-center gap-2 rounded-xl bg-stone-50 px-3 py-2 text-xs font-semibold text-stone-600 hover:text-emerald-700">
                  <Eye size={15} /> Detail
                </button>
                <button type="button" disabled={disabled} onClick={() => editRow(row)} className="inline-flex items-center gap-2 rounded-xl bg-stone-50 px-3 py-2 text-xs font-semibold text-stone-600 hover:text-amber-700 disabled:cursor-not-allowed disabled:opacity-40">
                  <Pencil size={15} /> Edit
                </button>
                <button type="button" disabled={disabled} onClick={() => deleteRow(row)} className="inline-flex items-center gap-2 rounded-xl bg-stone-50 px-3 py-2 text-xs font-semibold text-stone-600 hover:text-rose-700 disabled:cursor-not-allowed disabled:opacity-40">
                  <Trash2 size={15} /> Hapus
                </button>
              </div>
            </article>
          );
        })}
        {rows.length === 0 ? <p className="rounded-2xl bg-white px-4 py-10 text-center text-sm text-stone-500">{empty}</p> : null}
      </div>
      <div className="hidden max-h-[560px] overflow-auto md:block">
        <table className="w-full min-w-[760px] border-separate border-spacing-0 text-sm">
          <thead className="sticky top-0 z-10 bg-white/90 backdrop-blur-xl">
            <tr>
              {["Tanggal", label, "Keterangan", "Jumlah", "Aksi"].map((column) => (
                <th key={column} className="border-b border-stone-100 px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const primary = type === "masuk" ? row.sumber : row.kategori;
              const isPersisted = uuidPattern.test(row.id);
              const disabled = busyId === row.id || !isPersisted;

              return (
                <tr key={row.id} className="group odd:bg-stone-50/60 hover:bg-emerald-50/70">
                  <td className="border-b border-stone-100 px-5 py-4 text-stone-700">{row.tanggal}</td>
                  <td className="border-b border-stone-100 px-5 py-4 text-stone-700">{primary}</td>
                  <td className="border-b border-stone-100 px-5 py-4 text-stone-700">
                    {detailId === row.id ? row.keterangan : `${row.keterangan.slice(0, 72)}${row.keterangan.length > 72 ? "..." : ""}`}
                  </td>
                  <td className={`border-b border-stone-100 px-5 py-4 font-semibold ${type === "masuk" ? "text-emerald-700" : "text-rose-700"}`}>
                    {formatRupiah(row.jumlah)}
                  </td>
                  <td className="border-b border-stone-100 px-5 py-4">
                    <div className="flex gap-2">
                      <button type="button" onClick={() => setDetailId((value) => (value === row.id ? "" : row.id))} className="rounded-xl bg-white p-2 text-stone-500 shadow-sm hover:text-emerald-700" title="Lihat">
                        <Eye size={16} />
                      </button>
                      <button type="button" disabled={disabled} onClick={() => editRow(row)} className="rounded-xl bg-white p-2 text-stone-500 shadow-sm hover:text-amber-700 disabled:cursor-not-allowed disabled:opacity-40" title={!isPersisted ? "Data contoh tidak bisa diedit" : "Edit"}>
                        <Pencil size={16} />
                      </button>
                      <button type="button" disabled={disabled} onClick={() => deleteRow(row)} className="rounded-xl bg-white p-2 text-stone-500 shadow-sm hover:text-rose-700 disabled:cursor-not-allowed disabled:opacity-40" title={!isPersisted ? "Data contoh tidak bisa dihapus" : "Hapus"}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 ? (
              <tr>
                <td className="px-5 py-10 text-center text-stone-500" colSpan={5}>
                  {empty}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-1 border-t border-stone-100 px-5 py-4 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between">
        <span>Menampilkan {rows.length} data</span>
        <span>Data terbaru</span>
      </div>
    </div>
  );
}
