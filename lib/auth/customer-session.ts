import { cache } from "react";
import { cookies } from "next/headers";
import {
  customerLogin,
  customerLogout,
  customerRefresh,
  customerSignup,
} from "@/lib/api/customer-auth";
import {
  CUSTOMER_ACCESS_COOKIE,
  CUSTOMER_PROFILE_COOKIE,
  CUSTOMER_REFRESH_COOKIE,
} from "@/lib/auth/customer-session-cookies";
import type { AccountType, Customer, OrderVolume } from "@/types/customer";
import type { ApiCustomerAuthTokens } from "@/types/api";

export {
  CUSTOMER_ACCESS_COOKIE,
  CUSTOMER_PROFILE_COOKIE,
  CUSTOMER_REFRESH_COOKIE,
};

const ACCESS_MAX_AGE_SEC = 30 * 60;
const REFRESH_MAX_AGE_SEC = 60 * 60 * 24 * 30;

export type CustomerAuthResult =
  | { ok: true; customer: Customer }
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

function customerIdFromToken(accessToken: string): string | null {
  try {
    const payload = accessToken.split(".")[1];
    if (!payload) return null;
    const decoded = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as { sub?: string };
    return typeof decoded.sub === "string" ? decoded.sub : null;
  } catch {
    return null;
  }
}

function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "Customer", lastName: "User" };
  if (parts.length === 1) return { firstName: parts[0], lastName: parts[0] };
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

function toApiAccountType(accountType: AccountType): "retail" | "wholesale" {
  return accountType === "business" ? "wholesale" : "retail";
}

function fromApiAccountType(
  accountType: "retail" | "wholesale" | string | undefined,
): AccountType {
  return accountType === "wholesale" ? "business" : "personal";
}

function parseProfileCookie(raw: string | undefined): Customer | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Customer;
    if (!parsed?.id || !parsed?.email) return null;
    return parsed;
  } catch {
    return null;
  }
}

async function setSessionCookies(
  tokens: ApiCustomerAuthTokens,
  customer: Customer,
) {
  const jar = await cookies();
  jar.set(
    CUSTOMER_ACCESS_COOKIE,
    tokens.accessToken,
    cookieOptions(ACCESS_MAX_AGE_SEC),
  );
  jar.set(
    CUSTOMER_REFRESH_COOKIE,
    tokens.refreshToken,
    cookieOptions(REFRESH_MAX_AGE_SEC),
  );
  jar.set(
    CUSTOMER_PROFILE_COOKIE,
    JSON.stringify(customer),
    cookieOptions(REFRESH_MAX_AGE_SEC),
  );
}

export async function clearCustomerSessionCookies() {
  const jar = await cookies();
  jar.delete(CUSTOMER_ACCESS_COOKIE);
  jar.delete(CUSTOMER_REFRESH_COOKIE);
  jar.delete(CUSTOMER_PROFILE_COOKIE);
}

function friendlyAuthError(error: unknown, fallback: string): string {
  if (!(error instanceof Error)) return fallback;
  const message = error.message;
  if (message.includes("(401)") || message.includes("(403)")) {
    return "Invalid email or password.";
  }
  if (message.includes("(409)")) {
    return "An account with this email already exists.";
  }
  if (message.includes("(429)")) {
    return "Too many attempts. Try again shortly.";
  }
  return fallback;
}

/** Customer signup against staging — stores HTTP-only session cookies. */
export async function signupCustomerWithPassword(input: {
  fullName: string;
  email: string;
  password: string;
  accountType: AccountType;
  businessName?: string;
  businessType?: string;
  orderVolume?: OrderVolume;
}): Promise<CustomerAuthResult> {
  const email = input.email.trim().toLowerCase();
  const fullName = input.fullName.trim();
  if (!fullName || !email || !input.password) {
    return { ok: false, error: "All required fields must be filled in." };
  }

  const { firstName, lastName } = splitFullName(fullName);
  const accountType = toApiAccountType(input.accountType);

  try {
    const tokens = await customerSignup({
      email,
      password: input.password,
      firstName,
      lastName,
      accountType,
      ...(accountType === "wholesale"
        ? {
            businessName: input.businessName?.trim(),
            businessType: input.businessType?.trim(),
            expectedOrderVolume: input.orderVolume,
          }
        : {}),
    });

    const id = customerIdFromToken(tokens.accessToken);
    if (!id) {
      return { ok: false, error: "Signup response was incomplete." };
    }

    const customer: Customer = {
      id,
      fullName,
      email,
      accountType: input.accountType,
      businessName: input.businessName?.trim(),
      businessType: input.businessType,
      orderVolume: input.orderVolume,
      businessApproved:
        input.accountType === "business" ? false : undefined,
      emailVerified: true,
    };

    await setSessionCookies(tokens, customer);
    return { ok: true, customer };
  } catch (error) {
    return {
      ok: false,
      error: friendlyAuthError(error, "Unable to create your account."),
    };
  }
}

