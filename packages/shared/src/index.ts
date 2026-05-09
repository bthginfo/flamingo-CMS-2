export const industries = [
  "restaurant",
  "hotel",
  "tourism",
  "salon",
  "trades",
  "consulting",
  "medical",
  "fitness",
  "real-estate"
] as const;

export const styles = ["classic", "modern", "bold"] as const;

export type IndustryKey = (typeof industries)[number];
export type StyleKey = (typeof styles)[number];
export type Locale = "de-AT" | "de-DE" | "en";

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}
