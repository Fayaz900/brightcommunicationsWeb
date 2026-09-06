"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import logo from "@/app/assets/logo.png";

import { navItems } from "@/lib/site-content";

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeMenu = useCallback(() => setOpen(false), []);

  const getHref = useCallback(
    (href: string) => {
      if (!href.startsWith("#")) return href;
      return pathname === "/" ? href : `/${href}`;
    },
    [pathname],
  );

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
          <a href={getHref("#home")} className="site-nav__logo" onClick={closeMenu}>
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
                <a href={getHref(href)}>{label}</a>
              </li>
            ))}
          </ul>

          <div className="site-nav__actions">
            <a href={getHref("#contact")} className="site-nav__cta" onClick={closeMenu}>
              Start Your Project
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
          &times;
        </button>
        <ul className="nav-overlay__links">
          {navItems.map(({ href, label }) => (
            <li key={href}>
              <a href={getHref(href)} onClick={closeMenu}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

