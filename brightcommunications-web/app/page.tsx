import { LandingPage } from "@/components/LandingPage";
import { PageLoader } from "@/components/PageLoader";
import { SiteAnimations } from "@/components/SiteAnimations";
import { getLatestPosts } from "@/lib/blog";
import { getSiteSettings } from "@/lib/site-settings";
import { getActiveServiceProjects } from "@/lib/service-projects";
import { getActiveTestimonials } from "@/lib/testimonials";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [latestPosts, testimonials, settings, serviceProjects] = await Promise.all([
    getLatestPosts(3),
    getActiveTestimonials(),
    getSiteSettings(),
    getActiveServiceProjects(),
  ]);

  return (
    <>
      <PageLoader />
      <SiteAnimations />
      <LandingPage
        latestPosts={latestPosts}
        testimonials={testimonials}
        settings={settings}
        serviceProjects={serviceProjects}
      />
    </>
  );
}