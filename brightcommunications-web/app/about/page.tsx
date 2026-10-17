import { staticPageMetadata } from "@/lib/seo";
import { PageSeo } from "@/components/PageSeo";
import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { HighlightWord } from "@/components/HighlightWord";
import { getSiteSettings } from "@/lib/site-settings";
import {
  aboutValues,
  legacyHighlights,
  whyChooseBright,
} from "@/lib/site-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = staticPageMetadata("/about");

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <SiteNav />
      <PageSeo path="/about" settings={settings} />

      <main>
        {/* Page Hero */}
        <section className="inner-hero">
          <div className="inner-hero__bg" aria-hidden="true" />
          <div className="container" style={{ position: "relative", zIndex: 2 }}>
            <nav className="inner-hero__breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>About</span>
            </nav>
            <p className="section-eyebrow">A Legacy of Creative Excellence</p>
            <h1 className="heading-display heading-xl inner-hero__title">
              A Creative Force Since 1996
            </h1>
            <p className="inner-hero__desc">
              Bright Communications was founded on a simple belief: great communication has
              the power to shape perceptions, influence decisions, and build enduring brands.
              What began as a creative advertising agency has grown into a multidisciplinary
              communications powerhouse.
            </p>

            {/* Key Agency Statistics */}
            <div className="inner-stats">
              {legacyHighlights.map((stat) => (
                <div key={stat.label} className="inner-stat-card">
                  <div className="inner-stat-card__val">{stat.value}</div>
                  <div className="inner-stat-card__lbl">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story & Evolution */}
        <section className="section" id="story">
          <div className="container">
            <div className="about-intro">
              <p className="section-eyebrow">Our Journey</p>
              <div className="about-copy">
                <h2 className="heading-display heading-lg">
                  Nearly Three Decades Of Building <HighlightWord>Iconic</HighlightWord> Brands
                </h2>
                <p className="body-lg" style={{ marginTop: 24 }}>
                  Founded in 1996 by K.V. Shaji, Bright Communications emerged during a
                  transformative era in Indian advertising. Over the years, we have transitioned
                  from traditional print and outdoors into a 360° integrated communications
                  company spanning digital marketing, performance media, film production,
                  web engineering, and brand identity systems.
                </p>
                <p className="body-md" style={{ marginTop: 16 }}>
                  Today, our multidisciplinary team of strategists, designers, filmmakers,
                  writers, and technologists collaborates to craft campaigns that build emotional
                  connections, cultivate enduring trust, and accelerate commercial growth across
                  India and the GCC region.
                </p>
                <div className="about-pills" style={{ marginTop: 24 }}>
                  <span className="pill">Rooted in Strategy</span>
                  <span className="pill">Driven by Creativity</span>
                  <span className="pill">Powered by Results</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values, Culture */}
        <section className="section section--gray" id="values">
          <div className="container">
            <div style={{ maxWidth: 720, marginBottom: 48 }}>
              <p className="section-eyebrow">Our Pillars</p>
              <h2 className="heading-display heading-lg">
                The Principles That Guide <HighlightWord>Everything</HighlightWord> We Do
              </h2>
            </div>

            <div className="values-grid">
              {aboutValues.map((val) => (
                <article key={val.title} className="value-card">
                  <h3 className="value-card__title">{val.title}</h3>
                  <p className="value-card__desc">{val.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Why Brands Partner With Bright */}
        <section className="section section--dark" id="why-bright">
          <div className="container">
            <p className="section-eyebrow" style={{ color: "rgba(255,255,255,0.5)" }}>
              Why Choose Bright
            </p>
            <h2
              className="heading-display heading-lg reveal-heading"
              style={{ color: "#fff", marginBottom: 48 }}
            >
              Experience Meets <HighlightWord>Evolution</HighlightWord>
            </h2>

            <div className="why-grid" data-stagger="0.1">
              {whyChooseBright.map((item) => (
                <article key={item.title} className="why-card tilt-card">
                  <h3 className="why-card__title">{item.title}</h3>
                  <p className="why-card__desc">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="blog-cta-section">
          <div className="container" style={{ textAlign: "center", maxWidth: 720 }}>
            <p className="section-eyebrow" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
              Collaborate With Us
            </p>
            <h2
              className="heading-display"
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                color: "#fff",
                margin: "12px 0 20px",
              }}
            >
              Ready To Take Your Brand Further?
            </h2>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: "rgba(245, 240, 232, 0.75)",
                marginBottom: "32px",
              }}
            >
              Whether launching a new enterprise or transforming an established institution,
              our team is ready to craft your next milestone.
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
                Explore Services
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter settings={settings} />
    </>
  );
}
