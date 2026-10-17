import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { HighlightWord } from "@/components/HighlightWord";
import { getSiteSettings } from "@/lib/site-settings";
import { getActiveCareers } from "@/lib/careers";
import { brightsydePillars, contactInfo } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Careers at Bright",
  description:
    "Explore career openings at Bright Communications in Kochi, Kerala. Opportunities for creative designers, copywriters, digital strategists, filmmakers, and web developers.",
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Careers at Bright | Join Our Creative Agency in Kochi",
    description:
      "Work alongside veteran strategists, filmmakers, and digital specialists. Build iconic brands with Bright Communications.",
    url: "/careers",
    siteName: "Bright Communications",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at Bright | Join Our Creative Agency in Kochi",
    description:
      "Work alongside veteran strategists, filmmakers, and digital specialists. Build iconic brands with Bright Communications.",
  },
};

export default async function CareersPage() {
  const [settings, careers] = await Promise.all([
    getSiteSettings(),
    getActiveCareers(),
  ]);
  const applyEmail = settings?.email || contactInfo.email;

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
              <span>Careers</span>
            </nav>
            <p className="section-eyebrow">Join Our Creative Team</p>
            <h1 className="heading-display heading-xl inner-hero__title">
              Build The Future Of Communications With <HighlightWord>Bright</HighlightWord>
            </h1>
            <p className="inner-hero__desc">
              We are a team of strategists, visual artists, filmmakers, writers, and technologists
              who take pride in building work that endures. If you thrive on craft, curiosity, and collaboration,
              you belong here.
            </p>
          </div>
        </section>

        {/* Agency Culture & Perks */}
        <section className="section section--gray" id="culture">
          <div className="container">
            <div style={{ maxWidth: 720, marginBottom: 44 }}>
              <p className="section-eyebrow">Life At Bright</p>
              <h2 className="heading-display heading-lg">
                Where Creative Freedom Meets Commercial Impact
              </h2>
            </div>

            <div className="values-grid">
              <div className="value-card">
                <h3 className="value-card__title">Diverse Project Spectrum</h3>
                <p className="value-card__desc">
                  Work across FMCG, tertiary healthcare, education, retail, hospitality, and tech.
                  You will never be boxed into a single repetitive category.
                </p>
              </div>

              <div className="value-card">
                <h3 className="value-card__title">Direct Mentorship &amp; Craft</h3>
                <p className="value-card__desc">
                  Learn from leaders with nearly three decades of industry recognition. Refine your
                  craft in strategy, art direction, and campaign mechanics.
                </p>
              </div>

              <div className="value-card">
                <h3 className="value-card__title">In-House Production Power</h3>
                <p className="value-card__desc">
                  See your ideas come to life directly with our internal video production, studio equipment,
                  and digital development squads.
                </p>
              </div>

              <div className="value-card">
                <h3 className="value-card__title">Brightsyde Learning Culture</h3>
                <p className="value-card__desc">
                  Continuous development through workshops, design reviews, and knowledge-sharing sessions
                  that keep our squad ahead of industry shifts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Current Open Positions */}
        <section className="section" id="openings">
          <div className="container">
            <div style={{ maxWidth: 720, marginBottom: 48 }}>
              <p className="section-eyebrow">Current Opportunities</p>
              <h2 className="heading-display heading-lg">
                Open Roles In <HighlightWord>Kochi</HighlightWord>
              </h2>
              <p className="body-lg" style={{ marginTop: 16 }}>
                Explore open positions below or send an open application with your portfolio.
              </p>
            </div>

            <div className="careers-grid">
              {careers.map((job) => (
                <article key={job.id} className="career-card">
                  <div>
                    <div className="career-card__meta">
                      <span className="career-card__pill">{job.department}</span>
                      <span className="pill" style={{ fontSize: "13px" }}>
                        {job.jobType}
                      </span>
                      <span className="pill" style={{ fontSize: "13px" }}>
                        {job.location}
                      </span>
                      <span className="pill" style={{ fontSize: "13px" }}>
                        Exp: {job.experience}
                      </span>
                    </div>
                    <h3 className="career-card__title">{job.title}</h3>
                    <p className="career-card__desc">{job.description}</p>
                  </div>
                  <div>
                    <a
                      href={`mailto:${applyEmail}?subject=${encodeURIComponent(
                        `Job Application: ${job.title} - [Your Name]`
                      )}&body=${encodeURIComponent(
                        `Hi Bright Communications Team,\n\nI would like to apply for the ${job.title} position.\n\nPortfolio Link: \nLinkedIn: \nResume Attached: Yes\n\nLooking forward to hearing from you.`
                      )}`}
                      className="btn-primary"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Apply For Role &rarr;
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {/* Spontaneous Application Callout */}
            <div
              style={{
                marginTop: "48px",
                padding: "36px",
                borderRadius: "var(--radius-md)",
                background: "#fbfbfa",
                border: "1px dashed #d6d3d1",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              <div>
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: "22px", marginBottom: "6px" }}>
                  Don&apos;t see your specific role?
                </h4>
                <p style={{ color: "var(--gray-600)", fontSize: "15px" }}>
                  We are always on the lookout for visionary talent. Send your portfolio and resume to our leadership.
                </p>
              </div>
              <a
                href={`mailto:${applyEmail}?subject=General%20Creative%20Application%20-%20Bright%20Communications`}
                className="btn-outline"
                style={{ padding: "12px 28px", borderRadius: "999px" }}
              >
                Send Open Portfolio &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* Brightsyde Section */}
        <section className="section section--dark" id="brightsyde">
          <div className="container">
            <div style={{ maxWidth: 760, marginBottom: 48 }}>
              <p className="section-eyebrow" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                Educational Initiative
              </p>
              <h2 className="heading-display heading-lg" style={{ color: "#fff" }}>
                The <HighlightWord>Brightsyde</HighlightWord> Advantage
              </h2>
              <p className="body-lg" style={{ marginTop: 16, color: "rgba(255, 255, 255, 0.72)" }}>
                Through Brightsyde, aspiring marketers, designers, content creators, and communication
                professionals gain hands-on exposure to live agency briefs, real-world campaign metrics,
                and direct industry mentorship.
              </p>
            </div>

            <div className="why-grid">
              {brightsydePillars.map((pillar) => (
                <article key={pillar.title} className="why-card tilt-card">
                  <h3 className="why-card__title">{pillar.title}</h3>
                  <p className="why-card__desc">{pillar.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="blog-cta-section">
          <div className="container" style={{ textAlign: "center", maxWidth: 720 }}>
            <p className="section-eyebrow" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
              Take The Next Step
            </p>
            <h2
              className="heading-display"
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                color: "#fff",
                margin: "12px 0 20px",
              }}
            >
              Start Your Journey At Bright Communications
            </h2>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: "rgba(245, 240, 232, 0.75)",
                marginBottom: "32px",
              }}
            >
              Have questions about our team culture, interview process, or working environment? We&apos;d love to connect.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
              <a
                href={`mailto:${applyEmail}?subject=Careers%20Inquiry%20-%20Bright%20Communications`}
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
                Contact Talent Team &rarr;
              </a>
              <Link
                href="/about"
                className="btn-outline btn-outline--light"
                style={{
                  padding: "14px 28px",
                  borderRadius: "999px",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                About Our Agency
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter settings={settings} />
    </>
  );
}
