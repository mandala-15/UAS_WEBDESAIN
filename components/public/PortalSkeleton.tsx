import { Landmark } from "lucide-react";
import { MosqueLogo } from "./MosqueLogo";

function SkeletonLine({ className = "" }: { className?: string }) {
  return <div className={`portal-skeleton-shimmer rounded-full bg-white/12 ${className}`} />;
}

function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[24px] border border-white/14 bg-white/[0.08] p-4 shadow-[0_18px_55px_rgba(0,0,0,0.16)] backdrop-blur-xl ${className}`}>
      <SkeletonLine className="h-32 rounded-2xl bg-white/10" />
      <SkeletonLine className="mt-4 h-4 w-3/4" />
      <SkeletonLine className="mt-3 h-3 w-full" />
      <SkeletonLine className="mt-2 h-3 w-2/3" />
    </div>
  );
}

export function PortalSkeleton() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#052e2b] text-white">
      <div className="absolute inset-0 portal-pattern opacity-20" />
      <div className="absolute inset-0 portal-glow-field opacity-80" />
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6">
        <header className="flex h-16 items-center justify-between">
          <div className="portal-logo-pulse">
            <MosqueLogo />
          </div>
          <div className="hidden gap-2 md:flex">
            <SkeletonLine className="h-9 w-20" />
            <SkeletonLine className="h-9 w-20" />
            <SkeletonLine className="h-9 w-24 bg-yellow-300/24" />
          </div>
        </header>

        <section className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-300/24 bg-white/10 px-4 py-2 text-sm font-semibold text-yellow-100 backdrop-blur-xl">
              <Landmark size={16} className="text-yellow-300" />
              Memuat Portal Jamaah Digital
            </div>
            <SkeletonLine className="mt-7 h-12 w-full max-w-3xl bg-white/18 md:h-16" />
            <SkeletonLine className="mt-4 h-12 w-10/12 max-w-2xl bg-white/18 md:h-16" />
            <SkeletonLine className="mt-7 h-4 w-full max-w-xl" />
            <SkeletonLine className="mt-3 h-4 w-9/12 max-w-lg" />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <SkeletonLine className="h-12 w-full bg-emerald-400/28 sm:w-44" />
              <SkeletonLine className="h-12 w-full bg-yellow-300/28 sm:w-40" />
              <SkeletonLine className="h-12 w-full sm:w-44" />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-[30px] border border-white/18 bg-white/[0.10] p-5 shadow-[0_34px_90px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <SkeletonLine className="h-4 w-32" />
                  <SkeletonLine className="mt-3 h-9 w-44 bg-white/18" />
                </div>
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-yellow-300/18 text-yellow-200">
                  <Landmark size={24} />
                </span>
              </div>
              <SkeletonLine className="mt-7 h-3 w-full bg-emerald-300/24" />
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <SkeletonLine className="h-24 rounded-2xl" />
                <SkeletonLine className="h-24 rounded-2xl" />
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 pb-10 sm:grid-cols-2 lg:grid-cols-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </section>
      </div>
    </main>
  );
}
