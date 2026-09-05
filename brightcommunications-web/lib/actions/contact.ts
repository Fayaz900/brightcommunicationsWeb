"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-utils";

export interface ContactFormResponse {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
  message?: string;
}

export async function submitContactForm(
  _prev: ContactFormResponse | null,
  formData: FormData
): Promise<ContactFormResponse> {
  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const company = (formData.get("company") as string | null)?.trim() || null;
  const service = (formData.get("service") as string | null)?.trim() || null;
  const message = (formData.get("message") as string | null)?.trim() ?? "";

  const fieldErrors: Record<string, string> = {};

  if (!name) {
    fieldErrors.name = "Name is required.";
  }

  if (!email) {
    fieldErrors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = "Please enter a valid email address.";
  }

  if (!message) {
    fieldErrors.message = "Please tell us about your project.";
  } else if (message.length < 5) {
    fieldErrors.message = "Message must be at least 5 characters.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      error: "Please fill in all required fields correctly.",
      fieldErrors,
    };
  }

  try {
    await prisma.contactSubmission.create({
      data: {
        name,
        email,
        company,
        service,
        message,
        status: "UNREAD",
      },
    });

    revalidatePath("/admin/enquiries");
    revalidatePath("/admin");

    return {
      success: true,
      message: "Thank you for reaching out! We will review your enquiry and get back to you shortly.",
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      success: false,
      error: "Something went wrong while submitting your request. Please try again or reach out directly.",
    };
  }
}

export async function updateEnquiryStatus(id: string, status: string) {
  await requireAdmin();
  await prisma.contactSubmission.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
}

export async function deleteEnquiry(id: string) {
  await requireAdmin();
  await prisma.contactSubmission.delete({
    where: { id },
  });
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
}
