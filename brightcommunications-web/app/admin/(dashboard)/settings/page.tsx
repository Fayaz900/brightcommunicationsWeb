import { getSiteSettings } from "@/lib/site-settings";
import { SettingsForm } from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="admin-card">
      <div style={{ marginBottom: "24px", borderBottom: "1px solid #e4e4e7", paddingBottom: "16px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: "700", margin: "0 0 6px" }}>
          Contact &amp; Social Links Settings
        </h1>
        <p style={{ margin: 0, fontSize: "14px", color: "#71717a" }}>
          Update phone numbers, email address, WhatsApp number, and social media URLs across the website.
        </p>
      </div>

      <SettingsForm initialSettings={settings} />
    </div>
  );
}
