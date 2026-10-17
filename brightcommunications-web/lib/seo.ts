import type { Metadata } from "next";

export const siteName = "Bright Communications";
export const siteDescription = "Advertising, branding, digital marketing, website development and video production in Kochi, Kerala. Building brands since 1996.";

export function getSiteUrl(): string {
  const url = new URL(process.env.SITE_URL?.trim() || "https://brightcommunications.in");
  if (!["http:", "https:"].includes(url.protocol)) throw new Error("SITE_URL must be an http(s) URL.");
  return url.origin;
}

export function absoluteUrl(path = "/"): string {
  return new URL(path, `${getSiteUrl()}/`).href;
}

// Hosting environment flags take precedence over an explicit indexing opt-in.
export function isIndexableDeployment(): boolean {
  const environments = [process.env.DEPLOYMENT_ENV, process.env.VERCEL_ENV, process.env.CONTEXT].filter(Boolean);
  if (environments.some((environment) => environment !== "production")) return false;
  if (process.env.SITE_INDEXING === "false") return false;
  if (process.env.NODE_ENV !== "production") return false;
  const host = new URL(getSiteUrl()).hostname;
  return !/^(localhost|127\.|0\.0\.0\.0)|\.(vercel\.app|netlify\.app|pages\.dev)$/.test(host)
    && !/(^|[.-])(preview|staging|test|dev)([.-]|$)/i.test(host);
}

export const publicPages = {
  "/": { title: "Advertising, Branding & Digital Marketing Agency in Kochi", description: siteDescription },
  "/about": { title: "About Us", description: "Meet Bright Communications, an integrated advertising and branding agency in Kochi, Kerala. Explore our creative team, values and legacy since 1996." },
  "/services": { title: "Advertising, Branding & Digital Services", description: "Explore brand strategy, creative advertising, integrated campaigns, digital marketing, web development and video production services in Kochi." },
  "/industries": { title: "Industries We Serve", description: "Creative communication for healthcare, FMCG, education, retail, automotive, hospitality and more. Explore the industries served by Bright Communications." },
  "/clients": { title: "Our Clients", description: "Discover the brands and businesses that partner with Bright Communications for advertising, branding, digital marketing and integrated campaigns." },
  "/portfolio": { title: "Our Work & Portfolio", description: "Explore branding, advertising, digital campaigns and brand films created by Bright Communications for clients across Kerala and India." },
  "/testimonials": { title: "Client Testimonials", description: "Hear from the businesses and brands working with Bright Communications on brand strategy, creative advertising and digital growth." },
  "/blog": { title: "Blog", description: "Insights on brand strategy, creative advertising, digital marketing and communication from the team at Bright Communications, Kochi." },
  "/careers": { title: "Careers at Bright", description: "Explore current opportunities at Bright Communications in Kochi. Join our creative, strategy, digital, production and development teams." },
  "/contact": { title: "Contact Us", description: "Start a conversation with Bright Communications in Kochi, Kerala. Contact our team about branding, advertising, digital marketing and creative projects." },
} as const;

export function plainText(html: string, maxLength = 160): string {
  const text = html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, " ").trim();
  return text.length > maxLength ? `${text.slice(0, maxLength - 1).trimEnd()}…` : text;
}

export function pageMetadata({ path, title, description, image, article }: {
  path: string; title: string; description: string; image?: string | null;
  article?: { publishedTime?: string; modifiedTime?: string; author: string; tags?: string[] };
}): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = `${title} | ${siteName}`;
  const socialImage = { url: absoluteUrl(image || "/og-image.png"), alt: title, ...(!image ? { width: 1200, height: 630 } : {}) };
  return {
    title,
    description: plainText(description),
    alternates: { canonical: url },
    robots: isIndexableDeployment() ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } } : { index: false, follow: false },
    openGraph: {
      title: socialTitle, description: plainText(description), url, siteName, locale: "en_IN", images: [socialImage],
      ...(article ? { type: "article", publishedTime: article.publishedTime, modifiedTime: article.modifiedTime, authors: [article.author], tags: article.tags } : { type: "website" }),
    },
    twitter: { card: "summary_large_image", title: socialTitle, description: plainText(description), images: [socialImage.url] },
  };
}

export function staticPageMetadata(path: keyof typeof publicPages): Metadata {
  return pageMetadata({ path, ...publicPages[path] });
}
