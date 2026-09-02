import { marketplaceFetch } from "@/lib/api/client";
import type {
  ApiPaginatedResponse,
  ApiProduct,
  ListProductsParams,
} from "@/types/api";

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
): Promise<ApiPaginatedResponse<ApiProduct>> {
  return marketplaceFetch<ApiPaginatedResponse<ApiProduct>>(
    `/admin/products${toQueryString(params)}`,
  );
}

export async function getProductById(id: string): Promise<ApiProduct> {
  return marketplaceFetch<ApiProduct>(`/admin/products/${id}`);
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
