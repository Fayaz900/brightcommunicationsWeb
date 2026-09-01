import Link from "next/link";

import { formatBlogDate, type BlogPostSummary } from "@/lib/blog";

export function BlogCard({
  post,
  index,
}: {
  post: BlogPostSummary;
  index?: number;
}) {
  return (
    <article className="blog-card">
      <Link className="blog-card__link" href={`/blog/${post.slug}`}>
        <div
          className={`blog-card__thumb${post.featuredImage ? " blog-card__thumb--image" : ""}`}
        >
          {post.featuredImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.featuredImage} alt="" />
          ) : (
            String(index ?? 1).padStart(2, "0")
          )}
        </div>
        <div className="blog-card__body">
          <p className="blog-card__meta">
            {post.category} · {formatBlogDate(post.publishedAt)}
          </p>
          <h3 className="blog-card__title">{post.title}</h3>
          <p className="blog-card__read">Read Article</p>
        </div>
      </Link>
    </article>
  );
}
