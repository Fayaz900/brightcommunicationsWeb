import { prisma } from "@/lib/prisma";
import { getYouTubeThumbnailUrl } from "@/lib/youtube";

export type TestimonialPublic = {
  id: string;
  name: string;
  role: string;
  company: string;
  videoUrl: string;
  thumbnailUrl: string;
  sortOrder: number;
};

export async function getActiveTestimonials(): Promise<TestimonialPublic[]> {
  const rows = await prisma.testimonial.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    role: row.role,
    company: row.company,
    videoUrl: row.videoUrl,
    thumbnailUrl: row.thumbnailUrl || getYouTubeThumbnailUrl(row.videoUrl),
    sortOrder: row.sortOrder,
  }));
}

export async function getAllTestimonials() {
  return prisma.testimonial.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function getTestimonialById(id: string) {
  return prisma.testimonial.findUnique({ where: { id } });
}
