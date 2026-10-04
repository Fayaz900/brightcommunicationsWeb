"use client";

import { useState } from "react";

import { AdminField } from "@/components/admin/AdminField";
import type { FaqItem } from "@/lib/faq-types";

export function FaqEditor({
  defaultValue = [],
  error,
}: {
  defaultValue?: FaqItem[];
  error?: string;
}) {
  const [items, setItems] = useState<FaqItem[]>(defaultValue);

  function updateItem(index: number, key: keyof FaqItem, value: string) {
    setItems((current) => current.map((item, itemIndex) =>
      itemIndex === index ? { ...item, [key]: value } : item,
    ));
  }

  return (
    <section className={`admin-faq-editor${error ? " admin-field--invalid" : ""}`} aria-labelledby="faq-editor-heading">
      <div className="admin-faq-editor__heading">
        <div>
          <h2 id="faq-editor-heading">FAQs (optional)</h2>
          <p className="admin-field__hint">Add question and answer pairs. They appear at the bottom of the published page.</p>
        </div>
        <button
          type="button"
          className="admin-btn admin-btn--secondary"
          disabled={items.length >= 20}
          onClick={() => setItems((current) => [...current, { question: "", answer: "" }])}
        >
          Add FAQ
        </button>
      </div>

      {items.map((item, index) => (
        <div className="admin-faq-editor__item" key={index}>
          <div className="admin-faq-editor__item-heading">
            <strong>FAQ {index + 1}</strong>
            <button
              type="button"
              className="admin-btn admin-btn--secondary"
              onClick={() => setItems((current) => current.filter((_, itemIndex) => itemIndex !== index))}
              aria-label={`Remove FAQ ${index + 1}`}
            >
              Remove
            </button>
          </div>
          <AdminField label="Question" htmlFor={`faq-question-${index}`}>
            <input
              id={`faq-question-${index}`}
              value={item.question}
              maxLength={240}
              onChange={(event) => updateItem(index, "question", event.target.value)}
              placeholder="Enter a frequently asked question"
            />
          </AdminField>
          <AdminField label="Answer" htmlFor={`faq-answer-${index}`}>
            <textarea
              id={`faq-answer-${index}`}
              value={item.answer}
              maxLength={3000}
              rows={3}
              onChange={(event) => updateItem(index, "answer", event.target.value)}
              placeholder="Write a helpful answer"
            />
          </AdminField>
        </div>
      ))}

      <input type="hidden" name="faqs" value={JSON.stringify(items)} />
      {error ? <p className="admin-field__error" role="alert">{error}</p> : null}
    </section>
  );
}
