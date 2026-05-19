"use client";

import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export function CashChart({ labels, masuk, keluar }: { labels: string[]; masuk: number[]; keluar: number[] }) {
  return (
    <div className="h-[360px] rounded-[28px] border border-white/70 bg-white/82 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.09)] backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-emerald-700">Grafik Keuangan</p>
          <h2 className="text-xl font-semibold text-stone-950">Pemasukan vs Pengeluaran</h2>
        </div>
        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">Realtime</span>
      </div>
      <Bar
        data={{
          labels,
          datasets: [
            { label: "Kas Masuk", data: masuk, backgroundColor: "#10b981", borderRadius: 14, borderSkipped: false },
            { label: "Kas Keluar", data: keluar, backgroundColor: "#fb7185", borderRadius: 14, borderSkipped: false },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 900, easing: "easeOutQuart" },
          scales: {
            x: { grid: { display: false }, border: { display: false } },
            y: { grid: { color: "rgba(120,113,108,0.13)" }, border: { display: false }, ticks: { padding: 10 } },
          },
          plugins: {
            legend: { position: "bottom", labels: { usePointStyle: true, boxWidth: 8, boxHeight: 8 } },
            tooltip: {
              backgroundColor: "rgba(20,24,22,0.92)",
              padding: 12,
              cornerRadius: 14,
              displayColors: false,
            },
          },
        }}
      />
    </div>
  );
}
