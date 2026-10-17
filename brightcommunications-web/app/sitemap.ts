import type { MetadataRoute } from "next";
import { portfolioItems } from "@/app/assets/portfolio/data";
import { getDiscoveryContent } from "@/lib/discovery";
import { absoluteUrl, isIndexableDeployment, publicPages } from "@/lib/seo";
import { services } from "@/lib/site-content";
import { slugify } from "@/lib/slug";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!isIndexableDeployment()) return [];
  const { posts, projects, jobs } = await getDiscoveryContent();
  const entries: MetadataRoute.Sitemap = [
    ...Object.keys(publicPages).map((path) => ({ url: absoluteUrl(path) })),
    ...portfolioItems.map((project) => ({ url: absoluteUrl(`/work/${project.slug}`), images: [absoluteUrl(project.src.src)] })),
    ...services.map((service) => ({ url: absoluteUrl(`/services/${slugify(service.name)}`) })),
    ...posts.map((post) => ({ url: absoluteUrl(`/blog/${post.slug}`), lastModified: post.updatedAt })),
    ...projects.map((project) => ({ url: absoluteUrl(`/services/${project.slug}`), lastModified: project.updatedAt })),
    ...jobs.map((job) => ({ url: absoluteUrl(`/careers/${job.id}`), lastModified: job.updatedAt })),
  ];
  // Prefer database modification dates when a service shares a built-in slug.
  return [...new Map(entries.map((entry) => [entry.url, entry])).values()];
}
