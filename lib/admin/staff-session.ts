import { cache } from "react";
import { cookies } from "next/headers";
import type { ApiLoginResponse } from "@/types/api";
import { getMarketplaceApiBaseUrl } from "@/lib/api/config";
import {
  STAFF_ACCESS_COOKIE,
  STAFF_REFRESH_COOKIE,
} from "@/lib/admin/staff-session-cookies";

export { STAFF_ACCESS_COOKIE, STAFF_REFRESH_COOKIE };

const ACCESS_MAX_AGE_SEC = 15 * 60;
const REFRESH_MAX_AGE_SEC = 60 * 60 * 24 * 7;

function isAccessTokenFresh(accessToken: string): boolean {
  try {
    const payload = accessToken.split(".")[1];
    if (!payload) return false;
    const decoded = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as { exp?: number };
    if (typeof decoded.exp !== "number") return false;
    return Date.now() < decoded.exp * 1000 - 60_000;
  } catch {
    return false;
  }
}

export type InteractiveStaffIdentity = {
  id: string | null;
  email: string | null;
};

type StaffJwtClaims = {
  exp?: number;
  sub?: string;
  id?: string;
  userId?: string;
  email?: string;
};

function decodeStaffJwtClaims(accessToken: string): StaffJwtClaims | null {
  try {
    const payload = accessToken.split(".")[1];
    if (!payload) return null;
    return JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as StaffJwtClaims;
  } catch {
    return null;
  }
}

function identityFromToken(accessToken: string): InteractiveStaffIdentity {
  const claims = decodeStaffJwtClaims(accessToken);
  if (!claims) return { id: null, email: null };
  const id =
    (typeof claims.sub === "string" && claims.sub) ||
    (typeof claims.id === "string" && claims.id) ||
    (typeof claims.userId === "string" && claims.userId) ||
    null;
  const email =
    typeof claims.email === "string" && claims.email.trim()
      ? claims.email.trim().toLowerCase()
      : null;
  return { id, email };
}


export type StaffLoginResult =
  | { ok: true }
  | { ok: false; error: string };

function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  };
}

async function setTokenCookies(tokens: ApiLoginResponse) {
  const jar = await cookies();
  jar.set(STAFF_ACCESS_COOKIE, tokens.accessToken, cookieOptions(ACCESS_MAX_AGE_SEC));
  jar.set(
    STAFF_REFRESH_COOKIE,
    tokens.refreshToken,
    cookieOptions(REFRESH_MAX_AGE_SEC),
  );
}

export async function clearStaffSessionCookies() {
  const jar = await cookies();
  jar.delete(STAFF_ACCESS_COOKIE);
  jar.delete(STAFF_REFRESH_COOKIE);
}

export async function hasStaffSessionCookies(): Promise<boolean> {
  const jar = await cookies();
  return Boolean(
    jar.get(STAFF_ACCESS_COOKIE)?.value || jar.get(STAFF_REFRESH_COOKIE)?.value,
  );
}

/** Interactive staff login — stores tokens in HTTP-only cookies only. */
export async function loginStaffWithPassword(
  email: string,
  password: string,
): Promise<StaffLoginResult> {
  const trimmedEmail = email.trim();
  if (!trimmedEmail || !password) {
    return { ok: false, error: "Email and password are required." };
  }

  let baseUrl: string;
  try {
    baseUrl = getMarketplaceApiBaseUrl();
  } catch {
    return { ok: false, error: "Marketplace API is not configured." };
  }

  let response: Response;
  try {
    response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: trimmedEmail, password }),
      cache: "no-store",
    });
  } catch {
    return { ok: false, error: "Could not reach the marketplace API." };
  }

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      return { ok: false, error: "Invalid email or password." };
    }
    if (response.status === 429) {
      return { ok: false, error: "Too many login attempts. Try again shortly." };
    }
    return { ok: false, error: `Login failed (${response.status}).` };
  }

  const data = (await response.json()) as ApiLoginResponse;
  if (!data.accessToken || !data.refreshToken) {
    return { ok: false, error: "Login response was incomplete." };
  }

  await setTokenCookies(data);
  return { ok: true };
}

/** Clears cookies and best-effort logout against the API. */
export async function logoutStaffSession(): Promise<void> {
  const jar = await cookies();
  const refreshToken = jar.get(STAFF_REFRESH_COOKIE)?.value;

  if (refreshToken) {
    try {
      const baseUrl = getMarketplaceApiBaseUrl();
      await fetch(`${baseUrl}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
        cache: "no-store",
      });
    } catch {
      // Cookie clear still proceeds
    }
  }

  await clearStaffSessionCookies();
}

/**
 * Access token for interactive staff session.
 * Deduped per RSC request via React cache() so parallel fetches do not
 * race-rotate the refresh token.
 */
export const getInteractiveStaffAccessToken = cache(
  async (): Promise<string | null> => {
    const jar = await cookies();
    const access = jar.get(STAFF_ACCESS_COOKIE)?.value;
    if (access && isAccessTokenFresh(access)) return access;

    const refreshToken = jar.get(STAFF_REFRESH_COOKIE)?.value;
    if (!refreshToken) return null;

    try {
      const baseUrl = getMarketplaceApiBaseUrl();
      const response = await fetch(`${baseUrl}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
        cache: "no-store",
      });
      if (!response.ok) {
        try {
          await clearStaffSessionCookies();
        } catch {
          // Cookie mutation is not allowed during RSC render.
        }
        return null;
      }
      const data = (await response.json()) as ApiLoginResponse;
      if (!data.accessToken) return null;
      try {
        await setTokenCookies(data);
      } catch {
        // RSC cannot persist refreshed cookies; still return token for this request.
      }
      return data.accessToken;
    } catch {
      return null;
    }
  },
);

/**
 * Staff id/email for the interactive session (from JWT claims).
 * Used to guard self-revoke and similar UI.
 */
export const getInteractiveStaffIdentity = cache(
  async (): Promise<InteractiveStaffIdentity> => {
    const token = await getInteractiveStaffAccessToken();
    if (!token) return { id: null, email: null };
    return identityFromToken(token);
  },
);
