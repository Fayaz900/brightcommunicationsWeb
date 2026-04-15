"use client";

import { useEffect } from "react";

export function SiteEffects() {
  useEffect(() => {
    const nav = document.getElementById("navbar");
    const onScroll = () => {
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 60);
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
      { threshold: 0.12 }
    );
    faders.forEach((el) => observer.observe(el));

    const heroTag = document.querySelector(".hero-tag");
    const heroHeadline = document.querySelector(".hero-headline");
    const heroBottom = document.querySelector(".hero-bottom");
    [heroTag, heroHeadline, heroBottom].forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.opacity = "0";
        el.style.transform = "translateY(24px)";
      }
    });

    const heroTimer = window.setTimeout(() => {
      if (heroTag instanceof HTMLElement) {
        heroTag.style.cssText +=
          "opacity:1;transform:none;transition:all 0.8s ease 0.2s";
      }
      if (heroHeadline instanceof HTMLElement) {
        heroHeadline.style.cssText +=
          "opacity:1;transform:none;transition:all 0.9s ease 0.4s";
      }
      if (heroBottom instanceof HTMLElement) {
        heroBottom.style.cssText +=
          "opacity:1;transform:none;transition:all 0.8s ease 0.7s";
      }
    }, 100);

    const form = document.querySelector<HTMLFormElement>(".contact-form");
    const preventSubmit = (e: Event) => e.preventDefault();
    form?.addEventListener("submit", preventSubmit);

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(heroTimer);
      observer.disconnect();
      form?.removeEventListener("submit", preventSubmit);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    if (mq.matches) return;

    const cursor = document.getElementById("cursor");
    const ring = document.getElementById("cursorRing");
    if (!cursor || !ring) return;

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = `${mx}px`;
      cursor.style.top = `${my}px`;
    };
    document.addEventListener("mousemove", onMove);

    let rafId = 0;
    let ringRunning = true;
    const animRing = () => {
      if (!ringRunning) return;
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      rafId = requestAnimationFrame(animRing);
    };
    animRing();

    const hoverables = document.querySelectorAll(
      "a, button, .service-item, .work-card, .team-card, .blog-card"
    );
    const enter = () => {
      cursor.classList.add("hovered");
      ring.classList.add("hovered");
    };
    const leave = () => {
      cursor.classList.remove("hovered");
      ring.classList.remove("hovered");
    };
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      ringRunning = false;
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return null;
}
