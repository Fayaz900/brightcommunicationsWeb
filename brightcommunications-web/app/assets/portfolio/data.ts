import type { StaticImageData } from "next/image";

import kanchanaInstantSevai from "./Kanchana-Instant-Sevai.webp";
import kanchanaKondattam from "./Kanchana-Kondattam.webp";
import portfolio2 from "./portfolio-2.webp";
import portfolio7 from "./portfolio-7.webp";
import renaiMedicity3 from "./Renai-Medicity-3.webp";

export type PortfolioItem = {
  slug: string;
  src: StaticImageData;
  backgroundImage: StaticImageData;
  title: string;
  client: string;
  year: string;
  industry: string;
  projectBrief: string;
  galleryImages: StaticImageData[];
  youtubeUrl?: string;
};

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "kanchana-instant-sevai",
    src: kanchanaInstantSevai,
    backgroundImage: kanchanaInstantSevai,
    title: "Kanchana Instant Sevai Campaign",
    client: "Kanchana Foods",
    year: "2026",
    industry: "FMCG",
    projectBrief:
      "A campaign showcase built to present the brand story, product appeal, and communication assets in one polished case study format.",
    galleryImages: [kanchanaInstantSevai, kanchanaKondattam, portfolio2],
    youtubeUrl: "https://www.youtube.com/watch?v=oW9NIapHaFU",
  },
  {
    slug: "kanchana-kondattam",
    src: kanchanaKondattam,
    backgroundImage: kanchanaKondattam,
    title: "Kanchana Kondattam",
    client: "Kanchana Foods",
    year: "2026",
    industry: "Retail & Lifestyle",
    projectBrief:
      "A festive brand communication project designed to connect product visibility with celebration-led consumer engagement.",
    galleryImages: [kanchanaKondattam, kanchanaInstantSevai, portfolio7],
  },
  {
    slug: "brand-activation-campaign",
    src: portfolio2,
    backgroundImage: portfolio2,
    title: "Brand Activation Campaign",
    client: "Bright Communications",
    year: "2026",
    industry: "Advertising & Creative",
    projectBrief:
      "An activation-style project page for documenting campaign context, execution visuals, client details, and results-oriented storytelling.",
    galleryImages: [portfolio2, portfolio7, renaiMedicity3],
  },
  {
    slug: "digital-presence-campaign",
    src: portfolio7,
    backgroundImage: portfolio7,
    title: "Digital Presence Campaign",
    client: "Bright Communications",
    year: "2026",
    industry: "Digital Marketing",
    projectBrief:
      "A digital campaign case study layout for presenting platform creatives, campaign films, performance context, and visual assets.",
    galleryImages: [portfolio7, portfolio2, kanchanaInstantSevai],
    youtubeUrl: "https://www.youtube.com/watch?v=oW9NIapHaFU",
  },
  {
    slug: "renai-medicity-brand-film",
    src: renaiMedicity3,
    backgroundImage: renaiMedicity3,
    title: "Renai Medicity Brand Film",
    client: "Renai Medicity",
    year: "2026",
    industry: "Healthcare",
    projectBrief:
      "A healthcare communication showcase for presenting the campaign narrative, production stills, and supporting video in a focused project page.",
    galleryImages: [renaiMedicity3, portfolio2, portfolio7],
  },
];

export function getPortfolioItemBySlug(slug: string) {
  return portfolioItems.find((item) => item.slug === slug) ?? null;
}