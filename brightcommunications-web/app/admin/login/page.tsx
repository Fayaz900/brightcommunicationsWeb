import { LoginForm } from "@/components/admin/LoginForm";
import "@/app/admin/admin.css";

export default function AdminLoginPage() {
  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <h1 className="admin-login__title">Admin Login</h1>
        <p className="admin-login__subtitle">
          Sign in to manage blog posts and testimonials.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
