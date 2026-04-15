import type { StaticImageData } from "next/image";

import kanchanaInstantSevai from "./Kanchana-Instant-Sevai.webp";
import kanchanaKondattam from "./Kanchana-Kondattam.webp";
import portfolio2 from "./portfolio-2.webp";
import portfolio7 from "./portfolio-7.webp";
import renaiMedicity3 from "./Renai-Medicity-3.webp";

/** Filename without extension → display title (hyphens → spaces). */
export function titleFromImageBase(base: string) {
  return base.replace(/-/g, " ");
}

export type PortfolioItem = {
  src: StaticImageData;
  /** Filename without extension */
  base: string;
  title: string;
};

export const portfolioItems: PortfolioItem[] = [
  { src: kanchanaInstantSevai, base: "Kanchana-Instant-Sevai" },
  { src: kanchanaKondattam, base: "Kanchana-Kondattam" },
  { src: portfolio2, base: "portfolio-2" },
  { src: portfolio7, base: "portfolio-7" },
  { src: renaiMedicity3, base: "Renai-Medicity-3" },
].map((item) => ({
  ...item,
  title: titleFromImageBase(item.base),
}));
