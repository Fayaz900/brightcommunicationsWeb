import Link from "next/link";
import { Suspense } from "react";

import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { AdminFlash } from "@/components/admin/AdminFlash";
import { deleteCareer } from "@/lib/actions/careers";
import { getAllCareers, type CareerOpeningPublic } from "@/lib/careers";

export const dynamic = "force-dynamic";

export default async function AdminCareersPage() {
  const careers = await getAllCareers();

  return (
    <div className="admin-card">
      <Suspense fallback={null}>
        <AdminFlash />
      </Suspense>
      <div className="admin-actions" style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: "20px", fontWeight: "600", margin: 0 }}>Job Openings</h2>
          <p style={{ fontSize: "14px", color: "var(--gray-600)", margin: "4px 0 0" }}>
            Manage career openings displayed on the public /careers page.
          </p>
        </div>
        <Link className="admin-btn admin-btn--primary" href="/admin/careers/new">
          + New job opening
        </Link>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Role Title</th>
            <th>Department</th>
            <th>Type</th>
            <th>Location</th>
            <th>Order</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {careers.map((item: CareerOpeningPublic) => (
            <tr key={item.id}>
              <td style={{ fontWeight: 600 }}>{item.title}</td>
              <td>
                <span className="pill" style={{ fontSize: "12px", padding: "2px 8px" }}>
                  {item.department}
                </span>
              </td>
              <td>{item.jobType}</td>
              <td>{item.location}</td>
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
                    href={`/admin/careers/${item.id}/edit`}
                  >
                    Edit
                  </Link>
                  <AdminDeleteButton
                    action={deleteCareer.bind(null, item.id)}
                    itemLabel={item.title}
                  />
                </div>
              </td>
            </tr>
          ))}

          {careers.length === 0 && (
            <tr>
              <td colSpan={7} style={{ textAlign: "center", padding: "40px", color: "var(--gray-400)" }}>
                No custom job openings created yet. (The public page will show the default agency roles until you add custom ones here.)
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
