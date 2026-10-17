"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { validateCareerFormData } from "@/lib/admin-validation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-utils";

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (prisma as any).careerOpening.create({ data: validation.data });
    revalidatePath("/careers");
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (prisma as any).careerOpening.update({ where: { id }, data: validation.data });
    revalidatePath("/careers");
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (prisma as any).careerOpening.delete({ where: { id } });
  revalidatePath("/careers");
  revalidatePath("/admin/careers");
  redirect("/admin/careers?status=deleted");
}
