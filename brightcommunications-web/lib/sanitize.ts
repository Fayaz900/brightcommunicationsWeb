import sanitizeHtml from "sanitize-html";

const allowedTags = sanitizeHtml.defaults.allowedTags.concat([
  "img",
  "h1",
  "h2",
  "h3",
  "u",
  "s",
  "sub",
  "sup",
]);

export function sanitizeBlogHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags,
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "title", "width", "height", "style"],
      a: ["href", "name", "target", "rel"],
      "*": ["style"],
    },
    allowedStyles: {
      "*": {
        "text-align": [/^left$/, /^center$/, /^right$/],
      },
      img: {
        width: [/^\d+(?:px|%)$/],
        height: [/^\d+(?:px|%)$/, /^auto$/],
      },
    },
  });
}
