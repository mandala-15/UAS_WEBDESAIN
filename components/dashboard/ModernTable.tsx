import type { ReactNode } from "react";
import { Eye, MoreHorizontal, Pencil } from "lucide-react";

export function ModernTable({
  columns,
  rows,
  empty,
}: {
  columns: string[];
  rows: Array<Array<ReactNode>>;
  empty: string;
}) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/70 bg-white/82 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      <div className="max-h-[560px] overflow-auto">
        <table className="w-full min-w-[720px] border-separate border-spacing-0 text-sm">
          <thead className="sticky top-0 z-10 bg-white/90 backdrop-blur-xl">
            <tr>
              {columns.map((column) => (
                <th key={column} className="border-b border-stone-100 px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                  {column}
                </th>
              ))}
              <th className="border-b border-stone-100 px-5 py-4 text-right text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="group odd:bg-stone-50/60 hover:bg-emerald-50/70">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="border-b border-stone-100 px-5 py-4 text-stone-700">
                    {cell}
                  </td>
                ))}
                <td className="border-b border-stone-100 px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button className="rounded-xl bg-white p-2 text-stone-500 shadow-sm hover:text-emerald-700" title="Lihat">
                      <Eye size={16} />
                    </button>
                    <button className="rounded-xl bg-white p-2 text-stone-500 shadow-sm hover:text-amber-700" title="Edit">
                      <Pencil size={16} />
                    </button>
                    <button className="rounded-xl bg-white p-2 text-stone-500 shadow-sm hover:text-stone-900" title="Menu">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td className="px-5 py-10 text-center text-stone-500" colSpan={columns.length + 1}>
                  {empty}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-stone-100 px-5 py-4 text-sm text-stone-500">
        <span>Menampilkan {rows.length} data</span>
        <div className="flex gap-2">
          <button className="rounded-xl border border-stone-200 px-3 py-2 hover:bg-stone-50">Prev</button>
          <button className="rounded-xl bg-stone-950 px-3 py-2 text-white">1</button>
          <button className="rounded-xl border border-stone-200 px-3 py-2 hover:bg-stone-50">Next</button>
        </div>
      </div>
    </div>
  );
}
