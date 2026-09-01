const YOUTUBE_ID_REGEX =
  /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

export function extractYouTubeId(url: string): string | null {
  const match = url.match(YOUTUBE_ID_REGEX);
  return match?.[1] ?? null;
}

export function getYouTubeEmbedUrl(url: string): string {
  const id = extractYouTubeId(url);
  if (!id) return url;
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3`;
}

export function getYouTubeThumbnailUrl(url: string): string {
  const id = extractYouTubeId(url);
  if (!id) return "";
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

export function resolveTestimonialMedia(
  videoUrl: string,
  thumbnailUrl?: string | null,
) {
  return {
    embedUrl: getYouTubeEmbedUrl(videoUrl),
    thumbnail: thumbnailUrl || getYouTubeThumbnailUrl(videoUrl),
  };
}
