"use client";

import { useState } from "react";

import { faqItems } from "@/lib/site-content";

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="faq-list" data-stagger="0.08">
      {faqItems.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <article key={item.question} className="faq-item">
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
  );
}
