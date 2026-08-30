/** Product badge labels — Figma homepage product cards */
export type ProductBadgeKind = "organic" | "best-seller" | "new-arrival";

export type StockStatus = "in-stock" | "low-stock";

export type Product = {
  id: string;
  slug: string;
  name: string;
  sizeLabel: string;
  origin: string;
  imageUrl: string;
  retailPrice: number;
  bulkPrice: number;
  bulkLabel: string;
  badges?: ProductBadgeKind[];
  stockStatus: StockStatus;
  stockLabel?: string;
  category: string;
};
