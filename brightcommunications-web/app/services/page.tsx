import { staticPageMetadata } from "@/lib/seo";
import { PageSeo } from "@/components/PageSeo";
import { serviceSchema } from "@/lib/schema";
import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { FaqAccordion } from "@/components/FaqAccordion";
import { HighlightWord } from "@/components/HighlightWord";
import { getSiteSettings } from "@/lib/site-settings";
import { getActiveServiceProjects } from "@/lib/service-projects";
import { services, processSteps, faqItems, marqueeServices } from "@/lib/site-content";
import { slugify } from "@/lib/slug";

export const dynamic = "force-dynamic";

export const metadata: Metadata = staticPageMetadata("/services");

export default async function ServicesPage() {
  const [settings, serviceProjects] = await Promise.all([
    getSiteSettings(),
    getActiveServiceProjects(),
  ]);

  const serviceRows = serviceProjects.length > 0
    ? serviceProjects.map((project) => ({
        num: project.serviceNum,
        name: project.serviceName,
        desc: project.serviceDesc,
        tags: project.serviceTags,
        href: `/services/${project.slug}`,
      }))
    : services.map((service) => ({
        ...service,
        href: `/services/${slugify(service.name)}`,
      }));

  return (
    <>
      <SiteNav />
      <PageSeo path="/services" settings={settings} schema={serviceRows.map((service) => serviceSchema({ path: service.href, name: service.name, description: service.desc }))} />

      <main>
        {/* Page Hero */}
        <section className="inner-hero">
          <div className="inner-hero__bg" aria-hidden="true" />
          <div className="container" style={{ position: "relative", zIndex: 2 }}>
            <nav className="inner-hero__breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Services</span>
            </nav>
            <p className="section-eyebrow">Comprehensive Capabilities</p>
            <h1 className="heading-display heading-xl inner-hero__title">
              360° Integrated Communication Solutions
            </h1>
            <p className="inner-hero__desc">
              From defining sharp brand identities to executing multi-channel advertising campaigns,
              we deliver end-to-end creative, digital, and media solutions designed for lasting impact.
            </p>
          </div>
        </section>

        {/* Marquee Ticker */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            {[...marqueeServices, ...marqueeServices].map((label, i) => (
              <span key={`${label}-${i}`} className="marquee__item">
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Detailed Services Catalog */}
        <section className="section" id="catalog">
          <div className="container">
            <div style={{ maxWidth: 760, marginBottom: 48 }}>
              <p className="section-eyebrow">Core Practices</p>
              <h2 className="heading-display heading-lg">
                Crafted For Every Stage Of <HighlightWord>Brand</HighlightWord> Growth
              </h2>
              <p className="body-lg" style={{ marginTop: 16 }}>
                Each service practice is backed by seasoned specialists working synchronously
                under one roof to ensure brand cohesion across every touchpoint.
              </p>
            </div>

            <div className="services-full-list">
              {serviceRows.map((service) => (
                <article key={service.num} className="service-card-full">
                  <span className="service-card-full__num">{service.num}</span>
                  <div className="service-card-full__info">
                    <h3>{service.name}</h3>
                    <p>{service.desc}</p>
                    <div className="service-card-full__tags">
                      {service.tags.map((tag) => (
                        <span key={tag} className="pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Link
                      href={service.href}
                      className="btn-outline"
                      style={{
                        padding: "12px 24px",
                        borderRadius: "999px",
                        whiteSpace: "nowrap",
                        display: "inline-block",
                      }}
                    >
                      View Case Study &rarr;
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="section section--gray" id="process">
          <div className="container">
            <div style={{ maxWidth: 720, marginBottom: 48 }}>
              <p className="section-eyebrow">How We Work</p>
              <h2 className="heading-display heading-lg">
                Our Strategic <HighlightWord>Methodology</HighlightWord>
              </h2>
              <p className="body-lg" style={{ marginTop: 16 }}>
                A structured, transparent workflow ensuring creative excellence and measurable commercial return.
              </p>
            </div>

            <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
              {processSteps.map((step) => (
                <div
                  key={step.num}
                  style={{
                    background: "#fff",
                    padding: "32px 24px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid #ebe8e1",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      color: "var(--gray-400)",
                      display: "block",
                      marginBottom: "12px",
                    }}
                  >
                    {step.num}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "22px",
                      marginBottom: "8px",
                      color: "var(--black)",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: "var(--gray-600)", lineHeight: 1.6 }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section" id="faq">
          <div className="container">
            <div style={{ maxWidth: 720, marginBottom: 48 }}>
              <p className="section-eyebrow">Frequently Asked Questions</p>
              <h2 className="heading-display heading-lg">
                Everything You Need To Know
              </h2>
            </div>
            <FaqAccordion items={faqItems} />
          </div>
        </section>

        {/* CTA Banner */}
        <section className="blog-cta-section">
          <div className="container" style={{ textAlign: "center", maxWidth: 720 }}>
            <p className="section-eyebrow" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
              Start Collaboration
            </p>
            <h2
              className="heading-display"
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                color: "#fff",
                margin: "12px 0 20px",
              }}
            >
              Have A Specific Brief Or Challenge?
            </h2>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: "rgba(245, 240, 232, 0.75)",
                marginBottom: "32px",
              }}
            >
              Reach out to our strategy and creative leads to discuss scope, deliverables, and timelines.
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
                Discuss Your Project →
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
                View Selected Work
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter settings={settings} />
    </>
  );
}
