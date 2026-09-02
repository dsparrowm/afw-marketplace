"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AccountHeader } from "@/components/account/AccountHeader";
import { AccountTabNav } from "@/components/account/AccountTabNav";
import { useAuth } from "@/lib/auth/auth-context";

export type AccountShellProps = {
  children: React.ReactNode;
};

/** Account dashboard shell — Figma dashboard frames `29:86`+ */
export function AccountShell({ children }: AccountShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isHydrated } = useAuth();

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.replace(`/login?returnUrl=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, isHydrated, pathname, router]);

  if (!isHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Loading account...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <AccountHeader />
      <AccountTabNav />
      <main className="mx-auto max-w-[1200px] px-4 py-10 sm:px-16">{children}</main>
    </div>
  );
}
