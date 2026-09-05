"use client";

import { useActionState } from "react";
import { updateSiteSettings, type SettingsFormState } from "@/lib/actions/settings";
import type { SiteSettingsData } from "@/lib/site-settings";

export function SettingsForm({ initialSettings }: { initialSettings: SiteSettingsData }) {
  const [state, formAction, isPending] = useActionState(updateSiteSettings, null);

  return (
    <form action={formAction} className="admin-form">
      {state?.message && state.success && (
        <div className="admin-flash">
          {state.message}
        </div>
      )}

      {state?.error && !state.success && (
        <div
          style={{
            padding: "12px 16px",
            borderRadius: "8px",
            background: "#fee2e2",
            border: "1px solid #fca5a5",
            color: "#991b1b",
            fontSize: "14px",
            fontWeight: "600",
            marginBottom: "16px",
          }}
        >
          {state.error}
        </div>
      )}

      {/* Section 1: Contact Details */}
      <div
        style={{
          background: "#fafafa",
          border: "1px solid #e4e4e7",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "16px",
        }}
      >
        <h2 style={{ fontSize: "16px", fontWeight: "700", margin: "0 0 4px" }}>
          Contact Information
        </h2>
        <p style={{ fontSize: "13px", color: "#71717a", margin: "0 0 16px" }}>
          These details are displayed in the Contact section and the website footer.
        </p>

        <div style={{ display: "grid", gap: "16px" }}>
          <div className={`admin-field ${state?.fieldErrors?.email ? "admin-field--invalid" : ""}`}>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={initialSettings.email}
              placeholder="e.g. hello@brightcommunications.com"
              disabled={isPending}
            />
            {state?.fieldErrors?.email ? (
              <p className="admin-field__error">{state.fieldErrors.email}</p>
            ) : (
              <p className="admin-field__hint">
                Shown as the primary contact email and receives direct mailto links.
              </p>
            )}
          </div>

          <div className="admin-field">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="text"
              defaultValue={initialSettings.phone}
              placeholder="e.g. +91 98765 43210"
              disabled={isPending}
            />
            <p className="admin-field__hint">
              Displayed as phone contact and creates a tel: click-to-call link.
            </p>
          </div>

          <div className="admin-field">
            <label htmlFor="whatsapp">WhatsApp Number</label>
            <input
              id="whatsapp"
              name="whatsapp"
              type="text"
              defaultValue={initialSettings.whatsapp}
              placeholder="e.g. +91 98765 43210"
              disabled={isPending}
            />
            <p className="admin-field__hint">
              Used for direct WhatsApp chat links (wa.me) in the contact section.
            </p>
          </div>

          <div className="admin-field">
            <label htmlFor="location">Office Location</label>
            <input
              id="location"
              name="location"
              type="text"
              defaultValue={initialSettings.location}
              placeholder="e.g. Kochi, Kerala"
              disabled={isPending}
            />
            <p className="admin-field__hint">
              Location displayed under company branding in contact and footer.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Social Media Links */}
      <div
        style={{
          background: "#fafafa",
          border: "1px solid #e4e4e7",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "16px",
        }}
      >
        <h2 style={{ fontSize: "16px", fontWeight: "700", margin: "0 0 4px" }}>
          Social Media Links
        </h2>
        <p style={{ fontSize: "13px", color: "#71717a", margin: "0 0 16px" }}>
          Configure the destination URLs for the circular social buttons (in, ig, fb) in the footer.
        </p>

        <div style={{ display: "grid", gap: "16px" }}>
          <div className="admin-field">
            <label htmlFor="linkedinUrl">LinkedIn URL (in)</label>
            <input
              id="linkedinUrl"
              name="linkedinUrl"
              type="url"
              defaultValue={initialSettings.linkedinUrl}
              placeholder="https://www.linkedin.com/company/..."
              disabled={isPending}
            />
            <p className="admin-field__hint">
              Links the &quot;in&quot; button in the footer to your LinkedIn page.
            </p>
          </div>

          <div className="admin-field">
            <label htmlFor="instagramUrl">Instagram URL (ig)</label>
            <input
              id="instagramUrl"
              name="instagramUrl"
              type="url"
              defaultValue={initialSettings.instagramUrl}
              placeholder="https://www.instagram.com/..."
              disabled={isPending}
            />
            <p className="admin-field__hint">
              Links the &quot;ig&quot; button in the footer to your Instagram profile.
            </p>
          </div>

          <div className="admin-field">
            <label htmlFor="facebookUrl">Facebook URL (fb)</label>
            <input
              id="facebookUrl"
              name="facebookUrl"
              type="url"
              defaultValue={initialSettings.facebookUrl}
              placeholder="https://www.facebook.com/..."
              disabled={isPending}
            />
            <p className="admin-field__hint">
              Links the &quot;fb&quot; button in the footer to your Facebook page.
            </p>
          </div>
        </div>
      </div>

      <div className="admin-actions">
        <button
          type="submit"
          className="admin-btn admin-btn--primary"
          disabled={isPending}
        >
          {isPending ? "Saving Changes..." : "Save Settings"}
        </button>
      </div>
    </form>
  );
}
