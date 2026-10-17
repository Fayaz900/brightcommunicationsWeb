import { prisma } from "@/lib/prisma";

export type CareerOpeningPublic = {
  id: string;
  title: string;
  department: string;
  jobType: string;
  location: string;
  experience: string;
  description: string;
  sortOrder: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export const fallbackCareers: CareerOpeningPublic[] = [
  {
    id: "fallback-1",
    title: "Senior Creative Designer & Visualiser",
    department: "Creative",
    jobType: "Full-time",
    location: "Kochi, Kerala (On-site)",
    experience: "3-6 Years",
    description:
      "Lead brand identity design, packaging systems, campaign visual keys, and high-impact digital and outdoor collateral for leading regional and national brands.",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "fallback-2",
    title: "Digital Marketing & Performance Specialist",
    department: "Digital",
    jobType: "Full-time",
    location: "Kochi, Kerala (On-site)",
    experience: "2-5 Years",
    description:
      "Architect and execute full-funnel paid campaigns across Meta, Google Ads, and programmatic networks with rigorous attribution, ROAS tracking, and CRO.",
    sortOrder: 2,
    isActive: true,
  },
  {
    id: "fallback-3",
    title: "Conceptual Copywriter & Brand Storyteller",
    department: "Content",
    jobType: "Full-time",
    location: "Kochi, Kerala (On-site)",
    experience: "2-4 Years",
    description:
      "Craft evocative scripts for TV commercials and brand films, crisp headlines, social campaign themes, and brand narrative guidelines in English and Malayalam.",
    sortOrder: 3,
    isActive: true,
  },
  {
    id: "fallback-4",
    title: "Video Editor & Motion Designer",
    department: "Production",
    jobType: "Full-time",
    location: "Kochi, Kerala (On-site)",
    experience: "2-4 Years",
    description:
      "Transform film production footage into cinematic commercials, social reels, typography animations, and digital video assets.",
    sortOrder: 4,
    isActive: true,
  },
];

export async function getActiveCareers(): Promise<CareerOpeningPublic[]> {
  try {
    const rows = await prisma.$queryRaw<CareerOpeningPublic[]>`SELECT * FROM "CareerOpening" WHERE "isActive" = true ORDER BY "sortOrder" ASC`;

    if (!rows || rows.length === 0) {
      return fallbackCareers;
    }

    return rows.map((row: CareerOpeningPublic) => ({
      id: row.id,
      title: row.title,
      department: row.department,
      jobType: row.jobType,
      location: row.location,
      experience: row.experience,
      description: row.description,
      sortOrder: row.sortOrder,
      isActive: row.isActive,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    }));
  } catch (error) {
    console.error("Failed to fetch active careers, returning fallback list:", error);
    return fallbackCareers;
  }
}

export async function getAllCareers(): Promise<CareerOpeningPublic[]> {
  try {
    return await prisma.$queryRaw<CareerOpeningPublic[]>`SELECT * FROM "CareerOpening" ORDER BY "sortOrder" ASC`;
  } catch (error) {
    console.error("Failed to fetch all careers:", error);
    return [];
  }
}

export async function getCareerById(id: string): Promise<CareerOpeningPublic | null> {
  try {
    const rows = await prisma.$queryRaw<CareerOpeningPublic[]>`SELECT * FROM "CareerOpening" WHERE id = ${id} LIMIT 1`;
    return rows[0] ?? null;
  } catch (error) {
    console.error("Failed to fetch career by id:", error);
    return null;
  }
}
