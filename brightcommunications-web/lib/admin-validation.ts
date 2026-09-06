import { extractYouTubeId } from "@/lib/youtube";
import { slugify } from "@/lib/slug";

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; fieldErrors: Record<string, string>; error: string };

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isValidHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isBodyEmpty(html: string): boolean {
  const text = html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
  return text.length === 0;
}

function parseTags(value: string): string[] {
  return value.split(",").map((tag) => tag.trim()).filter(Boolean);
}

function parseImageList(value: string): string[] {
  return value.split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean);
}

export function validateBlogFormData(formData: FormData): ValidationResult<{
  title: string;
  slug: string;
  body: string;
  featuredImage: string | null;
  category: string;
  tags: string[];
  author: string;
  published: boolean;
  publishedAt: Date | null;
}> {
  const fieldErrors: Record<string, string> = {};
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const featuredImage = String(formData.get("featuredImage") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const tags = parseTags(String(formData.get("tags") ?? ""));
  const author = String(formData.get("author") ?? "").trim();
  const published = formData.get("published") === "on";
  const publishedAtRaw = String(formData.get("publishedAt") ?? "").trim();

  if (!title) fieldErrors.title = "Title is required.";
  else if (title.length < 3) fieldErrors.title = "Title must be at least 3 characters.";

  const slug = slugInput || slugify(title);
  if (!slugInput && !title) fieldErrors.slug = "Slug is required.";
  else if (slugInput && !SLUG_PATTERN.test(slugInput)) fieldErrors.slug = "Slug can only contain lowercase letters, numbers, and hyphens.";

  if (isBodyEmpty(body)) fieldErrors.body = "Body content is required.";
  if (!category) fieldErrors.category = "Category is required.";
  if (!author) fieldErrors.author = "Author is required.";
  if (tags.some((tag) => tag.length > 40)) fieldErrors.tags = "Each tag must be 40 characters or fewer.";
  if (featuredImage && !isValidHttpUrl(featuredImage) && !featuredImage.startsWith("/")) fieldErrors.featuredImage = "Featured image must be a valid URL or uploaded file.";

  let publishedAt: Date | null = null;
  if (publishedAtRaw) {
    const date = new Date(publishedAtRaw);
    if (Number.isNaN(date.getTime())) fieldErrors.publishedAt = "Publish date is invalid.";
    else publishedAt = date;
  } else if (published) {
    publishedAt = new Date();
  }

  if (Object.keys(fieldErrors).length > 0) return { success: false, fieldErrors, error: "Please fix the highlighted fields." };
  return { success: true, data: { title, slug: slugInput || slug, body, featuredImage: featuredImage || null, category, tags, author, published, publishedAt } };
}

export function validateTestimonialFormData(formData: FormData): ValidationResult<{
  name: string;
  role: string;
  company: string;
  videoUrl: string;
  thumbnailUrl: string | null;
  sortOrder: number;
  isActive: boolean;
}> {
  const fieldErrors: Record<string, string> = {};
  const name = String(formData.get("name") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const videoUrl = String(formData.get("videoUrl") ?? "").trim();
  const thumbnailUrl = String(formData.get("thumbnailUrl") ?? "").trim();
  const sortOrderRaw = String(formData.get("sortOrder") ?? "0").trim();
  const isActive = formData.get("isActive") === "on";

  if (!name) fieldErrors.name = "Name is required.";
  if (!role) fieldErrors.role = "Role is required.";
  if (!company) fieldErrors.company = "Company is required.";
  if (!videoUrl) fieldErrors.videoUrl = "YouTube video URL is required.";
  else if (!isValidHttpUrl(videoUrl)) fieldErrors.videoUrl = "Enter a valid URL.";
  else if (!extractYouTubeId(videoUrl)) fieldErrors.videoUrl = "Enter a valid YouTube video URL.";
  if (thumbnailUrl && !isValidHttpUrl(thumbnailUrl) && !thumbnailUrl.startsWith("/")) fieldErrors.thumbnailUrl = "Thumbnail must be a valid URL or uploaded file.";

  const sortOrder = Number(sortOrderRaw);
  if (!Number.isFinite(sortOrder) || sortOrder < 0) fieldErrors.sortOrder = "Sort order must be 0 or greater.";

  if (Object.keys(fieldErrors).length > 0) return { success: false, fieldErrors, error: "Please fix the highlighted fields." };
  return { success: true, data: { name, role, company, videoUrl, thumbnailUrl: thumbnailUrl || null, sortOrder, isActive } };
}

export function validateServiceProjectFormData(formData: FormData): ValidationResult<{
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
}> {
  const fieldErrors: Record<string, string> = {};
  const serviceNum = String(formData.get("serviceNum") ?? "").trim();
  const serviceName = String(formData.get("serviceName") ?? "").trim();
  const serviceDesc = String(formData.get("serviceDesc") ?? "").trim();
  const serviceTags = parseTags(String(formData.get("serviceTags") ?? ""));
  const serviceImage = String(formData.get("serviceImage") ?? "").trim();
  const sortOrderRaw = String(formData.get("sortOrder") ?? "0").trim();
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const client = String(formData.get("client") ?? "").trim();
  const year = String(formData.get("year") ?? "").trim();
  const industry = String(formData.get("industry") ?? "").trim();
  const backgroundImage = String(formData.get("backgroundImage") ?? "").trim();
  const projectBrief = String(formData.get("projectBrief") ?? "").trim();
  const galleryImages = parseImageList(String(formData.get("galleryImages") ?? ""));
  const youtubeUrl = String(formData.get("youtubeUrl") ?? "").trim();
  const isActive = formData.get("isActive") === "on";
  const slug = slugInput || slugify(title || serviceName);
  const sortOrder = Number(sortOrderRaw);

  if (!serviceNum) fieldErrors.serviceNum = "Service number is required.";
  if (!serviceName) fieldErrors.serviceName = "Service row title is required.";
  if (!serviceDesc) fieldErrors.serviceDesc = "Service row description is required.";
  if (serviceTags.length === 0) fieldErrors.serviceTags = "Add at least one service tag.";
  if (!Number.isFinite(sortOrder) || sortOrder < 0) fieldErrors.sortOrder = "Sort order must be 0 or greater.";
  if (!title) fieldErrors.title = "Project title is required.";
  if (!slug) fieldErrors.slug = "Slug is required.";
  else if (!SLUG_PATTERN.test(slug)) fieldErrors.slug = "Slug can only contain lowercase letters, numbers, and hyphens.";
  if (!client) fieldErrors.client = "Client is required.";
  if (!year) fieldErrors.year = "Year is required.";
  if (!industry) fieldErrors.industry = "Industry is required.";
  if (!projectBrief) fieldErrors.projectBrief = "Project brief is required.";

  if (serviceImage && !isValidHttpUrl(serviceImage) && !serviceImage.startsWith("/")) fieldErrors.serviceImage = "Service row image must be a valid URL or uploaded file.";
  if (backgroundImage && !isValidHttpUrl(backgroundImage) && !backgroundImage.startsWith("/")) fieldErrors.backgroundImage = "Background image must be a valid URL or uploaded file.";
  if (galleryImages.some((image) => !isValidHttpUrl(image) && !image.startsWith("/"))) fieldErrors.galleryImages = "Gallery images must be valid URLs or uploaded file paths.";
  if (youtubeUrl) {
    if (!isValidHttpUrl(youtubeUrl)) fieldErrors.youtubeUrl = "Enter a valid URL.";
    else if (!extractYouTubeId(youtubeUrl)) fieldErrors.youtubeUrl = "Enter a valid YouTube video URL.";
  }

  if (Object.keys(fieldErrors).length > 0) return { success: false, fieldErrors, error: "Please fix the highlighted fields." };
  return {
    success: true,
    data: { serviceNum, serviceName, serviceDesc, serviceTags, serviceImage: serviceImage || null, sortOrder, slug, title, client, year, industry, backgroundImage: backgroundImage || null, projectBrief, galleryImages, youtubeUrl: youtubeUrl || null, isActive },
  };
}

export function validateEditorUrl(value: string, type: "link" | "image"): string | null {
  const trimmed = value.trim();
  if (!trimmed) return type === "link" ? "URL is required." : "Image URL is required.";
  if (!isValidHttpUrl(trimmed) && !trimmed.startsWith("/")) return "Enter a valid URL (http:// or https://).";
  return null;
}