import { MobileNav, Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_18%_8%,rgba(16,185,129,0.16),transparent_28%),radial-gradient(circle_at_82%_4%,rgba(245,158,11,0.12),transparent_24%),linear-gradient(180deg,#f7faf7_0%,#eef4f0_100%)]">
      <Sidebar />
      <main className="px-4 pb-28 pt-5 md:ml-72 md:px-8 md:py-8">
        {children}
      </main>
      <MobileNav />
    </div>
  );
}
