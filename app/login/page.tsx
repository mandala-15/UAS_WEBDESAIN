"use client";

import { useRouter } from "next/navigation";
import type { FormEvent, MouseEvent } from "react";
import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

const particles = Array.from({ length: 28 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 53) % 100}%`,
  delay: `${(index % 9) * 0.6}s`,
  size: `${3 + (index % 4)}px`,
}));

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x: x * 18, y: y * 18 });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(event.currentTarget);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data.message ?? "Login gagal.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main
      onMouseMove={handleMouseMove}
      className="relative grid min-h-screen overflow-hidden bg-[#071A14] px-4 py-10 text-white"
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,26,20,0.95),rgba(15,61,46,0.82),rgba(15,23,42,0.46))]" />
      <div className="absolute inset-0 portal-pattern opacity-25" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-emerald-400/20 blur-[90px]" />
        <div className="absolute -right-28 bottom-20 h-96 w-96 rounded-full bg-teal-300/12 blur-[110px]" />
        <div className="absolute left-1/2 top-1/4 h-56 w-56 -translate-x-1/2 rounded-full bg-white/8 blur-[100px]" />
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-75">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="absolute rounded-full bg-emerald-200/70 shadow-[0_0_18px_rgba(16,185,129,0.55)]"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              animation: `login-float ${6 + (particle.id % 5)}s ease-in-out ${particle.delay} infinite`,
            }}
          />
        ))}
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[48vh] transition-transform duration-300 ease-out"
        style={{ transform: `translate3d(${parallax.x * -0.4}px, ${parallax.y * -0.2}px, 0)` }}
      >
        <div className="absolute bottom-0 left-1/2 h-56 w-[720px] -translate-x-1/2 rounded-t-[120px] bg-emerald-950/45 shadow-[0_-40px_120px_rgba(16,185,129,0.16)]" />
        <div className="absolute bottom-28 left-1/2 h-52 w-52 -translate-x-1/2 rounded-t-full bg-emerald-900/55" />
        <div className="absolute bottom-40 left-[calc(50%-250px)] h-40 w-28 rounded-t-full bg-emerald-950/55" />
        <div className="absolute bottom-40 right-[calc(50%-250px)] h-40 w-28 rounded-t-full bg-emerald-950/55" />
        <div className="absolute bottom-48 left-[calc(50%-355px)] h-48 w-16 rounded-t-full bg-emerald-950/60" />
        <div className="absolute bottom-48 right-[calc(50%-355px)] h-48 w-16 rounded-t-full bg-emerald-950/60" />
        <div className="absolute bottom-[430px] left-[calc(50%-331px)] h-8 w-8 rounded-full bg-emerald-300/25 blur-sm" />
        <div className="absolute bottom-[430px] right-[calc(50%-331px)] h-8 w-8 rounded-full bg-emerald-300/25 blur-sm" />
      </div>

      <section className="relative z-10 grid place-items-center">
        <form
          onSubmit={submit}
          suppressHydrationWarning
          className="login-card-in w-full max-w-md rounded-[24px] border border-white/18 bg-white/[0.12] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.34)] backdrop-blur-2xl md:p-8"
        >
          <div className="mb-8 flex items-center gap-4">
            <span className="grid h-[52px] w-[52px] place-items-center rounded-[18px] bg-emerald-500/18 text-emerald-200 shadow-[0_0_35px_rgba(16,185,129,0.24)] ring-1 ring-emerald-300/20">
              <LockKeyhole size={24} />
            </span>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-white">Login Admin</h1>
              <p className="mt-1 text-sm text-emerald-50/68">Session akan reset otomatis jam 00.00</p>
            </div>
          </div>

          {error ? (
            <p className="mb-5 rounded-2xl border border-rose-300/20 bg-rose-400/12 px-4 py-3 text-sm text-rose-100">
              {error}
            </p>
          ) : null}

          <div className="space-y-5">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-50/70">Email</span>
              <span className="mt-2 flex h-[54px] items-center gap-3 rounded-[14px] border border-white/10 bg-slate-100/10 px-4 shadow-inner focus-within:border-emerald-300/55 focus-within:ring-4 focus-within:ring-emerald-400/12">
                <Mail size={18} className="text-emerald-200/80" />
                <input
                  name="email"
                  type="email"
                  required
                  suppressHydrationWarning
                  placeholder="admin@mesjid.test"
                  className="h-full flex-1 bg-transparent text-sm text-white placeholder:text-white/35"
                />
              </span>
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-50/70">Password</span>
              <span className="mt-2 flex h-[54px] items-center gap-3 rounded-[14px] border border-white/10 bg-slate-100/10 px-4 shadow-inner focus-within:border-emerald-300/55 focus-within:ring-4 focus-within:ring-emerald-400/12">
                <ShieldCheck size={18} className="text-emerald-200/80" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  suppressHydrationWarning
                  placeholder="Masukkan password"
                  className="h-full flex-1 bg-transparent text-sm text-white placeholder:text-white/35"
                />
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setShowPassword((value) => !value)}
                  className="rounded-xl p-2 text-emerald-100/70 hover:bg-white/10 hover:text-white"
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </span>
            </label>
          </div>

          <Button
            disabled={loading}
            className="mt-7 w-full rounded-[16px] bg-[linear-gradient(135deg,#10B981,#047857)] shadow-[0_18px_45px_rgba(16,185,129,0.28)] hover:scale-[1.01] hover:shadow-[0_22px_60px_rgba(16,185,129,0.38)]"
          >
            {loading ? "Memproses..." : "Masuk"}
          </Button>

          <p className="mt-6 text-center text-xs text-emerald-50/50">
            Sistem Manajemen Kas Masjid
          </p>
        </form>
      </section>
    </main>
  );
}

