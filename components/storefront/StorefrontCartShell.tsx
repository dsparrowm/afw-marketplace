"use client";

import { useCart } from "@/lib/cart/cart-context";
import { useAuth } from "@/lib/auth/auth-context";
import { StorefrontShell } from "@/components/storefront/StorefrontShell";

export function StorefrontCartShell({
  children,
  announcementMessages,
}: {
  children: React.ReactNode;
  announcementMessages: string[];
}) {
  const { itemCount, total } = useCart();
  const { isAuthenticated } = useAuth();

  return (
    <StorefrontShell
      cartItemCount={itemCount}
      cartTotal={total}
      isAuthenticated={isAuthenticated}
      announcementMessages={announcementMessages}
    >
      {children}
    </StorefrontShell>
  );
}
