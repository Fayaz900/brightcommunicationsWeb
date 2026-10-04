import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { extractExcerpt, formatBlogDate, getPostBySlug } from "@/lib/blog";
import { getSiteSettings } from "@/lib/site-settings";
import { sanitizeBlogHtml } from "@/lib/sanitize";
import { FaqAccordion } from "@/components/FaqAccordion";
import { readFaqItems } from "@/lib/faq-types";

export const dynamic = "force-dynamic";

async function getSiteOrigin(): Promise<string | null> {
  const configuredUrl = process.env.SITE_URL?.trim();
  if (configuredUrl) return new URL(configuredUrl).origin;

  const requestHeaders = await headers();
  const host = (requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host"))
    ?.split(",")[0].trim();
  if (!host) return null;

  const protocol = requestHeaders.get("x-forwarded-proto")?.split(",")[0].trim()
    ?? (host.startsWith("localhost") ? "http" : "https");
  return new URL(`${protocol}://${host}`).origin;
}

function absoluteHttpUrl(value: string, origin: string | null): string | undefined {
  try {
    const url = new URL(value, origin ?? undefined);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : undefined;
  } catch {
    return undefined;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Blog post not found" };

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
  const faqs = readFaqItems(post.faqs);
  const origin = await getSiteOrigin();
  const articleUrl = origin
    ? new URL(`/blog/${encodeURIComponent(post.slug)}`, origin).href
    : undefined;
  const authorName = post.author.trim() || "Bright Team";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: extractExcerpt(post.body, 160),
    ...(articleUrl && { mainEntityOfPage: articleUrl }),
    author: {
      "@type": ["Bright Communications", "Bright Team"].includes(authorName)
        ? "Organization"
        : "Person",
      name: authorName,
    },
    publisher: { "@type": "Organization", name: "Bright Communications" },
    ...(post.publishedAt && { datePublished: post.publishedAt.toISOString() }),
    dateModified: post.updatedAt.toISOString(),
    ...(post.featuredImage && {
      image: absoluteHttpUrl(post.featuredImage, origin),
    }),
  };

  return (
    <>
      <SiteNav />
      <main className="blog-article-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
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

          {faqs.length > 0 ? <FaqAccordion items={faqs} /> : null}

          <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid #e7e5e4" }}>
            <Link href="/blog" className="btn-outline">
              ← Back to all blog posts
            </Link>
          </div>
        </article>
      </main>

      <SiteFooter settings={settings} />
    </>
  );
}
