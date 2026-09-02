import { marketplaceFetch } from "@/lib/api/client";
import type { ApiCategory, ApiPaginatedResponse } from "@/types/api";

export async function getCategoryTree(): Promise<ApiCategory[]> {
  return marketplaceFetch<ApiCategory[]>("/admin/categories/tree");
}

export async function listCategories(params: {
  page?: number;
  limit?: number;
  rootOnly?: boolean;
  isActive?: boolean;
  search?: string;
} = {}): Promise<ApiPaginatedResponse<ApiCategory>> {
  const search = new URLSearchParams();
  if (params.page != null) search.set("page", String(params.page));
  if (params.limit != null) search.set("limit", String(params.limit));
  if (params.rootOnly != null) search.set("rootOnly", String(params.rootOnly));
  if (params.isActive != null) search.set("isActive", String(params.isActive));
  if (params.search) search.set("search", params.search);
  const qs = search.toString();
  return marketplaceFetch<ApiPaginatedResponse<ApiCategory>>(
    `/admin/categories${qs ? `?${qs}` : ""}`,
  );
}
