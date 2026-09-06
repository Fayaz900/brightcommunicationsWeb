import { prisma } from "@/lib/prisma";

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
  backgroundImage: string | null;
  projectBrief: string;
  galleryImages: string[];
  youtubeUrl: string | null;
  isActive: boolean;
  updatedAt: Date;
};

const fields = `id, "serviceNum", "serviceName", "serviceDesc", "serviceTags", "serviceImage", "sortOrder", slug, title, client, year, industry, "backgroundImage", "projectBrief", "galleryImages", "youtubeUrl", "isActive", "updatedAt"`;

export async function getActiveServiceProjects(): Promise<ServiceProjectPublic[]> {
  return prisma.$queryRawUnsafe<ServiceProjectPublic[]>(`
    SELECT ${fields}
    FROM "ServiceProject"
    WHERE "isActive" = true
    ORDER BY "sortOrder" ASC, "serviceNum" ASC
  `);
}

export async function getAllServiceProjects(): Promise<ServiceProjectPublic[]> {
  return prisma.$queryRawUnsafe<ServiceProjectPublic[]>(`
    SELECT ${fields}
    FROM "ServiceProject"
    ORDER BY "sortOrder" ASC, "serviceNum" ASC
  `);
}

export async function getServiceProjectBySlug(slug: string): Promise<ServiceProjectPublic | null> {
  const rows = await prisma.$queryRawUnsafe<ServiceProjectPublic[]>(`
    SELECT ${fields}
    FROM "ServiceProject"
    WHERE slug = $1 AND "isActive" = true
    LIMIT 1
  `, slug);
  return rows[0] ?? null;
}

export async function getServiceProjectById(id: string): Promise<ServiceProjectPublic | null> {
  const rows = await prisma.$queryRawUnsafe<ServiceProjectPublic[]>(`
    SELECT ${fields}
    FROM "ServiceProject"
    WHERE id = $1
    LIMIT 1
  `, id);
  return rows[0] ?? null;
}