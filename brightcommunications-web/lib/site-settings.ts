import { prisma } from "@/lib/prisma";
import { contactInfo } from "@/lib/site-content";

export interface SiteSettingsData {
  id: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  linkedinUrl: string;
  instagramUrl: string;
  facebookUrl: string;
}

export const defaultSiteSettings: SiteSettingsData = {
  id: "default",
  email: contactInfo.email,
  phone: contactInfo.phone,
  whatsapp: contactInfo.whatsapp,
  location: contactInfo.location,
  linkedinUrl: "",
  instagramUrl: "",
  facebookUrl: "",
};

export async function getSiteSettings(): Promise<SiteSettingsData> {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: "default" },
    });

    if (!settings) {
      return defaultSiteSettings;
    }

    return {
      id: settings.id,
      email: settings.email || defaultSiteSettings.email,
      phone: settings.phone || defaultSiteSettings.phone,
      whatsapp: settings.whatsapp || defaultSiteSettings.whatsapp,
      location: settings.location || defaultSiteSettings.location,
      linkedinUrl: settings.linkedinUrl || "",
      instagramUrl: settings.instagramUrl || "",
      facebookUrl: settings.facebookUrl || "",
    };
  } catch (error) {
    console.error("Failed to fetch site settings, returning defaults:", error);
    return defaultSiteSettings;
  }
}
