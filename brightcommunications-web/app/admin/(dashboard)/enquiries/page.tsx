import { getEnquiries } from "@/lib/enquiries";
import { EnquiryList } from "@/components/admin/EnquiryList";

export const dynamic = "force-dynamic";

export default async function AdminEnquiriesPage() {
  const enquiries = await getEnquiries();

  return (
    <div className="admin-card">
      <div style={{ marginBottom: "24px", borderBottom: "1px solid #e4e4e7", paddingBottom: "16px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: "700", margin: "0 0 6px" }}>
          Contact Enquiries
        </h1>
        <p style={{ margin: 0, fontSize: "14px", color: "#71717a" }}>
          View and manage client enquiries submitted through the website&apos;s contact form.
        </p>
      </div>

      <EnquiryList enquiries={enquiries} />
    </div>
  );
}
