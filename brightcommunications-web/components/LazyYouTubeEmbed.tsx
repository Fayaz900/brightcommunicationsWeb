"use client";

import { useEffect, useRef, useState } from "react";

type LazyYouTubeEmbedProps = {
  src: string;
  title: string;
};

export function LazyYouTubeEmbed({ src, title }: LazyYouTubeEmbedProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const element = frameRef.current;
    if (!element || isReady) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsReady(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isReady]);

  return (
    <div className="work-detail-video__frame" ref={frameRef}>
      {isReady ? (
        <iframe
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <div className="work-detail-video__placeholder">Video loads when this section is visible</div>
      )}
    </div>
  );
}