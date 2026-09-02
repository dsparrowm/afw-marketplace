import type { Product } from "@/types/product";

/** Mock catalog — Figma homepage product cards until `GET /products` is wired */
export const mockProducts: Record<string, Product> = {
  "honey-beans": {
    id: "honey-beans",
    slug: "honey-beans",
    name: "Honey Beans (Oloyin)",
    sizeLabel: "1kg",
    origin: "Nigeria",
    imageUrl: "/images/products/honey-beans.png",
    retailPrice: 14.99,
    bulkPrice: 12.5,
    bulkLabel: "Bulk (10+)",
    badges: ["organic"],
    stockStatus: "in-stock",
    category: "grains-flour",
  },
  "yellow-garri": {
    id: "yellow-garri",
    slug: "yellow-garri",
    name: "Premium Yellow Garri",
    sizeLabel: "2kg",
    origin: "Nigeria",
    imageUrl: "/images/products/yellow-garri.png",
    retailPrice: 18.99,
    bulkPrice: 16.99,
    bulkLabel: "Bulk (5+)",
    badges: ["organic"],
    stockStatus: "in-stock",
    category: "grains-flour",
  },
  "white-puna-yam": {
    id: "white-puna-yam",
    slug: "white-puna-yam",
    name: "Premium White Puna Yam",
    sizeLabel: "Large Tuber",
    origin: "Ghana",
    imageUrl: "/images/products/white-puna-yam.png",
    retailPrice: 22.99,
    bulkPrice: 20,
    bulkLabel: "Bulk (3+)",
    badges: ["best-seller", "organic"],
    stockStatus: "low-stock",
    stockLabel: "Low Stock (3 left)",
    category: "fresh-produce",
  },
  "red-palm-oil": {
    id: "red-palm-oil",
    slug: "red-palm-oil",
    name: "Grade A Red Palm Oil",
    sizeLabel: "1L Bottle",
    origin: "Nigeria",
    imageUrl: "/images/products/red-palm-oil.png",
    retailPrice: 16.5,
    bulkPrice: 14,
    bulkLabel: "Bulk (12+)",
    badges: ["organic"],
    stockStatus: "in-stock",
    category: "condiments-spices",
  },
};

export const featuredProductIds = [
  "honey-beans",
  "yellow-garri",
  "white-puna-yam",
  "red-palm-oil",
  "red-palm-oil",
] as const;

export const trendingProductIds = [
  "honey-beans",
  "yellow-garri",
  "white-puna-yam",
  "red-palm-oil",
  "red-palm-oil",
] as const;

export const recentlyAddedProductIds = [
  "honey-beans",
  "yellow-garri",
  "white-puna-yam",
  "red-palm-oil",
  "red-palm-oil",
] as const;

export function getMockProducts(ids: readonly string[]): Product[] {
  return ids.map((id) => mockProducts[id]).filter(Boolean);
}
