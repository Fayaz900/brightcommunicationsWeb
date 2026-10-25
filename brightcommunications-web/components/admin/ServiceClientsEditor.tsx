"use client";

import { useState } from "react";

import { AdminField } from "@/components/admin/AdminField";
import type { ServiceClient } from "@/lib/service-clients";

const emptyClient: ServiceClient = { name: "", year: "", industry: "", summary: "", galleryImages: [] };

export function ServiceClientsEditor({
  defaultValue,
  error,
  onChange,
}: {
  defaultValue: ServiceClient[];
  error?: string;
  onChange?: () => void;
}) {
  const [items, setItems] = useState<ServiceClient[]>(defaultValue.length ? defaultValue : [{ ...emptyClient }]);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState("");

  function updateItem<K extends keyof ServiceClient>(index: number, key: K, value: ServiceClient[K]) {
    setItems((current) => current.map((item, itemIndex) =>
      itemIndex === index ? { ...item, [key]: value } : item,
    ));
    onChange?.();
  }

  async function uploadGalleryImages(index: number, files: File[]) {
    if (files.length === 0) return;
    setUploadingIndex(index);
    setUploadError("");

    try {
      const uploadedUrls: string[] = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "projects");

        const response = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error ?? "Upload failed");
        uploadedUrls.push(data.url);
      }

      setItems((current) => current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, galleryImages: [...item.galleryImages, ...uploadedUrls] } : item,
      ));
      onChange?.();
    } catch (uploadErr) {
      setUploadError(uploadErr instanceof Error ? uploadErr.message : "Upload failed");
    } finally {
      setUploadingIndex(null);
    }
  }

  return (
    <section className={`admin-repeatable${error ? " admin-field--invalid" : ""}`} aria-labelledby="service-clients-heading">
      <div className="admin-repeatable__heading">
        <div>
          <h2 id="service-clients-heading">Clients</h2>
          <p className="admin-field__hint">Add every client to feature at the bottom of this service page. Name, year, and industry are required.</p>
        </div>
        <button
          type="button"
          className="admin-btn admin-btn--secondary"
          disabled={items.length >= 30}
          onClick={() => { setItems((current) => [...current, { ...emptyClient }]); onChange?.(); }}
        >
          Add client
        </button>
      </div>

      {items.map((item, index) => (
        <div className="admin-repeatable__item" key={index}>
          <div className="admin-repeatable__item-heading">
            <strong>Client {index + 1}</strong>
            <button
              type="button"
              className="admin-btn admin-btn--secondary"
              disabled={items.length === 1}
              onClick={() => { setItems((current) => current.filter((_, itemIndex) => itemIndex !== index)); onChange?.(); }}
              aria-label={`Remove client ${index + 1}`}
            >
              Remove
            </button>
          </div>
          <div className="admin-repeatable__grid">
            <AdminField label="Client name" htmlFor={`client-name-${index}`}>
              <input id={`client-name-${index}`} value={item.name} maxLength={120} onChange={(event) => updateItem(index, "name", event.target.value)} />
            </AdminField>
            <AdminField label="Year" htmlFor={`client-year-${index}`}>
              <input id={`client-year-${index}`} value={item.year} maxLength={40} placeholder="2026" onChange={(event) => updateItem(index, "year", event.target.value)} />
            </AdminField>
            <AdminField label="Industry" htmlFor={`client-industry-${index}`}>
              <input id={`client-industry-${index}`} value={item.industry} maxLength={120} onChange={(event) => updateItem(index, "industry", event.target.value)} />
            </AdminField>
          </div>
          <AdminField label="Work summary (optional)" htmlFor={`client-summary-${index}`} hint="A short line about the work delivered for this client.">
            <textarea id={`client-summary-${index}`} value={item.summary} maxLength={600} rows={3} onChange={(event) => updateItem(index, "summary", event.target.value)} />
          </AdminField>
          <AdminField label="Project gallery (optional)" htmlFor={`client-gallery-${index}`} hint="Upload multiple project images, or paste one URL/path per line. Up to 20 images.">
            <input
              id={`client-gallery-${index}`}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              disabled={uploadingIndex !== null}
              onChange={(event) => {
                void uploadGalleryImages(index, Array.from(event.target.files ?? []));
                event.target.value = "";
              }}
            />
            {uploadingIndex === index ? <p className="admin-field__hint">Uploading images...</p> : null}
            <textarea
              value={item.galleryImages.join("\n")}
              onChange={(event) => updateItem(index, "galleryImages", event.target.value.split(/\r?\n|,/).map((image) => image.trim()).filter(Boolean))}
              placeholder="/uploads/projects/image-1.jpg"
            />
            {item.galleryImages.length > 0 ? (
              <div className="multi-image-preview">
                {item.galleryImages.map((image) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={image} src={image} alt="" />
                ))}
              </div>
            ) : null}
          </AdminField>
        </div>
      ))}

      <input type="hidden" name="clients" value={JSON.stringify(items)} />
      {uploadError ? <p className="admin-field__error" role="alert">{uploadError}</p> : null}
      {error ? <p className="admin-field__error" role="alert">{error}</p> : null}
    </section>
  );
}
