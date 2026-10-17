"use server";

import { revalidatePath } from "next/cache";
import { revalidateDiscovery } from "@/lib/actions/discovery";
import { redirect } from "next/navigation";

import { validateCareerFormData } from "@/lib/admin-validation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-utils";
import { randomUUID } from "node:crypto";

export type CareerFormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function createCareer(
  _prev: CareerFormState,
  formData: FormData,
): Promise<CareerFormState> {
  const validation = validateCareerFormData(formData);
  if (!validation.success) {
    return {
      error: validation.error,
      fieldErrors: validation.fieldErrors,
    };
  }

  try {
    await requireAdmin();
    const data = validation.data;
    await prisma.$executeRaw`INSERT INTO "CareerOpening" (id, title, department, "jobType", location, experience, description, "sortOrder", "isActive", "createdAt", "updatedAt") VALUES (${randomUUID()}, ${data.title}, ${data.department}, ${data.jobType}, ${data.location}, ${data.experience}, ${data.description}, ${data.sortOrder}, ${data.isActive}, NOW(), NOW())`;
    revalidatePath("/careers");
    revalidatePath("/careers/[id]", "page");
    revalidateDiscovery();
    revalidatePath("/admin/careers");
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to create career opening.",
    };
  }

  redirect("/admin/careers?status=created");
}

export async function updateCareer(
  id: string,
  _prev: CareerFormState,
  formData: FormData,
): Promise<CareerFormState> {
  const validation = validateCareerFormData(formData);
  if (!validation.success) {
    return {
      error: validation.error,
      fieldErrors: validation.fieldErrors,
    };
  }

  try {
    await requireAdmin();
    const data = validation.data;
    const updated = await prisma.$executeRaw`UPDATE "CareerOpening" SET title = ${data.title}, department = ${data.department}, "jobType" = ${data.jobType}, location = ${data.location}, experience = ${data.experience}, description = ${data.description}, "sortOrder" = ${data.sortOrder}, "isActive" = ${data.isActive}, "updatedAt" = NOW() WHERE id = ${id}`;
    if (!updated) throw new Error("Career opening not found.");
    revalidatePath("/careers");
    revalidatePath("/careers/[id]", "page");
    revalidateDiscovery();
    revalidatePath("/admin/careers");
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to update career opening.",
    };
  }

  redirect("/admin/careers?status=updated");
}

export async function deleteCareer(id: string) {
  await requireAdmin();
  await prisma.$executeRaw`DELETE FROM "CareerOpening" WHERE id = ${id}`;
  revalidatePath("/careers");
  revalidatePath("/careers/[id]", "page");
  revalidateDiscovery();
  revalidatePath("/admin/careers");
  redirect("/admin/careers?status=deleted");
}