/** Customer login against staging — stores HTTP-only session cookies. */
export async function loginCustomerWithPassword(
  email: string,
  password: string,
): Promise<CustomerAuthResult> {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail || !password) {
    return { ok: false, error: "Email and password are required." };
  }

  try {
    const tokens = await customerLogin({
      email: normalizedEmail,
      password,
    });
    const id = customerIdFromToken(tokens.accessToken);
    if (!id) {
      return { ok: false, error: "Login response was incomplete." };
    }

    const jar = await cookies();
    const existing = parseProfileCookie(
      jar.get(CUSTOMER_PROFILE_COOKIE)?.value,
    );

    const customer: Customer = {
      id,
      fullName:
        existing?.email === normalizedEmail && existing.fullName
          ? existing.fullName
          : normalizedEmail.split("@")[0] || "Customer",
      email: normalizedEmail,
      accountType: existing?.email === normalizedEmail
        ? existing.accountType
        : "personal",
      businessName:
        existing?.email === normalizedEmail
          ? existing.businessName
          : undefined,
      businessType:
        existing?.email === normalizedEmail
          ? existing.businessType
          : undefined,
      orderVolume:
        existing?.email === normalizedEmail ? existing.orderVolume : undefined,
      phone: existing?.email === normalizedEmail ? existing.phone : undefined,
      emailVerified: true,
    };

    await setSessionCookies(tokens, customer);
    return { ok: true, customer };
  } catch (error) {
    return {
      ok: false,
      error: friendlyAuthError(error, "Unable to sign in."),
    };
  }
}

export async function logoutCustomerSession(): Promise<void> {
  const jar = await cookies();
  const refreshToken = jar.get(CUSTOMER_REFRESH_COOKIE)?.value;
  if (refreshToken) {
    try {
      await customerLogout(refreshToken);
    } catch {
      // Cookie clear still proceeds
    }
  }
  await clearCustomerSessionCookies();
}

/**
 * Access token for customer-authenticated `/public/*` calls.
 * Deduped per RSC/request via React cache().
 */
export const getInteractiveCustomerAccessToken = cache(
  async (): Promise<string | null> => {
    const jar = await cookies();
    const access = jar.get(CUSTOMER_ACCESS_COOKIE)?.value;
    if (access && isAccessTokenFresh(access)) return access;

    const refreshToken = jar.get(CUSTOMER_REFRESH_COOKIE)?.value;
    if (!refreshToken) return null;

    try {
      const tokens = await customerRefresh(refreshToken);
      const profile =
        parseProfileCookie(jar.get(CUSTOMER_PROFILE_COOKIE)?.value) ??
        ({
          id: customerIdFromToken(tokens.accessToken) ?? "unknown",
          fullName: "Customer",
          email: "",
          accountType: "personal" as const,
        } satisfies Customer);

      const id = customerIdFromToken(tokens.accessToken) ?? profile.id;
      try {
        await setSessionCookies(tokens, { ...profile, id });
      } catch {
        // RSC may not persist cookies; still return token for this request.
      }
      return tokens.accessToken;
    } catch {
      try {
        await clearCustomerSessionCookies();
      } catch {
        // ignore
      }
      return null;
    }
  },
);

/** Profile for the interactive customer session (from profile cookie). */
export const getInteractiveCustomerProfile = cache(
  async (): Promise<Customer | null> => {
    const token = await getInteractiveCustomerAccessToken();
    if (!token) return null;
    const jar = await cookies();
    const profile = parseProfileCookie(
      jar.get(CUSTOMER_PROFILE_COOKIE)?.value,
    );
    if (!profile) {
      const id = customerIdFromToken(token);
      if (!id) return null;
      return {
        id,
        fullName: "Customer",
        email: "",
        accountType: fromApiAccountType("retail"),
      };
    }
    return profile;
  },
);

export async function updateCustomerProfileCookie(
  updates: Pick<Customer, "fullName" | "email" | "phone">,
): Promise<Customer | null> {
  const current = await getInteractiveCustomerProfile();
  if (!current) return null;
  const next: Customer = { ...current, ...updates };
  const jar = await cookies();
  jar.set(
    CUSTOMER_PROFILE_COOKIE,
    JSON.stringify(next),
    cookieOptions(REFRESH_MAX_AGE_SEC),
  );
  return next;
}
