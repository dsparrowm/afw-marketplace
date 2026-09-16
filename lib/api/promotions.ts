import { marketplaceFetch } from "@/lib/api/client";
import type {
  ApiCreatePromotionBody,
  ApiPaginatedResponse,
  ApiPromotion,
  ApiUpdatePromotionBody,
  ListPromotionsParams,
} from "@/types/api";

type AuthOptions = { auth?: boolean | "session" | "machine" };

function toQueryString(params: ListPromotionsParams): string {
  const search = new URLSearchParams();
  if (params.page != null) search.set("page", String(params.page));
  if (params.limit != null) search.set("limit", String(params.limit));
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

export async function listPromotions(
  params: ListPromotionsParams = {},
  options?: AuthOptions,
): Promise<ApiPaginatedResponse<ApiPromotion>> {
  return marketplaceFetch<ApiPaginatedResponse<ApiPromotion>>(
    `/admin/promotions${toQueryString(params)}`,
    { auth: options?.auth ?? "session" },
  );
}

export async function getPromotionById(
  id: string,
  options?: AuthOptions,
): Promise<ApiPromotion> {
  return marketplaceFetch<ApiPromotion>(`/admin/promotions/${id}`, {
    auth: options?.auth ?? "session",
  });
}

export async function createPromotion(
  body: ApiCreatePromotionBody,
  options?: AuthOptions,
): Promise<ApiPromotion> {
  return marketplaceFetch<ApiPromotion>("/admin/promotions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    auth: options?.auth ?? "session",
  });
}

export async function updatePromotion(
  id: string,
  body: ApiUpdatePromotionBody,
  options?: AuthOptions,
): Promise<ApiPromotion> {
  return marketplaceFetch<ApiPromotion>(`/admin/promotions/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    auth: options?.auth ?? "session",
  });
}

export async function deletePromotion(
  id: string,
  options?: AuthOptions,
): Promise<void> {
  return marketplaceFetch<void>(`/admin/promotions/${id}`, {
    method: "DELETE",
    auth: options?.auth ?? "session",
  });
}
