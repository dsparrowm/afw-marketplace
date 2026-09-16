import { marketplaceFetch } from "@/lib/api/client";
import type {
  ApiPaginatedResponse,
  ApiPublicCategory,
  ApiPublicProductDetail,
  ApiPublicProductSummary,
  ListPublicProductsParams,
} from "@/types/api";

function toQueryString(params: ListPublicProductsParams): string {
  const search = new URLSearchParams();
  if (params.page != null) search.set("page", String(params.page));
  if (params.limit != null) search.set("limit", String(params.limit));
  if (params.categorySlug) search.set("categorySlug", params.categorySlug);
  if (params.search) search.set("search", params.search);
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

/** GET /public/products — no auth */
export async function listPublicProducts(
  params: ListPublicProductsParams = {},
): Promise<ApiPaginatedResponse<ApiPublicProductSummary>> {
  return marketplaceFetch<ApiPaginatedResponse<ApiPublicProductSummary>>(
    `/public/products${toQueryString(params)}`,
    { auth: false },
  );
}

/** Paginate through all public products (storefront pool). */
export async function listAllPublicProducts(
  params: Omit<ListPublicProductsParams, "page" | "limit"> = {},
): Promise<ApiPublicProductSummary[]> {
  const first = await listPublicProducts({ ...params, page: 1, limit: 50 });
  const products = [...first.data];
  const totalPages = first.meta.totalPages || 1;

  for (let page = 2; page <= totalPages; page += 1) {
    const next = await listPublicProducts({ ...params, page, limit: 50 });
    products.push(...next.data);
  }

  return products;
}

/** GET /public/products/{slug} — no auth */
export async function getPublicProductBySlug(
  slug: string,
): Promise<ApiPublicProductDetail> {
  return marketplaceFetch<ApiPublicProductDetail>(
    `/public/products/${encodeURIComponent(slug)}`,
    { auth: false },
  );
}

/** GET /public/categories — nested tree, no auth */
export async function getPublicCategories(): Promise<ApiPublicCategory[]> {
  return marketplaceFetch<ApiPublicCategory[]>("/public/categories", {
    auth: false,
  });
}
