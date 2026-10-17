import { staticPageMetadata } from "@/lib/seo";
import { PageSeo } from "@/components/PageSeo";
import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { HighlightWord } from "@/components/HighlightWord";
import { TestimonialVideoSlider } from "@/components/TestimonialVideoSlider";
import { getSiteSettings } from "@/lib/site-settings";
import { getActiveTestimonials } from "@/lib/testimonials";

export const dynamic = "force-dynamic";

export const metadata: Metadata = staticPageMetadata("/testimonials");

const writtenTestimonials = [
  {
    quote:
      "Bright Communications has been our creative backbone for years. Their team understands the soul of the healthcare sector, bringing empathy, clinical dignity, and high creative standards to every patient campaign.",
    author: "Executive Director",
    company: "Leading Tertiary Healthcare Network",
    sector: "Healthcare",
  },
  {
    quote:
      "From brand positioning to packaging and statewide festive campaigns, Bright delivered measurable surges in retail sales. Their deep understanding of consumer psychology in Kerala and GCC is unmatched.",
    author: "Managing Director",
    company: "Premier FMCG & Packaged Foods Brand",
    sector: "FMCG & Retail",
  },
  {
    quote:
      "The integrated campaign executed by Bright helped establish our landmark property with record pre-bookings. Their creative films and digital precision set them apart from traditional agencies.",
    author: "Head of Marketing",
    company: "Prominent Real Estate & Infrastructure Group",
    sector: "Real Estate",
  },
  {
    quote:
      "Bright Communications combines the agility of a digital boutique with the strategic depth of a 29-year advertising legacy. They are a true partner in our commercial growth.",
    author: "Founder & CEO",
    company: "National Retail & Lifestyle Chain",
    sector: "Retail",
  },
];

export default async function TestimonialsPage() {
  const [settings, testimonials] = await Promise.all([
    getSiteSettings(),
    getActiveTestimonials(),
  ]);

  return (
    <>
      <SiteNav />
      <PageSeo path="/testimonials" settings={settings} />

      <main>
        {/* Page Hero */}
        <section className="inner-hero">
          <div className="inner-hero__bg" aria-hidden="true" />
          <div className="container" style={{ position: "relative", zIndex: 2 }}>
            <nav className="inner-hero__breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Testimonials</span>
            </nav>
            <p className="section-eyebrow">Client Endorsements</p>
            <h1 className="heading-display heading-xl inner-hero__title">
              What Our Clients Say About Partnering With <HighlightWord>Bright</HighlightWord>
            </h1>
            <p className="inner-hero__desc">
              Nothing speaks louder than the voices of the business owners, marketing directors,
              and brand custodians who trust us with their vision and growth.
            </p>
          </div>
        </section>

        {/* Video Testimonials Showcase (if active) */}
        {testimonials.length > 0 && (
          <section className="section section--gray" id="video-testimonials">
            <div className="container">
              <div style={{ maxWidth: 720, marginBottom: 40 }}>
                <p className="section-eyebrow">Video Stories</p>
                <h2 className="heading-display heading-lg">
                  Watch Authentic Client Stories
                </h2>
              </div>

              <TestimonialVideoSlider testimonials={testimonials} />
            </div>
          </section>
        )}

        {/* Written Endorsements Grid */}
        <section className="section" id="reviews">
          <div className="container">
            <div style={{ maxWidth: 720, marginBottom: 48 }}>
              <p className="section-eyebrow">Executive Perspectives</p>
              <h2 className="heading-display heading-lg">
                Stories Of Trust, Consistency &amp; <HighlightWord>Results</HighlightWord>
              </h2>
            </div>

            <div className="values-grid">
              {writtenTestimonials.map((item, index) => (
                <article
                  key={index}
                  className="value-card"
                  style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "36px",
                        lineHeight: 1,
                        color: "var(--gray-400)",
                        fontFamily: "var(--font-display)",
                        marginBottom: "12px",
                      }}
                    >
                      “
                    </div>
                    <p style={{ fontSize: "16px", lineHeight: 1.75, color: "var(--gray-800)", marginBottom: "24px" }}>
                      {item.quote}
                    </p>
                  </div>
                  <div style={{ borderTop: "1px solid #ebe8e1", paddingTop: "16px" }}>
                    <div style={{ fontWeight: 600, color: "var(--black)", fontSize: "15px" }}>
                      {item.author}
                    </div>
                    <div style={{ fontSize: "13px", color: "var(--gray-600)" }}>
                      {item.company} &bull; <span style={{ color: "var(--black)", fontWeight: 500 }}>{item.sector}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="blog-cta-section">
          <div className="container" style={{ textAlign: "center", maxWidth: 720 }}>
            <p className="section-eyebrow" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
              Experience The Difference
            </p>
            <h2
              className="heading-display"
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                color: "#fff",
                margin: "12px 0 20px",
              }}
            >
              Let&apos;s Build Your Next High-Impact Campaign
            </h2>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: "rgba(245, 240, 232, 0.75)",
                marginBottom: "32px",
              }}
            >
              Discover why over 100+ premier brands rely on Bright Communications for creative and commercial growth.
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
                href="/clients"
                className="btn-outline btn-outline--light"
                style={{
                  padding: "14px 28px",
                  borderRadius: "999px",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                View Client Roster
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter settings={settings} />
    </>
  );
}
