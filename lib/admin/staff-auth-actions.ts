"use server";

import { redirect } from "next/navigation";
import {
  loginStaffWithPassword,
  logoutStaffSession,
} from "@/lib/admin/staff-session";

export type AdminLoginActionState = {
  error?: string;
};

function safeReturnUrl(value: FormDataEntryValue | null): string {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) {
    return "/admin";
  }
  if (!value.startsWith("/admin")) {
    return "/admin";
  }
  return value;
}

export async function adminLoginAction(
  _prev: AdminLoginActionState,
  formData: FormData,
): Promise<AdminLoginActionState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const returnUrl = safeReturnUrl(formData.get("returnUrl"));

  const result = await loginStaffWithPassword(email, password);
  if (!result.ok) {
    return { error: result.error };
  }

  redirect(returnUrl);
}

export async function adminLogoutAction(): Promise<void> {
  await logoutStaffSession();
  redirect("/admin/login");
}
