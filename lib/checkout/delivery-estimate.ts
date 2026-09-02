import type { ShippingMethodId } from "@/lib/cart/calculations";

const shippingSubLabels: Record<ShippingMethodId, string> = {
  courier: "Standard Ground Shipping",
  local: "Same day delivery for GTA customers",
  pickup: "Pickup at 420 Queen St W, Toronto",
};

export function getShippingSubLabel(shippingMethodId: ShippingMethodId): string {
  return shippingSubLabels[shippingMethodId];
}

/** Figma `2:1816` — estimated arrival window from order date */
export function formatEstimatedArrival(createdAt: string): string {
  const base = new Date(createdAt);
  const start = new Date(base);
  start.setDate(start.getDate() + 2);
  const end = new Date(base);
  end.setDate(end.getDate() + 5);

  const month = start.toLocaleDateString("en-CA", { month: "short" });
  const startDay = start.getDate();
  const endDay = end.getDate();
  const year = end.getFullYear();

  return `${month} ${startDay} – ${endDay}, ${year}`;
}
