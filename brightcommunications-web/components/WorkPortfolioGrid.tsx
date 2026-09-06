import Image from "next/image";
import Link from "next/link";

import { portfolioItems } from "@/app/assets/portfolio/data";

export function WorkPortfolioGrid() {
  return (
    <>
      {portfolioItems.map((item, i) => (
        <article key={item.slug} className="work-card">
          <Link className="work-card__link" href={`/work/${item.slug}`}>
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
                {item.industry} / {item.year}
              </span>
              <h3 className="work-card__title">{item.title}</h3>
              <span className="work-card__client">{item.client}</span>
            </div>
          </Link>
        </article>
      ))}
    </>
  );
}