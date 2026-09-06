import type { Metadata } from "next";
import Link from "next/link";

import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { BlogListClient } from "@/components/BlogListClient";
import { getPublishedPosts } from "@/lib/blog";
import { getSiteSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Bright Communications",
  description:
    "Read blog posts on branding, creative advertising, digital transformation, and performance marketing from Bright Communications.",
};

export default async function BlogPage() {
  const [posts, settings] = await Promise.all([
    getPublishedPosts(),
    getSiteSettings(),
  ]);

  return (
    <>
      <SiteNav />
      <main className="blog-list-page">
        {/* Editorial Hero Header */}
        <section className="blog-page-hero">
          <div className="blog-page-hero__bg" aria-hidden="true" />
          <div className="container" style={{ position: "relative", zIndex: 2 }}>
            <p className="section-eyebrow">Bright Communications Blog</p>
            <h1 className="heading-display heading-xl">Bright Blog</h1>
            <p className="body-lg">
              Read the latest blog posts on brand strategy, creative campaigns, digital
              growth, and communication from our multidisciplinary agency team.
            </p>
          </div>
        </section>

        {/* Content Section with Interactive Client Filtering */}
        <section className="blog-posts-section">
          <div className="container">
            <BlogListClient posts={posts} />
          </div>
        </section>

        {/* Consult / Contact CTA Band */}
        <section className="blog-cta-section">
          <div className="container" style={{ textAlign: "center", maxWidth: 720 }}>
            <p className="section-eyebrow" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
              Collaborate With Bright
            </p>
            <h2
              className="heading-display"
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                color: "#fff",
                margin: "12px 0 20px",
              }}
            >
              Have A Story Or Project In Mind?
            </h2>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: "rgba(245, 240, 232, 0.75)",
                marginBottom: "32px",
              }}
            >
              Whether you are building a new brand, launching a campaign, or scaling your
              presence across India and GCC, we are ready to help.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
              <Link
                href="/#contact"
                className="btn-dark"
                style={{
                  background: "var(--cream)",
                  color: "var(--black)",
                  padding: "14px 32px",
                  borderRadius: "999px",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Start Your Project →
              </Link>
              <Link
                href="/"
                className="btn-outline btn-outline--light"
                style={{
                  padding: "14px 28px",
                  borderRadius: "999px",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                ← Return to Home
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter settings={settings} />
    </>
  );
}
