import type { CartLine } from "@/lib/cart/cart-context";
import type { OrderSummary, ShippingMethodId } from "@/lib/cart/calculations";
import type { CheckoutAddress, PlacedOrder } from "@/lib/checkout/types";
import { ORDER_STORAGE_KEY } from "@/lib/checkout/types";

export function generateOrderId(): string {
  const suffix = Date.now().toString(36).toUpperCase().slice(-6);
  return `AFW-${suffix}`;
}

export function savePlacedOrder(order: PlacedOrder): void {
  sessionStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
}

export function getPlacedOrder(orderId: string): PlacedOrder | null {
  try {
    const stored = sessionStorage.getItem(ORDER_STORAGE_KEY);
    if (!stored) return null;
    const order = JSON.parse(stored) as PlacedOrder;
    return order.id === orderId ? order : null;
  } catch {
    return null;
  }
}

export function createPlacedOrder({
  items,
  summary,
  address,
  shippingMethodId,
  paymentMethod,
  cardLast4,
}: {
  items: CartLine[];
  summary: OrderSummary;
  address: CheckoutAddress;
  shippingMethodId: ShippingMethodId;
  paymentMethod: string;
  cardLast4?: string;
}): PlacedOrder {
  return {
    id: generateOrderId(),
    createdAt: new Date().toISOString(),
    items,
    summary,
    shippingMethodId,
    address,
    paymentMethod,
    cardLast4,
  };
}
