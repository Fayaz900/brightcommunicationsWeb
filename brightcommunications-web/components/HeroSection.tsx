"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import { portfolioItems } from "@/app/assets/portfolio/data";

const HERO_INTRO_FLAG = "data-hero-intro-fired";

function markHeroIntroFired() {
  document.documentElement.setAttribute(HERO_INTRO_FLAG, "true");
}

function wasHeroIntroFired() {
  return document.documentElement.getAttribute(HERO_INTRO_FLAG) === "true";
}

function revealHeroCopy(root: HTMLElement) {
  root.classList.remove("hero--pending");
  root.classList.add("hero--ready");

  gsap.set(root.querySelectorAll(".hero__copy > *"), {
    clearProps: "all",
  });
}

export function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);
  const introDoneRef = useRef(false);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealHeroCopy(root);
      return;
    }

    let ctx: gsap.Context | null = null;

    const runHeroIntro = () => {
      if (introDoneRef.current) {
        revealHeroCopy(root);
        return;
      }

      markHeroIntroFired();
      root.classList.remove("hero--pending");

      ctx = gsap.context(() => {
        const copy = root.querySelector(".hero__copy");
        if (!copy) return;

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => {
            introDoneRef.current = true;
            revealHeroCopy(root);
          },
        });

        tl.fromTo(
          ".hero__decor--1",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 0.4, duration: 0.75, ease: "back.out(1.6)" }
        )
          .fromTo(
            ".hero__decor--2",
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.55, ease: "back.out(1.8)" },
            "-=0.55"
          )
          .fromTo(
            ".hero__decor--3",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 0.35, duration: 0.6 },
            "-=0.4"
          )
          .fromTo(
            ".hero__orb",
            { scale: 0.6, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1, stagger: 0.12 },
            "-=0.6"
          )
          .from(
            ".hero__copy > *",
            {
              y: 28,
              opacity: 0,
              duration: 0.55,
              stagger: 0.1,
              ease: "power4.out",
            },
            "-=0.35"
          )
          .from(
            ".hero__film-item",
            {
              y: 70,
              opacity: 0,
              scale: 0.92,
              duration: 0.55,
              stagger: 0.05,
              ease: "power3.out",
            },
            "-=0.2"
          )
          .from(
            ".hero__scroll-hint",
            { opacity: 0, y: 8, duration: 0.4 },
            "-=0.15"
          );

        gsap.to(".hero__decor--1", {
          y: -14,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".hero__decor--2", {
          y: 10,
          x: 6,
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.3,
        });

        gsap.to(".hero__decor--3", {
          x: -10,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.15,
        });

        gsap.to(".hero__orb--1", {
          y: -20,
          x: 10,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".hero__orb--2", {
          y: 16,
          x: -12,
          duration: 4.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.5,
        });

        const track = root.querySelector(".hero__filmstrip-track");
        if (track) {
          gsap.to(track, {
            xPercent: -50,
            ease: "none",
            duration: 24,
            repeat: -1,
          });
        }
      }, root);
    };

    const onIntro = () => runHeroIntro();
    window.addEventListener("hero-intro-start", onIntro);

    if (wasHeroIntroFired()) {
      runHeroIntro();
    }

    return () => {
      window.removeEventListener("hero-intro-start", onIntro);
      if (!introDoneRef.current) {
        ctx?.revert();
      }
    };
  }, []);

  const stripItems = [...portfolioItems, ...portfolioItems];

  return (
    <section className="hero hero--pending" id="home" ref={rootRef}>
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__glow" />
        <span className="hero__orb hero__orb--1" />
        <span className="hero__orb hero__orb--2" />
        <span className="hero__grain" />
      </div>

      <span className="hero__decor hero__decor--1" aria-hidden="true" />
      <span className="hero__decor hero__decor--2" aria-hidden="true" />
      <span className="hero__decor hero__decor--3" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="hero__tag">Building Brands Since 1996</p>

          <h1 className="hero__title hero__title--long">
            Ideas That Inspire.
            <br />
            Strategies That Deliver.
            <br />
            <em>Brands That Endure.</em>
          </h1>

          <p className="hero__desc">
            For nearly three decades, Bright Communications has helped businesses
            build meaningful connections, create lasting impressions, and achieve
            sustainable growth through strategic communication.
          </p>

          <p className="hero__desc hero__desc--secondary">
            Founded by K.V. Shaji in 1996, Bright has evolved from a traditional
            advertising agency into a fully integrated communications partner
            delivering branding, advertising, digital marketing, content
            production, performance marketing, website development, and digital
            experiences for brands across industries.
          </p>

          <div className="hero__cta-row">
            <a
              href="#contact"
              className="btn-outline btn-outline--light hero__cta magnetic-btn"
            >
              Start Your Project
            </a>
            <a href="#work" className="hero__link">
              Explore Our Work →
            </a>
          </div>
        </div>
      </div>

      <div className="hero__filmstrip-wrap" aria-label="Selected work">
        <div className="hero__filmstrip">
          <div className="hero__filmstrip-track">
            {stripItems.map((item, i) => (
              <div
                key={`${item.base}-${i}`}
                className={`hero__film-item${i % 2 === 0 ? " hero__film-item--lift" : ""}`}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="220px"
                  style={{ objectFit: "cover" }}
                />
                <span className="hero__film-shine" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
        <div
          className="hero__filmstrip-fade hero__filmstrip-fade--left"
          aria-hidden="true"
        />
        <div
          className="hero__filmstrip-fade hero__filmstrip-fade--right"
          aria-hidden="true"
        />
      </div>

      <div className="hero__scroll-hint" aria-hidden="true">
        <span className="hero__scroll-line" />
        Scroll
      </div>
    </section>
  );
}
