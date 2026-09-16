import { productImages } from "@/lib/brand/assets";

export type AdminProductDetailStatus = "published" | "hidden" | "draft";

export type AdminProductStockStatus =
  | "in-stock"
  | "low-stock"
  | "out-of-stock";

export type AdminProductDetail = {
  id: string;
  name: string;
  sku: string;
  status: AdminProductDetailStatus;
  statusLabel: string;
  lastUpdated: string;
  breadcrumb: { label: string; href?: string }[];
  organic: boolean;
  category: string;
  origin: string;
  warehouseLocation: string;
  description: string;
  retailPrice: string;
  wholesaleBase: string;
  tiers: { label: string; price: string }[];
  stockUnits: number;
  stockLabel: string;
  stockStatus: AdminProductStockStatus;
  stockBadgeLabel: string;
  weight: string;
  dimensions: string;
  shippingClass: string;
  images: {
    hero: string;
    thumbs: string[];
  };
};

/** Canonical Figma product — `79:39` (SKU AFW-PRD-1048) — mock fallback only */
export const adminProductDetail: AdminProductDetail = {
  id: "nigerian-jollof-rice-mix",
  name: "Nigerian Jollof Rice Mix",
  sku: "AFW-PRD-1048",
  status: "published",
  statusLabel: "Published",
  lastUpdated: "Last Updated: Sep 4, 2026 at 2:14 PM",
  breadcrumb: [
    { label: "Products", href: "/admin/products" },
    { label: "All Grains", href: "/admin/products" },
    { label: "Nigerian Jollof Rice Mix" },
  ],
  organic: true,
  category: "Rice & Grains",
  origin: "Nigeria",
  warehouseLocation: "Warehouse A — Aisle 3",
  description:
    "Authentic single-origin Nigerian Jollof Rice seasoning blend, crafted carefully with sun-dried red bell peppers, local onions, garlic, thyme, and hand-milled long grain parboiled rice. Guarantees the rich smoky flavor of traditional party Jollof. Just add stock and stew base.",
  retailPrice: "$12.99 / unit",
  wholesaleBase: "$9.49 (Min. 24 units)",
  tiers: [
    { label: "24+ units (Base Wholesale)", price: "$9.49" },
    { label: "48+ units", price: "$8.99" },
    { label: "100+ units", price: "$7.99" },
  ],
  stockUnits: 342,
  stockLabel: "In Stock / Safe",
  stockStatus: "in-stock",
  stockBadgeLabel: "In Stock",
  weight: "1.2 kg",
  dimensions: "15×10×8 cm",
  shippingClass: "Standard",
  images: {
    hero: productImages.honeyBeans,
    thumbs: [
      productImages.yellowGarri,
      productImages.redPalmOil,
      productImages.whitePunaYam,
    ],
  },
};

export function getAdminProductDetail(id: string): AdminProductDetail {
  return {
    ...adminProductDetail,
    id,
  };
}
