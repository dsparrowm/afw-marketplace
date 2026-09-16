import type { CartLine } from "@/lib/cart/types";

export const FREE_SHIPPING_THRESHOLD = 150;
export const ESTIMATED_TAX_RATE = 0.043;

export type ShippingMethodId = "courier" | "local" | "pickup";

export type ShippingMethod = {
  id: ShippingMethodId;
  label: string;
  description: string;
  price: number;
};

export const shippingMethods: ShippingMethod[] = [
  {
    id: "courier",
    label: "Ship (Courier)",
    description: "2-4 business days across Canada",
    price: 12.5,
  },
  {
    id: "local",
    label: "Local Delivery",
    description: "Same day delivery for GTA customers",
    price: 8,
  },
  {
    id: "pickup",
    label: "Store Pickup",
    description: "Pickup at 420 Queen St W, Toronto",
    price: 0,
  },
];

export type OrderSummary = {
  subtotal: number;
  bulkDiscount: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
  amountToFreeShipping: number;
  freeShippingProgress: number;
};

function lineBulkDiscount(line: CartLine): number {
  if (!line.bulkPrice || !line.bulkMinQuantity) return 0;
  if (line.quantity < line.bulkMinQuantity) return 0;
  return (line.unitPrice - line.bulkPrice) * line.quantity;
}

export function computeBulkDiscount(items: CartLine[]): number {
  return items.reduce((sum, line) => sum + lineBulkDiscount(line), 0);
}

export function isBulkUnlocked(line: CartLine): boolean {
  if (!line.bulkPrice || !line.bulkMinQuantity) return false;
  return line.quantity >= line.bulkMinQuantity;
}

export function bulkUnitsNeeded(line: CartLine): number {
  if (!line.bulkMinQuantity) return 0;
  return Math.max(0, line.bulkMinQuantity - line.quantity);
}

export function computeOrderSummary(
  items: CartLine[],
  shippingMethodId: ShippingMethodId = "courier",
): OrderSummary {
  const itemCount = items.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = items.reduce(
    (sum, line) => sum + line.unitPrice * line.quantity,
    0,
  );
  const bulkDiscount = computeBulkDiscount(items);
  const discountedSubtotal = subtotal - bulkDiscount;
  const shippingMethod =
    shippingMethods.find((method) => method.id === shippingMethodId) ??
    shippingMethods[0];
  const shipping =
    discountedSubtotal >= FREE_SHIPPING_THRESHOLD && shippingMethodId !== "pickup"
      ? 0
      : shippingMethod.price;
  const tax = (discountedSubtotal + shipping) * ESTIMATED_TAX_RATE;
  const total = discountedSubtotal + shipping + tax;

  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - discountedSubtotal);
  const freeShippingProgress = Math.min(
    100,
    (discountedSubtotal / FREE_SHIPPING_THRESHOLD) * 100,
  );

  return {
    subtotal,
    bulkDiscount,
    shipping,
    tax,
    total,
    itemCount,
    amountToFreeShipping,
    freeShippingProgress,
  };
}
