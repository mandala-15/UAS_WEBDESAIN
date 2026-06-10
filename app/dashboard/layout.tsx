import { MobileNav, Sidebar } from "@/components/dashboard/Sidebar";
import { db, hasDatabaseUrl } from "@/db";
import { users } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login");

  let profile = {
    name: session.name ?? "Admin Mesjid",
    email: session.email,
  };

  if (hasDatabaseUrl) {
    try {
      const [user] = await db
        .select({
          name: users.name,
          email: users.email,
        })
        .from(users)
        .where(eq(users.id, session.sub))
        .limit(1);

      if (user) {
        profile = user;
      }
    } catch (error) {
      console.error("Failed to load dashboard profile", error);
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_18%_8%,rgba(16,185,129,0.16),transparent_28%),radial-gradient(circle_at_82%_4%,rgba(245,158,11,0.12),transparent_24%),linear-gradient(180deg,#f7faf7_0%,#eef4f0_100%)]">
      <Sidebar profile={profile} />
      <main className="px-4 pb-28 pt-5 md:ml-72 md:px-8 md:py-8">
        {children}
      </main>
      <MobileNav profile={profile} />
    </div>
  );
}
