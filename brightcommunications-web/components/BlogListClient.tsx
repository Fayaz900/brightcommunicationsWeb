"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BlogCard } from "@/components/BlogCard";
import { formatBlogDate, extractExcerpt, type BlogPostSummary } from "@/lib/blog";

export function BlogListClient({ posts }: { posts: BlogPostSummary[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["All", ...Array.from(set)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" ||
        post.category?.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.category?.toLowerCase().includes(query) ||
        post.author?.toLowerCase().includes(query) ||
        post.tags?.some((t) => t.toLowerCase().includes(query)) ||
        (post.body && post.body.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  if (posts.length === 0) {
    return (
      <div style={{ padding: "80px 0", textAlign: "center" }}>
        <p style={{ fontSize: "18px", color: "#78716c", marginBottom: "16px" }}>
          No blog posts published yet.
        </p>
        <Link href="/" className="btn-outline">
          ← Return to Home
        </Link>
      </div>
    );
  }

  const [featuredPost, ...otherPosts] = filteredPosts;

  return (
    <div>
      {/* Search & Category Filter Toolbar */}
      <div className="blog-toolbar">
        <div className="blog-categories">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`blog-category-btn ${
                selectedCategory === cat ? "blog-category-btn--active" : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div>
          <input
            type="search"
            className="blog-search-input"
            placeholder="Search blog posts or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Results Count */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
          fontSize: "13px",
          color: "#78716c",
        }}
      >
        <span>
          Showing <strong>{filteredPosts.length}</strong> {filteredPosts.length === 1 ? "blog post" : "blog posts"}
          {selectedCategory !== "All" && ` in "${selectedCategory}"`}
          {searchQuery && ` matching "${searchQuery}"`}
        </span>
        {(selectedCategory !== "All" || searchQuery) && (
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            style={{
              background: "none",
              border: "none",
              color: "#2563eb",
              cursor: "pointer",
              fontSize: "13px",
              padding: 0,
              textDecoration: "underline",
            }}
          >
            Reset filters
          </button>
        )}
      </div>

      {filteredPosts.length === 0 ? (
        <div
          style={{
            padding: "64px 24px",
            textAlign: "center",
            background: "#fff",
            borderRadius: "16px",
            border: "1px dashed #d6d3d1",
          }}
        >
          <p style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>
            No blog posts found
          </p>
          <p style={{ color: "#78716c", fontSize: "14px", marginBottom: "20px" }}>
            We couldn&apos;t find any blog posts matching your search criteria.
          </p>
          <button
            type="button"
            className="btn-outline"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
          >
            View All Blog Posts
          </button>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "48px" }}>
          {/* Top Featured Post if showing all and no query, or if only 1 post */}
          {featuredPost && (
            <article className="blog-featured-card">
              <Link className="blog-featured-card__link" href={`/blog/${featuredPost.slug}`}>
                <div className="blog-featured-card__thumb">
                  {featuredPost.featuredImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={featuredPost.featuredImage}
                      alt={featuredPost.title}
                      loading="lazy"
                    />
                  ) : (
                    <div className="blog-card__placeholder">
                      <span>Featured</span>
                    </div>
                  )}
                </div>
                <div className="blog-featured-card__body">
                  {featuredPost.category && (
                    <span className="blog-featured-card__badge">{featuredPost.category}</span>
                  )}
                  <h2 className="blog-featured-card__title">{featuredPost.title}</h2>
                  <p className="blog-featured-card__excerpt">
                    {extractExcerpt(featuredPost.body, 220) ||
                      "Explore our latest perspectives on branding, communication, and digital strategy."}
                  </p>
                  <div className="blog-featured-card__meta">
                    <span>{formatBlogDate(featuredPost.publishedAt)}</span>
                    <span>•</span>
                    <span>By {featuredPost.author || "Bright Team"}</span>
                    <span className="blog-featured-card__cta">
                      Read Blog Post →
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          )}

          {/* Remaining Posts Grid */}
          {otherPosts.length > 0 && (
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display), serif",
                  fontSize: "24px",
                  fontWeight: 700,
                  marginBottom: "24px",
                  color: "#18181b",
                }}
              >
                More Blog Posts
              </h3>
              <div className="blog-grid">
                {otherPosts.map((post, idx) => (
                  <BlogCard key={post.id} post={post} index={idx + 2} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
