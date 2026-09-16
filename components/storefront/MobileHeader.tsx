"use client";

import Link from "next/link";
import { Leaf, Menu, Search, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { FigmaImage } from "@/components/storefront/FigmaImage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { headerIcons } from "@/lib/brand/assets";
import { useCart } from "@/lib/cart/cart-context";
import { useAuth } from "@/lib/auth/auth-context";
import {
  categoryQuickLinks,
  mainNavLinks,
  siteConfig,
} from "@/lib/storefront/site";
import { cn } from "@/lib/utils";

export type MobileHeaderProps = {
  isAuthenticated?: boolean;
};

/** Compact mobile header — Figma `2:2148` */
export function MobileHeader({ isAuthenticated: isAuthenticatedProp = false }: MobileHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { isAuthenticated: isAuthenticatedFromAuth } = useAuth();
  const isAuthenticated = isAuthenticatedProp || isAuthenticatedFromAuth;

  return (
    <header
      className="sticky top-0 z-50 border-b border-border bg-background lg:hidden"
      data-figma-node="2:2148"
    >
      <div className="flex h-[65px] items-center justify-between px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xl font-bold text-brand-green"
        >
          <Leaf className="h-[18px] w-[18px]" aria-hidden />
          <span>{siteConfig.shortName}</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/shop"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground/85 transition-colors hover:bg-muted"
            aria-label="Search products"
          >
            <Search className="h-[18px] w-[18px]" aria-hidden />
          </Link>

          <Link
            href="/cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground/85 transition-colors hover:bg-muted"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="h-[18px] w-[18px]" aria-hidden />
            <span
              className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground"
            >
              {itemCount}
            </span>
          </Link>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </Button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-border px-4 py-4">
          <label className="relative mb-4 block">
            <span className="sr-only">Search products</span>
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              type="search"
              placeholder="Search products, categories, or brands..."
              className="h-12 rounded-xl bg-muted pl-11"
            />
          </label>

          <div className="mb-4 flex flex-wrap gap-2">
            <span className="inline-flex h-9 items-center gap-2 rounded-lg border border-border px-3 text-sm font-medium">
              <FigmaImage
                src={headerIcons.flagCanada}
                alt=""
                width={20}
                height={10}
              />
              {siteConfig.currency}
            </span>
          </div>

          <nav className="flex flex-col gap-1" aria-label="Mobile main">
            {mainNavLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium",
                  link.accent
                    ? "text-primary hover:bg-muted"
                    : "text-foreground hover:bg-muted",
                )}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={isAuthenticated ? "/account/profile" : "/login"}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
              onClick={() => setMenuOpen(false)}
            >
              {isAuthenticated ? "My Account" : "Sign In"}
            </Link>
          </nav>

          <div className="mt-4 border-t border-border pt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Categories
            </p>
            <div className="flex flex-col gap-1">
              {categoryQuickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm hover:bg-muted",
                    link.label === "Shop All"
                      ? "font-semibold text-primary"
                      : "text-foreground/85",
                  )}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
