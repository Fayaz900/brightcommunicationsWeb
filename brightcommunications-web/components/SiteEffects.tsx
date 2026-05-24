"use client";

import { useEffect } from "react";

export function SiteEffects() {
  useEffect(() => {
    const nav = document.getElementById("navbar");
    const onScroll = () => {
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();

    const faders = document.querySelectorAll(".fade-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    faders.forEach((el) => observer.observe(el));

    const form = document.querySelector<HTMLFormElement>(".cta-form");
    const preventSubmit = (e: Event) => e.preventDefault();
    form?.addEventListener("submit", preventSubmit);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      form?.removeEventListener("submit", preventSubmit);
    };
  }, []);

  return null;
}
