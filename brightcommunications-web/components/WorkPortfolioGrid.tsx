import Image from "next/image";

import { portfolioItems } from "@/app/assets/portfolio/data";

export function WorkPortfolioGrid() {
  return (
    <>
      {portfolioItems.map((item, i) => (
        <div key={item.base} className="work-card fade-up">
          <div className="work-card-bg work-card-bg--image">
            <Image
              src={item.src}
              alt={item.title}
              fill
              className="work-card-img"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={i === 0}
            />
          </div>
          <div className="work-card-overlay">
            <span className="work-card-cat">
              Portfolio · {String(i + 1).padStart(2, "0")}
            </span>
            <span className="work-card-title">{item.title}</span>
          </div>
          <div className="work-card-arrow">↗</div>
        </div>
      ))}
    </>
  );
}
