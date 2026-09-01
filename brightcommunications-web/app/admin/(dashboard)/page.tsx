import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="admin-grid">
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
