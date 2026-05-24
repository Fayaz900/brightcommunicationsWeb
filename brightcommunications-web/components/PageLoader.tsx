"use client";

import { useLayoutEffect, useState } from "react";
import gsap from "gsap";

export function PageLoader() {
  const [done, setDone] = useState(false);

  useLayoutEffect(() => {
    document.body.classList.add("is-loading");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.body.classList.remove("is-loading");
      document.documentElement.setAttribute("data-hero-intro-fired", "true");
      window.dispatchEvent(new CustomEvent("hero-intro-start"));
      setDone(true);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => setDone(true),
    });

    tl.to(".loader__bar", {
      scaleX: 1,
      duration: 0.65,
      ease: "power2.inOut",
    })
      .add(() => {
        document.body.classList.remove("is-loading");
        document.documentElement.setAttribute("data-hero-intro-fired", "true");
        window.dispatchEvent(new CustomEvent("hero-intro-start"));
      })
      .to(
        ".loader__panel",
        {
          yPercent: -100,
          duration: 0.55,
          ease: "power3.inOut",
        },
        "-=0.05"
      )
      .to(
        ".loader__panel",
        {
          opacity: 0,
          duration: 0.12,
        },
        "-=0.12"
      );

    return () => {
      tl.kill();
      document.body.classList.remove("is-loading");
    };
  }, []);

  if (done) return null;

  return (
    <div className="loader" aria-hidden="true">
      <div className="loader__panel">
        <div className="loader__logo">BrightCommunications</div>
        <div className="loader__bar-wrap">
          <div className="loader__bar" />
        </div>
      </div>
    </div>
  );
}
