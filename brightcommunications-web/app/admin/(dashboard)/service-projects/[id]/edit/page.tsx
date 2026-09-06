import { notFound } from "next/navigation";

import { ServiceProjectForm } from "@/components/admin/ServiceProjectForm";
import { getServiceProjectById } from "@/lib/service-projects";

export default async function EditServiceProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getServiceProjectById(id);

  if (!project) notFound();

  return <ServiceProjectForm project={project} />;
}