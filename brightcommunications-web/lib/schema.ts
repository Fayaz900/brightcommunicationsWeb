import type { BlogPostDetail } from "@/lib/blog";
import type { CareerOpeningPublic } from "@/lib/careers";
import { absoluteUrl, plainText, siteName } from "@/lib/seo";

export function serviceSchema({ path, name, description, image }: { path: string; name: string; description: string; image?: string | null }) {
  return {
    "@type": "Service", "@id": `${absoluteUrl(path)}#service`, name, description: plainText(description, 1000), url: absoluteUrl(path),
    provider: { "@id": absoluteUrl("/#organization") }, ...(image ? { image: absoluteUrl(image) } : {}),
  };
}

export function creativeWorkSchema({ path, title, description, image, client, year }: { path: string; title: string; description: string; image?: string | null; client: string; year?: string }) {
  return {
    "@type": "CreativeWork", "@id": `${absoluteUrl(path)}#work`, name: title, description: plainText(description, 1000), url: absoluteUrl(path),
    creator: { "@id": absoluteUrl("/#organization") }, about: { "@type": "Organization", name: client },
    ...(image ? { image: absoluteUrl(image) } : {}), ...(/^(19|20)\d{2}$/.test(year || "") ? { temporalCoverage: year } : {}),
  };
}

export function blogPostSchema(post: BlogPostDetail): Record<string, unknown>[] {
  const path = `/blog/${post.slug}`;
  const url = absoluteUrl(path);
  const author = post.author.trim() || siteName;
  const isAgency = [siteName, "Bright Team"].includes(author);
  const authorId = isAgency ? absoluteUrl("/#organization") : `${url}#author`;
  return [
    ...(!isAgency ? [{ "@type": "Person", "@id": authorId, name: author }] : []),
    {
      "@type": "BlogPosting", "@id": `${url}#article`, url, headline: post.title, description: plainText(post.body),
      mainEntityOfPage: { "@id": `${url}#webpage` }, author: { "@id": authorId }, publisher: { "@id": absoluteUrl("/#organization") },
      datePublished: (post.publishedAt || post.createdAt).toISOString(), dateModified: post.updatedAt.toISOString(),
      image: absoluteUrl(post.featuredImage || "/og-image.png"), articleSection: post.category, keywords: post.tags.join(", "), inLanguage: "en-IN",
    },
  ];
}

export function jobPostingSchema(job: CareerOpeningPublic): Record<string, unknown>[] {
  // Built-in example cards are not real, dated vacancies.
  if (!job.createdAt || job.id.startsWith("fallback-")) return [];
  const employmentTypes: Record<string, string> = { "full-time": "FULL_TIME", "part-time": "PART_TIME", contract: "CONTRACTOR", freelance: "CONTRACTOR", internship: "INTERN" };
  const [city, region] = job.location.replace(/\([^)]*\)/g, "").split(",").map((part) => part.trim());
  return [{
    "@type": "JobPosting", "@id": `${absoluteUrl(`/careers/${job.id}`)}#job`, url: absoluteUrl(`/careers/${job.id}`),
    title: job.title, description: job.description, datePosted: job.createdAt.toISOString(),
    ...(job.updatedAt ? { dateModified: job.updatedAt.toISOString() } : {}),
    identifier: { "@type": "PropertyValue", name: siteName, value: job.id },
    hiringOrganization: { "@id": absoluteUrl("/#organization") }, employmentType: employmentTypes[job.jobType.toLowerCase()],
    jobLocation: { "@type": "Place", name: job.location, address: { "@type": "PostalAddress", addressLocality: city, addressRegion: region, ...(/kochi|kerala|india/i.test(job.location) ? { addressCountry: "IN" } : {}) } },
    experienceRequirements: job.experience, occupationalCategory: job.department,
  }];
}
