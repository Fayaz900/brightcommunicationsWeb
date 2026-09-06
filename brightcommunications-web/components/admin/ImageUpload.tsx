"use client";

import { useState } from "react";

import { AdminField } from "@/components/admin/AdminField";

type ImageUploadProps = {
  name: string;
  folder: "blog" | "testimonials" | "projects";
  defaultValue?: string;
  label: string;
  error?: string;
  hint?: string;
  onChange?: () => void;
};

export function ImageUpload({
  name,
  folder,
  defaultValue = "",
  label,
  error,
  hint,
  onChange,
}: ImageUploadProps) {
  const [value, setValue] = useState(defaultValue);
  const [uploadError, setUploadError] = useState("");
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Upload failed");
      }
      setValue(data.url);
      onChange?.();
    } catch (uploadErr) {
      setUploadError(
        uploadErr instanceof Error ? uploadErr.message : "Upload failed",
      );
    } finally {
      setUploading(false);
    }
  }

  const displayError = error || uploadError;

  return (
    <AdminField label={label} error={displayError} hint={hint}>
      <input type="hidden" name={name} value={value} />
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
      />
      {uploading ? <p className="admin-field__hint">Uploading...</p> : null}
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="image-upload-preview" src={value} alt="" />
      ) : null}
    </AdminField>
  );
}
