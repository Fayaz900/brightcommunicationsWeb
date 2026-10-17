import { staticPageMetadata } from "@/lib/seo";
import { PageSeo } from "@/components/PageSeo";
import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactForm } from "@/components/ContactForm";
import { HighlightWord } from "@/components/HighlightWord";
import { getSiteSettings } from "@/lib/site-settings";
import { contactInfo } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = staticPageMetadata("/contact");

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const activeContact = {
    email: settings?.email || contactInfo.email,
    phone: settings?.phone || contactInfo.phone,
    whatsapp: settings?.whatsapp || contactInfo.whatsapp,
    location: settings?.location || contactInfo.location,
  };

  return (
    <>
      <SiteNav />
      <PageSeo path="/contact" settings={settings} />

      <main>
        {/* Page Hero */}
        <section className="inner-hero">
          <div className="inner-hero__bg" aria-hidden="true" />
          <div className="container" style={{ position: "relative", zIndex: 2 }}>
            <nav className="inner-hero__breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Contact</span>
            </nav>
            <p className="section-eyebrow">Start A Conversation</p>
            <h1 className="heading-display heading-xl inner-hero__title">
              Let&apos;s Build Something <HighlightWord>Remarkable</HighlightWord> Together
            </h1>
            <p className="inner-hero__desc">
              Whether you are launching a new enterprise, repositioning an established brand,
              or scaling your performance media across India and the GCC, we are ready to listen.
            </p>
          </div>
        </section>

        {/* Contact Layout */}
        <section className="section" id="reach-out">
          <div className="container">
            <div className="contact-layout">
              {/* Left Column: Direct Agency Coordinates */}
              <div>
                <div style={{ marginBottom: 36 }}>
                  <p className="section-eyebrow">Our Agency</p>
                  <h2 className="heading-display heading-md">
                    Direct Channels &amp; Office Details
                  </h2>
                  <p className="body-md" style={{ marginTop: 12 }}>
                    Reach out directly to our client services and strategy directors. We typically respond within 24 business hours.
                  </p>
                </div>

                <div className="contact-card-box">
                  {/* Location */}
                  <div className="contact-direct-item">
                    <div className="contact-direct-icon">&#9679;</div>
                    <div>
                      <div className="contact-direct-label">Headquarters</div>
                      <div className="contact-direct-value">{activeContact.location}</div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="contact-direct-item">
                    <div className="contact-direct-icon">&#9993;</div>
                    <div>
                      <div className="contact-direct-label">Direct Email</div>
                      <a href={`mailto:${activeContact.email}`} className="contact-direct-value">
                        {activeContact.email}
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="contact-direct-item">
                    <div className="contact-direct-icon">&#9742;</div>
                    <div>
                      <div className="contact-direct-label">Phone Enquiries</div>
                      <a
                        href={`tel:${activeContact.phone.replace(/\s/g, "")}`}
                        className="contact-direct-value"
                      >
                        {activeContact.phone}
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="contact-direct-item" style={{ marginBottom: 0 }}>
                    <div className="contact-direct-icon">&#9990;</div>
                    <div>
                      <div className="contact-direct-label">Instant WhatsApp</div>
                      <a
                        href={`https://wa.me/${activeContact.whatsapp.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-direct-value"
                        style={{ color: "#25D366" }}
                      >
                        Message on WhatsApp &rarr;
                      </a>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 32, padding: "24px", background: "#f5f5f4", borderRadius: "var(--radius-md)" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>
                    Agency Working Hours
                  </h3>
                  <p style={{ fontSize: "14px", color: "var(--gray-600)", lineHeight: 1.6 }}>
                    Monday &ndash; Friday: 9:30 AM &ndash; 6:30 PM IST<br />
                    Saturday: 9:30 AM &ndash; 2:00 PM IST (Creative &amp; Media Standup)
                  </p>
                </div>
              </div>

              {/* Right Column: Interactive Form */}
              <div
                style={{
                  background: "#0a0a0a",
                  padding: "48px 40px",
                  borderRadius: "var(--radius-lg)",
                  color: "#fff",
                }}
              >
                <div style={{ marginBottom: "28px" }}>
                  <h3
                    className="heading-display"
                    style={{ fontSize: "28px", color: "var(--cream)", marginBottom: "8px" }}
                  >
                    Send Us A Brief
                  </h3>
                  <p style={{ fontSize: "15px", color: "rgba(245, 240, 232, 0.7)" }}>
                    Tell us a bit about your brand, scope, and objectives.
                  </p>
                </div>

                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter settings={settings} />
    </>
  );
}
