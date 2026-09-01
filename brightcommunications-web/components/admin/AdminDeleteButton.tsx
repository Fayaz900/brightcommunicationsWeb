"use client";

import { useRef, useState } from "react";

import { AdminConfirmDialog } from "@/components/admin/AdminConfirmDialog";

type AdminDeleteButtonProps = {
  action: () => void | Promise<void>;
  itemLabel: string;
};

export function AdminDeleteButton({ action, itemLabel }: AdminDeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <button
        type="button"
        className="admin-btn admin-btn--danger"
        onClick={() => setOpen(true)}
      >
        Delete
      </button>

      <AdminConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete item?"
        message={
          <>
            Delete <strong>&ldquo;{itemLabel}&rdquo;</strong>? This action cannot be
            undone.
          </>
        }
        confirmLabel="Delete"
        onConfirm={() => {
          setPending(true);
          formRef.current?.requestSubmit();
        }}
        pending={pending}
      />

      <form ref={formRef} action={action} hidden aria-hidden="true">
        <button type="submit" tabIndex={-1} />
      </form>
    </>
  );
}
