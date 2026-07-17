"use client";

import Image from "next/image";
import { useState } from "react";

import { AboutVideoPlayer } from "@/components/AboutVideoPlayer";
import { FaqAccordion } from "@/components/FaqAccordion";
import { HeroSection } from "@/components/HeroSection";
import { HighlightWord } from "@/components/HighlightWord";
import { SiteNav } from "@/components/SiteNav";
import { TestimonialVideoSlider } from "@/components/TestimonialVideoSlider";
import { WorkPortfolioGrid } from "@/components/WorkPortfolioGrid";
import { IndustryGalleryModal } from "@/components/IndustryGalleryModal";
import { industryImagesMap } from "@/lib/industry-images";
import {
  aboutValues,
  awards,
  brightsydePillars,
  careerOpenings,
  clientIndustryTags,
  contactInfo,
  industries,
  insightCategories,
  legacyHighlights,
  marqueeServices,
  navItems,
  processSteps,
  services,
  teamRoles,
  whyChooseBright,
  workCategories,
} from "@/lib/site-content";

const clientLogos = Array.from(
  { length: 24 },
  (_, index) => `/clientlogos/logo_${index + 1}.png`,
);

function PlaceholderSlot({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div className={`asset-slot${className ? ` ${className}` : ""}`}>
      <span className="asset-slot__label">{label}</span>
    </div>
  );
}

