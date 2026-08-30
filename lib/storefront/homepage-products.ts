import {
  featuredProductIds,
  getMockProducts,
  recentlyAddedProductIds,
  trendingProductIds,
} from "@/lib/mocks/products";
import type { Product } from "@/types/product";

export type HomepageProductSectionConfig = {
  slug: string;
  nodeId: string;
  badge?: string;
  title: string;
  description?: string;
  viewAllLabel: string;
  viewAllHref: string;
  products: Product[];
};

/** Featured products header — Figma `6:3169` */
export const featuredProductsSection: HomepageProductSectionConfig = {
  slug: "featured-products",
  nodeId: "6:3169",
  badge: "Best Sellers",
  title: "Best Sellers this Week",
  description:
    "The essential African pantry items our Canadian customers keep restocking. Try them today.",
  viewAllLabel: "View All Products",
  viewAllHref: "/shop",
  products: getMockProducts(featuredProductIds),
};

/** Trending products header — Figma `7:3466` */
export const trendingProductsSection: HomepageProductSectionConfig = {
  slug: "trending-products",
  nodeId: "7:3466",
  badge: "Trending Now",
  title: "Trending Products",
  viewAllLabel: "View All Products",
  viewAllHref: "/shop",
  products: getMockProducts(trendingProductIds),
};

/** Recently added header — Figma `7:3954` */
export const recentlyAddedSection: HomepageProductSectionConfig = {
  slug: "recently-added",
  nodeId: "7:3954",
  title: "Recently Added",
  viewAllLabel: "View All Products",
  viewAllHref: "/shop",
  products: getMockProducts(recentlyAddedProductIds),
};
