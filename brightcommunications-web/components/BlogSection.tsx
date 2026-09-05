import Link from "next/link";
import { BlogCard } from "@/components/BlogCard";
import { formatBlogDate, extractExcerpt, type BlogPostSummary } from "@/lib/blog";

export function BlogSection({ posts }: { posts: BlogPostSummary[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="section" id="blog">
      <div className="container">
        <div className="blog-section-header">
          <div className="blog-section-header__text">
            <p className="section-eyebrow fade-up">Thought Leadership</p>
            <h2 className="heading-display">
              Insights &amp;
              <br />
              Ideas.
            </h2>
            <p className="body-md fade-up">
              Perspectives on branding, marketing, strategy, and digital evolution from our creative team.
            </p>
          </div>
          <div>
            <Link className="btn-outline fade-up magnetic-btn" href="/blog">
              Explore All Articles →
            </Link>
          </div>
        </div>

        {posts.length === 1 ? (
          /* Single post: Featured Showcase Layout */
          <div className="blog-grid--1">
            <article className="blog-featured-card">
              <Link className="blog-featured-card__link" href={`/blog/${posts[0].slug}`}>
                <div className="blog-featured-card__thumb">
                  {posts[0].featuredImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={posts[0].featuredImage}
                      alt={posts[0].title}
                      loading="lazy"
                    />
                  ) : (
                    <div className="blog-card__placeholder">
                      <span>01</span>
                    </div>
                  )}
                </div>
                <div className="blog-featured-card__body">
                  {posts[0].category && (
                    <span className="blog-featured-card__badge">{posts[0].category}</span>
                  )}
                  <h3 className="blog-featured-card__title">{posts[0].title}</h3>
                  <p className="blog-featured-card__excerpt">
                    {extractExcerpt(posts[0].body, 180) ||
                      "Explore our latest perspectives on communication, design, and market trends."}
                  </p>
                  <div className="blog-featured-card__meta">
                    <span>{formatBlogDate(posts[0].publishedAt)}</span>
                    <span>•</span>
                    <span>By {posts[0].author || "Bright Team"}</span>
                    <span className="blog-featured-card__cta">
                      Read Full Article →
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          </div>
        ) : (
          /* Multi-post grid */
          <div
            className={`blog-grid ${
              posts.length === 2 ? "blog-grid--2" : "blog-grid--3"
            }`}
          >
            {posts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index + 1} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
