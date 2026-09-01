import Link from "next/link";

import { BlogCard } from "@/components/BlogCard";
import type { BlogPostSummary } from "@/lib/blog";

export function BlogSection({ posts }: { posts: BlogPostSummary[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="section" id="blog">
      <div className="container">
        <div className="blog-section-header">
          <h2>
            Insights &amp;
            <br />
            Ideas.
          </h2>
          <Link className="btn-outline fade-up" href="/blog">
            All Articles <span className="arrow">↗</span>
          </Link>
        </div>
        <div className="blog-grid">
          {posts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
