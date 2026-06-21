import { ActivityList } from "@/components/public/ActivityList";
import { AboutSection } from "@/components/public/AboutSection";
import { DonationSection } from "@/components/public/DonationSection";
import { FeatureSection } from "@/components/public/FeatureSection";
import { FloatingNotifications } from "@/components/public/FloatingNotifications";
import { GalleryGrid } from "@/components/public/GalleryGrid";
import { Hero } from "@/components/public/Hero";
import { LocationSection } from "@/components/public/LocationSection";
import { MobileBottomNav } from "@/components/public/MobileBottomNav";
import { MosquePrograms } from "@/components/public/MosquePrograms";
import { PremiumFooter } from "@/components/public/PremiumFooter";
import { PortalNavbar } from "@/components/public/PortalNavbar";
import { PrayerSchedule } from "@/components/public/PrayerSchedule";
import { PublicStats } from "@/components/public/PublicStats";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8fafc] pb-24 text-slate-950 md:pb-0">
      <PortalNavbar />
      <Hero />
      <FeatureSection />
      <DonationSection />
      <section className="relative z-10 mx-auto grid max-w-7xl items-start gap-8 px-4 py-10 lg:grid-cols-[1fr_1fr]">
        <div className="h-fit">
          <ActivityList />
        </div>
        <div className="h-fit">
          <PrayerSchedule />
        </div>
      </section>
      <MosquePrograms />
      <PublicStats />
      <GalleryGrid />
      <LocationSection />
      <AboutSection />
      <PremiumFooter />
      <FloatingNotifications />
      <MobileBottomNav />
    </main>
  );
}
