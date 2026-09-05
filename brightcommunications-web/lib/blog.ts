import { prisma } from "@/lib/prisma";

export type BlogPostSummary = {
  id: string;
  title: string;
  slug: string;
  body?: string;
  featuredImage: string | null;
  category: string;
  tags: string[];
  author: string;
  publishedAt: Date | null;
  updatedAt: Date;
};

export type BlogPostDetail = BlogPostSummary & {
  body: string;
  published: boolean;
  createdAt: Date;
};

export function extractExcerpt(body?: string | null, maxLength = 130): string {
  if (!body) return "";
  const clean = body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (clean.length <= maxLength) return clean;
  return clean.slice(0, maxLength).trim() + "…";
}

export async function getPublishedPosts(): Promise<BlogPostSummary[]> {
  return prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      body: true,
      featuredImage: true,
      category: true,
      tags: true,
      author: true,
      publishedAt: true,
      updatedAt: true,
    },
  });
}

export async function getLatestPosts(limit: number): Promise<BlogPostSummary[]> {
  return prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: limit,
    select: {
      id: true,
      title: true,
      slug: true,
      body: true,
      featuredImage: true,
      category: true,
      tags: true,
      author: true,
      publishedAt: true,
      updatedAt: true,
    },
  });
}

export async function getPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  return prisma.blogPost.findFirst({
    where: { slug, published: true },
  });
}

export async function getAllPosts() {
  return prisma.blogPost.findMany({
    orderBy: { updatedAt: "desc" },
  });
}

export async function getPostById(id: string) {
  return prisma.blogPost.findUnique({ where: { id } });
}

export { slugify } from "@/lib/slug";

export function formatBlogDate(date: Date | null | undefined): string {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(date);
}
