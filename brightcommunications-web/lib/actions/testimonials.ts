"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { validateTestimonialFormData } from "@/lib/admin-validation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-utils";

export type TestimonialFormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function createTestimonial(
  _prev: TestimonialFormState,
  formData: FormData,
): Promise<TestimonialFormState> {
  const validation = validateTestimonialFormData(formData);
  if (!validation.success) {
    return {
      error: validation.error,
      fieldErrors: validation.fieldErrors,
    };
  }

  try {
    await requireAdmin();
    await prisma.testimonial.create({ data: validation.data });
    revalidatePath("/");
    revalidatePath("/admin/testimonials");
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to create testimonial.",
    };
  }

  redirect("/admin/testimonials");
}

export async function updateTestimonial(
  id: string,
  _prev: TestimonialFormState,
  formData: FormData,
): Promise<TestimonialFormState> {
  const validation = validateTestimonialFormData(formData);
  if (!validation.success) {
    return {
      error: validation.error,
      fieldErrors: validation.fieldErrors,
    };
  }

  try {
    await requireAdmin();
    await prisma.testimonial.update({ where: { id }, data: validation.data });
    revalidatePath("/");
    revalidatePath("/admin/testimonials");
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to update testimonial.",
    };
  }

  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  await requireAdmin();
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials?status=deleted");
}
