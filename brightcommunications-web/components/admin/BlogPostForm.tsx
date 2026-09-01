"use client";

import { useActionState, useState } from "react";

import { AdminField, useFieldErrorsFromState } from "@/components/admin/AdminField";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { validateBlogFormData } from "@/lib/admin-validation";
import { slugify } from "@/lib/slug";
import {
  createBlogPost,
  type BlogFormState,
  updateBlogPost,
} from "@/lib/actions/blog";

type BlogPostRecord = {
  id: string;
  title: string;
  slug: string;
  body: string;
  featuredImage: string | null;
  category: string;
  tags: string[];
  author: string;
  published: boolean;
  publishedAt: Date | null;
};

const initialState: BlogFormState = {};

function toDateInputValue(date: Date | null | undefined) {
  if (!date) return "";
  return new Date(date).toISOString().slice(0, 16);
}

export function BlogPostForm({ post }: { post?: BlogPostRecord }) {
  const action = post ? updateBlogPost.bind(null, post.id) : createBlogPost;
  const [state, formAction, pending] = useActionState(action, initialState);
  const [fieldErrors, setFieldErrors] = useFieldErrorsFromState(state);
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!post);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const validation = validateBlogFormData(formData);
    if (!validation.success) {
      event.preventDefault();
      setFieldErrors(validation.fieldErrors);
    }
  }

  return (
    <form
      className="admin-card admin-form"
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
    >
      <AdminField label="Title" htmlFor="title" error={fieldErrors.title}>
        <input
          id="title"
          name="title"
          value={title}
          onChange={(event) => {
            const nextTitle = event.target.value;
            setTitle(nextTitle);
            if (!slugTouched) {
              setSlug(slugify(nextTitle));
            }
            if (fieldErrors.title) {
              setFieldErrors((prev) => ({ ...prev, title: "" }));
            }
          }}
        />
      </AdminField>

      <AdminField label="Slug" htmlFor="slug" error={fieldErrors.slug}>
        <input
          id="slug"
          name="slug"
          value={slug}
          onChange={(event) => {
            setSlugTouched(true);
            setSlug(event.target.value);
            if (fieldErrors.slug) {
              setFieldErrors((prev) => ({ ...prev, slug: "" }));
            }
          }}
        />
      </AdminField>

      <AdminField label="Category" htmlFor="category" error={fieldErrors.category}>
        <input
          id="category"
          name="category"
          defaultValue={post?.category ?? ""}
          onChange={() => {
            if (fieldErrors.category) {
              setFieldErrors((prev) => ({ ...prev, category: "" }));
            }
          }}
        />
      </AdminField>

      <AdminField
        label="Tags (comma-separated)"
        htmlFor="tags"
        error={fieldErrors.tags}
        hint="Optional. Example: Branding, Strategy"
      >
        <input
          id="tags"
          name="tags"
          defaultValue={post?.tags.join(", ") ?? ""}
          placeholder="Branding, Strategy"
        />
      </AdminField>

      <AdminField label="Author" htmlFor="author" error={fieldErrors.author}>
        <input
          id="author"
          name="author"
          defaultValue={post?.author ?? "Bright Communications"}
          onChange={() => {
            if (fieldErrors.author) {
              setFieldErrors((prev) => ({ ...prev, author: "" }));
            }
          }}
        />
      </AdminField>

      <ImageUpload
        name="featuredImage"
        folder="blog"
        defaultValue={post?.featuredImage ?? ""}
        label="Featured image"
        error={fieldErrors.featuredImage}
        onChange={() => {
          if (fieldErrors.featuredImage) {
            setFieldErrors((prev) => ({ ...prev, featuredImage: "" }));
          }
        }}
      />

      <RichTextEditor
        name="body"
        defaultValue={post?.body ?? ""}
        error={fieldErrors.body}
        onChange={() => {
          if (fieldErrors.body) {
            setFieldErrors((prev) => ({ ...prev, body: "" }));
          }
        }}
      />

      <AdminField
        label="Publish date"
        htmlFor="publishedAt"
        error={fieldErrors.publishedAt}
        hint="Optional. Leave blank to use the current date when publishing."
      >
        <input
          id="publishedAt"
          name="publishedAt"
          type="datetime-local"
          defaultValue={toDateInputValue(post?.publishedAt)}
        />
      </AdminField>

      <label>
        <input type="checkbox" name="published" defaultChecked={post?.published ?? false} /> Published
      </label>

      {state.error ? <p className="admin-error">{state.error}</p> : null}

      <div className="admin-actions">
        <button className="admin-btn admin-btn--primary" type="submit" disabled={pending}>
          {pending ? "Saving..." : "Save post"}
        </button>
      </div>
    </form>
  );
}
