import type { Product } from "@/types/product";

export type ProductSizeOption = {
  id: string;
  label: string;
  retailPrice: number;
  bulkPrice: number;
  bulkLabel: string;
};

export type ProductDetailAccordion = {
  productDescription: string;
  ingredientsOrigin: string;
  nutrition: string;
  shipping: string;
};

export type ProductDetail = Product & {
  /** PDP title when different from catalog card name — Figma `2:915` */
  displayName?: string;
  description: string;
  images: string[];
  reviewCount: number;
  rating: number;
  sizeOptions: ProductSizeOption[];
  accordion: ProductDetailAccordion;
  deliveryEstimate: string;
  relatedProductIds: string[];
};
