/** Parse bulk threshold from labels like `Bulk (10+)` or `Buy 10 or more` */
export function parseBulkMinQuantity(label: string): number | undefined {
  const plusMatch = label.match(/(\d+)\s*\+/);
  if (plusMatch) return Number.parseInt(plusMatch[1], 10);

  const buyMatch = label.match(/buy\s+(\d+)/i);
  if (buyMatch) return Number.parseInt(buyMatch[1], 10);

  return undefined;
}
