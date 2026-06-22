"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  HeartHandshake,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { formatRupiah } from "@/lib/utils";

const donationPrograms = [
  {
    name: "Renovasi Masjid",
    target: 20_000_000,
    collected: 15_500_000,
    donors: 186,
    image: "https://images.unsplash.com/photo-1574246604907-db69e30ddb97?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Operasional Masjid",
    target: 12_000_000,
    collected: 7_850_000,
    donors: 124,
    image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Santunan Anak Yatim",
    target: 15_000_000,
    collected: 10_750_000,
    donors: 143,
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80",
  },
];

const purposes = ["Renovasi Masjid", "Operasional Masjid", "Santunan Anak Yatim", "Pendidikan Al-Quran", "Jumat Berkah", "Wakaf Masjid"];
const donationAccount = "081262249354";
const donationAccountName = "Farid Ahmad Alsa";
const qrisImage = "/dana-qris-farid-ahmad-alsa-qr.jpeg";

const recentDonations = [
  { name: "Ahmad Fauzi", amount: 100_000, program: "Renovasi Masjid", date: "21 Juni 2026" },
  { name: "Nur Aisyah", amount: 250_000, program: "Santunan Anak Yatim", date: "21 Juni 2026" },
  { name: "Hamba Allah", amount: 500_000, program: "Wakaf Masjid", date: "20 Juni 2026" },
  { name: "Rizki Pratama", amount: 150_000, program: "Jumat Berkah", date: "20 Juni 2026" },
];

