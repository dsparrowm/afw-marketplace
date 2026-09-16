import type { ShippingMethodId } from "@/lib/cart/calculations";
import type { ApiDeliveryMethod } from "@/types/api";

const UI_TO_API: Record<ShippingMethodId, ApiDeliveryMethod> = {
  courier: "ship",
  local: "local_delivery",
  pickup: "pickup",
};

export function toApiDeliveryMethod(
  shippingMethodId: ShippingMethodId,
): ApiDeliveryMethod {
  return UI_TO_API[shippingMethodId];
}

export function deliveryRequiresAddress(
  shippingMethodId: ShippingMethodId,
): boolean {
  return shippingMethodId !== "pickup";
}
