import type { AuthSession, Customer } from "@/types/customer";

export const AUTH_STORAGE_KEY = "afw-marketplace-auth";

export function readStoredSession(): AuthSession | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthSession;
    if (parsed?.customer?.email) return parsed;
  } catch {
    // ignore invalid session
  }

  return null;
}

export function writeStoredSession(session: AuthSession | null): void {
  if (typeof window === "undefined") return;

  if (!session) {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function createMockCustomer(input: {
  fullName: string;
  email: string;
  accountType: Customer["accountType"];
  businessName?: string;
  businessType?: string;
  orderVolume?: Customer["orderVolume"];
}): Customer {
  return {
    id: `cust-${input.email.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
    fullName: input.fullName,
    email: input.email,
    phone: "+1 (416) 555-0192",
    accountType: input.accountType,
    businessName: input.businessName,
    businessType: input.businessType,
    orderVolume: input.orderVolume,
    taxId: input.accountType === "business" ? "ON-92841029-TX" : undefined,
    businessApproved: input.accountType === "business" ? true : undefined,
    emailVerified: true,
  };
}
