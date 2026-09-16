import { marketplaceFetch } from "@/lib/api/client";
import type {
  ApiAddWishlistItemBody,
  ApiWishlist,
} from "@/types/api";

/** GET /public/wishlist */
export async function getPublicWishlist(): Promise<ApiWishlist> {
  return marketplaceFetch<ApiWishlist>("/public/wishlist", {
    auth: "customer",
  });
}

/** POST /public/wishlist/items */
export async function addPublicWishlistItem(
  body: ApiAddWishlistItemBody,
): Promise<ApiWishlist> {
  return marketplaceFetch<ApiWishlist>("/public/wishlist/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    auth: "customer",
  });
}

/** DELETE /public/wishlist/items/{itemId} */
export async function removePublicWishlistItem(itemId: string): Promise<void> {
  await marketplaceFetch<void>(
    `/public/wishlist/items/${encodeURIComponent(itemId)}`,
    { method: "DELETE", auth: "customer" },
  );
}
