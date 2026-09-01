import Link from "next/link";
import { Suspense } from "react";

import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { AdminFlash } from "@/components/admin/AdminFlash";
import { deleteTestimonial } from "@/lib/actions/testimonials";
import { getAllTestimonials } from "@/lib/testimonials";

export default async function AdminTestimonialsPage() {
  const testimonials = await getAllTestimonials();

  return (
    <div className="admin-card">
      <Suspense fallback={null}>
        <AdminFlash />
      </Suspense>
      <div className="admin-actions" style={{ marginBottom: 24 }}>
        <Link className="admin-btn admin-btn--primary" href="/admin/testimonials/new">
          New testimonial
        </Link>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Order</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.company}</td>
              <td>{item.sortOrder}</td>
              <td>
                <span
                  className={`admin-badge ${item.isActive ? "admin-badge--published" : "admin-badge--draft"}`}
                >
                  {item.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td>
                <div className="admin-actions">
                  <Link
                    className="admin-btn admin-btn--secondary"
                    href={`/admin/testimonials/${item.id}/edit`}
                  >
                    Edit
                  </Link>
                  <AdminDeleteButton
                    action={deleteTestimonial.bind(null, item.id)}
                    itemLabel={item.name}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
