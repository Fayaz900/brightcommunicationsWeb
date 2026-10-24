import Link from "next/link";
import { FloatingContact } from "@/components/FloatingContact";
import { contactInfo } from "@/lib/site-content";
import type { SiteSettingsData } from "@/lib/site-settings";

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
          <div>
            <Link href="/" className="footer-logo">
              Bright Communications
            </Link>
            <p className="footer-tagline">Good thinking. Bright ideas. Better connections.</p>
          </div>
          <Link href="/contact" className="btn-outline btn-outline--light magnetic-btn">
            Tell Us What You Have In Mind
          </Link>
        </div>

        <div className="footer-columns">
          <div className="footer-about">
            <p>
              An integrated communications agency in Kochi, Kerala, helping
              brands find their voice and make their mark since 1996.
            </p>
          </div>
          <div>
            <p className="footer-col-title">Explore</p>
            <ul className="footer-links">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/services">Our Services</Link></li>
              <li><Link href="/portfolio">Our Work</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/portfolio">Case Studies</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <p className="footer-col-title">Say hello.</p>
            <ul className="footer-links">
              <li>{activeContact.location}, India</li>
              <li>
                <a href={`mailto:${activeContact.email}`}>{activeContact.email}</a>
              </li>
              <li>
                <a href={`tel:${activeContact.phone.replace(/\s/g, "")}`}>
                  {activeContact.phone}
                </a>
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
