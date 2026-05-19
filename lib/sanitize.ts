import DOMPurify from "isomorphic-dompurify";

export function sanitizeText(value: unknown) {
  if (typeof value !== "string") return "";
  return DOMPurify.sanitize(value.trim(), {
    ALLOWED_ATTR: [],
    ALLOWED_TAGS: [],
  });
}

export function sanitizeOptionalText(value: unknown) {
  const clean = sanitizeText(value);
  return clean.length > 0 ? clean : null;
}

