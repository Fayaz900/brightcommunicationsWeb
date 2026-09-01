"use client";

import { useActionState } from "react";

import { AdminField, useFieldErrorsFromState } from "@/components/admin/AdminField";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { validateTestimonialFormData } from "@/lib/admin-validation";
import {
  createTestimonial,
  type TestimonialFormState,
  updateTestimonial,
} from "@/lib/actions/testimonials";

type TestimonialRecord = {
  id: string;
  name: string;
  role: string;
  company: string;
  videoUrl: string;
  thumbnailUrl: string | null;
  sortOrder: number;
  isActive: boolean;
};

const initialState: TestimonialFormState = {};

export function TestimonialForm({
  testimonial,
}: {
  testimonial?: TestimonialRecord;
}) {
  const action = testimonial
    ? updateTestimonial.bind(null, testimonial.id)
    : createTestimonial;
  const [state, formAction, pending] = useActionState(action, initialState);
  const [fieldErrors, setFieldErrors] = useFieldErrorsFromState(state);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const validation = validateTestimonialFormData(formData);
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
      <AdminField label="Name" htmlFor="name" error={fieldErrors.name}>
        <input
          id="name"
          name="name"
          defaultValue={testimonial?.name ?? ""}
          onChange={() => clearError("name")}
        />
      </AdminField>

      <AdminField label="Role" htmlFor="role" error={fieldErrors.role}>
        <input
          id="role"
          name="role"
          defaultValue={testimonial?.role ?? ""}
          onChange={() => clearError("role")}
        />
      </AdminField>

      <AdminField label="Company" htmlFor="company" error={fieldErrors.company}>
        <input
          id="company"
          name="company"
          defaultValue={testimonial?.company ?? ""}
          onChange={() => clearError("company")}
        />
      </AdminField>

      <AdminField
        label="YouTube video URL"
        htmlFor="videoUrl"
        error={fieldErrors.videoUrl}
        hint="Example: https://www.youtube.com/watch?v=..."
      >
        <input
          id="videoUrl"
          name="videoUrl"
          defaultValue={testimonial?.videoUrl ?? ""}
          placeholder="https://www.youtube.com/watch?v=..."
          onChange={() => clearError("videoUrl")}
        />
      </AdminField>

      <ImageUpload
        name="thumbnailUrl"
        folder="testimonials"
        defaultValue={testimonial?.thumbnailUrl ?? ""}
        label="Custom thumbnail (optional)"
        error={fieldErrors.thumbnailUrl}
        onChange={() => clearError("thumbnailUrl")}
      />

      <AdminField label="Sort order" htmlFor="sortOrder" error={fieldErrors.sortOrder}>
        <input
          id="sortOrder"
          name="sortOrder"
          type="number"
          min={0}
          defaultValue={testimonial?.sortOrder ?? 0}
          onChange={() => clearError("sortOrder")}
        />
      </AdminField>

      <label>
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={testimonial?.isActive ?? true}
        />{" "}
        Active
      </label>

      {state.error ? <p className="admin-error">{state.error}</p> : null}

      <div className="admin-actions">
        <button className="admin-btn admin-btn--primary" type="submit" disabled={pending}>
          {pending ? "Saving..." : "Save testimonial"}
        </button>
      </div>
    </form>
  );
}
