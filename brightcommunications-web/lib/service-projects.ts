import { prisma } from "@/lib/prisma";
import { readFaqItems, type FaqItem } from "@/lib/faq-types";
import { readServiceClients, type ServiceClient } from "@/lib/service-clients";

export type ServiceProjectPublic = {
  id: string;
  serviceNum: string;
  serviceName: string;
  serviceDesc: string;
  serviceTags: string[];
  serviceImage: string | null;
  sortOrder: number;
  slug: string;
  title: string;
  client: string;
  year: string;
  industry: string;
  clients: ServiceClient[];
  backgroundImage: string | null;
  projectBrief: string;
  faqs: FaqItem[];
  galleryImages: string[];
  youtubeUrl: string | null;
  isActive: boolean;
  updatedAt: Date;
};

const fields = `id, "serviceNum", "serviceName", "serviceDesc", "serviceTags", "serviceImage", "sortOrder", slug, title, client, year, industry, clients, "backgroundImage", "projectBrief", faqs, "galleryImages", "youtubeUrl", "isActive", "updatedAt"`;

type ServiceProjectRow = Omit<ServiceProjectPublic, "faqs" | "clients"> & { faqs: unknown; clients: unknown };

function withFaqItems(project: ServiceProjectRow): ServiceProjectPublic {
  const clients = readServiceClients(project.clients);
  return {
    ...project,
    clients: clients.length ? clients : [{ name: project.client, year: project.year, industry: project.industry, summary: "", galleryImages: project.galleryImages }],
    faqs: readFaqItems(project.faqs),
  };
}

export async function getActiveServiceProjects(): Promise<ServiceProjectPublic[]> {
  try {
    const rows = await prisma.$queryRawUnsafe<ServiceProjectRow[]>(`
      SELECT ${fields}
      FROM "ServiceProject"
      WHERE "isActive" = true
      ORDER BY "sortOrder" ASC, "serviceNum" ASC
    `);
    return rows.map(withFaqItems);
  } catch (error) {
    console.error("Failed to fetch active service projects, returning empty list:", error);
    return [];
  }
}

export async function getAllServiceProjects(): Promise<ServiceProjectPublic[]> {
  const rows = await prisma.$queryRawUnsafe<ServiceProjectRow[]>(`
    SELECT ${fields}
    FROM "ServiceProject"
    ORDER BY "sortOrder" ASC, "serviceNum" ASC
  `);
  return rows.map(withFaqItems);
}

export async function getServiceProjectBySlug(slug: string): Promise<ServiceProjectPublic | null> {
  try {
    const rows = await prisma.$queryRawUnsafe<ServiceProjectRow[]>(`
      SELECT ${fields}
      FROM "ServiceProject"
      WHERE slug = $1 AND "isActive" = true
      LIMIT 1
    `, slug);
    return rows[0] ? withFaqItems(rows[0]) : null;
  } catch (error) {
    console.error("Failed to fetch service project by slug, returning null:", error);
    return null;
  }
}

export async function getServiceProjectById(id: string): Promise<ServiceProjectPublic | null> {
  const rows = await prisma.$queryRawUnsafe<ServiceProjectRow[]>(`
    SELECT ${fields}
    FROM "ServiceProject"
    WHERE id = $1
    LIMIT 1
  `, id);
  return rows[0] ? withFaqItems(rows[0]) : null;
}
