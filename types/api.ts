/** Marketplace backend API shapes — confirmed from staging 2026-09-02 */

export type ApiPaginatedMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ApiPaginatedResponse<T> = {
  data: T[];
  meta: ApiPaginatedMeta;
};

export type ApiPriceTier = {
  id: string;
  variantId: string;
  minQuantity: number;
  unitPrice: string | number;
};

export type ApiProductVariant = {
  id: string;
  productId: string;
  label: string;
  sku: string;
  barcode: string | null;
  unitRetailPrice: string | number;
  stockQuantity: number;
  lowStockThreshold: number | null;
  status: "active" | "hidden" | string;
  weight: number | null;
  priceTiers?: ApiPriceTier[];
};

export type ApiProduct = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  categoryId: string;
  images: string[];
  status: "active" | "hidden" | "pre_order" | string;
  countryOfOrigin: string | null;
  brand: string | null;
  isWholesaleEligible: boolean;
  lowStockThreshold: number | null;
  createdAt: string;
  updatedAt: string;
  variants?: ApiProductVariant[];
};

export type ApiCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parentId: string | null;
  mpath: string;
  isActive: boolean;
  sortOrder: number;
  children?: ApiCategory[];
};

export type ApiLoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export type ApiHealthResponse = {
  status: string;
  database: string;
};

export type ListProductsParams = {
  page?: number;
  limit?: number;
  categoryId?: string;
  status?: "active" | "hidden" | "pre_order";
  isWholesaleEligible?: boolean;
  search?: string;
};
