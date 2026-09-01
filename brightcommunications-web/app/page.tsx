import { LandingPage } from "@/components/LandingPage";
import { PageLoader } from "@/components/PageLoader";
import { SiteAnimations } from "@/components/SiteAnimations";
import { getLatestPosts } from "@/lib/blog";
import { getActiveTestimonials } from "@/lib/testimonials";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [latestPosts, testimonials] = await Promise.all([
    getLatestPosts(3),
    getActiveTestimonials(),
  ]);

  return (
    <>
      <PageLoader />
      <SiteAnimations />
      <LandingPage latestPosts={latestPosts} testimonials={testimonials} />
    </>
  );
}
