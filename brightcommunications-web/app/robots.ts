import type { MetadataRoute } from "next";
import { absoluteUrl, getSiteUrl, isIndexableDeployment } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexableDeployment()) return { rules: [{ userAgent: "*", disallow: "/" }] };
  const disallow = ["/admin", "/api/"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      // Search/retrieval bots are allowed for AI search discovery.
      { userAgent: ["OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "Claude-User", "PerplexityBot"], allow: "/", disallow },
      // Model-training access is independent of search visibility.
      { userAgent: ["GPTBot", "ClaudeBot", "Google-Extended", "CCBot"], disallow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: getSiteUrl(),
  };
}
