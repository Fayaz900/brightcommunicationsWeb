import Link from "next/link";
import { Suspense } from "react";

import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { AdminFlash } from "@/components/admin/AdminFlash";
import { deleteServiceProject } from "@/lib/actions/service-projects";
import { getAllServiceProjects } from "@/lib/service-projects";

export default async function AdminServiceProjectsPage() {
  const projects = await getAllServiceProjects();

  return (
    <div className="admin-card">
      <Suspense fallback={null}>
        <AdminFlash />
      </Suspense>
      <div className="admin-actions" style={{ marginBottom: 24 }}>
        <Link className="admin-btn admin-btn--primary" href="/admin/service-projects/new">
          New service row
        </Link>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Service Row</th>
            <th>Project Title</th>
            <th>Client</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.sortOrder}</td>
              <td>{project.serviceNum} - {project.serviceName}</td>
              <td>{project.title}</td>
              <td>{project.client}</td>
              <td>
                <span className={`admin-badge ${project.isActive ? "admin-badge--published" : "admin-badge--draft"}`}>
                  {project.isActive ? "Active" : "Hidden"}
                </span>
              </td>
              <td>
                <div className="admin-actions">
                  <Link className="admin-btn admin-btn--secondary" href={`/admin/service-projects/${project.id}/edit`}>
                    Edit
                  </Link>
                  <AdminDeleteButton action={deleteServiceProject.bind(null, project.id)} itemLabel={project.serviceName || project.title} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}