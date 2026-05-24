"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function initMagneticButtons() {
  const buttons = gsap.utils.toArray<HTMLElement>(".magnetic-btn");

  buttons.forEach((btn) => {
    const strength = 0.35;

    const onMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * strength;
      const y = (e.clientY - rect.top - rect.height / 2) * strength;
      gsap.to(btn, { x, y, duration: 0.45, ease: "power2.out" });
    };

    const onLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.35)" });
    };

    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
  });
}

function initTiltCards() {
  const cards = gsap.utils.toArray<HTMLElement>(".tilt-card");

  cards.forEach((card) => {
    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateY: x * 14,
        rotateX: -y * 14,
        transformPerspective: 900,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const onLeave = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.9,
        ease: "elastic.out(1, 0.4)",
      });
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
  });
}

function initWorkCardHover() {
  const cards = gsap.utils.toArray<HTMLElement>(".work-card");

  cards.forEach((card) => {
    const img = card.querySelector(".work-card__bg");
    if (!img) return;

    const onEnter = () => {
      gsap.to(img, { scale: 1.08, duration: 0.7, ease: "power2.out" });
      gsap.to(card, { y: -6, duration: 0.5, ease: "power2.out" });
    };

    const onLeave = () => {
      gsap.to(img, { scale: 1, duration: 0.7, ease: "power2.out" });
      gsap.to(card, { y: 0, duration: 0.5, ease: "power2.out" });
    };

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);
  });
}

/** Play-once scroll reveal — never reverse (prevents invisible text on scroll) */
const revealOnce = {
  start: "top 92%",
  once: true,
} as const;

export function SiteAnimations() {
  useLayoutEffect(() => {
    const nav = document.getElementById("navbar");
    let lastScroll = 0;

    const onNavScroll = () => {
      if (!nav) return;
      nav.classList.toggle("scrolled", window.scrollY > 40);

      if (prefersReducedMotion()) return;

      const y = window.scrollY;
      if (y > lastScroll && y > 220) {
        gsap.to(nav, { y: "-100%", duration: 0.35, ease: "power3.inOut" });
      } else {
        gsap.to(nav, { y: "0%", duration: 0.4, ease: "power3.out" });
      }
      lastScroll = y;
    };

    window.addEventListener("scroll", onNavScroll, { passive: true });
    onNavScroll();

    const form = document.querySelector<HTMLFormElement>(".cta-form");
    const preventSubmit = (e: Event) => e.preventDefault();
    form?.addEventListener("submit", preventSubmit);

    const refreshScroll = () => ScrollTrigger.refresh();

    if (prefersReducedMotion()) {
      gsap.set(".fade-up, .reveal-heading, [data-stagger] > *", {
        clearProps: "all",
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "none",
        clipPath: "none",
      });
      return () => {
        window.removeEventListener("scroll", onNavScroll);
        form?.removeEventListener("submit", preventSubmit);
      };
    }

    document.body.classList.add("animations-ready");

    const ctx = gsap.context(() => {
      gsap.to(".hero__filmstrip-wrap", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = Number(el.dataset.parallax) || 0.2;
        gsap.to(el, {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".reveal-heading").forEach((heading) => {
        gsap.from(heading, {
          y: 48,
          opacity: 0,
          clipPath: "inset(100% 0% 0% 0%)",
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: heading, ...revealOnce },
        });
      });

      gsap.utils.toArray<HTMLElement>(".fade-up").forEach((el) => {
        const y = el.dataset.revealY ? Number(el.dataset.revealY) : 40;
        const x = el.dataset.revealX ? Number(el.dataset.revealX) : 0;
        const scale = el.dataset.revealScale ? Number(el.dataset.revealScale) : 1;

        gsap.from(el, {
          y,
          x,
          scale,
          opacity: 0,
          filter: el.classList.contains("reveal-blur") ? "blur(8px)" : "blur(0px)",
          duration: el.dataset.revealDuration ? Number(el.dataset.revealDuration) : 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: el.dataset.revealStart || revealOnce.start,
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((container) => {
        const children = container.querySelectorAll(":scope > *");
        const stagger = Number(container.dataset.stagger) || 0.1;

        gsap.from(children, {
          y: 40,
          opacity: 0,
          scale: 0.96,
          duration: 0.8,
          stagger,
          ease: "power3.out",
          scrollTrigger: { trigger: container, ...revealOnce },
        });
      });

      gsap.utils.toArray<HTMLElement>(".featured-card").forEach((card, i) => {
        gsap.from(card, {
          x: i % 2 === 0 ? -60 : 60,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: card, ...revealOnce },
        });

        const visual = card.querySelector(".featured-card__visual");
        if (visual) {
          gsap.from(visual, {
            scale: 1.12,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: { trigger: card, ...revealOnce },
          });
        }
      });

      gsap.from(".stats-bar .stat-item", {
        y: 28,
        opacity: 0,
        scale: 0.92,
        duration: 0.75,
        stagger: 0.12,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: ".stats-bar", ...revealOnce },
      });

      gsap.from(".cta-form > *", {
        y: 24,
        opacity: 0,
        duration: 0.65,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: ".cta-form", ...revealOnce },
      });

      gsap.to(".marquee", {
        "--marquee-duration": "14s",
        ease: "none",
        scrollTrigger: {
          trigger: ".marquee",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      initMagneticButtons();
      initTiltCards();
      initWorkCardHover();
    });

    window.addEventListener("load", refreshScroll);
    window.addEventListener("hero-intro-start", refreshScroll);

    refreshScroll();

    return () => {
      document.body.classList.remove("animations-ready");
      window.removeEventListener("scroll", onNavScroll);
      window.removeEventListener("load", refreshScroll);
      window.removeEventListener("hero-intro-start", refreshScroll);
      form?.removeEventListener("submit", preventSubmit);
      ctx.revert();
    };
  }, []);

  return null;
}
