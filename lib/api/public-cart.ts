import { marketplaceFetch } from "@/lib/api/client";
import type {
  ApiAddCartItemBody,
  ApiApplyPromoCodeBody,
  ApiCart,
  ApiCheckoutBody,
  ApiCheckoutResult,
  ApiPaymentRetryResult,
  ApiUpdateCartItemBody,
} from "@/types/api";

/** GET /public/cart */
export async function getPublicCart(): Promise<ApiCart> {
  return marketplaceFetch<ApiCart>("/public/cart", { auth: "customer" });
}

/** POST /public/cart/items */
export async function addPublicCartItem(
  body: ApiAddCartItemBody,
): Promise<ApiCart> {
  return marketplaceFetch<ApiCart>("/public/cart/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    auth: "customer",
  });
}

/** PATCH /public/cart/items/{itemId} */
export async function updatePublicCartItem(
  itemId: string,
  body: ApiUpdateCartItemBody,
): Promise<ApiCart> {
  return marketplaceFetch<ApiCart>(
    `/public/cart/items/${encodeURIComponent(itemId)}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      auth: "customer",
    },
  );
}

/** DELETE /public/cart/items/{itemId} */
export async function removePublicCartItem(itemId: string): Promise<void> {
  await marketplaceFetch<void>(
    `/public/cart/items/${encodeURIComponent(itemId)}`,
    { method: "DELETE", auth: "customer" },
  );
}

/** POST /public/cart/promo-code */
export async function applyPublicCartPromo(
  body: ApiApplyPromoCodeBody,
): Promise<ApiCart> {
  return marketplaceFetch<ApiCart>("/public/cart/promo-code", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    auth: "customer",
  });
}

/** DELETE /public/cart/promo-code */
export async function removePublicCartPromo(): Promise<ApiCart> {
  return marketplaceFetch<ApiCart>("/public/cart/promo-code", {
    method: "DELETE",
    auth: "customer",
  });
}

/** POST /public/cart/checkout */
export async function checkoutPublicCart(
  body: ApiCheckoutBody,
): Promise<ApiCheckoutResult> {
  return marketplaceFetch<ApiCheckoutResult>("/public/cart/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    auth: "customer",
  });
}

/** POST /public/orders/{orderId}/payment/retry */
export async function retryPublicOrderPayment(
  orderId: string,
): Promise<ApiPaymentRetryResult> {
  return marketplaceFetch<ApiPaymentRetryResult>(
    `/public/orders/${encodeURIComponent(orderId)}/payment/retry`,
    { method: "POST", auth: "customer" },
  );
}
