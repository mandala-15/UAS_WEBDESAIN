"use client";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type PublicCashChartProps = {
  labels: string[];
  masuk: number[];
  keluar: number[];
};

export function PublicCashChart({ labels, masuk, keluar }: PublicCashChartProps) {
  return (
    <Bar
      data={{
        labels,
        datasets: [
          {
            label: "Kas Masuk",
            data: masuk,
            backgroundColor: "rgba(4,120,87,0.86)",
            borderRadius: 12,
            borderSkipped: false,
          },
          {
            label: "Kas Keluar",
            data: keluar,
            backgroundColor: "rgba(234,179,8,0.82)",
            borderRadius: 12,
            borderSkipped: false,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              boxWidth: 10,
              boxHeight: 10,
              usePointStyle: true,
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => ` ${context.dataset.label}: Rp ${Number(context.raw).toLocaleString("id-ID")}`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "#64748b" },
          },
          y: {
            border: { display: false },
            grid: { color: "rgba(100,116,139,0.12)" },
            ticks: {
              color: "#64748b",
              callback: (value) => `${Number(value) / 1_000_000} jt`,
            },
          },
        },
      }}
    />
  );
}
