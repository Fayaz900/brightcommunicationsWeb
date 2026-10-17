import { prisma } from "@/lib/prisma";
import { readFaqItems } from "@/lib/faq-types";
import { cache } from "react";

const publishedWhere = () => ({ published: true, OR: [{ publishedAt: null }, { publishedAt: { lte: new Date() } }] });

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
  faqs: unknown;
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
  try {
    return await prisma.blogPost.findMany({
      where: publishedWhere(),
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
  } catch (error) {
    console.error("Failed to fetch published posts, returning empty list:", error);
    return [];
  }
}

export async function getLatestPosts(limit: number): Promise<BlogPostSummary[]> {
  try {
    return await prisma.blogPost.findMany({
      where: publishedWhere(),
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
  } catch (error) {
    console.error("Failed to fetch latest posts, returning empty list:", error);
    return [];
  }
}

export const getPostBySlug = cache(async (slug: string): Promise<BlogPostDetail | null> => {
  try {
    return await prisma.blogPost.findFirst({
      where: { slug, ...publishedWhere() },
    });
  } catch (error) {
    console.error("Failed to fetch post by slug, returning null:", error);
    return null;
  }
});

export async function getAllPosts() {
  return prisma.blogPost.findMany({
    orderBy: { updatedAt: "desc" },
  });
}

export async function getPostById(id: string) {
  const post = await prisma.blogPost.findUnique({ where: { id } });
  return post ? { ...post, faqs: readFaqItems(post.faqs) } : null;
}

export { slugify } from "@/lib/slug";

export function formatBlogDate(date: Date | null | undefined): string {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(date);
}
