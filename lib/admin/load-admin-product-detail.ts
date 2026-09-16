import { getCategoryTree } from "@/lib/api/categories";
import { getProductById } from "@/lib/api/products";
import { marketplaceFetch } from "@/lib/api/client";
import { buildCategoryNameMap } from "@/lib/admin/map-admin-product";
import { mapApiProductToAdminDetail } from "@/lib/admin/map-admin-product-detail";
import type { AdminProductDetail } from "@/lib/mocks/admin-product-detail";
import type { ApiPriceTier } from "@/types/api";

export type AdminProductDetailLoadResult =
  | { ok: true; product: AdminProductDetail }
  | { ok: false; error: "not-found" | "session" | "unknown"; message: string };

async function listVariantPriceTiers(
  variantId: string,
): Promise<ApiPriceTier[]> {
  try {
    return await marketplaceFetch<ApiPriceTier[]>(
      `/admin/products/variants/${variantId}/price-tiers`,
      { auth: "session" },
    );
  } catch {
    return [];
  }
}

/** Loads one admin product detail via interactive staff session. */
export async function loadAdminProductDetail(
  id: string,
): Promise<AdminProductDetailLoadResult> {
  try {
    const [product, tree] = await Promise.all([
      getProductById(id, { auth: "session" }),
      getCategoryTree({ auth: "session" }),
    ]);

    const categoryName =
      buildCategoryNameMap(tree).get(product.categoryId) ?? "Uncategorized";

    const variant =
      product.variants?.find((row) => row.status === "active") ??
      product.variants?.[0];

    const priceTiers = variant
      ? await listVariantPriceTiers(variant.id)
      : [];

    return {
      ok: true,
      product: mapApiProductToAdminDetail(product, categoryName, priceTiers),
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load product.";
    if (message.includes("404")) {
      return { ok: false, error: "not-found", message };
    }
    if (message.includes("Staff session required")) {
      return { ok: false, error: "session", message };
    }
    return { ok: false, error: "unknown", message };
  }
}
