import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteNav } from "@/components/SiteNav";
import { formatBlogDate, getPostBySlug } from "@/lib/blog";
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
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const bodyHtml = sanitizeBlogHtml(post.body);

  return (
    <>
      <SiteNav />
      <article className="blog-article">
        <header className="blog-article__hero">
          <p className="blog-article__meta">
            {post.category} · {formatBlogDate(post.publishedAt)} · {post.author}
          </p>
          <h1 className="blog-article__title">{post.title}</h1>
          {post.tags.length > 0 ? (
            <p className="blog-article__meta">{post.tags.join(" · ")}</p>
          ) : null}
          <p className="blog-article__meta">
            Last updated {formatBlogDate(post.updatedAt)}
          </p>
        </header>
        {post.featuredImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="blog-article__image" src={post.featuredImage} alt="" />
        ) : null}
        <div
          className="blog-article__body"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
        <p style={{ marginTop: 48 }}>
          <Link href="/blog">← All articles</Link>
        </p>
      </article>
    </>
  );
}
