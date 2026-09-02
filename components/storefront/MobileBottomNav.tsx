"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/lib/cart/cart-context";
import { useAuth } from "@/lib/auth/auth-context";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  icon: typeof Home;
  isActive: (pathname: string) => boolean;
  showBadge?: boolean;
  resolveHref?: (isAuthenticated: boolean) => string;
};

const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
    icon: Home,
    isActive: (pathname) => pathname === "/",
  },
  {
    label: "Categories",
    href: "/shop",
    icon: LayoutGrid,
    isActive: (pathname) =>
      pathname === "/shop" || pathname.startsWith("/shop/"),
  },
  {
    label: "Cart",
    href: "/cart",
    icon: ShoppingCart,
    isActive: (pathname) =>
      pathname === "/cart" || pathname.startsWith("/checkout"),
    showBadge: true,
  },
  {
    label: "Account",
    href: "/login",
    icon: User,
    isActive: (pathname) =>
      pathname.startsWith("/login") ||
      pathname.startsWith("/signup") ||
      pathname.startsWith("/account"),
    resolveHref: (isAuthenticated: boolean) =>
      isAuthenticated ? "/account/orders" : "/login",
  },
];

/** Fixed bottom tab bar — Figma `2:2165`; Cart replaces Wishlist per design review */
export function MobileBottomNav() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { isAuthenticated } = useAuth();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background pb-[env(safe-area-inset-bottom)] lg:hidden"
      aria-label="Mobile navigation"
      data-figma-node="2:2165"
    >
      <div className="mx-auto flex h-[76px] max-w-[375px] items-center justify-between px-6">
        {navItems.map(({ label, href, icon: Icon, isActive, showBadge, resolveHref }) => {
          const active = isActive(pathname);
          const linkHref = resolveHref ? resolveHref(isAuthenticated) : href;

          return (
            <Link
              key={label}
              href={linkHref}
              className={cn(
                "relative flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors",
                active ? "text-brand-green" : "text-muted-foreground",
              )}
            >
              <span className="relative inline-flex">
                <Icon className="h-[18px] w-[18px]" aria-hidden />
                {showBadge && itemCount > 0 ? (
                  <span
                    className="absolute -right-2.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground"
                  >
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                ) : null}
              </span>
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
