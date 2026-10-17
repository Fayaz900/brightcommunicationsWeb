"use client";

import { useState } from "react";
import { industries } from "@/lib/site-content";
import { industryImagesMap } from "@/lib/industry-images";
import { IndustryGalleryModal } from "@/components/IndustryGalleryModal";

export function IndustriesClient() {
  const [selectedIndustryName, setSelectedIndustryName] = useState<string | null>(null);

  const selectedIndustry = industries.find((ind) => ind.name === selectedIndustryName);

  return (
    <>
      <div className="industries-grid">
        {industries.map((industry) => {
          const hasGallery = industry.name in industryImagesMap;
          const imageCount = hasGallery ? (industryImagesMap[industry.name]?.length || 0) : 0;

          return (
            <article
              key={industry.name}
              className="industry-card cursor-pointer"
              onClick={() => setSelectedIndustryName(industry.name)}
              style={{
                transition: "all var(--transition)",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                <h3 className="industry-card__title" style={{ margin: 0 }}>
                  {industry.name}
                </h3>
                {hasGallery && (
                  <span
                    className="pill"
                    style={{
                      fontSize: "11px",
                      padding: "2px 8px",
                      background: "rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    {imageCount} items
                  </span>
                )}
              </div>
              <p className="industry-card__desc">{industry.desc}</p>
              <span className="industry-card__link">
                {hasGallery ? "View industry gallery →" : "Explore projects →"}
              </span>
            </article>
          );
        })}
      </div>

      <IndustryGalleryModal
        industryName={selectedIndustryName}
        industryDesc={selectedIndustry?.desc || ""}
        onClose={() => setSelectedIndustryName(null)}
      />
    </>
  );
}
