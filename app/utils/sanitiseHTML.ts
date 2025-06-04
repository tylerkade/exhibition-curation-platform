import DOMPurify from "dompurify";

const allowedTags = ["p", "em", "strong", "ul", "li", "br", "i"];

export function sanitiseHTML(input?: string): string {
  return DOMPurify.sanitize(input ?? "", {
    ALLOWED_TAGS: allowedTags,
    ALLOWED_ATTR: [],
  });
}
