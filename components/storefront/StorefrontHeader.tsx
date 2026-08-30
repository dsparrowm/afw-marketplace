"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { AfwLogoLink } from "@/components/storefront/AfwLogo";
import { FigmaImage } from "@/components/storefront/FigmaImage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { headerIcons } from "@/lib/brand/assets";
import {
  categoryQuickLinks,
  mainNavLinks,
  siteConfig,
} from "@/lib/storefront/site";
import { cn, formatCad } from "@/lib/utils";

export type StorefrontHeaderProps = {
  cartItemCount?: number;
  cartTotal?: number;
  isAuthenticated?: boolean;
};

export function StorefrontHeader({
  cartItemCount = 0,
  cartTotal = 0,
  isAuthenticated = false,
}: StorefrontHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-10">
        <div className="flex h-20 items-center gap-4 lg:gap-6">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <div className="flex shrink-0 items-center gap-8 lg:gap-12">
            <AfwLogoLink priority />

            <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
              {mainNavLinks.map((link) => (
                <span key={link.label} className="inline-flex items-center gap-6">
                  {link.separated ? (
                    <span
                      className="h-5 w-px bg-border"
                      aria-hidden
                    />
                  ) : null}
                  <Link
                    href={link.href}
                    className={cn(
                      "inline-flex items-center gap-1 whitespace-nowrap text-sm font-medium transition-colors",
                      link.accent
                        ? "text-primary hover:text-primary/90"
                        : "text-foreground/85 hover:text-brand-green",
                    )}
                  >
                    {link.label}
                    {link.hasDropdown ? (
                      <ChevronDown
                        className="h-2.5 w-2.5 opacity-70"
                        aria-hidden
                      />
                    ) : null}
                  </Link>
                </span>
              ))}
            </nav>
          </div>

          <div className="hidden min-w-0 flex-1 justify-center px-4 lg:flex lg:max-w-[307px] lg:flex-none lg:px-0">
            <label className="relative block w-full">
              <span className="sr-only">Search products</span>
              <FigmaImage
                src={headerIcons.search}
                alt=""
                width={16}
                height={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 opacity-60"
              />
              <Input
                type="search"
                placeholder="Search products, categories, or brands..."
                className="h-[65px] w-full rounded-xl border-border bg-muted pl-11"
              />
            </label>
          </div>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <div className="hidden h-9 items-center gap-2 rounded-lg border border-border px-3 text-sm font-medium text-foreground/85 md:flex">
              <FigmaImage
                src={headerIcons.flagCanada}
                alt=""
                width={20}
                height={10}
              />
              <span>{siteConfig.currency}</span>
              <ChevronDown className="h-2.5 w-2.5 opacity-60" aria-hidden />
            </div>

            <div className="hidden h-9 items-center gap-2 rounded-lg border border-border px-3 text-sm text-foreground/85 lg:flex">
              <FigmaImage
                src={headerIcons.location}
                alt=""
                width={11}
                height={14}
                className="opacity-60"
              />
              <span>{siteConfig.location}</span>
            </div>

            <Link
              href={isAuthenticated ? "/account/profile" : "/login"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground/85 transition-colors hover:bg-muted hover:text-brand-green"
              aria-label={isAuthenticated ? "Account" : "Sign in"}
            >
              <FigmaImage
                src={headerIcons.user}
                alt=""
                width={16}
                height={18}
              />
            </Link>

            <Link
              href="/cart"
              className="inline-flex h-11 min-w-[112px] items-center justify-center gap-2 rounded-full bg-brand-green px-5 text-sm font-semibold text-brand-green-foreground transition-colors hover:bg-brand-green/90"
              aria-label="Shopping cart"
            >
              <FigmaImage
                src={headerIcons.cart}
                alt=""
                width={18}
                height={16}
                className="brightness-0 invert"
              />
              <span>
                {cartItemCount > 0 ? `${cartItemCount} · ` : ""}
                {formatCad(cartTotal)}
              </span>
            </Link>
          </div>
        </div>

        {mobileOpen ? (
          <div className="border-t border-border py-4 lg:hidden">
            <label className="relative mb-4 block">
              <span className="sr-only">Search products</span>
              <FigmaImage
                src={headerIcons.search}
                alt=""
                width={16}
                height={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 opacity-60"
              />
              <Input
                type="search"
                placeholder="Search products, categories, or brands..."
                className="h-12 rounded-xl bg-muted pl-11"
              />
            </label>
            <nav className="flex flex-col gap-1" aria-label="Mobile main">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium",
                    link.accent
                      ? "text-primary hover:bg-muted"
                      : "text-foreground hover:bg-muted",
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        ) : null}
      </div>

      <div className="hidden border-t border-border bg-header-category lg:block">
        <div
          className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-8 gap-y-2 px-4 py-3 text-sm sm:px-10"
        >
          {categoryQuickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "font-medium whitespace-nowrap text-foreground/75 transition-colors hover:text-brand-green",
                link.label === "Shop All" && "font-semibold text-primary",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
