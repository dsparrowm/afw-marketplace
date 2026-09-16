"use server";

import { getPublicProductBySlug } from "@/lib/api/public-catalog";
import {
  addPublicWishlistItem,
  getPublicWishlist,
  removePublicWishlistItem,
} from "@/lib/api/public-wishlist";
import type { ApiWishlistItem } from "@/types/api";

export type MappedWishlistItem = {
  itemId: string;
  variantId: string;
  productSlug: string;
  productName: string;
};

export type WishlistActionResult =
  | { ok: true; items: MappedWishlistItem[] }
  | { ok: false; error: string };

function mapItem(item: ApiWishlistItem): MappedWishlistItem {
  return {
    itemId: item.id,
    variantId: item.variantId,
    productSlug: item.product.slug,
    productName: item.product.name,
  };
}

function friendlyError(error: unknown, fallback: string): string {
  if (!(error instanceof Error)) return fallback;
  const message = error.message;
  if (message.includes("Customer session required") || message.includes("(401)")) {
    return "Please sign in to use your wishlist.";
  }
  if (message.includes("(400)")) {
    return "That wishlist update could not be applied.";
  }
  return fallback;
}

async function loadMapped(): Promise<MappedWishlistItem[]> {
  const wishlist = await getPublicWishlist();
  return wishlist.items.map(mapItem);
}

export async function getCustomerWishlistAction(): Promise<WishlistActionResult> {
  try {
    return { ok: true, items: await loadMapped() };
  } catch (error) {
    return {
      ok: false,
      error: friendlyError(error, "Unable to load your wishlist."),
    };
  }
}

export async function addCustomerWishlistItemAction(input: {
  variantId?: string;
  slug?: string;
}): Promise<WishlistActionResult> {
  try {
    let variantId = input.variantId?.trim();
    if (!variantId) {
      const slug = input.slug?.trim();
      if (!slug) {
        return { ok: false, error: "Missing product variant for wishlist." };
      }
      const product = await getPublicProductBySlug(slug);
      variantId = product.variants[0]?.id;
      if (!variantId) {
        return { ok: false, error: "This product has no purchasable size yet." };
      }
    }

    await addPublicWishlistItem({ variantId });
    return { ok: true, items: await loadMapped() };
  } catch (error) {
    return {
      ok: false,
      error: friendlyError(error, "Unable to save to wishlist."),
    };
  }
}

export async function removeCustomerWishlistItemAction(
  itemId: string,
): Promise<WishlistActionResult> {
  try {
    await removePublicWishlistItem(itemId);
    return { ok: true, items: await loadMapped() };
  } catch (error) {
    return {
      ok: false,
      error: friendlyError(error, "Unable to remove from wishlist."),
    };
  }
}
