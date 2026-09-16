import { getMarketplaceApiBaseUrl } from "@/lib/api/config";
import { marketplaceFetch } from "@/lib/api/client";
import { getInteractiveStaffAccessToken } from "@/lib/admin/staff-session";
import { getStaffAccessToken } from "@/lib/api/staff-auth";
import type {
  ApiPaginatedResponse,
  ApiSalesReportPoint,
  ListSalesReportParams,
} from "@/types/api";

type AuthOptions = { auth?: boolean | "session" | "machine" };

function toQueryString(params: ListSalesReportParams): string {
  const search = new URLSearchParams();
  if (params.groupBy) search.set("groupBy", params.groupBy);
  if (params.from) search.set("from", params.from);
  if (params.to) search.set("to", params.to);
  if (params.page != null) search.set("page", String(params.page));
  if (params.limit != null) search.set("limit", String(params.limit));
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

async function resolveToken(auth: AuthOptions["auth"]): Promise<string | null> {
  if (auth === false) return null;
  if (auth === "session") return getInteractiveStaffAccessToken();
  return getStaffAccessToken();
}

/** GET /admin/reports/sales */
export async function getSalesReport(
  params: ListSalesReportParams = {},
  options?: AuthOptions,
): Promise<ApiPaginatedResponse<ApiSalesReportPoint>> {
  return marketplaceFetch<ApiPaginatedResponse<ApiSalesReportPoint>>(
    `/admin/reports/sales${toQueryString(params)}`,
    { auth: options?.auth ?? "session" },
  );
}

/**
 * GET /admin/reports/sales/export — returns raw CSV (or text) body.
 * Uses a dedicated fetch because marketplaceFetch always parses JSON.
 */
export async function exportSalesReport(
  params: ListSalesReportParams = {},
  options?: AuthOptions,
): Promise<{ body: string; contentType: string; filename: string }> {
  const auth = options?.auth ?? "session";
  const baseUrl = getMarketplaceApiBaseUrl();
  const path = `/admin/reports/sales/export${toQueryString(params)}`;
  const url = `${baseUrl}${path}`;

  const headers = new Headers({ Accept: "text/csv, text/plain, */*" });
  if (auth !== false) {
    const token = await resolveToken(auth);
    if (!token) {
      throw new Error(
        auth === "session"
          ? "Staff session required for this request"
          : "Staff access token unavailable",
      );
    }
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(url, {
    headers,
    cache: "no-store",
  });

  if (!response.ok) {
    const errBody = await response.text().catch(() => "");
    throw new Error(
      `Marketplace API ${path} failed (${response.status})${errBody ? `: ${errBody.slice(0, 200)}` : ""}`,
    );
  }

  const body = await response.text();
  const contentType =
    response.headers.get("content-type") ?? "text/csv; charset=utf-8";
  const disposition = response.headers.get("content-disposition") ?? "";
  const match = /filename\*?=(?:UTF-8''|")?([^\";]+)/i.exec(disposition);
  const filename = match
    ? decodeURIComponent(match[1].replace(/"/g, ""))
    : "sales-ledger.csv";

  return { body, contentType, filename };
}
