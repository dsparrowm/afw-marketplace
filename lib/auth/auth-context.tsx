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
  customerLoginAction,
  customerLogoutAction,
  customerSignupAction,
  getCustomerSessionAction,
  updateCustomerProfileAction,
} from "@/lib/auth/customer-auth-actions";
import type { AccountType, Customer, OrderVolume } from "@/types/customer";

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
  logout: () => Promise<void>;
  updateProfile: (updates: Pick<Customer, "fullName" | "email" | "phone">) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

/** Live customer auth via HTTP-only cookies + staging `/auth/customer/*`. */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const session = await getCustomerSessionAction();
        if (!cancelled) setCustomer(session.customer);
      } catch {
        if (!cancelled) setCustomer(null);
      } finally {
        if (!cancelled) setIsHydrated(true);
      }
    })();
    return () => {
      cancelled = true;
    };
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

    const result = await customerLoginAction({
      email: normalizedEmail,
      password,
    });
    if (!result.ok) return result;
    setCustomer(result.customer);
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

    const result = await customerSignupAction({
      fullName,
      email: normalizedEmail,
      password: input.password,
      accountType: input.accountType,
      businessName: input.businessName?.trim(),
      businessType: input.businessType,
      orderVolume: input.orderVolume,
    });
    if (!result.ok) return result;
    setCustomer(result.customer);
    return { ok: true as const };
  }, []);

  const logout = useCallback(async () => {
    await customerLogoutAction();
    setCustomer(null);
  }, []);

  const updateProfile = useCallback(
    (updates: Pick<Customer, "fullName" | "email" | "phone">) => {
      setCustomer((current) => {
        if (!current) return current;
        const nextCustomer: Customer = {
          ...current,
          ...updates,
        };
        void updateCustomerProfileAction(updates);
        return nextCustomer;
      });
    },
    [],
  );

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
