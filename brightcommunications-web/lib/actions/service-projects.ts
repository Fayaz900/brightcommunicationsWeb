"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { revalidateDiscovery } from "@/lib/actions/discovery";
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
      INSERT INTO "ServiceProject" (id, "serviceNum", "serviceName", "serviceDesc", "serviceTags", "serviceImage", "sortOrder", slug, title, client, year, industry, clients, "backgroundImage", "projectBrief", faqs, "galleryImages", "youtubeUrl", "isActive", "updatedAt")
      VALUES (${id}, ${data.serviceNum}, ${data.serviceName}, ${data.serviceDesc}, ${data.serviceTags}, ${data.serviceImage}, ${data.sortOrder}, ${data.slug}, ${data.title}, ${data.client}, ${data.year}, ${data.industry}, ${JSON.stringify(data.clients)}::jsonb, ${data.backgroundImage}, ${data.projectBrief}, ${data.faqs.length ? JSON.stringify(data.faqs) : null}::jsonb, ${data.galleryImages}, ${data.youtubeUrl}, ${data.isActive}, NOW())
    `;
    revalidatePath("/");
    revalidateDiscovery();
    revalidatePath("/services");
    revalidatePath("/services/[slug]", "page");
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
      SET "serviceNum" = ${data.serviceNum}, "serviceName" = ${data.serviceName}, "serviceDesc" = ${data.serviceDesc}, "serviceTags" = ${data.serviceTags}, "serviceImage" = ${data.serviceImage}, "sortOrder" = ${data.sortOrder}, slug = ${data.slug}, title = ${data.title}, client = ${data.client}, year = ${data.year}, industry = ${data.industry}, clients = ${JSON.stringify(data.clients)}::jsonb, "backgroundImage" = ${data.backgroundImage}, "projectBrief" = ${data.projectBrief}, faqs = ${data.faqs.length ? JSON.stringify(data.faqs) : null}::jsonb, "galleryImages" = ${data.galleryImages}, "youtubeUrl" = ${data.youtubeUrl}, "isActive" = ${data.isActive}, "updatedAt" = NOW()
      WHERE id = ${id}
    `;
    revalidatePath("/");
    revalidateDiscovery();
    revalidatePath("/services");
    revalidatePath("/services/[slug]", "page");
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
  revalidateDiscovery();
  revalidatePath("/services");
  revalidatePath("/services/[slug]", "page");
  revalidatePath("/admin/service-projects");
  redirect("/admin/service-projects?status=deleted");
}
