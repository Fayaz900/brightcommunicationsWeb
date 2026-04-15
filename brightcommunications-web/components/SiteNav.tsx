"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import logo from "@/app/assets/logo.png";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#team", label: "Team" },
  { href: "#blog", label: "Insights" },
  { href: "#contact", label: "Let's Talk" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);

  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeMenu]);

  return (
    <>
      <nav id="navbar" className={open ? "nav-menu-open" : undefined}>
        <a href="#" className="nav-logo" onClick={closeMenu}>
          <Image
            src={logo}
            alt="Bright Communications"
            width={260}
            height={80}
            className="nav-logo-img"
            priority
            sizes="(max-width: 768px) 200px, 250px"
          />
        </a>

        <div className="nav-actions">
          <a href="#contact" className="nav-cta" onClick={closeMenu}>
            Let&apos;s Talk
          </a>
          <button
            type="button"
            className={`nav-toggle${open ? " is-open" : ""}`}
            aria-expanded={open}
            aria-controls="nav-menu-panel"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
          </button>
        </div>
      </nav>

      <div
        id="nav-menu-panel"
        className={`nav-menu-overlay${open ? " is-open" : ""}`}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
        onClick={closeMenu}
      >
        <div className="nav-menu-panel" onClick={(e) => e.stopPropagation()}>
          <div className="nav-menu-head">
            <Image
              src={logo}
              alt="Bright Communications"
              width={220}
              height={68}
              className="nav-menu-brand-logo"
              sizes="(max-width: 768px) 180px, 220px"
            />
            <button
              type="button"
              className="nav-menu-close"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <span className="nav-menu-close-text">Close</span>
              <span className="nav-menu-close-x">×</span>
            </button>
          </div>
          <ul className="nav-menu-links">
            {navItems.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className="nav-menu-link" onClick={closeMenu}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
