import { prisma } from "@/lib/prisma";

export interface ContactSubmissionItem {
  id: string;
  name: string;
  email: string;
  company: string | null;
  service: string | null;
  message: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function getEnquiries(): Promise<ContactSubmissionItem[]> {
  try {
    return await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch enquiries:", error);
    return [];
  }
}

export async function getUnreadEnquiryCount(): Promise<number> {
  try {
    return await prisma.contactSubmission.count({
      where: { status: "UNREAD" },
    });
  } catch {
    return 0;
  }
}
