import Image from "next/image";

import { portfolioItems } from "@/app/assets/portfolio/data";

export function WorkPortfolioGrid() {
  return (
    <>
      {portfolioItems.map((item, i) => (
        <article key={item.base} className="work-card">
          <div className="work-card__bg">
            <Image
              src={item.src}
              alt={item.title}
              fill
              className="work-card__img"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={i === 0}
            />
          </div>
          <div className="work-card__overlay">
            <span className="work-card__cat">
              Portfolio · {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="work-card__title">{item.title}</h3>
          </div>
        </article>
      ))}
    </>
  );
}
