import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { HighlightWord } from "@/components/HighlightWord";
import { IndustriesClient } from "@/components/IndustriesClient";
import { getSiteSettings } from "@/lib/site-settings";
import { clientIndustryTags } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Specialized communication and branding expertise across Healthcare, Real Estate, Education, Retail, Hospitality, Automotive, FMCG, and Technology by Bright Communications.",
  alternates: {
    canonical: "/industries",
  },
  openGraph: {
    title: "Industries We Serve | Bright Communications",
    description:
      "Deep industry knowledge and strategic communications across Healthcare, Real Estate, Education, Retail, Hospitality, FMCG, and Technology.",
    url: "/industries",
    siteName: "Bright Communications",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Industries We Serve | Bright Communications",
    description:
      "Deep industry knowledge and strategic communications across Healthcare, Real Estate, Education, Retail, Hospitality, FMCG, and Technology.",
  },
};

export default async function IndustriesPage() {
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
              <span>Industries</span>
            </nav>
            <p className="section-eyebrow">Sector Expertise</p>
            <h1 className="heading-display heading-xl inner-hero__title">
              Expertise Across Diverse <HighlightWord>Business</HighlightWord> Sectors
            </h1>
            <p className="inner-hero__desc">
              Over nearly three decades, Bright Communications has developed specialized sector
              insights, enabling us to engineer campaigns that resonate with distinct consumer personas,
              professional buyers, and regional market nuances.
            </p>
          </div>
        </section>

        {/* Industry Sector Tags */}
        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="container">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "48px" }}>
              {clientIndustryTags.map((tag) => (
                <span key={tag} className="pill" style={{ background: "var(--cream)" }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Interactive Grid with Galleries */}
            <IndustriesClient />
          </div>
        </section>

        {/* CTA Banner */}
        <section className="blog-cta-section" style={{ marginTop: "80px" }}>
          <div className="container" style={{ textAlign: "center", maxWidth: 720 }}>
            <p className="section-eyebrow" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
              Tailored Strategy
            </p>
            <h2
              className="heading-display"
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                color: "#fff",
                margin: "12px 0 20px",
              }}
            >
              Need An Industry-Specific Communications Partner?
            </h2>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: "rgba(245, 240, 232, 0.75)",
                marginBottom: "32px",
              }}
            >
              We bring proven category experience and consumer insights tailored to your commercial landscape.
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
                Schedule A Consultation →
              </Link>
              <Link
                href="/portfolio"
                className="btn-outline btn-outline--light"
                style={{
                  padding: "14px 28px",
                  borderRadius: "999px",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Browse Case Studies
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter settings={settings} />
    </>
  );
}
