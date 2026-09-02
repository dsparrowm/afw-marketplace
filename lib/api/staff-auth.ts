import type { ApiLoginResponse } from "@/types/api";
import { getMarketplaceApiBaseUrl, getStaffCredentials } from "@/lib/api/config";

type TokenCache = {
  accessToken: string;
  refreshToken: string;
  expiresAtMs: number;
};

let tokenCache: TokenCache | null = null;
let authInFlight: Promise<TokenCache> | null = null;

function decodeJwtExpiryMs(accessToken: string): number {
  try {
    const payload = accessToken.split(".")[1];
    if (!payload) return Date.now() + 14 * 60 * 1000;
    const decoded = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as { exp?: number };
    if (typeof decoded.exp === "number") {
      return decoded.exp * 1000;
    }
  } catch {
    // Ignore malformed JWT payload
  }
  return Date.now() + 14 * 60 * 1000;
}

async function login(): Promise<TokenCache> {
  const baseUrl = getMarketplaceApiBaseUrl();
  const { email, password } = getStaffCredentials();

  const response = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });

  if (!response.ok) {
    if (response.status === 429 && tokenCache) {
      return tokenCache;
    }
    throw new Error(`Staff login failed (${response.status})`);
  }

  const data = (await response.json()) as ApiLoginResponse;
  tokenCache = {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    expiresAtMs: decodeJwtExpiryMs(data.accessToken),
  };
  return tokenCache;
}

async function refresh(refreshToken: string): Promise<TokenCache> {
  const baseUrl = getMarketplaceApiBaseUrl();

  const response = await fetch(`${baseUrl}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
    cache: "no-store",
  });

  if (!response.ok) {
    tokenCache = null;
    return login();
  }

  const data = (await response.json()) as ApiLoginResponse;
  tokenCache = {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    expiresAtMs: decodeJwtExpiryMs(data.accessToken),
  };
  return tokenCache;
}

async function resolveTokenCache(): Promise<TokenCache> {
  const now = Date.now();
  if (tokenCache && now < tokenCache.expiresAtMs - 60_000) {
    return tokenCache;
  }

  if (tokenCache?.refreshToken) {
    return refresh(tokenCache.refreshToken);
  }

  return login();
}

/** Server-only staff access token for proxied admin reads. */
export async function getStaffAccessToken(): Promise<string> {
  if (!authInFlight) {
    authInFlight = resolveTokenCache().finally(() => {
      authInFlight = null;
    });
  }

  const session = await authInFlight;
  return session.accessToken;
}
