export type FaqItem = {
  question: string;
  answer: string;
};

export function parseFaqItems(value: string): {
  items: FaqItem[];
  error?: string;
} {
  if (!value.trim()) return { items: [] };

  let parsed: unknown;
  try {
    parsed = JSON.parse(value);
  } catch {
    return { items: [], error: "FAQs could not be read. Please review the entries and try again." };
  }

  if (!Array.isArray(parsed)) {
    return { items: [], error: "FAQs must be a list of question and answer pairs." };
  }

  const items: FaqItem[] = [];
  for (const entry of parsed) {
    const record = typeof entry === "object" && entry !== null
      ? entry as { question?: unknown; answer?: unknown }
      : {};
    const question = typeof record.question === "string" ? record.question.trim() : "";
    const answer = typeof record.answer === "string" ? record.answer.trim() : "";
    if (!question && !answer) continue;
    if (!question || !answer) {
      return { items: [], error: "Each FAQ needs both a question and an answer, or must be left blank." };
    }
    if (question.length > 240) {
      return { items: [], error: "FAQ questions must be 240 characters or fewer." };
    }
    if (answer.length > 3000) {
      return { items: [], error: "FAQ answers must be 3,000 characters or fewer." };
    }
    items.push({ question, answer });
  }

  if (items.length > 20) {
    return { items: [], error: "You can add up to 20 FAQs per page." };
  }

  return { items };
}

export function readFaqItems(value: unknown): FaqItem[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is FaqItem =>
      typeof item === "object" &&
      item !== null &&
      "question" in item &&
      typeof item.question === "string" &&
      "answer" in item &&
      typeof item.answer === "string",
  );
}
