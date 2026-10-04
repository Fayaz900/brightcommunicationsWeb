"use client";

import { useState } from "react";

import { faqItems } from "@/lib/site-content";
import type { FaqItem } from "@/lib/faq-types";

export function FaqAccordion({
  items = faqItems,
  title = "Frequently Asked Questions",
}: {
  items?: readonly FaqItem[];
  title?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (items.length === 0) return null;

  return (
    <section className="faq-section">
      <div className="container faq-section__inner">
        <header className="faq-section__header">
          <p className="section-eyebrow">Have questions?</p>
          <h2 className="heading-display heading-lg">{title}</h2>
        </header>
        <div className="faq-list">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <article key={`${item.question}-${i}`} className="faq-item">
            <button
              type="button"
              className={`faq-item__trigger${isOpen ? " is-open" : ""}`}
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <span className="faq-item__question">{item.question}</span>
              <span className="faq-item__icon" aria-hidden="true">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div
              className="faq-item__panel"
              hidden={!isOpen}
              role="region"
            >
              <p className="faq-item__answer">{item.answer}</p>
            </div>
          </article>
        );
      })}
        </div>
      </div>
    </section>
  );
}
