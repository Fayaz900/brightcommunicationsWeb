"use client";

import { useState, useTransition } from "react";
import { updateEnquiryStatus, deleteEnquiry } from "@/lib/actions/contact";
import type { ContactSubmissionItem } from "@/lib/enquiries";

export function EnquiryList({ enquiries }: { enquiries: ContactSubmissionItem[] }) {
  const [filter, setFilter] = useState<"ALL" | "UNREAD" | "READ">("ALL");
  const [selectedEnquiry, setSelectedEnquiry] = useState<ContactSubmissionItem | null>(null);
  const [isPending, startTransition] = useTransition();

  const filteredEnquiries = enquiries.filter((item) => {
    if (filter === "UNREAD") return item.status === "UNREAD";
    if (filter === "READ") return item.status !== "UNREAD";
    return true;
  });

  const unreadCount = enquiries.filter((e) => e.status === "UNREAD").length;

  const handleStatusChange = (id: string, newStatus: string) => {
    startTransition(async () => {
      await updateEnquiryStatus(id, newStatus);
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    });
  };

  const handleDelete = (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete the enquiry from ${name}?`)) {
      return;
    }
    startTransition(async () => {
      await deleteEnquiry(id);
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry(null);
      }
    });
  };

  return (
    <div>
      {/* Header and filters */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            type="button"
            className={`admin-btn ${filter === "ALL" ? "admin-btn--primary" : "admin-btn--secondary"}`}
            onClick={() => setFilter("ALL")}
            style={{ fontSize: "13px", padding: "6px 14px" }}
          >
            All ({enquiries.length})
          </button>
          <button
            type="button"
            className={`admin-btn ${filter === "UNREAD" ? "admin-btn--primary" : "admin-btn--secondary"}`}
            onClick={() => setFilter("UNREAD")}
            style={{ fontSize: "13px", padding: "6px 14px" }}
          >
            Unread ({unreadCount})
          </button>
          <button
            type="button"
            className={`admin-btn ${filter === "READ" ? "admin-btn--primary" : "admin-btn--secondary"}`}
            onClick={() => setFilter("READ")}
            style={{ fontSize: "13px", padding: "6px 14px" }}
          >
            Read / Handled ({enquiries.length - unreadCount})
          </button>
        </div>

        {isPending && (
          <span style={{ fontSize: "13px", color: "#71717a" }}>
            Updating...
          </span>
        )}
      </div>

      {filteredEnquiries.length === 0 ? (
        <div style={{ padding: "48px 16px", textAlign: "center", color: "#71717a" }}>
          <p style={{ fontSize: "16px", marginBottom: "8px" }}>No enquiries found.</p>
          <p style={{ fontSize: "13px" }}>
            {filter === "UNREAD"
              ? "All caught up! There are no unread enquiries."
              : "Submissions from the website's contact form will appear here."}
          </p>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Sender</th>
                <th>Company</th>
                <th>Service</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEnquiries.map((item) => (
                <tr
                  key={item.id}
                  style={
                    item.status === "UNREAD"
                      ? { background: "rgba(254, 243, 199, 0.25)", fontWeight: "500" }
                      : undefined
                  }
                >
                  <td style={{ whiteSpace: "nowrap", color: "#71717a", fontSize: "13px" }}>
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td>
                    <div>
                      <span style={{ fontWeight: 600, color: "#18181b" }}>{item.name}</span>
                      <div style={{ fontSize: "12px", color: "#71717a" }}>
                        <a
                          href={`mailto:${item.email}`}
                          style={{ color: "#2563eb", textDecoration: "underline" }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {item.email}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td>{item.company || <span style={{ color: "#a1a1aa" }}>—</span>}</td>
                  <td>
                    {item.service ? (
                      <span
                        style={{
                          background: "#f4f4f5",
                          padding: "3px 8px",
                          borderRadius: "6px",
                          fontSize: "12px",
                        }}
                      >
                        {item.service}
                      </span>
                    ) : (
                      <span style={{ color: "#a1a1aa" }}>General</span>
                    )}
                  </td>
                  <td>
                    <span
                      className={`admin-badge ${
                        item.status === "UNREAD"
                          ? "admin-badge--draft"
                          : item.status === "RESPONDED"
                          ? "admin-badge--published"
                          : ""
                      }`}
                      style={
                        item.status === "READ"
                          ? { background: "#e0f2fe", color: "#0369a1" }
                          : undefined
                      }
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <div className="admin-actions">
                      <button
                        type="button"
                        className="admin-btn admin-btn--secondary"
                        style={{ fontSize: "12px", padding: "6px 10px" }}
                        onClick={() => {
                          setSelectedEnquiry(item);
                          if (item.status === "UNREAD") {
                            handleStatusChange(item.id, "READ");
                          }
                        }}
                      >
                        View Details
                      </button>
                      <a
                        className="admin-btn admin-btn--secondary"
                        style={{ fontSize: "12px", padding: "6px 10px", color: "#2563eb" }}
                        href={`mailto:${item.email}?subject=${encodeURIComponent(
                          `Re: Enquiry for ${item.service || "Bright Communications"}`
                        )}`}
                        onClick={() => {
                          if (item.status !== "RESPONDED") {
                            handleStatusChange(item.id, "RESPONDED");
                          }
                        }}
                      >
                        Reply
                      </a>
                      <button
                        type="button"
                        className="admin-btn admin-btn--secondary"
                        style={{ fontSize: "12px", padding: "6px 10px", color: "#dc2626" }}
                        onClick={() => handleDelete(item.id, item.name)}
                        disabled={isPending}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail Modal */}
      {selectedEnquiry && (
        <div className="admin-modal" onClick={() => setSelectedEnquiry(null)}>
          <div
            className="admin-modal__dialog"
            style={{ maxWidth: "600px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "16px",
                borderBottom: "1px solid #e4e4e7",
                paddingBottom: "12px",
              }}
            >
              <div>
                <h2 className="admin-modal__title" style={{ margin: 0 }}>
                  Enquiry from {selectedEnquiry.name}
                </h2>
                <span style={{ fontSize: "12px", color: "#71717a" }}>
                  Received{" "}
                  {new Date(selectedEnquiry.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </div>
              <button
                type="button"
                className="admin-btn admin-btn--secondary"
                style={{ padding: "4px 8px", fontSize: "12px" }}
                onClick={() => setSelectedEnquiry(null)}
              >
                ✕ Close
              </button>
            </div>

            <div style={{ display: "grid", gap: "12px", marginBottom: "20px", fontSize: "14px" }}>
              <div>
                <strong>Email:</strong>{" "}
                <a
                  href={`mailto:${selectedEnquiry.email}`}
                  style={{ color: "#2563eb", textDecoration: "underline" }}
                >
                  {selectedEnquiry.email}
                </a>
              </div>
              {selectedEnquiry.company && (
                <div>
                  <strong>Company:</strong> {selectedEnquiry.company}
                </div>
              )}
              <div>
                <strong>Service Requested:</strong>{" "}
                {selectedEnquiry.service || "General Inquiry"}
              </div>
              <div>
                <strong>Current Status:</strong>{" "}
                <span
                  className={`admin-badge ${
                    selectedEnquiry.status === "UNREAD"
                      ? "admin-badge--draft"
                      : selectedEnquiry.status === "RESPONDED"
                      ? "admin-badge--published"
                      : ""
                  }`}
                  style={
                    selectedEnquiry.status === "READ"
                      ? { background: "#e0f2fe", color: "#0369a1" }
                      : undefined
                  }
                >
                  {selectedEnquiry.status}
                </span>
              </div>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <strong style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}>
                Project Description / Message:
              </strong>
              <div
                style={{
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "16px",
                  whiteSpace: "pre-wrap",
                  fontSize: "14px",
                  lineHeight: "1.6",
                  color: "#1f2937",
                }}
              >
                {selectedEnquiry.message}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px",
                borderTop: "1px solid #e4e4e7",
                paddingTop: "16px",
              }}
            >
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <span style={{ fontSize: "13px", color: "#71717a" }}>Mark as:</span>
                <button
                  type="button"
                  className="admin-btn admin-btn--secondary"
                  style={{ fontSize: "12px", padding: "4px 10px" }}
                  onClick={() => handleStatusChange(selectedEnquiry.id, "UNREAD")}
                >
                  Unread
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn--secondary"
                  style={{ fontSize: "12px", padding: "4px 10px" }}
                  onClick={() => handleStatusChange(selectedEnquiry.id, "READ")}
                >
                  Read
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn--secondary"
                  style={{ fontSize: "12px", padding: "4px 10px" }}
                  onClick={() => handleStatusChange(selectedEnquiry.id, "RESPONDED")}
                >
                  Responded
                </button>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <a
                  className="admin-btn admin-btn--primary"
                  style={{ fontSize: "13px" }}
                  href={`mailto:${selectedEnquiry.email}?subject=${encodeURIComponent(
                    `Re: Enquiry for ${selectedEnquiry.service || "Bright Communications"}`
                  )}`}
                  onClick={() => handleStatusChange(selectedEnquiry.id, "RESPONDED")}
                >
                  Reply via Email →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
