import { AdminHeader } from "@/components/admin/AdminHeader";
import "@/app/admin/admin.css";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-shell">
      <AdminHeader title="Bright Communications Admin" />
      <main className="admin-main">{children}</main>
    </div>
  );
}
