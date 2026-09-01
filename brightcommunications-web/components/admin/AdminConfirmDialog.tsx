"use client";

import { useEffect } from "react";

type AdminConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  message: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  pending?: boolean;
};

export function AdminConfirmDialog({
  open,
  onOpenChange,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  pending = false,
}: AdminConfirmDialogProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !pending) {
        onOpenChange(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, pending, onOpenChange]);

  if (!open) return null;

  return (
    <div
      className="admin-modal"
      onClick={() => {
        if (!pending) onOpenChange(false);
      }}
      role="presentation"
    >
      <div
        className="admin-modal__dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="admin-confirm-title"
        aria-describedby="admin-confirm-message"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="admin-confirm-title" className="admin-modal__title">
          {title}
        </h2>
        <p id="admin-confirm-message" className="admin-modal__message">
          {message}
        </p>
        <div className="admin-modal__actions">
          <button
            type="button"
            className="admin-btn admin-btn--secondary"
            onClick={() => onOpenChange(false)}
            disabled={pending}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className="admin-btn admin-btn--danger"
            onClick={onConfirm}
            disabled={pending}
          >
            {pending ? "Deleting..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
