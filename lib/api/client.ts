import { getMarketplaceApiBaseUrl } from "@/lib/api/config";
import { getStaffAccessToken } from "@/lib/api/staff-auth";
import { getInteractiveStaffAccessToken } from "@/lib/admin/staff-session";
import { getInteractiveCustomerAccessToken } from "@/lib/auth/customer-session";

type AuthMode = boolean | "session" | "machine" | "customer";

type ApiFetchOptions = RequestInit & {
  /**
   * true/"machine" = env staff token
   * "session" = interactive admin cookies
   * "customer" = interactive customer cookies
   * false = unauthenticated
   */
  auth?: AuthMode;
};

async function resolveAccessToken(auth: AuthMode): Promise<string | null> {
  if (auth === false) return null;
  if (auth === "session") {
    return getInteractiveStaffAccessToken();
  }
  if (auth === "customer") {
    return getInteractiveCustomerAccessToken();
  }
  return getStaffAccessToken();
}

function authErrorMessage(auth: AuthMode): string {
  if (auth === "session") return "Staff session required for this request";
  if (auth === "customer") return "Customer session required for this request";
  return "Staff access token unavailable";
}

export async function marketplaceFetch<T>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const { auth = true, headers, ...init } = options;
  const baseUrl = getMarketplaceApiBaseUrl();
  const url = path.startsWith("http") ? path : `${baseUrl}${path}`;

  const requestHeaders = new Headers(headers);
  requestHeaders.set("Accept", "application/json");

  if (auth !== false) {
    const token = await resolveAccessToken(auth);
    if (!token) {
      throw new Error(authErrorMessage(auth));
    }
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
