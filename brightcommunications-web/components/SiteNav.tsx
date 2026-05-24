"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import logo from "@/app/assets/logo.png";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
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
      <header className="site-nav" id="navbar">
        <div className="site-nav__inner">
          <a href="#home" className="site-nav__logo" onClick={closeMenu}>
            <Image
              src={logo}
              alt="BrightCommunications"
              width={180}
              height={48}
              className="site-nav__logo-img"
              priority
            />
          </a>

          <ul className="site-nav__links">
            {navItems.map(({ href, label }) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>

          <div className="site-nav__actions">
            <a href="#contact" className="site-nav__cta" onClick={closeMenu}>
              Let&apos;s Talk
            </a>
            <button
              type="button"
              className={`site-nav__toggle${open ? " is-open" : ""}`}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`nav-overlay${open ? " is-open" : ""}`}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          className="nav-overlay__close"
          onClick={closeMenu}
          aria-label="Close menu"
        >
          ×
        </button>
        <ul className="nav-overlay__links">
          {[
            ...navItems,
            { href: "#team", label: "Team" },
            { href: "#blog", label: "Insights" },
          ].map(({ href, label }) => (
            <li key={href}>
              <a href={href} onClick={closeMenu}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
