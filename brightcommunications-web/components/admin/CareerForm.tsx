"use client";

import { useActionState } from "react";
import Link from "next/link";

import { AdminField, useFieldErrorsFromState } from "@/components/admin/AdminField";
import { validateCareerFormData } from "@/lib/admin-validation";
import {
  createCareer,
  type CareerFormState,
  updateCareer,
} from "@/lib/actions/careers";

type CareerRecord = {
  id: string;
  title: string;
  department: string;
  jobType: string;
  location: string;
  experience: string;
  description: string;
  sortOrder: number;
  isActive: boolean;
};

const initialState: CareerFormState = {};

export function CareerForm({ career }: { career?: CareerRecord }) {
  const action = career
    ? updateCareer.bind(null, career.id)
    : createCareer;
  const [state, formAction, pending] = useActionState(action, initialState);
  const [fieldErrors, setFieldErrors] = useFieldErrorsFromState(state);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const validation = validateCareerFormData(formData);
    if (!validation.success) {
      event.preventDefault();
      setFieldErrors(validation.fieldErrors);
    }
  }

  function clearError(field: string) {
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    }
  }

  return (
    <form
      className="admin-card admin-form"
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
    >
      <AdminField label="Job Title" htmlFor="title" error={fieldErrors.title}>
        <input
          id="title"
          name="title"
          defaultValue={career?.title ?? ""}
          placeholder="e.g. Senior Creative Designer"
          onChange={() => clearError("title")}
        />
      </AdminField>

      <AdminField
        label="Department"
        htmlFor="department"
        error={fieldErrors.department}
        hint="e.g. Creative, Digital, Content, Production, Strategy, Technology"
      >
        <input
          id="department"
          name="department"
          defaultValue={career?.department ?? ""}
          placeholder="e.g. Creative"
          onChange={() => clearError("department")}
        />
      </AdminField>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <AdminField label="Job Type" htmlFor="jobType" error={fieldErrors.jobType}>
          <select
            id="jobType"
            name="jobType"
            defaultValue={career?.jobType ?? "Full-time"}
            onChange={() => clearError("jobType")}
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </AdminField>

        <AdminField label="Experience Required" htmlFor="experience" error={fieldErrors.experience}>
          <input
            id="experience"
            name="experience"
            defaultValue={career?.experience ?? "2-4 Years"}
            placeholder="e.g. 2-5 Years"
            onChange={() => clearError("experience")}
          />
        </AdminField>
      </div>

      <AdminField label="Location" htmlFor="location" error={fieldErrors.location}>
        <input
          id="location"
          name="location"
          defaultValue={career?.location ?? "Kochi, Kerala (On-site)"}
          placeholder="e.g. Kochi, Kerala (On-site)"
          onChange={() => clearError("location")}
        />
      </AdminField>

      <AdminField
        label="Job Description & Responsibilities"
        htmlFor="description"
        error={fieldErrors.description}
      >
        <textarea
          id="description"
          name="description"
          rows={5}
          defaultValue={career?.description ?? ""}
          placeholder="Describe the key responsibilities, expectations, and ideal candidate profile..."
          onChange={() => clearError("description")}
        />
      </AdminField>

      <AdminField label="Sort order" htmlFor="sortOrder" error={fieldErrors.sortOrder}>
        <input
          id="sortOrder"
          name="sortOrder"
          type="number"
          min={0}
          defaultValue={career?.sortOrder ?? 0}
          onChange={() => clearError("sortOrder")}
        />
      </AdminField>

      <label style={{ display: "flex", alignItems: "center", gap: "8px", margin: "12px 0" }}>
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={career?.isActive ?? true}
        />
        <span>Active (visible on website)</span>
      </label>

      {state.error ? <p className="admin-field__error">{state.error}</p> : null}

      <div className="admin-actions">
        <button
          className="admin-btn admin-btn--primary"
          type="submit"
          disabled={pending}
        >
          {pending
            ? career
              ? "Saving..."
              : "Creating..."
            : career
            ? "Save changes"
            : "Create opening"}
        </button>
        <Link className="admin-btn admin-btn--secondary" href="/admin/careers">
          Cancel
        </Link>
      </div>
    </form>
  );
}
