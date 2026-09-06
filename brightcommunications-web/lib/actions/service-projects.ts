"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth-utils";
import { validateServiceProjectFormData } from "@/lib/admin-validation";
import { prisma } from "@/lib/prisma";

export type ServiceProjectFormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function createServiceProject(
  _prev: ServiceProjectFormState,
  formData: FormData,
): Promise<ServiceProjectFormState> {
  const validation = validateServiceProjectFormData(formData);
  if (!validation.success) return { error: validation.error, fieldErrors: validation.fieldErrors };

  const data = validation.data;
  const id = randomUUID();
  try {
    await requireAdmin();
    await prisma.$executeRaw`
      INSERT INTO "ServiceProject" (id, "serviceNum", "serviceName", "serviceDesc", "serviceTags", "serviceImage", "sortOrder", slug, title, client, year, industry, "backgroundImage", "projectBrief", "galleryImages", "youtubeUrl", "isActive", "updatedAt")
      VALUES (${id}, ${data.serviceNum}, ${data.serviceName}, ${data.serviceDesc}, ${data.serviceTags}, ${data.serviceImage}, ${data.sortOrder}, ${data.slug}, ${data.title}, ${data.client}, ${data.year}, ${data.industry}, ${data.backgroundImage}, ${data.projectBrief}, ${data.galleryImages}, ${data.youtubeUrl}, ${data.isActive}, NOW())
    `;
    revalidatePath("/");
    revalidatePath("/admin/service-projects");
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Failed to create service project." };
  }

  redirect("/admin/service-projects");
}

export async function updateServiceProject(
  id: string,
  _prev: ServiceProjectFormState,
  formData: FormData,
): Promise<ServiceProjectFormState> {
  const validation = validateServiceProjectFormData(formData);
  if (!validation.success) return { error: validation.error, fieldErrors: validation.fieldErrors };

  const data = validation.data;
  try {
    await requireAdmin();
    await prisma.$executeRaw`
      UPDATE "ServiceProject"
      SET "serviceNum" = ${data.serviceNum}, "serviceName" = ${data.serviceName}, "serviceDesc" = ${data.serviceDesc}, "serviceTags" = ${data.serviceTags}, "serviceImage" = ${data.serviceImage}, "sortOrder" = ${data.sortOrder}, slug = ${data.slug}, title = ${data.title}, client = ${data.client}, year = ${data.year}, industry = ${data.industry}, "backgroundImage" = ${data.backgroundImage}, "projectBrief" = ${data.projectBrief}, "galleryImages" = ${data.galleryImages}, "youtubeUrl" = ${data.youtubeUrl}, "isActive" = ${data.isActive}, "updatedAt" = NOW()
      WHERE id = ${id}
    `;
    revalidatePath("/");
    revalidatePath(`/services/${data.slug}`);
    revalidatePath("/admin/service-projects");
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Failed to update service project." };
  }

  redirect("/admin/service-projects");
}

export async function deleteServiceProject(id: string) {
  await requireAdmin();
  await prisma.$executeRaw`DELETE FROM "ServiceProject" WHERE id = ${id}`;
  revalidatePath("/");
  revalidatePath("/admin/service-projects");
  redirect("/admin/service-projects?status=deleted");
}