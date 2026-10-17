"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { portfolioItems } from "@/app/assets/portfolio/data";
import { workCategories } from "@/lib/site-content";

export function PortfolioFilterClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...workCategories];

  const filteredItems = selectedCategory === "All"
    ? portfolioItems
    : portfolioItems.filter(
        (item) =>
          item.industry.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          selectedCategory.toLowerCase().includes(item.industry.toLowerCase())
      );

  return (
    <div>
      {/* Category Filter Pills */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "40px",
          alignItems: "center",
        }}
      >
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className="pill"
              style={{
                cursor: "pointer",
                background: isActive ? "var(--black)" : "transparent",
                color: isActive ? "var(--cream)" : "var(--gray-800)",
                borderColor: isActive ? "var(--black)" : "rgba(0, 0, 0, 0.15)",
                transition: "all var(--transition)",
                fontWeight: isActive ? 600 : 500,
              }}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Portfolio Grid */}
      <div className="work-grid">
        {filteredItems.map((item, idx) => (
          <article key={item.slug} className="work-card">
            <Link className="work-card__link" href={`/work/${item.slug}`}>
              <div className="work-card__bg">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="work-card__img"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={idx < 2}
                />
              </div>
              <div className="work-card__overlay">
                <span className="work-card__cat">
                  {item.industry} / {item.year}
                </span>
                <h3 className="work-card__title">{item.title}</h3>
                <span className="work-card__client">{item.client}</span>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div style={{ padding: "60px 0", textAlign: "center" }}>
          <p className="body-lg">No projects found in this category.</p>
          <button
            type="button"
            onClick={() => setSelectedCategory("All")}
            className="btn-primary"
            style={{ marginTop: "16px" }}
          >
            Show All Projects
          </button>
        </div>
      )}
    </div>
  );
}
