import Link from "next/link";
import { getUnreadEnquiryCount, getEnquiries } from "@/lib/enquiries";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [unreadCount, allEnquiries] = await Promise.all([
    getUnreadEnquiryCount(),
    getEnquiries(),
  ]);

  return (
    <div className="admin-grid">
      <Link className="admin-link-card" href="/admin/enquiries" style={{ position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Contact Enquiries</h2>
          {unreadCount > 0 ? (
            <span
              style={{
                background: "#dc2626",
                color: "#fff",
                fontSize: "11px",
                fontWeight: "700",
                padding: "2px 8px",
                borderRadius: "999px",
              }}
            >
              {unreadCount} new
            </span>
          ) : (
            <span
              style={{
                background: "#f4f4f5",
                color: "#71717a",
                fontSize: "11px",
                fontWeight: "600",
                padding: "2px 8px",
                borderRadius: "999px",
              }}
            >
              {allEnquiries.length} total
            </span>
          )}
        </div>
        <p>View, manage, and respond to incoming client enquiries.</p>
      </Link>

      <Link className="admin-link-card" href="/admin/settings">
        <h2>Contact &amp; Social Settings</h2>
        <p>Configure phone number, email, WhatsApp, and LinkedIn/Instagram/Facebook links.</p>
      </Link>

      <Link className="admin-link-card" href="/admin/blog">
        <h2>Blog Posts</h2>
        <p>Create, edit, and publish insights articles.</p>
      </Link>

      <Link className="admin-link-card" href="/admin/testimonials">
        <h2>Testimonials</h2>
        <p>Manage client testimonial videos and details.</p>
      </Link>
    </div>
  );
}
