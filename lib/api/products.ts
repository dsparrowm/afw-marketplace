import { marketplaceFetch } from "@/lib/api/client";
import type {
  AdjustStockDto,
  ApiPaginatedResponse,
  ApiPriceTier,
  ApiProduct,
  ApiProductVariant,
  CreatePriceTierDto,
  CreateProductDto,
  CreateVariantDto,
  ListProductsParams,
  UpdateProductDto,
  UpdateProductStatusDto,
  UpdateVariantDto,
} from "@/types/api";

type AuthOptions = { auth?: boolean | "session" | "machine" };

function toQueryString(params: ListProductsParams): string {
  const search = new URLSearchParams();
  if (params.page != null) search.set("page", String(params.page));
  if (params.limit != null) search.set("limit", String(params.limit));
  if (params.categoryId) search.set("categoryId", params.categoryId);
  if (params.status) search.set("status", params.status);
  if (params.isWholesaleEligible != null) {
    search.set("isWholesaleEligible", String(params.isWholesaleEligible));
  }
  if (params.search) search.set("search", params.search);
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

export async function listProducts(
  params: ListProductsParams = {},
  options?: AuthOptions,
): Promise<ApiPaginatedResponse<ApiProduct>> {
  return marketplaceFetch<ApiPaginatedResponse<ApiProduct>>(
    `/admin/products${toQueryString(params)}`,
    { auth: options?.auth ?? true },
  );
}

export async function getProductById(
  id: string,
  options?: AuthOptions,
): Promise<ApiProduct> {
  return marketplaceFetch<ApiProduct>(`/admin/products/${id}`, {
    auth: options?.auth ?? true,
  });
}

export async function createProduct(
  body: CreateProductDto,
  options?: AuthOptions,
): Promise<ApiProduct> {
  return marketplaceFetch<ApiProduct>("/admin/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    auth: options?.auth ?? "session",
  });
}

export async function updateProduct(
  id: string,
  body: UpdateProductDto,
  options?: AuthOptions,
): Promise<ApiProduct> {
  return marketplaceFetch<ApiProduct>(`/admin/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    auth: options?.auth ?? "session",
  });
}

export async function updateProductStatus(
  id: string,
  body: UpdateProductStatusDto,
  options?: AuthOptions,
): Promise<ApiProduct> {
  return marketplaceFetch<ApiProduct>(`/admin/products/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    auth: options?.auth ?? "session",
  });
}

export async function createProductVariant(
  productId: string,
  body: CreateVariantDto,
  options?: AuthOptions,
): Promise<ApiProductVariant> {
  return marketplaceFetch<ApiProductVariant>(
    `/admin/products/${productId}/variants`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      auth: options?.auth ?? "session",
    },
  );
}

export async function updateProductVariant(
  variantId: string,
  body: UpdateVariantDto,
  options?: AuthOptions,
): Promise<ApiProductVariant> {
  return marketplaceFetch<ApiProductVariant>(
    `/admin/products/variants/${variantId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      auth: options?.auth ?? "session",
    },
  );
}

export async function adjustVariantStock(
  variantId: string,
  body: AdjustStockDto,
  options?: AuthOptions,
): Promise<ApiProductVariant> {
  return marketplaceFetch<ApiProductVariant>(
    `/admin/products/variants/${variantId}/stock`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      auth: options?.auth ?? "session",
    },
  );
}

export async function createVariantPriceTier(
  variantId: string,
  body: CreatePriceTierDto,
  options?: AuthOptions,
): Promise<ApiPriceTier> {
  return marketplaceFetch<ApiPriceTier>(
    `/admin/products/variants/${variantId}/price-tiers`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      auth: options?.auth ?? "session",
    },
  );
}

/** Fetches all active products across paginated admin list. */
export async function listAllActiveProducts(): Promise<ApiProduct[]> {
  const limit = 100;
  let page = 1;
  const products: ApiProduct[] = [];

  while (true) {
    const response = await listProducts({ page, limit, status: "active" });
    products.push(...response.data);
    if (page >= response.meta.totalPages) break;
    page += 1;
  }

  return products;
}

export async function findProductBySlug(slug: string): Promise<ApiProduct | null> {
  const bySearch = await listProducts({ search: slug, limit: 20, status: "active" });
  const exact = bySearch.data.find((product) => product.slug === slug);
  if (exact) {
    return getProductById(exact.id);
  }

  const all = await listAllActiveProducts();
  const match = all.find((product) => product.slug === slug);
  if (!match) return null;
  return getProductById(match.id);
}
