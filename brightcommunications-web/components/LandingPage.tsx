import Image from "next/image";

import { portfolioItems } from "@/app/assets/portfolio/data";
import { HeroSection } from "@/components/HeroSection";
import { HighlightWord } from "@/components/HighlightWord";
import { SiteNav } from "@/components/SiteNav";
import { StatsBar } from "@/components/StatsBar";
import { WorkPortfolioGrid } from "@/components/WorkPortfolioGrid";

const services = [
  {
    num: "01",
    name: "Brand Strategy",
    tags: ["Positioning", "Messaging", "Audit"],
  },
  {
    num: "02",
    name: "Visual Identity",
    tags: ["Logo", "Guidelines", "Design System"],
  },
  {
    num: "03",
    name: "Digital Marketing",
    tags: ["SEO", "Performance", "Social"],
  },
  {
    num: "04",
    name: "Web Design & Dev",
    tags: ["UI/UX", "CMS", "E-Commerce"],
  },
  {
    num: "05",
    name: "PR & Communications",
    tags: ["Media", "Crisis", "Outreach"],
  },
  {
    num: "06",
    name: "Content & Film",
    tags: ["Video", "Photography", "Copy"],
  },
] as const;

const clients = [
  "Nexora",
  "Verdant",
  "Lumiere",
  "Arka Group",
  "Solara",
  "Prism Co.",
  "Elevate",
  "Orbis",
  "Halo Tech",
  "Zephyr",
  "Nuvana",
  "Crestline",
];

const processSteps = [
  {
    num: "01 / DISCOVER",
    title: "Discovery & Research",
    desc: "We start by deeply understanding your business, audience, competitors and goals through workshops and immersive research.",
  },
  {
    num: "02 / DEFINE",
    title: "Strategy & Direction",
    desc: "We synthesise findings into a clear strategic platform — brand positioning, messaging architecture, and creative direction.",
  },
  {
    num: "03 / DESIGN",
    title: "Create & Craft",
    desc: "Our creative team designs, writes and builds with precision — turning strategy into compelling experiences that work across touchpoints.",
  },
  {
    num: "04 / DELIVER",
    title: "Launch & Grow",
    desc: "We launch, measure and iterate. Ongoing partnerships ensure your brand stays relevant and continues to perform.",
  },
];

const testimonials = [
  {
    quote:
      "BrightCommunications fundamentally changed how our brand shows up in the world. The strategic clarity they brought to our rebrand gave us a foundation we've built everything on since.",
    initials: "RK",
    name: "Rahul Krishnan",
    role: "CEO, Nexora Fintech",
  },
  {
    quote:
      "The team's ability to translate our values into a compelling visual language was extraordinary. Our brand identity now truly reflects who we are — and clients notice it immediately.",
    initials: "SA",
    name: "Shreya Aiyar",
    role: "Founder, Verdant Foods",
  },
  {
    quote:
      "From strategy to execution, Bright is a true partner. They don't just deliver — they challenge you to be better. Our digital presence has grown 3x since we started working together.",
    initials: "AM",
    name: "Arjun Menon",
    role: "CMO, Arka Group",
  },
];

const team = [
  { initials: "AN", name: "Ananya Nair", role: "Founder & CEO" },
  { initials: "VR", name: "Vivek Rao", role: "Creative Director" },
  { initials: "PM", name: "Priya Mohan", role: "Head of Strategy" },
  { initials: "KS", name: "Karan Shah", role: "Digital Lead" },
];

const blogPosts = [
  {
    num: "01",
    category: "Brand Strategy",
    date: "Mar 2025",
    title:
      "Why Your Brand Needs a Clear Point of View Before Anything Else",
  },
  {
    num: "02",
    category: "Digital",
    date: "Feb 2025",
    title: "The Rise of Intentional Design in the Age of AI",
  },
  {
    num: "03",
    category: "PR & Comms",
    date: "Jan 2025",
    title: "Storytelling That Converts: How Narrative Drives Business Results",
  },
];

