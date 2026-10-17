import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { HighlightWord } from "@/components/HighlightWord";
import { PortfolioFilterClient } from "@/components/PortfolioFilterClient";
import { getSiteSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies",
  description:
    "Explore case studies and creative portfolios by Bright Communications: brand identity, TV commercials, digital marketing, packaging design, and integrated campaigns across FMCG, Healthcare, and Retail.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Portfolio & Case Studies | Bright Communications",
    description:
      "Explore creative campaigns and brand case studies by Bright Communications across FMCG, Healthcare, Retail, and Digital Media.",
    url: "/portfolio",
    siteName: "Bright Communications",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio & Case Studies | Bright Communications",
    description:
      "Explore creative campaigns and brand case studies by Bright Communications across FMCG, Healthcare, Retail, and Digital Media.",
  },
};

export default async function PortfolioPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <SiteNav />

      <main>
        {/* Page Hero */}
        <section className="inner-hero">
          <div className="inner-hero__bg" aria-hidden="true" />
          <div className="container" style={{ position: "relative", zIndex: 2 }}>
            <nav className="inner-hero__breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Portfolio</span>
            </nav>
            <p className="section-eyebrow">Creative Showcase</p>
            <h1 className="heading-display heading-xl inner-hero__title">
              Work That Creates <HighlightWord>Measurable</HighlightWord> Impact
            </h1>
            <p className="inner-hero__desc">
              Every brand has a story. Every campaign has a purpose. Explore our selected showcase
              of brand identities, advertising films, packaging systems, and digital transformations.
            </p>
          </div>
        </section>

        {/* Portfolio Listing with Filter */}
        <section className="section" id="projects">
          <div className="container">
            <PortfolioFilterClient />
          </div>
        </section>

        {/* CTA Banner */}
        <section className="blog-cta-section">
          <div className="container" style={{ textAlign: "center", maxWidth: 720 }}>
            <p className="section-eyebrow" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
              Your Project Next
            </p>
            <h2
              className="heading-display"
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                color: "#fff",
                margin: "12px 0 20px",
              }}
            >
              Ready To Create Your Brand's Next Milestone?
            </h2>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: "rgba(245, 240, 232, 0.75)",
                marginBottom: "32px",
              }}
            >
              Let&apos;s discuss your communication objectives, brand positioning, and campaign strategy.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
              <Link
                href="/contact"
                className="btn-dark"
                style={{
                  background: "var(--cream)",
                  color: "var(--black)",
                  padding: "14px 32px",
                  borderRadius: "999px",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Start Your Project →
              </Link>
              <Link
                href="/services"
                className="btn-outline btn-outline--light"
                style={{
                  padding: "14px 28px",
                  borderRadius: "999px",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Our Capabilities
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter settings={settings} />
    </>
  );
}
