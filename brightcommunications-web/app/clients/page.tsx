import { staticPageMetadata } from "@/lib/seo";
import { PageSeo } from "@/components/PageSeo";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { HighlightWord } from "@/components/HighlightWord";
import { getSiteSettings } from "@/lib/site-settings";
import { clientIndustryTags } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = staticPageMetadata("/clients");

const clientLogos = Array.from(
  { length: 24 },
  (_, index) => `/clientlogos/logo_${index + 1}.png`,
);

export default async function ClientsPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <SiteNav />
      <PageSeo path="/clients" settings={settings} />

      <main>
        {/* Page Hero */}
        <section className="inner-hero">
          <div className="inner-hero__bg" aria-hidden="true" />
          <div className="container" style={{ position: "relative", zIndex: 2 }}>
            <nav className="inner-hero__breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Clients</span>
            </nav>
            <p className="section-eyebrow">Brand Partnerships</p>
            <h1 className="heading-display heading-xl inner-hero__title">
              Trusted By Leading <HighlightWord>Brands</HighlightWord> Across India & GCC
            </h1>
            <p className="inner-hero__desc">
              From regional icons to multinational enterprises, we build enduring partnerships
              anchored in mutual trust, creative bravery, and consistent performance.
            </p>
          </div>
        </section>

        {/* Sectors Served Banner */}
        <section className="section" style={{ paddingBottom: "32px" }}>
          <div className="container">
            <div style={{ maxWidth: 720, marginBottom: 36 }}>
              <p className="section-eyebrow">Diverse Sectors</p>
              <h2 className="heading-display heading-md">
                Partners Across Key Consumer &amp; B2B Verticals
              </h2>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "48px" }}>
              {clientIndustryTags.map((tag) => (
                <span key={tag} className="pill">
                  {tag}
                </span>
              ))}
            </div>

            {/* Client Logo Grid View */}
            <div className="clients-grid-view">
              {clientLogos.map((logo, index) => (
                <div key={logo} className="client-grid-card">
                  <Image
                    src={logo}
                    alt={`Client partner ${index + 1}`}
                    width={200}
                    height={100}
                    style={{ width: "auto", maxHeight: "72px" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Principles */}
        <section className="section section--gray">
          <div className="container">
            <div style={{ maxWidth: 720, marginBottom: 40 }}>
              <p className="section-eyebrow">Client Commitments</p>
              <h2 className="heading-display heading-lg">
                Why Brands Stay With Us For <HighlightWord>Decades</HighlightWord>
              </h2>
            </div>

            <div className="values-grid">
              <div className="value-card">
                <h3 className="value-card__title">Direct Leadership Access</h3>
                <p className="value-card__desc">
                  Every account benefits from the direct involvement of our founder and senior strategists,
                  ensuring sharp direction and high accountability without bureaucratic layers.
                </p>
              </div>

              <div className="value-card">
                <h3 className="value-card__title">Adaptive Multi-Market Expertise</h3>
                <p className="value-card__desc">
                  We balance local cultural nuances with national and GCC market standards, ensuring campaigns
                  feel genuine and hit commercial targets across diverse demographics.
                </p>
              </div>

              <div className="value-card">
                <h3 className="value-card__title">Consistency Over Trends</h3>
                <p className="value-card__desc">
                  While we embrace modern technology, AI, and digital channels, we protect your brand&apos;s
                  enduring identity and value proposition above short-lived fads.
                </p>
              </div>

              <div className="value-card">
                <h3 className="value-card__title">End-To-End In-House Delivery</h3>
                <p className="value-card__desc">
                  From brand identity and print assets to high-end ad film production, web architecture, and
                  performance campaigns, we execute without third-party friction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="blog-cta-section">
          <div className="container" style={{ textAlign: "center", maxWidth: 720 }}>
            <p className="section-eyebrow" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
              Join Our Client Family
            </p>
            <h2
              className="heading-display"
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                color: "#fff",
                margin: "12px 0 20px",
              }}
            >
              Ready To Become Our Next Success Story?
            </h2>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: "rgba(245, 240, 232, 0.75)",
                marginBottom: "32px",
              }}
            >
              Let&apos;s build campaigns that strengthen your market dominance and elevate your brand perception.
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
                Partner With Bright →
              </Link>
              <Link
                href="/testimonials"
                className="btn-outline btn-outline--light"
                style={{
                  padding: "14px 28px",
                  borderRadius: "999px",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Read Client Testimonials
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter settings={settings} />
    </>
  );
}
