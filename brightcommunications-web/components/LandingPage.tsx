import { HeroStatNumbers } from "@/components/HeroStatNumbers";
import { SiteNav } from "@/components/SiteNav";
import { WorkPortfolioGrid } from "@/components/WorkPortfolioGrid";
import BorderGlow from "@/components/BorderGlow";

export function LandingPage() {
  return (
    <>
      <div className="cursor" id="cursor" />
      <div className="cursor-ring" id="cursorRing" />

      <SiteNav />

      <section className="hero" id="home">
        <div className="hero-video-bg" aria-hidden="true">
          <video
            className="hero-video"
            src="/assets/video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        </div>
        <div className="hero-video-overlay" aria-hidden="true" />
        <div className="hero-bg-text">BRIGHT</div>
        <div className="hero-content">
          <div className="hero-tag ">Est. 2016 · Kochi, India</div>
          <h1 className="hero-headline">
            We craft brands
            <br />
            <em>that speak</em>
            <br />
            louder.
          </h1>
          <div className="hero-bottom">
            <p className="hero-desc">
              BrightCommunications is a full-service creative agency helping
              ambitious brands grow through strategy, design & digital.
            </p>
            <div className="hero-stats">
              <HeroStatNumbers />
            </div>
            <div className="hero-scroll">
              <span className="scroll-line" />
              Scroll
            </div>
          </div>
        </div>
      </section>

      <div className="marquee-wrap">
        <div className="marquee-inner">
          <span className="marquee-item">Brand Strategy</span>
          <span className="marquee-item">Visual Identity</span>
          <span className="marquee-item">Digital Marketing</span>
          <span className="marquee-item">Web Design</span>
          <span className="marquee-item">Content Creation</span>
          <span className="marquee-item">PR & Communications</span>
          <span className="marquee-item">Brand Strategy</span>
          <span className="marquee-item">Visual Identity</span>
          <span className="marquee-item">Digital Marketing</span>
          <span className="marquee-item">Web Design</span>
          <span className="marquee-item">Content Creation</span>
          <span className="marquee-item">PR & Communications</span>
        </div>
      </div>

      <section className="about" id="about">
        <div className="container">
          <div className="section-label">About us</div>
          <div className="about-grid">
            <div>
              <h2 className="about-heading fade-up">
                We are a creative agency
                <br />
                <em>driven by ideas</em>
                <br />
                that move people.
              </h2>
            </div>
            <div className="about-right">
              <p className="about-text fade-up">
                Founded in 2016, BrightCommunications partners with brands to
                create meaningful experiences. We blend strategic thinking with
                craft to deliver work that resonates, converts, and endures.
              </p>
              <p className="about-text fade-up">
                Our team of strategists, designers, and digital specialists
                bring a holistic perspective to every brief — from brand
                identity and campaign strategy to digital presence and PR.
              </p>
              <div className="about-pills fade-up">
                <span className="pill">Brand Identity</span>
                <span className="pill">Strategy</span>
                <span className="pill">Digital</span>
                <span className="pill">Content</span>
                <span className="pill">PR</span>
                <span className="pill">Events</span>
              </div>
              <a href="#contact" className="btn-outline fade-up">
                Start a Project <span className="arrow">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <div className="container">
          <div className="services-header">
            <h2 className="services-heading fade-up">
              What we
              <br />
              do best.
            </h2>
            <p className="services-sub fade-up">
              From brand foundations to full-scale campaigns — we cover every
              dimension of communications that helps your brand grow.
            </p>
          </div>
          <div className="services-list">
            <div className="service-item fade-up">
              <span className="service-num">01</span>
              <span className="service-name">Brand Strategy</span>
              <div className="service-tags">
                <span className="service-tag">Positioning</span>
                <span className="service-tag">Messaging</span>
                <span className="service-tag">Audit</span>
              </div>
              <span className="service-arrow">↗</span>
            </div>
            <div className="service-item fade-up">
              <span className="service-num">02</span>
              <span className="service-name">Visual Identity</span>
              <div className="service-tags">
                <span className="service-tag">Logo</span>
                <span className="service-tag">Guidelines</span>
                <span className="service-tag">Design System</span>
              </div>
              <span className="service-arrow">↗</span>
            </div>
            <div className="service-item fade-up">
              <span className="service-num">03</span>
              <span className="service-name">Digital Marketing</span>
              <div className="service-tags">
                <span className="service-tag">SEO</span>
                <span className="service-tag">Performance</span>
                <span className="service-tag">Social</span>
              </div>
              <span className="service-arrow">↗</span>
            </div>
            <div className="service-item fade-up">
              <span className="service-num">04</span>
              <span className="service-name">Web Design & Dev</span>
              <div className="service-tags">
                <span className="service-tag">UI/UX</span>
                <span className="service-tag">CMS</span>
                <span className="service-tag">E-Commerce</span>
              </div>
              <span className="service-arrow">↗</span>
            </div>
            <div className="service-item fade-up">
              <span className="service-num">05</span>
              <span className="service-name">PR & Communications</span>
              <div className="service-tags">
                <span className="service-tag">Media</span>
                <span className="service-tag">Crisis</span>
                <span className="service-tag">Outreach</span>
              </div>
              <span className="service-arrow">↗</span>
            </div>
            <div className="service-item fade-up">
              <span className="service-num">06</span>
              <span className="service-name">Content & Film</span>
              <div className="service-tags">
                <span className="service-tag">Video</span>
                <span className="service-tag">Photography</span>
                <span className="service-tag">Copy</span>
              </div>
              <span className="service-arrow">↗</span>
            </div>
          </div>
        </div>
      </section>

      <section className="work" id="work">
        <div className="container">
          <div className="work-header">
            <h2 className="work-heading fade-up">
              Selected
              <br />
              Work.
            </h2>
            <a href="#" className="btn-outline fade-up">
              View All Projects <span className="arrow">↗</span>
            </a>
          </div>
          <div className="work-grid">
            <WorkPortfolioGrid />
          </div>
        </div>
      </section>

      <section className="process" id="process">
        <div className="container">
          <div className="process-header">
            <div className="section-label">Our Process</div>
            <h2 className="process-heading fade-up">
              How we
              <br />
              work with you.
            </h2>
          </div>

          <div className="process-steps">
            <BorderGlow
              edgeSensitivity={16}
              glowColor="40 80 80"
              backgroundColor="#00000"
              borderRadius={28}
              glowRadius={40}
              glowIntensity={1}
              coneSpread={25}
              animated={false}
              colors={['#c084fc', '#f472b6', '#38bdf8']}
              className="process-step fade-up"
            >
              <div className="process-step-num">01 / DISCOVER</div>
              <div className="process-step-icon">◎</div>
              <div className="process-step-title">Discovery & Research</div>
              <p className="process-step-desc">
                We start by deeply understanding your business, audience,
                competitors and goals through workshops and immersive research.
              </p>
            </BorderGlow>
            <BorderGlow
              edgeSensitivity={16}
              glowColor="40 80 80"
              backgroundColor="#00000"
              borderRadius={28}
              glowRadius={40}
              glowIntensity={1}
              coneSpread={25}
              animated={false}
              colors={['#c084fc', '#f472b6', '#38bdf8']}
              className="process-step fade-up"
            >
              <div className="process-step-num">02 / DEFINE</div>
              <div className="process-step-icon">◈</div>
              <div className="process-step-title">Strategy & Direction</div>
              <p className="process-step-desc">
                We synthesise findings into a clear strategic platform — brand
                positioning, messaging architecture, and creative direction.
              </p>
            </BorderGlow>
            <BorderGlow
              edgeSensitivity={16}
              glowColor="40 80 80"
              backgroundColor="#00000"
              borderRadius={28}
              glowRadius={40}
              glowIntensity={1}
              coneSpread={25}
              animated={false}
              colors={['#c084fc', '#f472b6', '#38bdf8']}
              className="process-step fade-up"
            >
              <div className="process-step-num">03 / DESIGN</div>
              <div className="process-step-icon">◇</div>
              <div className="process-step-title">Create & Craft</div>
              <p className="process-step-desc">
                Our creative team designs, writes and builds with precision —
                turning strategy into compelling experiences that work across
                touchpoints.
              </p>
            </BorderGlow>
            <BorderGlow
              edgeSensitivity={16}
              glowColor="40 80 80"
              backgroundColor="#00000"
              borderRadius={28}
              glowRadius={40}
              glowIntensity={1}
              coneSpread={25}
              animated={false}
              colors={['#c084fc', '#f472b6', '#38bdf8']}
              className="process-step fade-up"
            >
              <div className="process-step-num">04 / DELIVER</div>
              <div className="process-step-icon">◉</div>
              <div className="process-step-title">Launch & Grow</div>
              <p className="process-step-desc">
                We launch, measure and iterate. Ongoing partnerships ensure
                your brand stays relevant and continues to perform.
              </p>
            </BorderGlow>
          </div>

        </div>
      </section>

      <section className="clients" id="clients">
        <div className="container">
          <div className="clients-header">
            <h2 className="clients-heading fade-up">
              Brands that
              <br />
              trust us.
            </h2>
            <p
              className="fade-up"
              style={{
                fontSize: "15px",
                lineHeight: 1.7,
                color: "var(--gray)",
              }}
            >
              We&apos;ve had the privilege of working with forward-thinking
              brands across industries — from nimble startups to established
              enterprises.
            </p>
          </div>
          <div className="clients-grid">
            {[
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
            ].map((name) => (
              <div key={name} className="client-item fade-up">
                <span className="client-name">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials" id="testimonials">
        <div className="container">
          <div className="section-label">What clients say</div>
          <h2 className="testimonials-heading fade-up">
            Words from
            <br />
            our partners.
          </h2>
          <div className="testimonials-grid">
            <div className="testimonial-card fade-up">
              <p className="testimonial-quote">
                BrightCommunications fundamentally changed how our brand shows
                up in the world. The strategic clarity they brought to our
                rebrand gave us a foundation we&apos;ve built everything on
                since.
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">RK</div>
                <div>
                  <div className="testimonial-name">Rahul Krishnan</div>
                  <div className="testimonial-role">CEO, Nexora Fintech</div>
                  <div className="testimonial-stars">★★★★★</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card fade-up">
              <p className="testimonial-quote">
                The team&apos;s ability to translate our values into a
                compelling visual language was extraordinary. Our brand
                identity now truly reflects who we are — and clients notice it
                immediately.
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">SA</div>
                <div>
                  <div className="testimonial-name">Shreya Aiyar</div>
                  <div className="testimonial-role">Founder, Verdant Foods</div>
                  <div className="testimonial-stars">★★★★★</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card fade-up">
              <p className="testimonial-quote">
                From strategy to execution, Bright is a true partner. They
                don&apos;t just deliver — they challenge you to be better.
                That&apos;s rare. Our digital presence has grown 3x since we
                started working together.
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">AM</div>
                <div>
                  <div className="testimonial-name">Arjun Menon</div>
                  <div className="testimonial-role">CMO, Arka Group</div>
                  <div className="testimonial-stars">★★★★★</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="team" id="team">
        <div className="container">
          <div className="team-header">
            <h2 className="team-heading fade-up">
              The minds
              <br />
              behind it all.
            </h2>
            <p className="team-sub fade-up">
              A diverse, passionate team of strategists, creatives and digital
              specialists — united by a love for work that actually works.
            </p>
          </div>
          <div className="team-grid">
            <div className="team-card fade-up">
              <div className="team-card-bg">
                <span className="team-card-initial">AN</span>
              </div>
              <div className="team-card-overlay">
                <div className="team-card-name">Ananya Nair</div>
                <div className="team-card-role">Founder & CEO</div>
                <div className="team-card-links">
                  <a className="team-link" href="#">
                    in
                  </a>
                  <a className="team-link" href="#">
                    tw
                  </a>
                </div>
              </div>
            </div>
            <div className="team-card fade-up">
              <div className="team-card-bg">
                <span className="team-card-initial">VR</span>
              </div>
              <div className="team-card-overlay">
                <div className="team-card-name">Vivek Rao</div>
                <div className="team-card-role">Creative Director</div>
                <div className="team-card-links">
                  <a className="team-link" href="#">
                    in
                  </a>
                  <a className="team-link" href="#">
                    be
                  </a>
                </div>
              </div>
            </div>
            <div className="team-card fade-up">
              <div className="team-card-bg">
                <span className="team-card-initial">PM</span>
              </div>
              <div className="team-card-overlay">
                <div className="team-card-name">Priya Mohan</div>
                <div className="team-card-role">Head of Strategy</div>
                <div className="team-card-links">
                  <a className="team-link" href="#">
                    in
                  </a>
                  <a className="team-link" href="#">
                    tw
                  </a>
                </div>
              </div>
            </div>
            <div className="team-card fade-up">
              <div className="team-card-bg">
                <span className="team-card-initial">KS</span>
              </div>
              <div className="team-card-overlay">
                <div className="team-card-name">Karan Shah</div>
                <div className="team-card-role">Digital Lead</div>
                <div className="team-card-links">
                  <a className="team-link" href="#">
                    in
                  </a>
                  <a className="team-link" href="#">
                    gh
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog" id="blog">
        <div className="container">
          <div className="blog-header">
            <h2 className="blog-heading fade-up">
              Insights &
              <br />
              Ideas.
            </h2>
            <a href="#" className="btn-outline fade-up">
              All Articles <span className="arrow">↗</span>
            </a>
          </div>
          <div className="blog-grid">
            <div className="blog-card fade-up">
              <div className="blog-card-img">
                <div className="blog-card-img-bg" />
                <span className="blog-card-img-text">01</span>
              </div>
              <div className="blog-card-content">
                <div className="blog-card-meta">
                  <span>Brand Strategy</span>
                  <span>·</span>
                  <span>Mar 2025</span>
                </div>
                <div className="blog-card-title">
                  Why Your Brand Needs a Clear Point of View Before Anything
                  Else
                </div>
                <div className="blog-read">Read Article</div>
              </div>
            </div>
            <div className="blog-card fade-up">
              <div className="blog-card-img">
                <div className="blog-card-img-bg" />
                <span className="blog-card-img-text">02</span>
              </div>
              <div className="blog-card-content">
                <div className="blog-card-meta">
                  <span>Digital</span>
                  <span>·</span>
                  <span>Feb 2025</span>
                </div>
                <div className="blog-card-title">
                  The Rise of Intentional Design in the Age of AI
                </div>
                <div className="blog-read">Read Article</div>
              </div>
            </div>
            <div className="blog-card fade-up">
              <div className="blog-card-img">
                <div className="blog-card-img-bg" />
                <span className="blog-card-img-text">03</span>
              </div>
              <div className="blog-card-content">
                <div className="blog-card-meta">
                  <span>PR & Comms</span>
                  <span>·</span>
                  <span>Jan 2025</span>
                </div>
                <div className="blog-card-title">
                  Storytelling That Converts: How Narrative Drives Business
                  Results
                </div>
                <div className="blog-read">Read Article</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="container">
          <div className="contact-inner">
            <div>
              <div className="section-label">Get in touch</div>
              <h2 className="contact-heading fade-up">
                Let&apos;s build
                <br />
                something
                <br />
                <em>remarkable.</em>
              </h2>
            </div>
            <div className="contact-right">
              <div className="contact-info fade-up">
                <div className="contact-info-item">
                  <span className="contact-info-label">Email</span>
                  <a
                    href="mailto:hello@brightcomms.in"
                    className="contact-info-val"
                  >
                    hello@brightcomms.in
                  </a>
                </div>
                <div className="contact-info-item">
                  <span className="contact-info-label">Phone</span>
                  <a href="tel:+919876543210" className="contact-info-val">
                    +91 98765 43210
                  </a>
                </div>
                <div className="contact-info-item">
                  <span className="contact-info-label">Location</span>
                  <span className="contact-info-val">
                    Kochi, Kerala, India
                  </span>
                </div>
              </div>
              <form className="contact-form fade-up">
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="name">Your Name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Rahul Menon"
                      name="name"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="rahul@company.com"
                      name="email"
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    type="text"
                    placeholder="Your company name"
                    name="company"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="service">Service Interested In</label>
                  <select id="service" name="service" defaultValue="">
                    <option value="">Select a service</option>
                    <option>Brand Strategy</option>
                    <option>Visual Identity</option>
                    <option>Digital Marketing</option>
                    <option>Web Design & Dev</option>
                    <option>PR & Communications</option>
                    <option>Content & Film</option>
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="message">Tell us about your project</label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Briefly describe your goals and timeline..."
                    name="message"
                  />
                </div>
                <button type="submit" className="btn-submit">
                  Send Message ↗
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-inner">
            <div className="footer-brand">
              <div className="footer-logo">BrightCommunications</div>
              <p className="footer-tagline">
                A full-service creative agency crafting brands that connect,
                communicate, and convert.
              </p>
              <div className="footer-social">
                <a className="social-btn" href="#">
                  in
                </a>
                <a className="social-btn" href="#">
                  tw
                </a>
                <a className="social-btn" href="#">
                  ig
                </a>
                <a className="social-btn" href="#">
                  be
                </a>
              </div>
            </div>
            <div>
              <div className="footer-col-title">Services</div>
              <ul className="footer-links">
                <li>
                  <a href="#">Brand Strategy</a>
                </li>
                <li>
                  <a href="#">Visual Identity</a>
                </li>
                <li>
                  <a href="#">Digital Marketing</a>
                </li>
                <li>
                  <a href="#">Web Design & Dev</a>
                </li>
                <li>
                  <a href="#">PR & Communications</a>
                </li>
                <li>
                  <a href="#">Content & Film</a>
                </li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Company</div>
              <ul className="footer-links">
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Our Work</a>
                </li>
                <li>
                  <a href="#">Meet the Team</a>
                </li>
                <li>
                  <a href="#">Insights</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Contact</div>
              <ul className="footer-links">
                <li>
                  <a href="mailto:hello@brightcomms.in">hello@brightcomms.in</a>
                </li>
                <li>
                  <a href="tel:+919876543210">+91 98765 43210</a>
                </li>
                <li>
                  <a href="#">Kochi, Kerala, India</a>
                </li>
                <li style={{ marginTop: "20px" }}>
                  <a href="#">Schedule a Call →</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copy">
              © 2025 BrightCommunications. All rights reserved.
            </p>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