export function LandingPage() {
  return (
    <>
      <SiteNav />

      <HeroSection />

      {/* Marquee */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[
            "Brand Strategy",
            "Visual Identity",
            "Digital Marketing",
            "Web Design",
            "Content Creation",
            "PR & Communications",
            "Brand Strategy",
            "Visual Identity",
            "Digital Marketing",
            "Web Design",
            "Content Creation",
            "PR & Communications",
          ].map((label, i) => (
            <span key={`${label}-${i}`} className="marquee__item">
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* About */}
      <section className="section" id="about">
        <div className="container">
          <div className="about-grid">
            <div>
              <p className="section-eyebrow fade-up">About us</p>
              <h2 className="heading-display heading-lg reveal-heading">
                We are a creative agency driven by ideas that{" "}
                <HighlightWord>move</HighlightWord> people.
              </h2>
              <p className="body-lg fade-up" style={{ marginTop: 24 }}>
                Founded in 2016, BrightCommunications partners with brands to
                create meaningful experiences. We blend strategic thinking with
                craft to deliver work that resonates, converts, and endures.
              </p>
              <p className="body-md fade-up" style={{ marginTop: 16 }}>
                Our team of strategists, designers, and digital specialists
                bring a holistic perspective to every brief — from brand
                identity and campaign strategy to digital presence and PR.
              </p>
              <div className="about-pills fade-up">
                {[
                  "Brand Identity",
                  "Strategy",
                  "Digital",
                  "Content",
                  "PR",
                  "Events",
                ].map((pill) => (
                  <span key={pill} className="pill">
                    {pill}
                  </span>
                ))}
              </div>
              <a href="#contact" className="btn-outline fade-up magnetic-btn">
                Start a Project →
              </a>
            </div>

            <div className="about-cards" data-stagger="0.15">
              <article className="about-card tilt-card">
                <div className="about-card__img">
                  <Image
                    src={portfolioItems[0].src}
                    alt="Brand strategy work"
                    fill
                    sizes="(max-width: 900px) 100vw, 280px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="about-card__body">
                  <h3 className="about-card__title">Strategy that sticks</h3>
                  <p className="body-md">
                    Positioning, messaging, and brand foundations built to last.
                  </p>
                </div>
              </article>
              <article className="about-card tilt-card">
                <div className="about-card__img">
                  <Image
                    src={portfolioItems[2].src}
                    alt="Digital marketing work"
                    fill
                    sizes="(max-width: 900px) 100vw, 280px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="about-card__body">
                  <h3 className="about-card__title">Design that converts</h3>
                  <p className="body-md">
                    Visual identity and digital experiences that drive growth.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Services mosaic */}
      <section className="section section--gray" id="services">
        <div className="container">
          <div className="services-grid-header">
            <p className="section-eyebrow fade-up">What we do</p>
            <h2 className="heading-display heading-lg reveal-heading">
              What we <HighlightWord>do</HighlightWord> best.
            </h2>
            <p className="body-lg fade-up" style={{ marginTop: 16 }}>
              From brand foundations to full-scale campaigns — we cover every
              dimension of communications that helps your brand grow.
            </p>
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
                    <div className="mosaic-card__tags">
                      {service.tags.map((tag) => (
                        <span key={tag} className="mosaic-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a href="#contact" className="link-arrow">
                      Learn more →
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quote + stats */}
      <section className="section">
        <div className="container">
          <div className="quote-stats">
            <blockquote className="quote-block reveal-blur fade-up">
              <p className="quote-block__text">
                &ldquo;{testimonials[0].quote}&rdquo;
              </p>
              <footer className="quote-block__author">
                <span className="quote-avatar">{testimonials[0].initials}</span>
                <div>
                  <div className="quote-name">{testimonials[0].name}</div>
                  <div className="quote-role">{testimonials[0].role}</div>
                </div>
              </footer>
            </blockquote>
            <div className="quote-image" data-parallax="0.15">
              <Image
                src={portfolioItems[4].src}
                alt="Team collaboration"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <StatsBar />
        </div>
      </section>

      {/* Featured services */}
      <section className="section section--dark">
        <div className="container">
          <p className="section-eyebrow fade-up" style={{ color: "rgba(255,255,255,0.5)" }}>
            Our expertise
          </p>
          <h2 className="heading-display heading-lg reveal-heading" style={{ color: "#fff", marginBottom: 48 }}>
            The services we offer for your <HighlightWord>business</HighlightWord>
          </h2>

          <div className="featured-services">
            <article className="featured-card featured-card--wide">
              <div>
                <h3 className="featured-card__title">
                  Turn your ideas into show-stopping brand experiences full of
                  eye-catching visuals.
                </h3>
                <p className="featured-card__desc">
                  Brand Strategy — positioning, messaging, and audits that give
                  your brand a clear voice in a crowded market.
                </p>
                <a href="#contact" className="btn-primary magnetic-btn">
                  Start a Project
                </a>
              </div>
              <div className="featured-card__visual">
                <Image
                  src={portfolioItems[0].src}
                  alt="Brand strategy"
                  fill
                  sizes="(max-width: 900px) 100vw, 45vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </article>

            <div className="featured-row">
              <article className="featured-card">
                <div>
                  <h3 className="featured-card__title">
                    Visual identity that sells more, worldwide.
                  </h3>
                  <p className="featured-card__desc">
                    Logo, guidelines, and design systems that make your brand
                    instantly recognisable.
                  </p>
                  <a href="#contact" className="btn-primary magnetic-btn">
                    Start a Project
                  </a>
                </div>
                <div className="featured-card__visual">
                  <Image
                    src={portfolioItems[1].src}
                    alt="Visual identity"
                    fill
                    sizes="(max-width: 900px) 100vw, 45vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </article>
              <article className="featured-card">
                <div>
                  <h3 className="featured-card__title">
                    Digital marketing without the jargon.
                  </h3>
                  <p className="featured-card__desc">
                    SEO, performance, and social — clear strategies that grow
                    your presence and your revenue.
                  </p>
                  <a href="#contact" className="btn-primary magnetic-btn">
                    Start a Project
                  </a>
                </div>
                <div className="featured-card__visual">
                  <Image
                    src={portfolioItems[3].src}
                    alt="Digital marketing"
                    fill
                    sizes="(max-width: 900px) 100vw, 45vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Work */}
      <section className="section" id="work">
        <div className="container">
          <div className="work-header">
            <div>
              <p className="section-eyebrow fade-up">Portfolio</p>
              <h2 className="heading-display heading-lg reveal-heading">
                Selected <HighlightWord>work</HighlightWord>.
              </h2>
            </div>
            <a href="#" className="btn-outline fade-up">
              View All Projects →
            </a>
          </div>
          <div className="work-grid" data-stagger="0.1">
            <WorkPortfolioGrid />
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section section--peach" id="process">
        <div className="container">
          <p className="section-eyebrow fade-up">Our process</p>
          <h2 className="heading-display heading-lg reveal-heading" style={{ marginBottom: 48 }}>
            How we <HighlightWord>work</HighlightWord> with you.
          </h2>
          <div className="process-grid" data-stagger="0.14">
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

      {/* Clients */}
      <section className="section" id="clients">
        <div className="container">
          <div className="about-grid" style={{ marginBottom: 48 }}>
            <h2 className="heading-display heading-md reveal-heading">
              Brands that <HighlightWord>trust</HighlightWord> us.
            </h2>
            <p className="body-lg fade-up">
              We&apos;ve had the privilege of working with forward-thinking brands
              across industries — from nimble startups to established
              enterprises.
            </p>
          </div>
          <div className="clients-grid" data-stagger="0.05">
            {clients.map((name) => (
              <div key={name} className="client-item">
                <span className="client-name">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section--gray" id="testimonials">
        <div className="container">
          <div className="testimonials-layout">
            <div>
              <p className="section-eyebrow fade-up">What clients say</p>
              <h2 className="heading-display heading-lg reveal-heading">
                Words from our <HighlightWord>partners</HighlightWord>.
              </h2>
              <p className="body-md fade-up" style={{ marginTop: 16 }}>
                Real feedback from brands we&apos;ve helped grow — strategy to
                execution, every step of the way.
              </p>
            </div>
            <div className="testimonial-cards" data-stagger="0.12">
              {testimonials.map((t) => (
                <article key={t.name} className="testimonial-card">
                  <p className="testimonial-card__quote">{t.quote}</p>
                  <footer className="testimonial-author">
                    <span className="testimonial-avatar">{t.initials}</span>
                    <div>
                      <div className="testimonial-name">{t.name}</div>
                      <div className="testimonial-role">{t.role}</div>
                      <div className="testimonial-stars">★★★★★</div>
                    </div>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" id="team">
        <div className="container">
          <div className="about-grid" style={{ marginBottom: 48 }}>
            <h2 className="heading-display heading-lg reveal-heading">
              The minds behind it <HighlightWord>all</HighlightWord>.
            </h2>
            <p className="body-lg fade-up">
              A diverse, passionate team of strategists, creatives and digital
              specialists — united by a love for work that actually works.
            </p>
          </div>
          <div className="team-grid" data-stagger="0.1">
            {team.map((member) => (
              <article key={member.name} className="team-card tilt-card">
                <span className="team-card__initial">{member.initials}</span>
                <div className="team-card__overlay">
                  <div className="team-card__name">{member.name}</div>
                  <div className="team-card__role">{member.role}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="section section--gray" id="blog">
        <div className="container">
          <div className="work-header">
            <h2 className="heading-display heading-lg reveal-heading">
              Insights &amp; <HighlightWord>ideas</HighlightWord>.
            </h2>
            <a href="#" className="btn-outline fade-up">
              All Articles →
            </a>
          </div>
          <div className="blog-grid" data-stagger="0.12">
            {blogPosts.map((post) => (
              <article key={post.num} className="blog-card tilt-card">
                <div className="blog-card__thumb">{post.num}</div>
                <div className="blog-card__body">
                  <p className="blog-card__meta">
                    {post.category} · {post.date}
                  </p>
                  <h3 className="blog-card__title">{post.title}</h3>
                  <span className="blog-card__read">Read Article →</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="cta-section" id="contact">
        <div className="container">
          <div className="cta-grid">
            <div>
              <h2 className="heading-display heading-lg reveal-heading">
                Let&apos;s build something remarkable.
              </h2>
              <p className="body-lg fade-up" style={{ marginTop: 16 }}>
                Tell us about your project — we&apos;ll get back within one
                business day.
              </p>
              <div className="cta-contact-info fade-up">
                <a href="mailto:hello@brightcomms.in">hello@brightcomms.in</a>
                <a href="tel:+919876543210">+91 98765 43210</a>
                <span>Kochi, Kerala, India</span>
              </div>
            </div>

            <form className="cta-form">
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
                Send Message →
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
              BrightCommunications
            </a>
            <ul className="footer-nav">
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#work">Work</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
            <a href="#contact" className="btn-primary magnetic-btn">
              Let&apos;s Talk
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
                <li>
                  <a href="#about">About Us</a>
                </li>
                <li>
                  <a href="#work">Our Work</a>
                </li>
                <li>
                  <a href="#team">Meet the Team</a>
                </li>
                <li>
                  <a href="#blog">Insights</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </div>
            <div>
              <p className="footer-col-title">Contact</p>
              <ul className="footer-links">
                <li>
                  <a href="mailto:hello@brightcomms.in">hello@brightcomms.in</a>
                </li>
                <li>
                  <a href="tel:+919876543210">+91 98765 43210</a>
                </li>
                <li>
                  <a href="#contact">Kochi, Kerala, India</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copy">
              © 2025 BrightCommunications. All rights reserved.
            </p>
            <div className="footer-social">
              <a href="#" className="social-icon" aria-label="LinkedIn">
                in
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                tw
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                ig
              </a>
            </div>
            <div className="footer-legal">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
