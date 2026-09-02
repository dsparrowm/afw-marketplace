"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createMockCustomer,
  readStoredSession,
  writeStoredSession,
} from "@/lib/auth/session";
import type { AccountType, AuthSession, Customer, OrderVolume } from "@/types/customer";

type LoginInput = {
  email: string;
  password: string;
};

type SignupInput = {
  fullName: string;
  email: string;
  password: string;
  accountType: AccountType;
  businessName?: string;
  businessType?: string;
  orderVolume?: OrderVolume;
};

type AuthContextValue = {
  customer: Customer | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  login: (input: LoginInput) => Promise<{ ok: true } | { ok: false; error: string }>;
  signup: (input: SignupInput) => Promise<{ ok: true } | { ok: false; error: string }>;
  logout: () => void;
  updateProfile: (updates: Pick<Customer, "fullName" | "email" | "phone">) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function persistSession(customer: Customer): AuthSession {
  const session: AuthSession = {
    customer,
    createdAt: new Date().toISOString(),
  };
  writeStoredSession(session);
  return session;
}

/** Mock auth until marketplace customer API is wired */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const session = readStoredSession();
    if (session) setCustomer(session.customer);
    setIsHydrated(true);
  }, []);

  const login = useCallback(async ({ email, password }: LoginInput) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password.trim()) {
      return { ok: false as const, error: "Email and password are required." };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return { ok: false as const, error: "Enter a valid email address." };
    }

    if (password.length < 8) {
      return { ok: false as const, error: "Password must be at least 8 characters." };
    }

    const existing = readStoredSession();
    const nextCustomer =
      existing?.customer.email === normalizedEmail
        ? existing.customer
        : createMockCustomer({
            fullName: normalizedEmail.split("@")[0] ?? "Customer",
            email: normalizedEmail,
            accountType: "personal",
          });

    const session = persistSession(nextCustomer);
    setCustomer(session.customer);
    return { ok: true as const };
  }, []);

  const signup = useCallback(async (input: SignupInput) => {
    const normalizedEmail = input.email.trim().toLowerCase();
    const fullName = input.fullName.trim();

    if (!fullName || !normalizedEmail || !input.password.trim()) {
      return { ok: false as const, error: "All required fields must be filled in." };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return { ok: false as const, error: "Enter a valid email address." };
    }

    if (input.password.length < 8) {
      return { ok: false as const, error: "Password must be at least 8 characters." };
    }

    if (input.accountType === "business") {
      if (!input.businessName?.trim()) {
        return { ok: false as const, error: "Business name is required." };
      }
      if (!input.businessType?.trim()) {
        return { ok: false as const, error: "Select a business type." };
      }
      if (!input.orderVolume) {
        return { ok: false as const, error: "Select an expected order volume." };
      }
    }

    const nextCustomer = createMockCustomer({
      fullName,
      email: normalizedEmail,
      accountType: input.accountType,
      businessName: input.businessName?.trim(),
      businessType: input.businessType,
      orderVolume: input.orderVolume,
    });

    const session = persistSession(nextCustomer);
    setCustomer(session.customer);
    return { ok: true as const };
  }, []);

  const logout = useCallback(() => {
    writeStoredSession(null);
    setCustomer(null);
  }, []);

  const updateProfile = useCallback((updates: Pick<Customer, "fullName" | "email" | "phone">) => {
    setCustomer((current) => {
      if (!current) return current;
      const nextCustomer: Customer = {
        ...current,
        ...updates,
      };
      persistSession(nextCustomer);
      return nextCustomer;
    });
  }, []);

  const value = useMemo(
    () => ({
      customer,
      isAuthenticated: Boolean(customer),
      isHydrated,
      login,
      signup,
      logout,
      updateProfile,
    }),
    [customer, isHydrated, login, signup, logout, updateProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
