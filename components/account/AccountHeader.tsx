"use client";

import { LogOut } from "lucide-react";
import { AfwLogoLink } from "@/components/storefront/AfwLogo";
import { useAuth } from "@/lib/auth/auth-context";

/** Dashboard brand row — Figma `29:88` */
export function AccountHeader() {
  const { customer, logout } = useAuth();

  if (!customer) return null;

  const firstName = customer.fullName.split(" ")[0] ?? customer.fullName;

  async function handleLogout() {
    await logout();
    window.location.assign("/");
  }

  return (
    <div className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-5 sm:px-16">
        <div className="flex items-center gap-2">
          <AfwLogoLink href="/" priority />
          <span className="hidden text-base font-semibold text-foreground sm:inline">
            AFW Marketplace
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <span className="text-muted-foreground">
            Hi, <span className="font-medium text-foreground">{firstName}</span>
          </span>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 font-medium text-brand-green hover:text-brand-green/90"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
