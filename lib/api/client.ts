import { getMarketplaceApiBaseUrl } from "@/lib/api/config";
import { getStaffAccessToken } from "@/lib/api/staff-auth";

type ApiFetchOptions = RequestInit & {
  auth?: boolean;
};

export async function marketplaceFetch<T>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const { auth = true, headers, ...init } = options;
  const baseUrl = getMarketplaceApiBaseUrl();
  const url = path.startsWith("http") ? path : `${baseUrl}${path}`;

  const requestHeaders = new Headers(headers);
  requestHeaders.set("Accept", "application/json");

  if (auth) {
    const token = await getStaffAccessToken();
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(url, {
    ...init,
    headers: requestHeaders,
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(
      `Marketplace API ${path} failed (${response.status})${body ? `: ${body.slice(0, 200)}` : ""}`,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
