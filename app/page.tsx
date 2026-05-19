import { ActivityList } from "@/components/public/ActivityList";
import { AboutSection } from "@/components/public/AboutSection";
import { FeatureSection } from "@/components/public/FeatureSection";
import { GalleryGrid } from "@/components/public/GalleryGrid";
import { Hero } from "@/components/public/Hero";
import { PortalNavbar } from "@/components/public/PortalNavbar";
import { PrayerSchedule } from "@/components/public/PrayerSchedule";
import { PublicStats } from "@/components/public/PublicStats";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8fafc] text-slate-950">
      <PortalNavbar />
      <Hero />
      <FeatureSection />
      <section className="relative z-10 mx-auto grid max-w-7xl items-start gap-8 px-4 py-10 lg:grid-cols-[1fr_1fr]">
        <div className="h-fit">
          <ActivityList />
        </div>
        <div className="h-fit">
          <PrayerSchedule />
        </div>
      </section>
      <PublicStats />
      <GalleryGrid />
      <AboutSection />
    </main>
  );
}
