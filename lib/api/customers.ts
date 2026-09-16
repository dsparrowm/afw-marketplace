import { marketplaceFetch } from "@/lib/api/client";
import type {
  ApiCustomer,
  ApiPaginatedResponse,
  ListCustomersParams,
} from "@/types/api";

type AuthOptions = { auth?: boolean | "session" | "machine" };

function toQueryString(params: ListCustomersParams): string {
  const search = new URLSearchParams();
  if (params.page != null) search.set("page", String(params.page));
  if (params.limit != null) search.set("limit", String(params.limit));
  if (params.search) search.set("search", params.search);
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

export async function listCustomers(
  params: ListCustomersParams = {},
  options?: AuthOptions,
): Promise<ApiPaginatedResponse<ApiCustomer>> {
  return marketplaceFetch<ApiPaginatedResponse<ApiCustomer>>(
    `/admin/customers${toQueryString(params)}`,
    { auth: options?.auth ?? "session" },
  );
}

export async function getCustomerById(
  id: string,
  options?: AuthOptions,
): Promise<ApiCustomer> {
  return marketplaceFetch<ApiCustomer>(`/admin/customers/${id}`, {
    auth: options?.auth ?? "session",
  });
}
