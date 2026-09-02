import type { Product } from "@/types/product";
import type { HomepageProductSectionConfig } from "@/lib/storefront/homepage-products";

function sectionFromProducts(
  slug: string,
  nodeId: string,
  title: string,
  products: Product[],
  options?: Partial<HomepageProductSectionConfig>,
): HomepageProductSectionConfig {
  return {
    slug,
    nodeId,
    title,
    viewAllLabel: "View All Products",
    viewAllHref: "/shop",
    products,
    ...options,
  };
}

/** Build homepage product sections from the live or mock catalog pool. */
export function buildHomepageProductSections(products: Product[]): {
  featured: HomepageProductSectionConfig;
  trending: HomepageProductSectionConfig;
  recentlyAdded: HomepageProductSectionConfig;
} {
  const featured = products.slice(0, 5);
  const trending = products.slice(0, 5);
  const recentlyAdded = [...products].reverse().slice(0, 5);

  return {
    featured: sectionFromProducts(
      "featured-products",
      "6:3169",
      "Best Sellers this Week",
      featured,
      {
        badge: "Best Sellers",
        description:
          "The essential African pantry items our Canadian customers keep restocking. Try them today.",
      },
    ),
    trending: sectionFromProducts(
      "trending-products",
      "7:3466",
      "Trending Products",
      trending,
      { badge: "Trending Now" },
    ),
    recentlyAdded: sectionFromProducts(
      "recently-added",
      "7:3954",
      "Recently Added",
      recentlyAdded,
    ),
  };
}
