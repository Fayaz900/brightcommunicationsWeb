"use client";

import { useEffect, useId, useState } from "react";

type AdminInputDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  label: string;
  placeholder?: string;
  confirmLabel?: string;
  initialValue?: string;
  onConfirm: (value: string) => void;
  validate?: (value: string) => string | null;
  allowUpload?: boolean;
  uploadFolder?: "blog" | "testimonials";
};

export function AdminInputDialog({
  open,
  onOpenChange,
  title,
  label,
  placeholder,
  confirmLabel = "Insert",
  initialValue = "",
  onConfirm,
  validate,
  allowUpload = false,
  uploadFolder = "blog",
}: AdminInputDialogProps) {
  const inputId = useId();
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (open) {
      setValue(initialValue);
      setError("");
    }
  }, [open, initialValue]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !uploading) {
        onOpenChange(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, uploading, onOpenChange]);

  function handleConfirm() {
    const validationError = validate?.(value) ?? null;
    if (validationError) {
      setError(validationError);
      return;
    }

    onConfirm(value.trim());
    onOpenChange(false);
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", uploadFolder);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Upload failed");
      }
      onConfirm(data.url);
      onOpenChange(false);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error ? uploadError.message : "Upload failed",
      );
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  if (!open) return null;

  return (
    <div
      className="admin-modal"
      onClick={() => {
        if (!uploading) onOpenChange(false);
      }}
      role="presentation"
    >
      <div
        className="admin-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${inputId}-title`}
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id={`${inputId}-title`} className="admin-modal__title">
          {title}
        </h2>

        <div className={`admin-field${error ? " admin-field--invalid" : ""}`}>
          <label htmlFor={inputId}>{label}</label>
          <input
            id={inputId}
            type="url"
            value={value}
            placeholder={placeholder}
            onChange={(event) => {
              setValue(event.target.value);
              if (error) setError("");
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleConfirm();
              }
            }}
            autoFocus
          />
          {error ? (
            <p className="admin-field__error" role="alert">
              {error}
            </p>
          ) : null}
        </div>

        {allowUpload ? (
          <div className="admin-modal__upload">
            <p className="admin-field__hint">Or upload an image from your computer</p>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </div>
        ) : null}

        <div className="admin-modal__actions">
          <button
            type="button"
            className="admin-btn admin-btn--secondary"
            onClick={() => onOpenChange(false)}
            disabled={uploading}
          >
            Cancel
          </button>
          <button
            type="button"
            className="admin-btn admin-btn--primary"
            onClick={handleConfirm}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
