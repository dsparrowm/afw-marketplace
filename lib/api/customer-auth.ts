import { getMarketplaceApiBaseUrl } from "@/lib/api/config";
import type {
  ApiCustomerAuthTokens,
  ApiCustomerLoginBody,
  ApiCustomerSignupBody,
} from "@/types/api";

async function customerAuthFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const baseUrl = getMarketplaceApiBaseUrl();
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
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

export async function customerLogin(
  body: ApiCustomerLoginBody,
): Promise<ApiCustomerAuthTokens> {
  return customerAuthFetch<ApiCustomerAuthTokens>("/auth/customer/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function customerSignup(
  body: ApiCustomerSignupBody,
): Promise<ApiCustomerAuthTokens> {
  return customerAuthFetch<ApiCustomerAuthTokens>("/auth/customer/signup", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function customerRefresh(
  refreshToken: string,
): Promise<ApiCustomerAuthTokens> {
  return customerAuthFetch<ApiCustomerAuthTokens>("/auth/customer/refresh", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });
}

export async function customerLogout(refreshToken: string): Promise<void> {
  return customerAuthFetch<void>("/auth/customer/logout", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });
}

/** Always the same generic success on 200 — do not inspect the body for account existence. */
export async function requestCustomerPasswordReset(email: string): Promise<void> {
  await customerAuthFetch<unknown>("/auth/customer/password-reset/request", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function confirmCustomerPasswordReset(input: {
  token: string;
  newPassword: string;
}): Promise<ApiCustomerAuthTokens> {
  return customerAuthFetch<ApiCustomerAuthTokens>(
    "/auth/customer/password-reset/confirm",
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );
}
