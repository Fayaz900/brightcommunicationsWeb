import { LandingPage } from "@/components/LandingPage";
import { PageLoader } from "@/components/PageLoader";
import { SiteAnimations } from "@/components/SiteAnimations";

export default function Home() {
  return (
    <>
      <PageLoader />
      <SiteAnimations />
      <LandingPage />
    </>
  );
}
