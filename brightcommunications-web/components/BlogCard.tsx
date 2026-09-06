import Link from "next/link";
import { formatBlogDate, extractExcerpt, type BlogPostSummary } from "@/lib/blog";

export function BlogCard({
  post,
  index,
}: {
  post: BlogPostSummary;
  index?: number;
}) {
  const excerpt = extractExcerpt(post.body, 120);

  return (
    <article className="blog-card">
      <Link className="blog-card__link" href={`/blog/${post.slug}`}>
        <div className="blog-card__thumb">
          {post.category && (
            <span className="blog-card__badge">{post.category}</span>
          )}
          {post.featuredImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.featuredImage}
              alt={post.title}
              loading="lazy"
            />
          ) : (
            <div className="blog-card__placeholder">
              <span>{String(index ?? 1).padStart(2, "0")}</span>
            </div>
          )}
        </div>

        <div className="blog-card__body">
          <div className="blog-card__meta">
            <span>{formatBlogDate(post.publishedAt)}</span>
            <span>•</span>
            <span>3 min read</span>
          </div>

          <h3 className="blog-card__title">{post.title}</h3>

          {excerpt ? (
            <p className="blog-card__excerpt">{excerpt}</p>
          ) : null}

          <div className="blog-card__footer">
            <span className="blog-card__author">By {post.author || "Bright Team"}</span>
            <span className="blog-card__read">
              Read Blog Post <span>→</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
