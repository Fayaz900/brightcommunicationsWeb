import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { formatBlogDate, getPostBySlug } from "@/lib/blog";
import { getSiteSettings } from "@/lib/site-settings";
import { sanitizeBlogHtml } from "@/lib/sanitize";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article not found" };

  return {
    title: `${post.title} | Bright Communications`,
    description: post.body.replace(/<[^>]+>/g, "").slice(0, 160),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    getPostBySlug(slug),
    getSiteSettings(),
  ]);

  if (!post) notFound();

  const bodyHtml = sanitizeBlogHtml(post.body);

  return (
    <>
      <SiteNav />
      <main className="blog-article-page">
        <article className="blog-article">
          <header className="blog-article__hero">
            {post.category && (
              <span className="blog-article__category">{post.category}</span>
            )}
            <h1 className="blog-article__title">{post.title}</h1>
            <div className="blog-article__meta-bar">
              <span>Published {formatBlogDate(post.publishedAt)}</span>
              <span>•</span>
              <span>By {post.author || "Bright Team"}</span>
              <span>•</span>
              <span>Last updated {formatBlogDate(post.updatedAt)}</span>
            </div>
          </header>

          {post.featuredImage ? (
            <div className="blog-article__image-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="blog-article__image"
                src={post.featuredImage}
                alt={post.title}
              />
            </div>
          ) : null}

          <div
            className="blog-article__body"
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />

          {post.tags && post.tags.length > 0 && (
            <div className="blog-article__tags">
              {post.tags.map((tag) => (
                <span key={tag} className="blog-article__tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid #e7e5e4" }}>
            <Link href="/blog" className="btn-outline">
              ← Back to all insights
            </Link>
          </div>
        </article>
      </main>

      <SiteFooter settings={settings} />
    </>
  );
}
