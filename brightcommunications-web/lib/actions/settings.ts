"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-utils";

export interface SettingsFormState {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
  message?: string;
}

export async function updateSiteSettings(
  _prev: SettingsFormState | null,
  formData: FormData
): Promise<SettingsFormState> {
  try {
    await requireAdmin();

    const email = (formData.get("email") as string | null)?.trim() ?? "";
    const phone = (formData.get("phone") as string | null)?.trim() ?? "";
    const whatsapp = (formData.get("whatsapp") as string | null)?.trim() ?? "";
    const location = (formData.get("location") as string | null)?.trim() ?? "";
    const linkedinUrl = (formData.get("linkedinUrl") as string | null)?.trim() ?? "";
    const instagramUrl = (formData.get("instagramUrl") as string | null)?.trim() ?? "";
    const facebookUrl = (formData.get("facebookUrl") as string | null)?.trim() ?? "";

    const fieldErrors: Record<string, string> = {};

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      fieldErrors.email = "Please enter a valid email address.";
    }

    if (Object.keys(fieldErrors).length > 0) {
      return {
        success: false,
        error: "Please correct the highlighted errors.",
        fieldErrors,
      };
    }

    await prisma.siteSettings.upsert({
      where: { id: "default" },
      update: {
        email,
        phone,
        whatsapp,
        location,
        linkedinUrl,
        instagramUrl,
        facebookUrl,
      },
      create: {
        id: "default",
        email,
        phone,
        whatsapp,
        location,
        linkedinUrl,
        instagramUrl,
        facebookUrl,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/settings");
    revalidatePath("/admin");

    return {
      success: true,
      message: "Contact details and social links updated successfully!",
    };
  } catch (error) {
    console.error("Failed to update site settings:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update settings.",
    };
  }
}
