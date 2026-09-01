"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const MESSAGES: Record<string, string> = {
  deleted: "Item deleted successfully.",
  created: "Item created successfully.",
  updated: "Item updated successfully.",
};

export function AdminFlash() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const status = searchParams.get("status");
    if (!status || !MESSAGES[status]) return;

    setMessage(MESSAGES[status]);
    setVisible(true);

    const hideTimer = window.setTimeout(() => setVisible(false), 4000);
    const cleanUrlTimer = window.setTimeout(() => {
      router.replace(window.location.pathname);
    }, 4200);

    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(cleanUrlTimer);
    };
  }, [searchParams, router]);

  if (!visible) return null;

  return (
    <div className="admin-flash" role="status">
      {message}
    </div>
  );
}
