import { LandingPage } from "@/components/LandingPage";
import { PageLoader } from "@/components/PageLoader";
import { SiteAnimations } from "@/components/SiteAnimations";
import { getLatestPosts } from "@/lib/blog";
import { getActiveTestimonials } from "@/lib/testimonials";
import { getSiteSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [latestPosts, testimonials, settings] = await Promise.all([
    getLatestPosts(3),
    getActiveTestimonials(),
    getSiteSettings(),
  ]);

  return (
    <>
      <PageLoader />
      <SiteAnimations />
      <LandingPage
        latestPosts={latestPosts}
        testimonials={testimonials}
        settings={settings}
      />
    </>
  );
}
