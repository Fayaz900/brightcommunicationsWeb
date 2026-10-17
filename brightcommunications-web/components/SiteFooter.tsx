import Link from "next/link";
import { FloatingContact } from "@/components/FloatingContact";
import { navItems, services, contactInfo } from "@/lib/site-content";
import type { SiteSettingsData } from "@/lib/site-settings";
import { slugify } from "@/lib/slug";

export function SiteFooter({ settings }: { settings?: SiteSettingsData }) {
  const activeContact = {
    email: settings?.email || contactInfo.email,
    phone: settings?.phone || contactInfo.phone,
    location: settings?.location || contactInfo.location,
  };
  const socialLinks = [
    { label: "LinkedIn", text: "in", url: settings?.linkedinUrl },
    { label: "Instagram", text: "ig", url: settings?.instagramUrl },
    { label: "Facebook", text: "fb", url: settings?.facebookUrl },
  ].filter((social) => social.url && /^https?:\/\//i.test(social.url));

  return (
    <footer className="site-footer">
      <FloatingContact phone={settings?.phone} whatsapp={settings?.whatsapp} />
      <div className="container">
        <div className="footer-top">
          <Link href="/" className="footer-logo">
            Bright Communications
          </Link>
          <ul className="footer-nav footer-nav--wide">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <Link href="/contact" className="btn-outline btn-outline--light magnetic-btn">
            Start Your Project
          </Link>
        </div>

        <div className="footer-columns">
          <div>
            <p className="footer-col-title">Services</p>
            <ul className="footer-links">
              {services.map((s) => (
                <li key={s.num}>
                  <Link href={`/services/${slugify(s.name)}`}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="footer-col-title">Company</p>
            <ul className="footer-links">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/portfolio">Portfolio</Link></li>
              <li><Link href="/industries">Industries</Link></li>
              <li><Link href="/clients">Clients</Link></li>
              <li><Link href="/testimonials">Testimonials</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact</Link></li>
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
                <Link href="/contact">{activeContact.location}</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} Bright Communications. All rights reserved.
          </p>
          {socialLinks.length > 0 && <div className="footer-social">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.url} className="social-icon" aria-label={social.label} target="_blank" rel="noopener noreferrer">
                {social.text}
              </a>
            ))}
          </div>}
        </div>
      </div>
    </footer>
  );
}
