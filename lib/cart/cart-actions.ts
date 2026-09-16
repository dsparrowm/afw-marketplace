"use server";

import {
  addPublicCartItem,
  applyPublicCartPromo,
  getPublicCart,
  removePublicCartItem,
  removePublicCartPromo,
  updatePublicCartItem,
} from "@/lib/api/public-cart";
import { getPublicProductBySlug } from "@/lib/api/public-catalog";
import { mapApiCart, type MappedCart } from "@/lib/cart/map-public-cart";

export type CartActionResult =
  | { ok: true; cart: MappedCart }
  | { ok: false; error: string };

function friendlyError(error: unknown, fallback: string): string {
  if (!(error instanceof Error)) return fallback;
  const message = error.message;
  if (message.includes("Customer session required") || message.includes("(401)")) {
    return "Please sign in to use your cart.";
  }
  if (message.includes("(400)")) {
    return "That cart update could not be applied.";
  }
  return fallback;
}

function toResult(cart: Awaited<ReturnType<typeof getPublicCart>>): CartActionResult {
  return { ok: true, cart: mapApiCart(cart) };
}

export async function getCustomerCartAction(): Promise<CartActionResult> {
  try {
    const cart = await getPublicCart();
    return toResult(cart);
  } catch (error) {
    return { ok: false, error: friendlyError(error, "Unable to load your cart.") };
  }
}

export async function addCustomerCartItemAction(input: {
  variantId?: string;
  slug?: string;
  quantity: number;
}): Promise<CartActionResult> {
  const quantity = Math.max(1, Math.floor(input.quantity) || 1);

  try {
    let variantId = input.variantId?.trim();
    if (!variantId) {
      const slug = input.slug?.trim();
      if (!slug) {
        return { ok: false, error: "Missing product variant for cart." };
      }
      const product = await getPublicProductBySlug(slug);
      variantId = product.variants[0]?.id;
      if (!variantId) {
        return { ok: false, error: "This product has no purchasable size yet." };
      }
    }

    const cart = await addPublicCartItem({ variantId, quantity });
    return toResult(cart);
  } catch (error) {
    return { ok: false, error: friendlyError(error, "Unable to add item to cart.") };
  }
}

export async function updateCustomerCartItemAction(input: {
  lineId: string;
  quantity: number;
}): Promise<CartActionResult> {
  const lineId = input.lineId.trim();
  if (!lineId) return { ok: false, error: "Missing cart line." };

  try {
    if (input.quantity <= 0) {
      await removePublicCartItem(lineId);
      const cart = await getPublicCart();
      return toResult(cart);
    }

    const cart = await updatePublicCartItem(lineId, {
      quantity: Math.floor(input.quantity),
    });
    return toResult(cart);
  } catch (error) {
    return {
      ok: false,
      error: friendlyError(error, "Unable to update cart quantity."),
    };
  }
}

export async function removeCustomerCartItemAction(input: {
  lineId: string;
}): Promise<CartActionResult> {
  const lineId = input.lineId.trim();
  if (!lineId) return { ok: false, error: "Missing cart line." };

  try {
    await removePublicCartItem(lineId);
    const cart = await getPublicCart();
    return toResult(cart);
  } catch (error) {
    return {
      ok: false,
      error: friendlyError(error, "Unable to remove item from cart."),
    };
  }
}

export async function applyCustomerCartPromoAction(input: {
  code: string;
}): Promise<CartActionResult> {
  const code = input.code.trim();
  if (!code) return { ok: false, error: "Enter a promo code." };

  try {
    const cart = await applyPublicCartPromo({ code });
    return toResult(cart);
  } catch (error) {
    return {
      ok: false,
      error: friendlyError(error, "That promo code could not be applied."),
    };
  }
}

export async function removeCustomerCartPromoAction(): Promise<CartActionResult> {
  try {
    const cart = await removePublicCartPromo();
    return toResult(cart);
  } catch (error) {
    return {
      ok: false,
      error: friendlyError(error, "Unable to remove promo code."),
    };
  }
}
