import { CareerForm } from "@/components/admin/CareerForm";

export default function NewCareerPage() {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", margin: 0 }}>Create Job Opening</h2>
        <p style={{ fontSize: "14px", color: "var(--gray-600)", margin: "4px 0 0" }}>
          Add a new role to be showcased on the /careers page.
        </p>
      </div>
      <CareerForm />
    </div>
  );
}
