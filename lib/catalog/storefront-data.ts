import { categoryImages } from "@/lib/brand/assets";
import { getCategoryTree } from "@/lib/api/categories";
import { listAllActiveProducts } from "@/lib/api/products";
import { catalogFallbackToMockEnabled } from "@/lib/api/config";
import {
  buildCategorySlugMap,
  mapApiProductToDetail,
  mapApiProductToStorefront,
} from "@/lib/catalog/map-api-product";
import { findProductBySlug } from "@/lib/api/products";
import type { HomepageCategory } from "@/lib/storefront/categories";
import { homepageCategories as staticHomepageCategories } from "@/lib/storefront/categories";
import { getMockCatalogPool } from "@/lib/mocks/catalog-products";
import {
  getProductDetail as getMockProductDetail,
  getRelatedProducts as getMockRelatedProducts,
} from "@/lib/mocks/product-details";
import type { ApiCategory } from "@/types/api";
import type { Product } from "@/types/product";
import type { ProductDetail } from "@/types/product-detail";

const categoryImageBySlug: Record<string, string> = {
  "fresh-produce": categoryImages.freshProduce,
  "frozen-proteins": categoryImages.frozenProteins,
  "grains-flour": categoryImages.grainsFlour,
  "condiments-spices": categoryImages.condimentsSpices,
  "snacks-drinks": categoryImages.snacksDrinks,
  beauty: categoryImages.beauty,
  "oils-sauces": categoryImages.condimentsSpices,
};

function mapApiCategoryToHomepage(category: ApiCategory): HomepageCategory {
  return {
    slug: category.slug,
    label: category.name,
    image: categoryImageBySlug[category.slug] ?? categoryImages.freshProduce,
    figmaNodeId: "",
  };
}

function flattenActiveCategories(tree: ApiCategory[]): ApiCategory[] {
  const items: ApiCategory[] = [];

  function walk(nodes: ApiCategory[]) {
    for (const node of nodes) {
      if (node.isActive) items.push(node);
      if (node.children?.length) walk(node.children);
    }
  }

  walk(tree);
  return items.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function fetchStorefrontCategories(): Promise<HomepageCategory[]> {
  try {
    const tree = await getCategoryTree();
    const active = flattenActiveCategories(tree);
    if (active.length === 0) {
      return staticHomepageCategories;
    }
    return active.map(mapApiCategoryToHomepage);
  } catch (error) {
    console.error("[catalog] category API failed, using static tiles", error);
    return staticHomepageCategories;
  }
}

export async function fetchStorefrontProductPool(): Promise<{
  products: Product[];
  source: "api" | "mock";
}> {
  try {
    const [apiProducts, categoryTree] = await Promise.all([
      listAllActiveProducts(),
      getCategoryTree(),
    ]);

    if (apiProducts.length === 0) {
      if (catalogFallbackToMockEnabled()) {
        return { products: getMockCatalogPool(), source: "mock" };
      }
      return { products: [], source: "api" };
    }

    const slugMap = buildCategorySlugMap(categoryTree);
    const products = apiProducts.map((product) =>
      mapApiProductToStorefront(product, slugMap),
    );
    return { products, source: "api" };
  } catch (error) {
    console.error("[catalog] product API failed", error);
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
    const [apiProduct, categoryTree, poolResult] = await Promise.all([
      findProductBySlug(slug),
      getCategoryTree(),
      fetchStorefrontProductPool(),
    ]);

    if (apiProduct) {
      const slugMap = buildCategorySlugMap(categoryTree);
      const detail = mapApiProductToDetail(apiProduct, slugMap);
      const related = poolResult.products
        .filter(
          (product) =>
            product.slug !== slug && product.category === detail.category,
        )
        .slice(0, 4)
        .map((product) => product.slug);

      if (related.length < 4) {
        const filler = poolResult.products
          .filter((product) => product.slug !== slug && !related.includes(product.slug))
          .slice(0, 4 - related.length)
          .map((product) => product.slug);
        related.push(...filler);
      }

      return { ...detail, relatedProductIds: related };
    }
  } catch (error) {
    console.error("[catalog] product detail API failed", error);
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