export function DonationSection() {
  const [open, setOpen] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState("Renovasi Masjid");
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  const totals = useMemo(() => {
    const collected = donationPrograms.reduce((sum, item) => sum + item.collected, 0);
    const donors = donationPrograms.reduce((sum, item) => sum + item.donors, 0);
    return { collected, donors };
  }, []);

  const submitDonation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitStatus("Mengirim donasi...");

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/donations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        purpose: selectedPurpose,
        donorName: formData.get("donorName"),
        amount: formData.get("amount"),
        whatsapp: formData.get("whatsapp"),
        message: formData.get("message"),
        paymentMethod: "qris",
      }),
    });

    if (!response.ok) {
      setSubmitStatus("Donasi belum terkirim. Periksa data lalu coba lagi.");
      return;
    }

    event.currentTarget.reset();
    setSubmitStatus("Donasi berhasil dicatat. Pengurus akan memverifikasi pembayaran.");
    window.setTimeout(() => setOpen(false), 1200);
  };

  return (
    <section id="donasi" className="scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-700">Fitur Donasi</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950 md:text-4xl">Berpartisipasi Dalam Kebaikan</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
              Dukung program Masjid Mitfhaul Jannah dengan alur donasi digital yang jelas, modern, dan mudah dipantau.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex w-fit items-center justify-center gap-2 rounded-2xl bg-[#064E3B] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(6,78,59,0.22)] hover:bg-emerald-700"
          >
            <HeartHandshake size={18} /> Donasi Sekarang
          </button>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {donationPrograms.map((program) => {
            const progress = Math.round((program.collected / program.target) * 100);
            return (
              <motion.article
                key={program.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.08)]"
              >
                <div className="h-52 bg-cover bg-center" style={{ backgroundImage: `url("${program.image}")` }} />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-950">{program.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">{program.donors} donatur</p>
                    </div>
                    <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-700">{progress}%</span>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-emerald-50 p-3">
                      <p className="text-xs text-emerald-700">Terkumpul</p>
                      <p className="mt-1 text-sm font-semibold text-slate-950">{formatRupiah(program.collected)}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">Target</p>
                      <p className="mt-1 text-sm font-semibold text-slate-950">{formatRupiah(program.target)}</p>
                    </div>
                  </div>
                  <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-[#D4AF37]" style={{ width: `${progress}%` }} />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPurpose(program.name);
                      setOpen(true);
                    }}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-[#064E3B]"
                  >
                    Donasi Sekarang <ArrowRight size={17} />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
          <div className="rounded-[28px] bg-[#064E3B] p-5 text-white shadow-[0_24px_70px_rgba(6,78,59,0.20)]">
            <p className="text-sm font-semibold text-yellow-200">Statistik Donasi</p>
            <p className="mt-5 text-sm text-emerald-50/72">Total dana terkumpul</p>
            <p className="mt-1 break-words text-2xl font-semibold sm:text-3xl">{formatRupiah(totals.collected)}</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-xs text-emerald-50/70">Total donatur</p>
                <p className="mt-1 text-2xl font-semibold">{totals.donors}</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-xs text-emerald-50/70">Program aktif</p>
                <p className="mt-1 text-2xl font-semibold">7</p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200/70 bg-white p-5 shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-emerald-700">Donasi Jamaah Terbaru</p>
                <h3 className="mt-1 text-2xl font-semibold text-slate-950">Riwayat transparan</h3>
              </div>
              <Banknote className="text-[#D4AF37]" size={30} />
            </div>
            <div className="mt-5 grid gap-3">
              {recentDonations.map((item) => (
                <div key={`${item.name}-${item.program}`} className="grid gap-3 rounded-2xl bg-slate-50 p-4 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    <p className="font-semibold text-slate-950">{item.name}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.program} / {item.date}</p>
                  </div>
                  <p className="text-sm font-semibold text-emerald-700">{formatRupiah(item.amount)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[80] overflow-y-auto bg-slate-950/68 px-3 py-4 backdrop-blur-sm sm:px-4 sm:py-6">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-[24px] bg-white shadow-[0_30px_90px_rgba(0,0,0,0.32)] sm:rounded-[30px]">
            <div className="flex items-center justify-between gap-4 bg-[#064E3B] px-4 py-4 text-white sm:px-5">
              <div className="min-w-0">
                <p className="text-sm text-emerald-50/76">Form Donasi Digital</p>
                <h3 className="text-lg font-semibold sm:text-xl">Pilih tujuan donasi</h3>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 hover:bg-white/18" aria-label="Tutup donasi">
                <X size={19} />
              </button>
            </div>

            <form onSubmit={submitDonation} className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(300px,330px)]">
              <div className="min-w-0 p-4 sm:p-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  {purposes.map((purpose) => (
                    <button
                      key={purpose}
                      type="button"
                      onClick={() => setSelectedPurpose(purpose)}
                      className={`flex min-w-0 items-center gap-3 rounded-2xl border p-3 text-left text-sm font-semibold transition ${
                        selectedPurpose === purpose ? "border-emerald-600 bg-emerald-50 text-emerald-900" : "border-slate-200 bg-white text-slate-700 hover:border-emerald-200"
                      }`}
                    >
                      <span className={`grid h-5 w-5 place-items-center rounded-md border ${selectedPurpose === purpose ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-300"}`}>
                        {selectedPurpose === purpose ? <CheckCircle2 size={14} /> : null}
                      </span>
                      <span className="min-w-0 break-words">{purpose}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Nama Donatur
                    <input name="donorName" required className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm font-medium" placeholder="Nama lengkap" />
                  </label>
                  <label className="text-sm font-semibold text-slate-700">
                    Nominal Donasi
                    <input name="amount" required type="number" min={1000} className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm font-medium" placeholder="100000" />
                  </label>
                  <label className="text-sm font-semibold text-slate-700">
                    Nomor WhatsApp
                    <input name="whatsapp" required className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm font-medium" placeholder="08xxxxxxxxxx" />
                  </label>
                  <label className="text-sm font-semibold text-slate-700 sm:col-span-2">
                    Pesan/Amanah
                    <textarea name="message" className="mt-2 min-h-24 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium" placeholder="Tulis amanah donasi" />
                  </label>
                </div>
              </div>

              <aside className="min-w-0 bg-slate-50 p-4 sm:p-5">
                <p className="text-sm font-semibold text-slate-950">Metode Pembayaran</p>
                <div className="mt-3 rounded-2xl border border-emerald-200 bg-white p-4 text-center shadow-sm">
                  <div className="mx-auto w-full max-w-60 overflow-hidden rounded-2xl border border-emerald-100 bg-white p-2 shadow-inner">
                    <Image
                      src={qrisImage}
                      alt={`QRIS DANA donasi atas nama ${donationAccountName}`}
                      width={465}
                      height={465}
                      priority
                      className="h-auto w-full"
                    />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-slate-950">QRIS / DANA</p>
                  <p className="mt-1 text-xs text-slate-500">Atas nama</p>
                  <p className="mt-1 break-words text-base font-semibold text-emerald-700">{donationAccountName}</p>
                  <p className="mt-3 text-xs text-slate-500">Nomor DANA</p>
                  <p className="mt-1 text-lg font-semibold tracking-wide text-emerald-700">{donationAccount}</p>
                  <p className="mt-3 text-xs leading-5 text-slate-500">
                    Scan QR ini melalui DANA atau e-wallet yang mendukung QRIS untuk pembayaran donasi.
                  </p>
                </div>
                <div className="mt-5 rounded-2xl bg-white p-4">
                  <p className="text-xs text-slate-500">Tujuan dipilih</p>
                  <p className="mt-1 font-semibold text-slate-950">{selectedPurpose}</p>
                  <p className="mt-4 text-xs text-slate-500">Status</p>
                  <p className="mt-1 text-sm font-semibold text-emerald-700">Siap diproses pengurus</p>
                </div>
                <button type="submit" className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-yellow-400">
                  Lanjutkan Donasi
                </button>
                {submitStatus ? <p className="mt-3 text-sm font-semibold text-emerald-700">{submitStatus}</p> : null}
              </aside>
            </form>
          </div>
        </div>
      ) : null}
    </section>
  );
}
