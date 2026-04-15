"use client";

import { useEffect, useRef, useState } from "react";

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

type StatItemProps = {
  end: number;
  suffix: string;
  label: string;
  pad?: boolean;
};

function StatItem({ end, suffix, label, pad }: StatItemProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const run = () => {
      if (started.current) return;
      started.current = true;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setValue(end);
        return;
      }
      const duration = 2200;
      const start = performance.now();

      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = easeOutCubic(t);
        setValue(end * eased);
        if (t < 1) requestAnimationFrame(tick);
        else setValue(end);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) run();
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end]);

  const n = Math.round(value);
  const display = pad ? String(n).padStart(2, "0") : String(n);

  return (
    <div ref={ref}>
      <span className="hero-stat-num">
        {display}
        {suffix}
      </span>
      <span className="hero-stat-label">{label}</span>
    </div>
  );
}

export function HeroStatNumbers() {
  return (
    <>
      <StatItem end={120} suffix="+" label="Projects" />
      <StatItem end={8} suffix="" label="Years" pad />
      <StatItem end={40} suffix="+" label="Clients" />
    </>
  );
}