export function LandingPage() {
  const [selectedIndustryName, setSelectedIndustryName] = useState<string | null>(null);

  const selectedIndustry = industries.find(
    (ind) => ind.name === selectedIndustryName
  );

  return (
    <>
      <SiteNav />

      <HeroSection />

      {/* Marquee */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...marqueeServices, ...marqueeServices].map((label, i) => (
            <span key={`${label}-${i}`} className="marquee__item">
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* A Legacy of Creativity */}
      <section className="legacy-band">
        <div className="container">
          <div className="legacy-band__header fade-up">
            <p className="section-eyebrow">A Legacy of Creativity</p>
            <h2 className="heading-display heading-md">
              Nearly Three Decades Of Building Brands
            </h2>
            <p className="body-md legacy-band__tagline">
              Built On Advertising. Evolved Through Innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="section" id="about">
        <div className="container">
          <div className="about-intro">
            <p className="section-eyebrow fade-up">Who We Are</p>

            <div className="about-copy">
              <h2 className="heading-display heading-lg reveal-heading">
                A Creative Force Since <HighlightWord>1996</HighlightWord>
              </h2>
              <p className="body-lg fade-up" style={{ marginTop: 24 }}>
                Bright Communications was founded on a simple belief: great
                communication has the power to shape perceptions, influence
                decisions, and build enduring brands.
              </p>
              <p className="body-md fade-up" style={{ marginTop: 16 }}>
                What began as a creative advertising agency has grown into a
                multidisciplinary communications company that brings together
                strategy, creativity, technology, content, production, and
                performance under one roof.
              </p>
              <p className="body-md fade-up" style={{ marginTop: 16 }}>
                Today, our team of strategists, designers, marketers,
                filmmakers, writers, developers, and creative thinkers
                collaborate to create communication that not only captures
                attention but also delivers meaningful business outcomes.
              </p>
              <div className="about-pills fade-up">
                <span className="pill">Brands need relevance.</span>
                <span className="pill">Brands need trust.</span>
                <span className="pill">Brands need growth.</span>
              </div>
            </div>

            {/* <AboutVideoPlayer /> */}
          </div>

        
        </div>
      </section>

      {/* What We Do */}
      <section className="section section--dark services" id="services">
        <div className="container">
          <div className="services-header">
            <h2 className="services-heading heading-display fade-up">
              What we
              <br />
              do best.
            </h2>
            <p className="services-sub fade-up">
              From brand foundations to full-scale campaigns — we cover every
              dimension of communications that helps your brand grow.
            </p>
          </div>

          <div className="services-list" data-stagger="0.08">
            {services.map((service) => (
              <article key={service.num} className="service-item">
                <span className="service-num">{service.num}</span>
                <span className="service-name">{service.name}</span>
                <div className="service-tags">
                  {service.tags.map((tag) => (
                    <span key={tag} className="service-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="service-arrow" aria-hidden="true">
                  ↗
                </span>
              </article>
            ))}
          </div>

          <div className="section-cta-row fade-up">
            <a href="#contact" className="btn-outline btn-outline--light magnetic-btn">
              Explore All Services →
            </a>
          </div>
        </div>
      </section>

      {/* Work That Creates Impact */}
      {/* <section className="section" id="work">
        <div className="container">
          <div className="work-header">
            <div>
              <p className="section-eyebrow fade-up">Work That Creates Impact</p>
              <h2 className="heading-display heading-lg reveal-heading">
                Creating <HighlightWord>Measurable</HighlightWord> Impact
              </h2>
              <p className="body-lg fade-up" style={{ marginTop: 16 }}>
                Every brand has a story. Every challenge has an opportunity.
                Every campaign has a purpose.
              </p>
              <p className="body-md fade-up" style={{ marginTop: 16 }}>
                For nearly three decades, Bright Communications has partnered
                with businesses across healthcare, education, real estate,
                retail, hospitality, manufacturing, technology, and financial
                services to create communication that delivers results.
              </p>
              <p className="body-md fade-up" style={{ marginTop: 16 }}>
                From brand launches and integrated campaigns to digital
                transformation and content production, our work is driven by one
                objective: Creating Measurable Impact.
              </p>
            </div>
            <a href="#work" className="btn-outline fade-up magnetic-btn">
              View Portfolio →
            </a>
          </div>

          <div className="work-categories" data-stagger="0.06">
            {workCategories.map((cat) => (
              <span key={cat} className="pill">
                {cat}
              </span>
            ))}
          </div>

          <div className="work-grid" data-stagger="0.1">
            <WorkPortfolioGrid />
          </div>
        </div>
      </section> */}

            {/* Our Clients */}
            <section className="section section--gray" id="clients">
        <div className="container">
          <div className="about-grid clients-intro" style={{ marginBottom: 48 }}>
            <div>
              <p className="section-eyebrow fade-up">Our Clients</p>
              <h2 className="heading-display heading-lg reveal-heading">
                Trusted By Leading <HighlightWord>Brands</HighlightWord>
              </h2>
            </div>
          </div>

          <div className="logo-wall">
            <div className="logo-wall__track">
              {[false, true].map((isDuplicate) => (
                <div
                  className="logo-wall__group"
                  key={isDuplicate ? "duplicate" : "original"}
                  aria-hidden={isDuplicate || undefined}
                >
                  {clientLogos.map((logo, index) => (
                    <div className="logo-wall__slot" key={logo}>
                      <Image
                        src={logo}
                        alt={isDuplicate ? "" : `Client logo ${index + 1}`}
                        width={260}
                        height={160}
                        sizes="(min-width: 900px) 260px, 210px"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Bright */}
      <section className="section section--dark" id="why-bright">
        <div className="container">
          <p className="section-eyebrow fade-up" style={{ color: "rgba(255,255,255,0.5)" }}>
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



      {/* Industries */}
      {/* <section className="section" id="industries">
        <div className="container">
          <p className="section-eyebrow fade-up">Industries We Serve</p>
          <h2 className="heading-display heading-lg reveal-heading">
            Expertise Across Diverse <HighlightWord>Business</HighlightWord> Sectors
          </h2>
          <p className="body-lg fade-up" style={{ marginTop: 16, marginBottom: 48 }}>
            Over the years, Bright Communications has developed deep industry
            knowledge across multiple sectors, enabling us to create
            communication that resonates with specific audiences and business
            objectives.
          </p>
          <div className="industries-grid" data-stagger="0.1">
            {industries.map((industry) => {
              const hasGallery = industry.name in industryImagesMap;
              return (
                <article
                  key={industry.name}
                  className="industry-card cursor-pointer"
                  onClick={() => setSelectedIndustryName(industry.name)}
                >
                  <h3 className="industry-card__title">{industry.name}</h3>
                  <p className="industry-card__desc">{industry.desc}</p>
                  <span className="industry-card__link">
                    {hasGallery ? "View gallery →" : "View projects →"}
                  </span>
                </article>
              );
            })}
          </div>
        </div>
      </section> */}

      {/* Brightsyde */}
      {/* <section className="section section--dark" id="brightsyde">
        <div className="container">
          <div className="brightsyde-layout">
            <div>
              <p className="section-eyebrow fade-up" style={{ color: "rgba(255,255,255,0.5)" }}>
                The Brightsyde Advantage
              </p>
              <h2
                className="heading-display heading-lg reveal-heading"
                style={{ color: "#fff" }}
              >
                Where Industry Builds <HighlightWord>Future</HighlightWord> Talent
              </h2>
              <p className="body-lg fade-up" style={{ marginTop: 16, color: "rgba(255,255,255,0.72)" }}>
                Bright Communications believes the future of communication
                depends on continuous learning. Through Brightsyde, our
                industry-led educational initiative, aspiring marketers,
                designers, content creators, and communication professionals
                gain exposure to real-world agency environments, practical
                learning, and industry mentorship.
              </p>
              <p className="body-md fade-up" style={{ marginTop: 16, color: "rgba(255,255,255,0.6)" }}>
                This commitment to nurturing talent helps Bright remain
                innovative, adaptable, and future-ready.
              </p>
              <a
                href="#brightsyde"
                className="btn-outline btn-outline--light fade-up magnetic-btn"
                style={{ marginTop: 24 }}
              >
                Explore Brightsyde →
              </a>
            </div>
            <div className="brightsyde-grid" data-stagger="0.12">
              {brightsydePillars.map((pillar) => (
                <article key={pillar.title} className="brightsyde-card tilt-card">
                  <h3 className="brightsyde-card__title">{pillar.title}</h3>
                  <p className="brightsyde-card__desc">{pillar.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* The Minds Behind Bright */}
      {/* <section className="section" id="team">
        <div className="container">
          <div className="about-grid" style={{ marginBottom: 48 }}>
            <h2 className="heading-display heading-lg reveal-heading">
              The Minds Behind <HighlightWord>Bright</HighlightWord>
            </h2>
            <p className="body-lg fade-up">
              People Who Bring Ideas To Life — behind every successful campaign
              is a team of passionate thinkers, creators, strategists, and
              problem-solvers.
            </p>
          </div>
          <div className="team-grid team-grid--roles" data-stagger="0.1">
            {teamRoles.map((member) => (
              <article
                key={member.role}
                className={`team-card team-card--slot tilt-card${member.featured ? " team-card--featured" : ""}`}
              >
                <PlaceholderSlot
                  label="Photo"
                  className="team-card__photo asset-slot--fill"
                />
                <div className="team-card__overlay">
                  <div className="team-card__name">
                    {member.featured ? member.name : member.role}
                  </div>
                  <div className="team-card__role">
                    {member.featured ? "Founder" : member.name}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="section-cta-row fade-up">
            <a href="#team" className="btn-outline magnetic-btn">
              Meet The Team →
            </a>
          </div>
        </div>
      </section> */}

      {/* Client Testimonials */}
      <section className="section section--gray" id="testimonials">
        <div className="container">
          <div className="testimonials-layout testimonials-layout--stacked">
            <div className="testimonials-layout__header testimonials-heading">
              <p className="section-eyebrow fade-up">Client Testimonials</p>
              <h2 className="heading-display heading-lg reveal-heading">
                What Our <HighlightWord>Clients</HighlightWord> Say
              </h2>
            </div>

            <TestimonialVideoSlider />
          </div>
        </div>
      </section>


      {/* SEO Section */}
      <section className="seo-band">
        <div className="container">
          <h2 className="heading-display heading-md reveal-heading seo-band__title">
            Leading Advertising, Branding &amp; Digital Marketing Agency In Kochi
          </h2>
          <p className="body-lg fade-up" style={{ marginTop: 16 }}>
            Bright Communications is a leading advertising, branding, digital
            marketing, website development, content production, and integrated
            communications company based in Kochi, Kerala.
          </p>
          <p className="body-md fade-up" style={{ marginTop: 16 }}>
            Since 1996, we have helped businesses strengthen their market
            presence through strategic branding, advertising campaigns, digital
            marketing, performance marketing, social media management, website
            development, and creative communication solutions.
          </p>
          <p className="body-md fade-up" style={{ marginTop: 16 }}>
            By combining creativity, technology, and strategic thinking, we help
            brands build visibility, strengthen customer relationships, and
            achieve sustainable growth in an increasingly competitive
            marketplace.
          </p>
        </div>
      </section>

      {/* Final CTA / Contact */}
      <section className="cta-section" id="contact">
        <div className="container">
          <div className="cta-grid">
            <div>
              <h2 className="heading-display heading-lg reveal-heading">
                Let&apos;s Build Something Remarkable Together
              </h2>
              <p className="body-lg fade-up" style={{ marginTop: 16 }}>
                Whether you&apos;re building a new brand, launching a campaign,
                strengthening your digital presence, or planning your next phase
                of growth, we&apos;re ready to help.
              </p>
              <div className="cta-contact-info fade-up">
                <span>Bright Communications — {contactInfo.location}</span>
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}>
                  {contactInfo.phone}
                </a>
                <a href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, "")}`}>
                  WhatsApp
                </a>
              </div>
            </div>

            <form className="cta-form">
              <p className="cta-form__label">Business Enquiry Form</p>
              <div className="form-row">
                <input id="name" name="name" type="text" placeholder="Your Name" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                />
              </div>
              <input
                id="company"
                name="company"
                type="text"
                placeholder="Company"
              />
              <select id="service" name="service" defaultValue="">
                <option value="">Service interested in</option>
                {services.map((s) => (
                  <option key={s.num} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell us about your project..."
              />
              <button type="submit" className="btn-dark magnetic-btn">
                Start Your Project →
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <a href="#home" className="footer-logo">
              Bright Communications
            </a>
            <ul className="footer-nav footer-nav--wide">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            <a href="#contact" className="btn-outline btn-outline--light magnetic-btn">
              Start Your Project
            </a>
          </div>

          <div className="footer-columns">
            <div>
              <p className="footer-col-title">Services</p>
              <ul className="footer-links">
                {services.map((s) => (
                  <li key={s.num}>
                    <a href="#services">{s.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="footer-col-title">Company</p>
              <ul className="footer-links">
                <li><a href="#about">About Us</a></li>
                <li><a href="#work">Our Work</a></li>
                <li><a href="#industries">Industries</a></li>
                <li><a href="#clients">Clients</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div>
              <p className="footer-col-title">Contact</p>
              <ul className="footer-links">
                <li>
                  <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                </li>
                <li>
                  <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}>
                    {contactInfo.phone}
                  </a>
                </li>
                <li>
                  <a href="#contact">{contactInfo.location}</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copy">
              © {new Date().getFullYear()} Bright Communications. All rights reserved.
            </p>
            <div className="footer-social">
              <a href="#" className="social-icon" aria-label="LinkedIn">in</a>
              <a href="#" className="social-icon" aria-label="Instagram">ig</a>
              <a href="#" className="social-icon" aria-label="Facebook">fb</a>
            </div>
            <div className="footer-legal">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      <IndustryGalleryModal
        industryName={selectedIndustryName}
        industryDesc={selectedIndustry?.desc || ""}
        onClose={() => setSelectedIndustryName(null)}
      />
    </>
  );
}
