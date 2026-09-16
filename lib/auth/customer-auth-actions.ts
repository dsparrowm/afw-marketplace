"use server";

import {
  getInteractiveCustomerProfile,
  loginCustomerWithPassword,
  logoutCustomerSession,
  signupCustomerWithPassword,
  updateCustomerProfileCookie,
} from "@/lib/auth/customer-session";
import {
  confirmCustomerPasswordReset,
  requestCustomerPasswordReset,
} from "@/lib/api/customer-auth";
import type { AccountType, Customer, OrderVolume } from "@/types/customer";

export type CustomerAuthActionResult =
  | { ok: true; customer: Customer }
  | { ok: false; error: string };

export async function customerLoginAction(input: {
  email: string;
  password: string;
}): Promise<CustomerAuthActionResult> {
  return loginCustomerWithPassword(input.email, input.password);
}

export async function customerSignupAction(input: {
  fullName: string;
  email: string;
  password: string;
  accountType: AccountType;
  businessName?: string;
  businessType?: string;
  orderVolume?: OrderVolume;
}): Promise<CustomerAuthActionResult> {
  return signupCustomerWithPassword(input);
}

export async function customerLogoutAction(): Promise<{ ok: true }> {
  await logoutCustomerSession();
  return { ok: true };
}

export async function getCustomerSessionAction(): Promise<{
  customer: Customer | null;
}> {
  const customer = await getInteractiveCustomerProfile();
  return { customer };
}

export async function updateCustomerProfileAction(
  updates: Pick<Customer, "fullName" | "email" | "phone">,
): Promise<CustomerAuthActionResult> {
  const customer = await updateCustomerProfileCookie(updates);
  if (!customer) {
    return { ok: false, error: "You must be signed in to update your profile." };
  }
  return { ok: true, customer };
}

const PASSWORD_RESET_SENT =
  "If an account exists for that email, we sent reset instructions. The message is the same either way.";

export async function requestCustomerPasswordResetAction(
  email: string,
): Promise<{ ok: true; message: string } | { ok: false; error: string }> {
  const normalizedEmail = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return { ok: false, error: "Enter a valid email address." };
  }

  try {
    await requestCustomerPasswordReset(normalizedEmail);
    return { ok: true, message: PASSWORD_RESET_SENT };
  } catch (error) {
    if (error instanceof Error && error.message.includes("(429)")) {
      return { ok: false, error: "Too many attempts. Try again shortly." };
    }
    return {
      ok: false,
      error: "We couldn't send reset instructions. Try again shortly.",
    };
  }
}

/**
 * Confirms the emailed token, then discards the returned token pair.
 * The confirm response has no email, and there is no profile endpoint to rebuild the session cookie.
 */
export async function confirmCustomerPasswordResetAction(input: {
  token: string;
  newPassword: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const token = input.token.trim();
  if (!token) {
    return { ok: false, error: "This reset link is missing a token." };
  }
  if (input.newPassword.length < 8) {
    return { ok: false, error: "Password must be at least 8 characters." };
  }

  try {
    await confirmCustomerPasswordReset({
      token,
      newPassword: input.newPassword,
    });
    return { ok: true };
  } catch (error) {
    if (error instanceof Error && error.message.includes("(429)")) {
      return { ok: false, error: "Too many attempts. Try again shortly." };
    }
    return {
      ok: false,
      error: "This reset link is invalid or has expired. Request a new one.",
    };
  }
}
