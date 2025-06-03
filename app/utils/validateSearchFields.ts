export function sanitiseSearchField(
  input: string | null | undefined
): "all" | "title" | "tags" | "artistOrCulture" {
  const validSearchFields = new Set([
    "all",
    "title",
    "tags",
    "artistOrCulture",
  ]);
  return validSearchFields.has(input ?? "")
    ? (input as "all" | "title" | "tags" | "artistOrCulture")
    : "all";
}
