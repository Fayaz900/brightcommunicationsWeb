"use client";

import { useActionState, useState } from "react";

import { AdminField, useFieldErrorsFromState } from "@/components/admin/AdminField";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { MultiImageUpload } from "@/components/admin/MultiImageUpload";
import { createServiceProject, type ServiceProjectFormState, updateServiceProject } from "@/lib/actions/service-projects";
import { validateServiceProjectFormData } from "@/lib/admin-validation";
import { slugify } from "@/lib/slug";

export type ServiceProjectRecord = {
  id: string;
  serviceNum: string;
  serviceName: string;
  serviceDesc: string;
  serviceTags: string[];
  serviceImage: string | null;
  sortOrder: number;
  slug: string;
  title: string;
  client: string;
  year: string;
  industry: string;
  backgroundImage: string | null;
  projectBrief: string;
  galleryImages: string[];
  youtubeUrl: string | null;
  isActive: boolean;
};

const initialState: ServiceProjectFormState = {};

export function ServiceProjectForm({ project }: { project?: ServiceProjectRecord }) {
  const action = project ? updateServiceProject.bind(null, project.id) : createServiceProject;
  const [state, formAction, pending] = useActionState(action, initialState);
  const [fieldErrors, setFieldErrors] = useFieldErrorsFromState(state);
  const [title, setTitle] = useState(project?.title ?? "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!project);

  function clearError(field: string) {
    if (fieldErrors[field]) setFieldErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const validation = validateServiceProjectFormData(formData);
    if (!validation.success) {
      event.preventDefault();
      setFieldErrors(validation.fieldErrors);
    }
  }

  return (
    <form className="admin-card admin-form" action={formAction} onSubmit={handleSubmit} noValidate>
      <h2>Service row</h2>
      <AdminField label="Service number" htmlFor="serviceNum" error={fieldErrors.serviceNum} hint="Example: 01, 02, 03">
        <input id="serviceNum" name="serviceNum" defaultValue={project?.serviceNum ?? ""} onChange={() => clearError("serviceNum")} />
      </AdminField>

      <AdminField label="Service row title" htmlFor="serviceName" error={fieldErrors.serviceName}>
        <input id="serviceName" name="serviceName" defaultValue={project?.serviceName ?? ""} onChange={() => clearError("serviceName")} />
      </AdminField>

      <AdminField label="Service row description" htmlFor="serviceDesc" error={fieldErrors.serviceDesc}>
        <textarea id="serviceDesc" name="serviceDesc" defaultValue={project?.serviceDesc ?? ""} onChange={() => clearError("serviceDesc")} />
      </AdminField>

      <AdminField label="Service tags" htmlFor="serviceTags" error={fieldErrors.serviceTags} hint="Comma-separated. Example: Campaigns, Creative, Brand Presence">
        <input id="serviceTags" name="serviceTags" defaultValue={project?.serviceTags.join(", ") ?? ""} onChange={() => clearError("serviceTags")} />
      </AdminField>

      <AdminField label="Sort order" htmlFor="sortOrder" error={fieldErrors.sortOrder}>
        <input id="sortOrder" name="sortOrder" type="number" min={0} defaultValue={project?.sortOrder ?? 0} onChange={() => clearError("sortOrder")} />
      </AdminField>

      <ImageUpload name="serviceImage" folder="projects" defaultValue={project?.serviceImage ?? ""} label="Service row image (optional)" hint="Optional image shown when hovering the service row." error={fieldErrors.serviceImage} onChange={() => clearError("serviceImage")} />

      <h2>Project page</h2>
      <AdminField label="Project title" htmlFor="title" error={fieldErrors.title}>
        <input id="title" name="title" value={title} onChange={(event) => { const nextTitle = event.target.value; setTitle(nextTitle); if (!slugTouched) setSlug(slugify(nextTitle)); clearError("title"); }} />
      </AdminField>

      <AdminField label="Slug" htmlFor="slug" error={fieldErrors.slug}>
        <input id="slug" name="slug" value={slug} onChange={(event) => { setSlugTouched(true); setSlug(event.target.value); clearError("slug"); }} />
      </AdminField>

      <AdminField label="Client" htmlFor="client" error={fieldErrors.client}>
        <input id="client" name="client" defaultValue={project?.client ?? ""} onChange={() => clearError("client")} />
      </AdminField>

      <AdminField label="Year" htmlFor="year" error={fieldErrors.year}>
        <input id="year" name="year" defaultValue={project?.year ?? ""} placeholder="2026" onChange={() => clearError("year")} />
      </AdminField>

      <AdminField label="Industry" htmlFor="industry" error={fieldErrors.industry}>
        <input id="industry" name="industry" defaultValue={project?.industry ?? ""} onChange={() => clearError("industry")} />
      </AdminField>

      <ImageUpload name="backgroundImage" folder="projects" defaultValue={project?.backgroundImage ?? ""} label="Background image" hint="Used as the large project page hero image. Recommended: 1600 x 900 px." error={fieldErrors.backgroundImage} onChange={() => clearError("backgroundImage")} />

      <AdminField label="Project brief" htmlFor="projectBrief" error={fieldErrors.projectBrief}>
        <textarea id="projectBrief" name="projectBrief" defaultValue={project?.projectBrief ?? ""} onChange={() => clearError("projectBrief")} />
      </AdminField>

      <MultiImageUpload name="galleryImages" folder="projects" defaultValue={project?.galleryImages ?? []} label="Gallery images" hint="Upload multiple images or paste one URL/path per line." error={fieldErrors.galleryImages} onChange={() => clearError("galleryImages")} />

      <AdminField label="YouTube video URL" htmlFor="youtubeUrl" error={fieldErrors.youtubeUrl} hint="Optional. Example: https://www.youtube.com/watch?v=...">
        <input id="youtubeUrl" name="youtubeUrl" defaultValue={project?.youtubeUrl ?? ""} onChange={() => clearError("youtubeUrl")} />
      </AdminField>

      <label><input type="checkbox" name="isActive" defaultChecked={project?.isActive ?? true} /> Active</label>
      {state.error ? <p className="admin-error">{state.error}</p> : null}
      <div className="admin-actions"><button className="admin-btn admin-btn--primary" type="submit" disabled={pending}>{pending ? "Saving..." : "Save service row"}</button></div>
    </form>
  );
}