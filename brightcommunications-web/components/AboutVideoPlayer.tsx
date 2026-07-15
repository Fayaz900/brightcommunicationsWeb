"use client";

import { useState } from "react";

const YOUTUBE_ID = "75IQSiMLnuY";

export function AboutVideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="about-video fade-up">
      {isPlaying ? (
        <iframe
          className="about-video__iframe"
          src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3`}
          title="Bright Communications — Who We Are"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="about-video__poster"
          onClick={() => setIsPlaying(true)}
          aria-label="Play Bright Communications video"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="about-video__thumb"
            src={`https://img.youtube.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`}
            alt=""
            loading="lazy"
          />
          <span className="about-video__overlay" aria-hidden="true" />
          <span className="about-video__play" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
