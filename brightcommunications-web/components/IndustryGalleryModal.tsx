"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Grid, LayoutGrid, Eye, ArrowUpRight } from "lucide-react";
import { industryImagesMap } from "@/lib/industry-images";

interface IndustryGalleryModalProps {
  industryName: string | null;
  industryDesc: string;
  onClose: () => void;
}

export function IndustryGalleryModal({
  industryName,
  industryDesc,
  onClose,
}: IndustryGalleryModalProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"slideshow" | "grid">("slideshow");
  const modalRef = useRef<HTMLDivElement>(null);

  const images = industryName ? industryImagesMap[industryName] || [] : [];
  const hasImages = images.length > 0;

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (industryName) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [industryName]);

  // Keyboard navigation
  useEffect(() => {
    if (!industryName) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (hasImages && viewMode === "slideshow") {
        if (e.key === "ArrowLeft") {
          handlePrev();
        } else if (e.key === "ArrowRight") {
          handleNext();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [industryName, hasImages, viewMode, activeIndex]);

  // Focus trap and accessibility click-outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleNext = () => {
    if (!hasImages) return;
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    if (!hasImages) return;
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!industryName) return null;

  // Safe URI encoder for local files with special characters or spaces
  const getSafeSrc = (src: string) => {
    return encodeURI(src);
  };

  return (
    <div
      className="gallery-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="gallery-modal" ref={modalRef}>
        {/* Modal Header */}
        <header className="gallery-modal__header">
          <div className="gallery-modal__header-left">
            <span className="gallery-modal__eyebrow">Industry Portfolio</span>
            <h2 className="gallery-modal__title">{industryName}</h2>
          </div>
          <div className="gallery-modal__header-actions">
            {hasImages && (
              <button
                className={`gallery-modal__toggle-btn ${
                  viewMode === "slideshow" ? "active" : ""
                }`}
                onClick={() => setViewMode("slideshow")}
                title="Slideshow View"
                aria-label="Switch to slideshow view"
              >
                <Eye size={18} />
                <span>Slideshow</span>
              </button>
            )}
            {hasImages && (
              <button
                className={`gallery-modal__toggle-btn ${
                  viewMode === "grid" ? "active" : ""
                }`}
                onClick={() => setViewMode("grid")}
                title="Grid View"
                aria-label="Switch to grid view"
              >
                <LayoutGrid size={18} />
                <span>Grid</span>
              </button>
            )}
            <button
              className="gallery-modal__close-btn"
              onClick={onClose}
              title="Close Gallery"
              aria-label="Close modal dialog"
            >
              <X size={20} />
            </button>
          </div>
        </header>

        {/* Modal Content */}
        <div className="gallery-modal__body">
          {hasImages ? (
            viewMode === "slideshow" ? (
              /* SLIDESHOW VIEW */
              <div className="gallery-slideshow">
                <div className="gallery-slideshow__main">
                  <button
                    className="gallery-slideshow__nav gallery-slideshow__nav--prev"
                    onClick={handlePrev}
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <div className="gallery-slideshow__image-container">
                    <Image
                      src={getSafeSrc(images[activeIndex].src)}
                      alt={images[activeIndex].alt}
                      fill
                      priority
                      className="gallery-slideshow__img"
                      sizes="(max-width: 1024px) 100vw, 80vw"
                    />
                  </div>

                  <button
                    className="gallery-slideshow__nav gallery-slideshow__nav--next"
                    onClick={handleNext}
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>

                {/* Subtitle / Counter */}
                <div className="gallery-slideshow__info">
                  <p className="gallery-slideshow__caption">
                    {images[activeIndex].alt}
                  </p>
                  <span className="gallery-slideshow__counter">
                    {activeIndex + 1} / {images.length}
                  </span>
                </div>

                {/* Thumbnail Strip */}
                {images.length > 1 && (
                  <div className="gallery-thumbnails">
                    {images.map((img, idx) => (
                      <button
                        key={img.src}
                        className={`gallery-thumbnails__item ${
                          idx === activeIndex ? "active" : ""
                        }`}
                        onClick={() => setActiveIndex(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                      >
                        <Image
                          src={getSafeSrc(img.src)}
                          alt={img.alt}
                          width={80}
                          height={54}
                          className="gallery-thumbnails__img"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* GRID VIEW */
              <div className="gallery-grid-view">
                {images.map((img, idx) => (
                  <div
                    key={img.src}
                    className="gallery-grid-view__item"
                    onClick={() => {
                      setActiveIndex(idx);
                      setViewMode("slideshow");
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setActiveIndex(idx);
                        setViewMode("slideshow");
                      }
                    }}
                    aria-label={`View larger size of image ${idx + 1}`}
                  >
                    <Image
                      src={getSafeSrc(img.src)}
                      alt={img.alt}
                      fill
                      className="gallery-grid-view__img"
                      sizes="(max-width: 600px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                    <div className="gallery-grid-view__overlay">
                      <span className="gallery-grid-view__overlay-text">
                        View Item
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            /* FALLBACK SHOWCASE (Coming Soon / No images) */
            <div className="gallery-fallback">
              <div className="gallery-fallback__content">
                <div className="gallery-fallback__badge">Coming Soon</div>
                <h3 className="gallery-fallback__title">
                  Showcase In Progress
                </h3>
                <p className="gallery-fallback__desc">
                  We are currently organizing and compiling our project case studies and campaigns for the{" "}
                  <strong>{industryName}</strong> sector.
                </p>
                <div className="gallery-fallback__card">
                  <h4 className="gallery-fallback__card-title">What We Do</h4>
                  <p className="gallery-fallback__card-text">{industryDesc}</p>
                </div>
                <div className="gallery-fallback__actions">
                  <a
                    href="#contact"
                    className="btn-outline gallery-fallback__btn magnetic-btn"
                    onClick={() => {
                      onClose();
                      // Smooth scroll to contact section
                      const contactSec = document.getElementById("contact");
                      if (contactSec) {
                        contactSec.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    <span>Partner With Us</span>
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
