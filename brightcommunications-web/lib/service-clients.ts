import { slugify } from "@/lib/slug";

export type ServiceClient = {
  name: string;
  year: string;
  industry: string;
  summary: string;
  galleryImages: string[];
};

export function getServiceClientSlug(client: Pick<ServiceClient, "name">): string {
  return slugify(client.name);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function readServiceClients(value: unknown): ServiceClient[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item) => {
    if (!isRecord(item)) return [];

    const name = typeof item.name === "string" ? item.name.trim() : "";
    const year = typeof item.year === "string" ? item.year.trim() : "";
    const industry = typeof item.industry === "string" ? item.industry.trim() : "";
    const summary = typeof item.summary === "string" ? item.summary.trim() : "";
    const galleryImages = Array.isArray(item.galleryImages)
      ? item.galleryImages.filter((image): image is string => typeof image === "string").map((image) => image.trim()).filter(Boolean)
      : [];

    return name && year && industry ? [{ name, year, industry, summary, galleryImages }] : [];
  });
}

export function parseServiceClients(value: string): { items: ServiceClient[]; error?: string } {
  if (!value.trim()) return { items: [], error: "Add at least one client." };

  try {
    const parsed = JSON.parse(value) as unknown;
    if (!Array.isArray(parsed)) return { items: [], error: "Client data is invalid." };
    if (parsed.length === 0) return { items: [], error: "Add at least one client." };
    if (parsed.length > 30) return { items: [], error: "A service can have up to 30 clients." };

    const items: ServiceClient[] = [];
    const slugs = new Set<string>();
    for (const [index, item] of parsed.entries()) {
      if (!isRecord(item)) return { items: [], error: `Client ${index + 1} is invalid.` };

      const name = typeof item.name === "string" ? item.name.trim() : "";
      const year = typeof item.year === "string" ? item.year.trim() : "";
      const industry = typeof item.industry === "string" ? item.industry.trim() : "";
      const summary = typeof item.summary === "string" ? item.summary.trim() : "";
      const galleryImages = Array.isArray(item.galleryImages)
        ? item.galleryImages.filter((image): image is string => typeof image === "string").map((image) => image.trim()).filter(Boolean)
        : [];

      if (!name || !year || !industry) {
        return { items: [], error: `Complete the client name, year, and industry for client ${index + 1}.` };
      }
      const clientSlug = slugify(name);
      if (!clientSlug) return { items: [], error: `Client ${index + 1} needs a name that can be used in its page URL.` };
      if (slugs.has(clientSlug)) return { items: [], error: "Each client in a service must have a unique name." };
      slugs.add(clientSlug);
      if (name.length > 120 || year.length > 40 || industry.length > 120 || summary.length > 600) {
        return { items: [], error: `Client ${index + 1} contains text that is too long.` };
      }
      if (galleryImages.length > 20) {
        return { items: [], error: `Client ${index + 1} can have up to 20 gallery images.` };
      }
      if (galleryImages.some((image) => {
        if (image.startsWith("/")) return false;
        try {
          const url = new URL(image);
          return url.protocol !== "http:" && url.protocol !== "https:";
        } catch {
          return true;
        }
      })) {
        return { items: [], error: `Client ${index + 1} has an invalid gallery image URL.` };
      }

      items.push({ name, year, industry, summary, galleryImages });
    }

    return { items };
  } catch {
    return { items: [], error: "Client data is invalid." };
  }
}

