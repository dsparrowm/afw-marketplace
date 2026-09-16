import type { ApiCart, ApiCartItem } from "@/types/api";
import type { CartLine } from "@/lib/cart/types";

function parseMoney(value: number | string | null | undefined): number {
  if (value == null) return 0;
  const parsed = typeof value === "number" ? value : Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function resolveImageUrl(images: string[] | undefined): string | undefined {
  const first = images?.[0]?.trim();
  if (!first) return undefined;
  if (first.startsWith("http") || first.startsWith("/")) return first;
  return `/${first}`;
}

export function mapApiCartItemToLine(item: ApiCartItem): CartLine {
  return {
    lineId: item.id,
    variantId: item.variantId,
    productId: item.product.id,
    slug: item.product.slug,
    name: item.product.name,
    unitPrice: parseMoney(item.unitPrice),
    quantity: item.quantity,
    sizeLabel: item.variantLabel,
    imageUrl: resolveImageUrl(item.product.images),
  };
}

export type MappedCart = {
  items: CartLine[];
  subtotal: number;
  discountTotal: number;
  total: number;
  promoCode: string | null;
  promoApplied: boolean;
};

export function mapApiCart(cart: ApiCart): MappedCart {
  return {
    items: cart.items.map(mapApiCartItemToLine),
    subtotal: parseMoney(cart.subtotal),
    discountTotal: parseMoney(cart.discountTotal),
    total: parseMoney(cart.total),
    promoCode: cart.promoCode,
    promoApplied: cart.promoApplied,
  };
}
