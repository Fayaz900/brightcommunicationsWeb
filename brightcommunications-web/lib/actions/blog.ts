"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { validateBlogFormData } from "@/lib/admin-validation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-utils";

export type BlogFormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function createBlogPost(
  _prev: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> {
  const validation = validateBlogFormData(formData);
  if (!validation.success) {
    return {
      error: validation.error,
      fieldErrors: validation.fieldErrors,
    };
  }

  try {
    await requireAdmin();
    await prisma.blogPost.create({ data: validation.data });
    revalidatePath("/blog");
    revalidatePath("/");
    revalidatePath("/admin/blog");
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to create blog post.",
    };
  }

  redirect("/admin/blog");
}

export async function updateBlogPost(
  id: string,
  _prev: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> {
  const validation = validateBlogFormData(formData);
  if (!validation.success) {
    return {
      error: validation.error,
      fieldErrors: validation.fieldErrors,
    };
  }

  try {
    await requireAdmin();
    await prisma.blogPost.update({ where: { id }, data: validation.data });
    revalidatePath("/blog");
    revalidatePath(`/blog/${validation.data.slug}`);
    revalidatePath("/");
    revalidatePath("/admin/blog");
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to update blog post.",
    };
  }

  redirect("/admin/blog");
}

export async function deleteBlogPost(id: string) {
  await requireAdmin();
  const post = await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/");
  revalidatePath("/admin/blog");
  redirect("/admin/blog?status=deleted");
}
