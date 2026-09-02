"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authContent } from "@/lib/storefront/auth-content";
import { cn } from "@/lib/utils";

/** Log In / Sign Up tabs — Figma `29:20` */
export function AuthTabs() {
  const pathname = usePathname();
  const isLogin = pathname === "/login";

  return (
    <div
      className="mb-8 grid grid-cols-2 rounded-xl bg-muted p-1"
      role="tablist"
      aria-label="Authentication"
      data-figma-node="29:20"
    >
      <Link
        href="/login"
        role="tab"
        aria-selected={isLogin}
        className={cn(
          "inline-flex h-11 items-center justify-center rounded-lg text-sm font-semibold transition-colors",
          isLogin
            ? "bg-card text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        {authContent.tabs.login}
      </Link>
      <Link
        href="/signup"
        role="tab"
        aria-selected={!isLogin}
        className={cn(
          "inline-flex h-11 items-center justify-center rounded-lg text-sm font-semibold transition-colors",
          !isLogin
            ? "bg-card text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        {authContent.tabs.signup}
      </Link>
    </div>
  );
}
