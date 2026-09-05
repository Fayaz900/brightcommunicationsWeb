import Link from "next/link";
import { signOut } from "@/auth";

export function AdminHeader({ title }: { title: string }) {
  return (
    <header className="admin-header">
      <div>
        <p className="admin-header__title">{title}</p>
      </div>
      <div className="admin-actions">
        <Link className="admin-btn admin-btn--secondary" href="/admin">
          Dashboard
        </Link>
        <Link className="admin-btn admin-btn--secondary" href="/admin/enquiries">
          Enquiries
        </Link>
        <Link className="admin-btn admin-btn--secondary" href="/admin/settings">
          Settings
        </Link>
        <Link className="admin-btn admin-btn--secondary" href="/admin/blog">
          Blog
        </Link>
        <Link className="admin-btn admin-btn--secondary" href="/admin/testimonials">
          Testimonials
        </Link>
        <Link className="admin-btn admin-btn--secondary" href="/" target="_blank">
          View site ↗
        </Link>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/admin/login" });
          }}
        >
          <button className="admin-btn admin-btn--secondary" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </header>
  );
}
