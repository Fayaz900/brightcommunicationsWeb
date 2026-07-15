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
  const cards = gsap.utils.toArray<HTMLElement>(".tilt-card").filter(
    (card) => !card.parentElement?.hasAttribute("data-stagger")
  );

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

function initStaggerReveals() {
  gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((container) => {
    const children = gsap.utils.toArray<HTMLElement>(
      container.querySelectorAll(":scope > *")
    );
    if (children.length === 0) return;

    const stagger = Number(container.dataset.stagger) || 0.1;

    gsap.to(children, {
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container,
        start: revealOnce.start,
        once: true,
      },
    });
  });
}

function initFadeUpReveals() {
  gsap.utils.toArray<HTMLElement>(".fade-up").forEach((el) => {
    if (el.parentElement?.hasAttribute("data-stagger")) return;

    gsap.to(el, {
      autoAlpha: 1,
      y: 0,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: el.dataset.revealDuration ? Number(el.dataset.revealDuration) : 0.85,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: el.dataset.revealStart || revealOnce.start,
        once: true,
      },
    });
  });
}

function initHeadingReveals() {
  gsap.utils.toArray<HTMLElement>(".reveal-heading").forEach((heading) => {
    gsap.set(heading, { clipPath: "inset(100% 0% 0% 0%)" });

    gsap.to(heading, {
      autoAlpha: 1,
      y: 0,
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1,
      ease: "power4.out",
      scrollTrigger: { trigger: heading, ...revealOnce },
    });
  });
}

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

    let refreshPending = false;
    const refreshScroll = () => {
      if (refreshPending) return;
      refreshPending = true;
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        refreshPending = false;
      });
    };

    if (prefersReducedMotion()) {
      gsap.set(".fade-up, .reveal-heading, [data-stagger] > *", {
        clearProps: "all",
        autoAlpha: 1,
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
      if (document.querySelector(".hero__filmstrip-wrap")) {
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
      }

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

      initHeadingReveals();
      initFadeUpReveals();
      initStaggerReveals();

      gsap.utils.toArray<HTMLElement>(".featured-card").forEach((card, i) => {
        gsap.set(card, { autoAlpha: 0, x: i % 2 === 0 ? -60 : 60 });

        gsap.to(card, {
          autoAlpha: 1,
          x: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: card, ...revealOnce },
        });

        const visual = card.querySelector(".featured-card__visual");
        if (visual) {
          gsap.set(visual, { scale: 1.12 });
          gsap.to(visual, {
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: { trigger: card, ...revealOnce },
          });
        }
      });

      gsap.set(".stats-bar .stat-item", { autoAlpha: 0, y: 28, scale: 0.92 });
      gsap.to(".stats-bar .stat-item", {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.75,
        stagger: 0.12,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: ".stats-bar", ...revealOnce },
      });

      gsap.set(".cta-form > *", { autoAlpha: 0, y: 24 });
      gsap.to(".cta-form > *", {
        autoAlpha: 1,
        y: 0,
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
