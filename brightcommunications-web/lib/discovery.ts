import { cache } from "react";
import { prisma } from "@/lib/prisma";

// Query current publication state on every request. Fail with a server error if
// the database is unavailable instead of returning a misleading partial sitemap.
export const getDiscoveryContent = cache(async () => {
  const [posts, projects, jobs] = await Promise.all([
    prisma.blogPost.findMany({
      where: { published: true, OR: [{ publishedAt: null }, { publishedAt: { lte: new Date() } }] },
      select: { slug: true, title: true, updatedAt: true }, orderBy: { publishedAt: "desc" },
    }),
    prisma.serviceProject.findMany({ where: { isActive: true }, select: { slug: true, title: true, updatedAt: true } }),
    prisma.$queryRaw<{ id: string; title: string; updatedAt: Date }[]>`SELECT id, title, "updatedAt" FROM "CareerOpening" WHERE "isActive" = true`,
  ]);
  return { posts, projects, jobs };
});
