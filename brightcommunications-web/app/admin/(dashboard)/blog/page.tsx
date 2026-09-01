import Link from "next/link";
import { Suspense } from "react";

import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { AdminFlash } from "@/components/admin/AdminFlash";
import { deleteBlogPost } from "@/lib/actions/blog";
import { getAllPosts } from "@/lib/blog";

export default async function AdminBlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="admin-card">
      <Suspense fallback={null}>
        <AdminFlash />
      </Suspense>
      <div className="admin-actions" style={{ marginBottom: 24 }}>
        <Link className="admin-btn admin-btn--primary" href="/admin/blog/new">
          New post
        </Link>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.category}</td>
              <td>
                <span
                  className={`admin-badge ${post.published ? "admin-badge--published" : "admin-badge--draft"}`}
                >
                  {post.published ? "Published" : "Draft"}
                </span>
              </td>
              <td>{new Date(post.updatedAt).toLocaleDateString()}</td>
              <td>
                <div className="admin-actions">
                  <Link
                    className="admin-btn admin-btn--secondary"
                    href={`/admin/blog/${post.id}/edit`}
                  >
                    Edit
                  </Link>
                  <AdminDeleteButton
                    action={deleteBlogPost.bind(null, post.id)}
                    itemLabel={post.title}
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
