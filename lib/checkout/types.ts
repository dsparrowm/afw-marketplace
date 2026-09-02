import type { CartLine } from "@/lib/cart/cart-context";
import type { ShippingMethodId } from "@/lib/cart/calculations";
import type { OrderSummary } from "@/lib/cart/calculations";

export type CheckoutAddress = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
};

export type CheckoutStep = "delivery" | "payment" | "confirm";

export type PlacedOrder = {
  id: string;
  createdAt: string;
  items: CartLine[];
  summary: OrderSummary;
  shippingMethodId: ShippingMethodId;
  address: CheckoutAddress;
  paymentMethod: string;
  cardLast4?: string;
};

export const CANADIAN_PROVINCES = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Northwest Territories",
  "Nova Scotia",
  "Nunavut",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Yukon",
] as const;

export const ORDER_STORAGE_KEY = "afw-marketplace-last-order";
