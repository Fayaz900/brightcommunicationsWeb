import Link from "next/link";
import { navItems, services, contactInfo } from "@/lib/site-content";
import type { SiteSettingsData } from "@/lib/site-settings";

export function SiteFooter({ settings }: { settings?: SiteSettingsData }) {
  const activeContact = {
    email: settings?.email || contactInfo.email,
    phone: settings?.phone || contactInfo.phone,
    location: settings?.location || contactInfo.location,
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <Link href="/#home" className="footer-logo">
            Bright Communications
          </Link>
          <ul className="footer-nav footer-nav--wide">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          <a href="/#contact" className="btn-outline btn-outline--light magnetic-btn">
            Start Your Project
          </a>
        </div>

        <div className="footer-columns">
          <div>
            <p className="footer-col-title">Services</p>
            <ul className="footer-links">
              {services.map((s) => (
                <li key={s.num}>
                  <a href="/#services">{s.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="footer-col-title">Company</p>
            <ul className="footer-links">
              <li><a href="/#about">About Us</a></li>
              <li><a href="/#clients">Clients</a></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><a href="/#contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="footer-col-title">Contact</p>
            <ul className="footer-links">
              <li>
                <a href={`mailto:${activeContact.email}`}>{activeContact.email}</a>
              </li>
              <li>
                <a href={`tel:${activeContact.phone.replace(/\s/g, "")}`}>
                  {activeContact.phone}
                </a>
              </li>
              <li>
                <a href="/#contact">{activeContact.location}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} Bright Communications. All rights reserved.
          </p>
          <div className="footer-social">
            <a
              href={settings?.linkedinUrl ? settings.linkedinUrl : "#"}
              className="social-icon"
              aria-label="LinkedIn"
              {...(settings?.linkedinUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              in
            </a>
            <a
              href={settings?.instagramUrl ? settings.instagramUrl : "#"}
              className="social-icon"
              aria-label="Instagram"
              {...(settings?.instagramUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              ig
            </a>
            <a
              href={settings?.facebookUrl ? settings.facebookUrl : "#"}
              className="social-icon"
              aria-label="Facebook"
              {...(settings?.facebookUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              fb
            </a>
          </div>
          <div className="footer-legal">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
