import { notFound } from "next/navigation";
import { CareerForm } from "@/components/admin/CareerForm";
import { getCareerById } from "@/lib/careers";

export default async function EditCareerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const career = await getCareerById(id);

  if (!career) {
    notFound();
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", margin: 0 }}>Edit Job Opening</h2>
        <p style={{ fontSize: "14px", color: "var(--gray-600)", margin: "4px 0 0" }}>
          Update role requirements, department, or active status.
        </p>
      </div>
      <CareerForm career={career} />
    </div>
  );
}
