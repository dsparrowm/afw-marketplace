import { getMockProducts } from "@/lib/mocks/products";
import type { Product } from "@/types/product";

/** Mobile homepage copy — Figma `2:1931` / `main.xml` */
export const freshArrivalsContent = {
  nodeId: "2:1949",
  title: "Fresh Arrivals",
  description: "New batch of yams and scotch bonnets just arrived!",
  ctaLabel: "View New Stock",
  ctaHref: "/shop?filter=new",
} as const;

export type WeeklyDealProduct = {
  id: string;
  slug: string;
  name: string;
  imageUrl: string;
  salePrice: number;
  originalPrice: number;
  saveLabel: string;
};

/** Weekly Deals horizontal scroll — Figma `2:1990` */
export const weeklyDealsContent = {
  nodeId: "2:1990",
  eyebrow: "Limited Time",
  title: "Weekly Deals",
  description: "Up to 30% off on pantry essentials",
  products: [
    {
      id: "zomi-palm-oil",
      slug: "red-palm-oil",
      name: "Zomi Palm Oil 1L",
      imageUrl: "/images/products/red-palm-oil.png",
      salePrice: 12.5,
      originalPrice: 14.99,
      saveLabel: "SAVE 15%",
    },
    {
      id: "poundo-iyan",
      slug: "yellow-garri",
      name: "Poundo Iyan (2kg)",
      imageUrl: "/images/products/yellow-garri.png",
      salePrice: 18.99,
      originalPrice: 24,
      saveLabel: "SAVE 20%",
    },
  ] satisfies WeeklyDealProduct[],
};

/** Best Sellers 2-up grid — Figma `2:2025`; first two featured products */
export const mobileBestSellersContent = {
  nodeId: "2:2025",
  title: "Best Sellers",
  subtitle: "Top Rated This Month",
  products: getMockProducts(["white-puna-yam", "honey-beans"]).slice(0, 2) as Product[],
};
