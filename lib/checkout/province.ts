import { CANADIAN_PROVINCES } from "@/lib/checkout/types";

const PROVINCE_CODES: Record<(typeof CANADIAN_PROVINCES)[number], string> = {
  Alberta: "AB",
  "British Columbia": "BC",
  Manitoba: "MB",
  "New Brunswick": "NB",
  "Newfoundland and Labrador": "NL",
  "Northwest Territories": "NT",
  "Nova Scotia": "NS",
  Nunavut: "NU",
  Ontario: "ON",
  "Prince Edward Island": "PE",
  Quebec: "QC",
  Saskatchewan: "SK",
  Yukon: "YT",
};

/** Map UI province label or code to a 2-letter Canadian province code. */
export function toProvinceCode(province: string): string {
  const trimmed = province.trim();
  if (trimmed.length === 2) return trimmed.toUpperCase();
  const fromLabel = PROVINCE_CODES[trimmed as keyof typeof PROVINCE_CODES];
  if (fromLabel) return fromLabel;
  const match = Object.entries(PROVINCE_CODES).find(
    ([label]) => label.toLowerCase() === trimmed.toLowerCase(),
  );
  return match?.[1] ?? trimmed.slice(0, 2).toUpperCase();
}

/** Map ISO province code back to the full label used in forms. */
export function fromProvinceCode(code: string): string {
  const trimmed = code.trim().toUpperCase();
  const match = Object.entries(PROVINCE_CODES).find(([, value]) => value === trimmed);
  if (match) return match[0];
  if (CANADIAN_PROVINCES.includes(code.trim() as (typeof CANADIAN_PROVINCES)[number])) {
    return code.trim();
  }
  return code.trim();
}

export function toCountryCode(country: string): string {
  const trimmed = country.trim().toLowerCase();
  if (!trimmed || trimmed === "canada" || trimmed === "ca") return "CA";
  return country.trim().slice(0, 2).toUpperCase() || "CA";
}

export function fromCountryCode(code: string): string {
  const trimmed = code.trim().toUpperCase();
  if (!trimmed || trimmed === "CA") return "Canada";
  return code.trim();
}
