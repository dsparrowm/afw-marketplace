import { marketplaceFetch } from "@/lib/api/client";
import type {
  ApiOrder,
  ApiPaginatedResponse,
  ApiUpdateOrderStatusBody,
  ListOrdersParams,
} from "@/types/api";

type AuthOptions = { auth?: boolean | "session" | "machine" };

function toQueryString(params: ListOrdersParams): string {
  const search = new URLSearchParams();
  if (params.page != null) search.set("page", String(params.page));
  if (params.limit != null) search.set("limit", String(params.limit));
  if (params.status) search.set("status", String(params.status));
  if (params.search) search.set("search", params.search);
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

export async function listOrders(
  params: ListOrdersParams = {},
  options?: AuthOptions,
): Promise<ApiPaginatedResponse<ApiOrder>> {
  return marketplaceFetch<ApiPaginatedResponse<ApiOrder>>(
    `/admin/orders${toQueryString(params)}`,
    { auth: options?.auth ?? "session" },
  );
}

export async function getOrderById(
  id: string,
  options?: AuthOptions,
): Promise<ApiOrder> {
  return marketplaceFetch<ApiOrder>(`/admin/orders/${id}`, {
    auth: options?.auth ?? "session",
  });
}

export async function updateOrderStatus(
  id: string,
  body: ApiUpdateOrderStatusBody,
  options?: AuthOptions,
): Promise<ApiOrder> {
  return marketplaceFetch<ApiOrder>(`/admin/orders/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    auth: options?.auth ?? "session",
  });
}
