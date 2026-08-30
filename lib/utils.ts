import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCad(amount: number): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  }).format(amount);
}

/** Figma product cards show `$14.99` plus a separate `CAD` suffix */
export function formatCadParts(amount: number): { amount: string; currency: string } {
  const parts = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  }).formatToParts(amount);

  const amountPart = parts
    .filter((part) => part.type === "currency" || part.type === "integer" || part.type === "decimal" || part.type === "fraction")
    .map((part) => part.value)
    .join("");

  return { amount: amountPart, currency: "CAD" };
}

export function formatBulkUnit(amount: number): string {
  const { amount: value } = formatCadParts(amount);
  return `${value}/unit`;
}
