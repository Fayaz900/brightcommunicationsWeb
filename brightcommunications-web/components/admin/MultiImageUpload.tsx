"use client";

import { useState } from "react";

import { AdminField } from "@/components/admin/AdminField";

type MultiImageUploadProps = {
  name: string;
  folder: "projects";
  defaultValue?: string[];
  label: string;
  error?: string;
  hint?: string;
  onChange?: () => void;
};

export function MultiImageUpload({
  name,
  folder,
  defaultValue = [],
  label,
  error,
  hint,
  onChange,
}: MultiImageUploadProps) {
  const [value, setValue] = useState(defaultValue.join("\n"));
  const [uploadError, setUploadError] = useState("");
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    setUploading(true);
    setUploadError("");

    try {
      const uploadedUrls: string[] = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const response = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error ?? "Upload failed");
        uploadedUrls.push(data.url);
      }

      setValue((current) => [current.trim(), ...uploadedUrls].filter(Boolean).join("\n"));
      onChange?.();
      event.target.value = "";
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  const images = value.split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean);

  return (
    <AdminField label={label} error={error || uploadError} hint={hint}>
      <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handleFileChange} disabled={uploading} />
      {uploading ? <p className="admin-field__hint">Uploading images...</p> : null}
      <textarea name={name} value={value} onChange={(event) => { setValue(event.target.value); onChange?.(); }} placeholder="/uploads/projects/image-1.jpg" />
      {images.length > 0 ? (
        <div className="multi-image-preview">
          {images.map((image) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={image} src={image} alt="" />
          ))}
        </div>
      ) : null}
    </AdminField>
  );
}