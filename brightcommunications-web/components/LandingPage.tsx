"use client";

import Image from "next/image";
import { useState } from "react";

import { portfolioItems } from "@/app/assets/portfolio/data";
import { FaqAccordion } from "@/components/FaqAccordion";
import { HeroSection } from "@/components/HeroSection";
import { HighlightWord } from "@/components/HighlightWord";
import { SiteNav } from "@/components/SiteNav";
import { WorkPortfolioGrid } from "@/components/WorkPortfolioGrid";
import { IndustryGalleryModal } from "@/components/IndustryGalleryModal";
import { industryImagesMap } from "@/lib/industry-images";
import {
  aboutValues,
  awards,
  brightsydePillars,
  careerOpenings,
  clientIndustryTags,
  clientLogoSlots,
  contactInfo,
  industries,
  insightCategories,
  legacyHighlights,
  marqueeServices,
  navItems,
  processSteps,
  services,
  teamRoles,
  testimonialSlots,
  whyChooseBright,
  workCategories,
} from "@/lib/site-content";

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
          <div className="legacy-grid" data-stagger="0.1">
            {legacyHighlights.map((item) => (
              <article key={item.label} className="legacy-card">
                <div className="legacy-card__value">{item.value}</div>
                <div className="legacy-card__label">{item.label}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="section" id="about">
        <div className="container">
          <div className="about-grid">
            <div>
              <p className="section-eyebrow fade-up">Who We Are</p>
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
              <p className="body-md fade-up" style={{ marginTop: 16 }}>
                And that&apos;s where Bright creates value.
              </p>
              <a href="#about-founder" className="btn-outline fade-up magnetic-btn">
                Learn More About Bright →
              </a>
            </div>

            <div className="about-cards" data-stagger="0.15">
              <article className="about-card tilt-card" id="about-founder">
                <div className="about-card__img">
                  <PlaceholderSlot label="Founder Photo" className="asset-slot--fill" />
                </div>
                <div className="about-card__body">
                  <h3 className="about-card__title">Founder Story</h3>
                  <p className="body-md">
                    <strong>K. V. Shaji</strong> — Founded Bright Communications
                    in 1996 with a vision to help businesses build brands that
                    endure. Our journey since 1996 reflects nearly three decades
                    of creativity, evolution, and client partnership.
                  </p>
                </div>
              </article>
              <article className="about-card tilt-card">
                <div className="about-card__img">
                  <Image
                    src={portfolioItems[2].src}
                    alt="Bright Communications team at work"
                    fill
                    sizes="(max-width: 900px) 100vw, 280px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="about-card__body">
                  <h3 className="about-card__title">Our Journey Since 1996</h3>
                  <p className="body-md">
                    From traditional advertising to fully integrated
                    communications — evolving with every industry shift.
                  </p>
                </div>
              </article>
            </div>
          </div>

          <div className="values-grid" data-stagger="0.12">
            {aboutValues.map((item) => (
              <article key={item.title} className="values-card tilt-card">
                <h3 className="values-card__title">{item.title}</h3>
                <p className="body-md">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="section section--gray" id="services">
        <div className="container">
          <div className="services-grid-header">
            <p className="section-eyebrow fade-up">What We Do</p>
            <h2 className="heading-display heading-lg reveal-heading">
              Solutions Designed For <HighlightWord>Modern</HighlightWord> Brands
            </h2>
          </div>

          <div className="services-list" data-stagger="0.12">
            {services.map((service, i) => {
              const img = portfolioItems[i % portfolioItems.length];
              const isPeach = i % 2 === 0;
              return (
                <article
                  key={service.num}
                  className={`service-card service-card--${isPeach ? "peach" : "gray"} tilt-card`}
                >
                  <div className="service-card__img">
                    <Image
                      src={img.src}
                      alt={service.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="service-card__body">
                    <span className="service-card__num">{service.num}</span>
                    <h3 className="service-card__title">{service.name}</h3>
                    <p className="service-card__desc body-md">{service.desc}</p>
                    <div className="mosaic-card__tags">
                      {service.tags.map((tag) => (
                        <span key={tag} className="mosaic-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="section-cta-row fade-up">
            <a href="#contact" className="btn-outline magnetic-btn">
              Explore All Services →
            </a>
          </div>
        </div>
      </section>

      {/* Work That Creates Impact */}
      <section className="section" id="work">
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

          <div className="work-categories fade-up" data-stagger="0.06">
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

      {/* Our Process */}
      <section className="section section--peach" id="process">
        <div className="container">
          <p className="section-eyebrow fade-up">Our Process</p>
          <h2 className="heading-display heading-lg reveal-heading" style={{ marginBottom: 48 }}>
            How We Create <HighlightWord>Impact</HighlightWord>
          </h2>
          <div className="process-grid process-grid--five" data-stagger="0.14">
            {processSteps.map((step) => (
              <article key={step.num} className="process-card">
                <p className="process-card__num">{step.num}</p>
                <h3 className="process-card__title">{step.title}</h3>
                <p className="process-card__desc">{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section" id="industries">
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
                  className="industry-card tilt-card cursor-pointer"
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
      </section>

      {/* Our Clients */}
      <section className="section section--gray" id="clients">
        <div className="container">
          <div className="about-grid" style={{ marginBottom: 48 }}>
            <div>
              <p className="section-eyebrow fade-up">Our Clients</p>
              <h2 className="heading-display heading-lg reveal-heading">
                Trusted By Leading <HighlightWord>Brands</HighlightWord>
              </h2>
            </div>
            <p className="body-lg fade-up">
              For nearly three decades, Bright Communications has partnered with
              organisations across industries, helping them build visibility,
              strengthen engagement, and achieve sustainable growth. Our client
              relationships are built on trust, creativity, consistency, and
              results.
            </p>
          </div>

          {/* TODO: Replace logo slots with real client logos */}
          <div className="logo-wall" data-stagger="0.05">
            {Array.from({ length: clientLogoSlots }).map((_, i) => (
              <PlaceholderSlot key={i} label="Logo" className="logo-wall__slot" />
            ))}
          </div>

          <div className="client-tags fade-up" data-stagger="0.05">
            {clientIndustryTags.map((tag) => (
              <span key={tag} className="pill">
                {tag}
              </span>
            ))}
          </div>

          <div className="section-cta-row fade-up">
            <a href="#clients" className="btn-outline magnetic-btn">
              View All Clients →
            </a>
          </div>
        </div>
      </section>

      {/* Brightsyde */}
      <section className="section section--dark" id="brightsyde">
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
      </section>

      {/* The Minds Behind Bright */}
      <section className="section" id="team">
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
                {/* TODO: Replace with real team photos */}
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
      </section>

      {/* Client Testimonials */}
      <section className="section section--gray" id="testimonials">
        <div className="container">
          <div className="testimonials-layout">
            <div>
              <p className="section-eyebrow fade-up">Client Testimonials</p>
              <h2 className="heading-display heading-lg reveal-heading">
                What Our <HighlightWord>Clients</HighlightWord> Say
              </h2>
            </div>
            <div className="testimonial-cards" data-stagger="0.12">
              {/* TODO: Replace with real client testimonials */}
              {Array.from({ length: testimonialSlots }).map((_, i) => (
                <article key={i} className="testimonial-card testimonial-card--slot">
                  <PlaceholderSlot label="Testimonial" className="asset-slot--testimonial" />
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="section" id="awards">
        <div className="container">
          <p className="section-eyebrow fade-up">Awards & Recognition</p>
          <h2 className="heading-display heading-lg reveal-heading" style={{ marginBottom: 48 }}>
            Recognition That Reflects <HighlightWord>Excellence</HighlightWord>
          </h2>
          {/* TODO: Replace with real award badges and certifications */}
          <div className="awards-grid" data-stagger="0.08">
            {awards.map((award) => (
              <PlaceholderSlot key={award} label={award} className="awards-grid__slot" />
            ))}
          </div>
        </div>
      </section>

      {/* Careers */}
      <section className="section section--peach" id="careers">
        <div className="container">
          <div className="careers-layout">
            <div>
              <p className="section-eyebrow fade-up">Careers</p>
              <h2 className="heading-display heading-lg reveal-heading">
                Life at <HighlightWord>Bright</HighlightWord>
              </h2>
              <p className="body-lg fade-up" style={{ marginTop: 16 }}>
                Join a team of passionate thinkers, creators, and strategists
                building brands that endure. We nurture talent, encourage
                innovation, and invest in continuous learning through Brightsyde.
              </p>
            </div>
            <div className="careers-openings" data-stagger="0.1">
              <p className="careers-openings__title">Current Openings</p>
              {/* TODO: Replace with real job listings */}
              {careerOpenings.map((job) => (
                <article key={job.title} className="careers-opening tilt-card">
                  <div>
                    <h3 className="careers-opening__role">{job.title}</h3>
                    <p className="careers-opening__dept">{job.dept}</p>
                  </div>
                  <a href="#contact" className="link-arrow">
                    Apply Now →
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="section section--gray" id="insights">
        <div className="container">
          <div className="work-header">
            <div>
              <p className="section-eyebrow fade-up">Insights & Thought Leadership</p>
              <h2 className="heading-display heading-lg reveal-heading">
                Perspectives That Shape <HighlightWord>Modern</HighlightWord> Brands
              </h2>
            </div>
            <a href="#insights" className="btn-outline fade-up magnetic-btn">
              Read More →
            </a>
          </div>
          <div className="blog-grid" data-stagger="0.12">
            {/* TODO: Replace with real insight articles */}
            {insightCategories.map((category) => (
              <article key={category} className="blog-card blog-card--slot tilt-card">
                <PlaceholderSlot label="Article" className="blog-card__thumb asset-slot--blog" />
                <div className="blog-card__body">
                  <p className="blog-card__meta">{category}</p>
                  <h3 className="blog-card__title">Insight coming soon</h3>
                  <span className="blog-card__read">Read Article →</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="container">
          <p className="section-eyebrow fade-up">FAQ</p>
          <h2 className="heading-display heading-lg reveal-heading" style={{ marginBottom: 48 }}>
            Frequently Asked <HighlightWord>Questions</HighlightWord>
          </h2>
          <FaqAccordion />
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
                <li><a href="#brightsyde">Brightsyde</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#insights">Insights</a></li>
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
