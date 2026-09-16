import { catalogFallbackToMockEnabled } from "@/lib/api/config";
import {
  getPublicCategories,
  getPublicProductBySlug,
  listAllPublicProducts,
} from "@/lib/api/public-catalog";
import {
  mapPublicProductDetailToStorefront,
  mapPublicProductSummaryToStorefront,
} from "@/lib/catalog/map-public-product";
import type { HomepageCategory } from "@/lib/storefront/categories";
import { homepageCategories as staticHomepageCategories } from "@/lib/storefront/categories";
import { getMockCatalogPool } from "@/lib/mocks/catalog-products";
import {
  getProductDetail as getMockProductDetail,
  getRelatedProducts as getMockRelatedProducts,
} from "@/lib/mocks/product-details";
import type { ApiPublicCategory } from "@/types/api";
import type { Product } from "@/types/product";
import type { ProductDetail } from "@/types/product-detail";

/** Staging seed often appends timestamps, e.g. "Cold Pressed 1788500326731". */
function cleanCategoryLabel(name: string): string {
  return name.replace(/\s+\d{10,}\s*$/u, "").trim();
}

function isSeedLikeCategory(category: ApiPublicCategory): boolean {
  return /\d{10,}/u.test(category.name) || /\d{10,}/u.test(category.slug);
}

function flattenPublicCategories(tree: ApiPublicCategory[]): ApiPublicCategory[] {
  const items: ApiPublicCategory[] = [];

  function walk(nodes: ApiPublicCategory[]) {
    for (const node of nodes) {
      items.push(node);
      if (node.children?.length) walk(node.children);
    }
  }

  walk(tree);
  return items;
}

function normalizeKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

/**
 * Homepage carousel always uses the curated Figma six tiles (names + images).
 * Staging seed categories (timestamped names/slugs) are ignored. When a real API
 * category matches a tile by slug or name, that tile keeps Figma art but uses the
 * API slug for `/shop?category=` links.
 */
export async function fetchStorefrontCategories(): Promise<HomepageCategory[]> {
  try {
    const tree = await getPublicCategories();
    const active = flattenPublicCategories(tree);
    if (active.length === 0) {
      return staticHomepageCategories;
    }

    const usable = active.filter((category) => !isSeedLikeCategory(category));
    if (usable.length === 0) {
      return staticHomepageCategories;
    }

    // Prefer top-level public tree nodes for slug/name merge.
    const topLevel = tree.filter((category) => !isSeedLikeCategory(category));
    const pool = topLevel.length > 0 ? topLevel : usable;

    const bySlug = new Map(pool.map((category) => [category.slug, category]));
    const byName = new Map(
      pool.map((category) => [
        normalizeKey(cleanCategoryLabel(category.name)),
        category,
      ]),
    );

    return staticHomepageCategories.map((tile) => {
      const api =
        bySlug.get(tile.slug) ?? byName.get(normalizeKey(tile.label));
      if (!api) return tile;
      return {
        ...tile,
        slug: api.slug,
        label: cleanCategoryLabel(api.name) || tile.label,
      };
    });
  } catch (error) {
    console.error("[catalog] public category API failed, using static tiles", error);
    return staticHomepageCategories;
  }
}

export async function fetchStorefrontProductPool(): Promise<{
  products: Product[];
  source: "api" | "mock";
}> {
  try {
    const apiProducts = await listAllPublicProducts();

    if (apiProducts.length === 0) {
      if (catalogFallbackToMockEnabled()) {
        return { products: getMockCatalogPool(), source: "mock" };
      }
      return { products: [], source: "api" };
    }

    const products = apiProducts.map(mapPublicProductSummaryToStorefront);
    return { products, source: "api" };
  } catch (error) {
    console.error("[catalog] public product API failed", error);
    if (catalogFallbackToMockEnabled()) {
      return { products: getMockCatalogPool(), source: "mock" };
    }
    return { products: [], source: "api" };
  }
}

export async function getStorefrontProductDetail(
  slug: string,
): Promise<ProductDetail | undefined> {
  try {
    const [apiProduct, poolResult] = await Promise.all([
      getPublicProductBySlug(slug),
      fetchStorefrontProductPool(),
    ]);

    const detail = mapPublicProductDetailToStorefront(apiProduct);
    const related = poolResult.products
      .filter(
        (product) =>
          product.slug !== slug && product.category === detail.category,
      )
      .slice(0, 4)
      .map((product) => product.slug);

    if (related.length < 4) {
      const filler = poolResult.products
        .filter(
          (product) => product.slug !== slug && !related.includes(product.slug),
        )
        .slice(0, 4 - related.length)
        .map((product) => product.slug);
      related.push(...filler);
    }

    return { ...detail, relatedProductIds: related };
  } catch (error) {
    console.error("[catalog] public product detail API failed", error);
  }

  if (catalogFallbackToMockEnabled()) {
    return getMockProductDetail(slug);
  }

  return undefined;
}

export async function getStorefrontRelatedProducts(
  slug: string,
): Promise<Product[]> {
  const detail = await getStorefrontProductDetail(slug);
  if (!detail) return [];

  const { products } = await fetchStorefrontProductPool();
  const related = detail.relatedProductIds
    .map((id) => products.find((product) => product.slug === id))
    .filter((product): product is Product => Boolean(product));

  if (related.length > 0) return related;

  if (catalogFallbackToMockEnabled()) {
    return getMockRelatedProducts(slug);
  }

  return [];
}
