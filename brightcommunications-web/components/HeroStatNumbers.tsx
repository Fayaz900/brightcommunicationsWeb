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
  delay?: number;
};

function StatItem({ end, suffix, label, pad, delay = 0 }: StatItemProps) {
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
      const startAt = performance.now() + delay;

      const tick = (now: number) => {
        if (now < startAt) {
          requestAnimationFrame(tick);
          return;
        }

        const t = Math.min(1, (now - startAt) / duration);
        setValue(end * easeOutCubic(t));

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
  }, [end, delay]);

  const n = Math.round(value);
  const display = pad ? String(n).padStart(2, "0") : String(n);

  return (
    <div ref={ref} className="hero-stat">
      <span className="hero-stat-num">
        {display}
        {suffix}
      </span>
      <span className="hero-stat-label">{label}</span>
    </div>
  );
}

type HeroStatNumbersProps = {
  startDelay?: number;
};

export function HeroStatNumbers({ startDelay = 0 }: HeroStatNumbersProps) {
  return (
    <>
      <StatItem end={120} suffix="+" label="Projects" delay={startDelay} />
      <StatItem
        end={29}
        suffix="+"
        label="Years"
        pad
        delay={startDelay + 120}
      />
      <StatItem end={40} suffix="+" label="Clients" delay={startDelay + 240} />
    </>
  );
}
