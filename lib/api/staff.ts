import { marketplaceFetch } from "@/lib/api/client";
import type {
  ApiCreateStaffUserBody,
  ApiPaginatedResponse,
  ApiPermission,
  ApiStaffRole,
  ApiStaffUser,
  ApiUpdateStaffUserBody,
  ListStaffParams,
} from "@/types/api";

type AuthOptions = { auth?: boolean | "session" | "machine" };

function toQueryString(params: ListStaffParams): string {
  const search = new URLSearchParams();
  if (params.page != null) search.set("page", String(params.page));
  if (params.limit != null) search.set("limit", String(params.limit));
  if (params.search) search.set("search", params.search);
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

export async function listStaffUsers(
  params: ListStaffParams = {},
  options?: AuthOptions,
): Promise<ApiPaginatedResponse<ApiStaffUser>> {
  return marketplaceFetch<ApiPaginatedResponse<ApiStaffUser>>(
    `/admin/staff${toQueryString(params)}`,
    { auth: options?.auth ?? "session" },
  );
}

export async function listStaffRoles(
  options?: AuthOptions,
): Promise<ApiStaffRole[]> {
  return marketplaceFetch<ApiStaffRole[]>("/admin/staff/roles", {
    auth: options?.auth ?? "session",
  });
}

export async function listStaffPermissions(
  options?: AuthOptions,
): Promise<ApiPermission[]> {
  return marketplaceFetch<ApiPermission[]>("/admin/staff/permissions", {
    auth: options?.auth ?? "session",
  });
}

export async function createStaffUser(
  body: ApiCreateStaffUserBody,
  options?: AuthOptions,
): Promise<ApiStaffUser> {
  return marketplaceFetch<ApiStaffUser>("/admin/staff", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    auth: options?.auth ?? "session",
  });
}

export async function updateStaffUser(
  id: string,
  body: ApiUpdateStaffUserBody,
  options?: AuthOptions,
): Promise<ApiStaffUser> {
  return marketplaceFetch<ApiStaffUser>(`/admin/staff/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    auth: options?.auth ?? "session",
  });
}
