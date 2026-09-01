"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { TestimonialPublic } from "@/lib/testimonials";
import { getYouTubeEmbedUrl } from "@/lib/youtube";

const AUTO_ADVANCE_MS = 3500;

type TestimonialVideoSliderProps = {
  testimonials: TestimonialPublic[];
};

export function TestimonialVideoSlider({
  testimonials,
}: TestimonialVideoSliderProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideOffset, setSlideOffset] = useState(0);
  const [activeTestimonial, setActiveTestimonial] =
    useState<TestimonialPublic | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [visibleCount, setVisibleCount] = useState(2);

  const maxIndex = Math.max(0, testimonials.length - visibleCount);
  const pageCount = maxIndex + 1;
  const canAutoScroll = pageCount > 1;

  const updateOffset = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const cardWidth = viewport.clientWidth / visibleCount;
    setSlideOffset(activeIndex * cardWidth);
  }, [activeIndex, visibleCount]);

  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 900) setVisibleCount(2);
      else setVisibleCount(3);
    };

    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  useEffect(() => {
    setActiveIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, [updateOffset]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || isPaused || activeTestimonial || !canAutoScroll) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [inView, isPaused, activeTestimonial, canAutoScroll, maxIndex]);

  useEffect(() => {
    if (!activeTestimonial) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveTestimonial(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeTestimonial]);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(Math.max(0, Math.min(index, maxIndex)));
    },
    [maxIndex],
  );

  if (testimonials.length === 0) {
    return null;
  }

  const cardBasis = `${100 / visibleCount}%`;

  return (
    <>
      <div
        ref={wrapRef}
        className="testimonial-slider-wrap"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="testimonial-slider__viewport" ref={viewportRef}>
          <div
            className="testimonial-slider__track"
            style={{ transform: `translateX(-${slideOffset}px)` }}
          >
            {testimonials.map((client) => (
              <article
                key={client.id}
                className="testimonial-video-card"
                style={{ flex: `0 0 ${cardBasis}` }}
              >
                <button
                  type="button"
                  className="testimonial-video-card__btn"
                  onClick={() => setActiveTestimonial(client)}
                  aria-label={`Play testimonial from ${client.name}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="testimonial-video-card__img"
                    src={client.thumbnailUrl}
                    alt=""
                    loading="lazy"
                  />
                  <span className="testimonial-video-card__shade" aria-hidden="true" />
                  <span className="testimonial-video-card__meta">
                    <span className="testimonial-video-card__name">
                      {client.name}
                    </span>
                    <span className="testimonial-video-card__role">
                      {client.role}
                    </span>
                    <span className="testimonial-video-card__company">
                      {client.company}
                    </span>
                  </span>
                  <span className="testimonial-video-card__play" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </button>
              </article>
            ))}
          </div>
        </div>

        <div className="testimonial-slider__dots" role="tablist" aria-label="Testimonial slides">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={activeIndex === i}
              aria-label={`Go to slide ${i + 1}`}
              className={`testimonial-slider__dot${activeIndex === i ? " is-active" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>

      {activeTestimonial ? (
        <div
          className="testimonial-video-modal"
          onClick={() => setActiveTestimonial(null)}
          role="presentation"
        >
          <div
            className="testimonial-video-modal__dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`Client testimonial video from ${activeTestimonial.name}`}
          >
            <button
              type="button"
              className="testimonial-video-modal__close"
              onClick={() => setActiveTestimonial(null)}
              aria-label="Close video"
            >
              ×
            </button>
            <div className="testimonial-video-modal__player">
              <iframe
                src={getYouTubeEmbedUrl(activeTestimonial.videoUrl)}
                title={`Client testimonial video from ${activeTestimonial.name}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
