import type { Metadata } from "next";
import Link from "next/link";

import { BlogCard } from "@/components/BlogCard";
import { SiteNav } from "@/components/SiteNav";
import { getPublishedPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Insights & Ideas | Bright Communications",
  description: "Articles on branding, marketing, and communications from Bright Communications.",
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <SiteNav />
      <main className="blog-list-page">
        <section className="blog-page-header">
          <div className="container">
            <p className="section-eyebrow">Insights</p>
            <h1 className="heading-display heading-lg">Insights &amp; Ideas</h1>
            <p className="body-lg" style={{ marginTop: 16, maxWidth: 640 }}>
              Perspectives on branding, marketing, and communications.
            </p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            {posts.length === 0 ? (
              <p>No articles published yet.</p>
            ) : (
              <div className="blog-grid">
                {posts.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index + 1} />
                ))}
              </div>
            )}
            <p style={{ marginTop: 32 }}>
              <Link href="/">← Back to home</Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
