"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { AfwLogoLink } from "@/components/storefront/AfwLogo";
import { FigmaImage } from "@/components/storefront/FigmaImage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { headerIcons } from "@/lib/brand/assets";
import {
  categoryQuickLinks,
  mainNavLinks,
  siteConfig,
  type NavLink,
} from "@/lib/storefront/site";
import { cn, formatCad } from "@/lib/utils";

export type StorefrontHeaderProps = {
  cartItemCount?: number;
  cartTotal?: number;
  isAuthenticated?: boolean;
};

function HeaderNavLink({
  link,
  reduceMotion,
}: {
  link: NavLink;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.div
      className="relative inline-flex"
      whileHover={reduceMotion ? undefined : { y: -1 }}
      transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={link.href}
        className={cn(
          "group relative inline-flex items-center gap-1 whitespace-nowrap py-1 text-sm font-medium transition-colors duration-200",
          link.accent
            ? "text-primary hover:text-primary/80"
            : "text-foreground/85 hover:text-brand-green",
        )}
      >
        {link.label}
        {link.hasDropdown ? (
          <ChevronDown
            className="h-2.5 w-2.5 opacity-70 transition-transform duration-200 group-hover:translate-y-0.5"
            aria-hidden
          />
        ) : null}
        <span
          className={cn(
            "pointer-events-none absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full transition-transform duration-200 ease-out group-hover:scale-x-100",
            link.accent ? "bg-primary" : "bg-brand-green",
          )}
          aria-hidden
        />
      </Link>
    </motion.div>
  );
}

function CategoryNavLink({
  link,
  reduceMotion,
}: {
  link: (typeof categoryQuickLinks)[number];
  reduceMotion: boolean | null;
}) {
  const isShopAll = link.label === "Shop All";

  return (
    <motion.div
      className="relative shrink-0"
      whileHover={reduceMotion ? undefined : { y: -1 }}
      transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={link.href}
        className={cn(
          "group relative inline-flex whitespace-nowrap py-1 text-sm font-medium transition-colors duration-200",
          isShopAll
            ? "font-semibold text-primary hover:text-primary/80"
            : "text-foreground/75 hover:text-brand-green",
        )}
      >
        {link.label}
        <span
          className={cn(
            "pointer-events-none absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full transition-transform duration-200 ease-out group-hover:scale-x-100",
            isShopAll ? "bg-primary" : "bg-brand-green",
          )}
          aria-hidden
        />
      </Link>
    </motion.div>
  );
}

export function StorefrontHeader({
  cartItemCount = 0,
  cartTotal = 0,
  isAuthenticated = false,
}: StorefrontHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const q = String(data.get("q") ?? "").trim();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    router.push(params.size > 0 ? `/shop?${params}` : "/shop");
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-10">
        <div className="flex h-20 items-center gap-4 lg:gap-8">
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

          <div className="flex min-w-0 shrink-0 items-center gap-8 lg:gap-10">
            <AfwLogoLink priority />

            <nav className="hidden items-center gap-6 xl:gap-8 lg:flex" aria-label="Main">
              {mainNavLinks.map((link) => (
                <span key={link.label} className="inline-flex items-center gap-6">
                  {link.separated ? (
                    <span
                      className="h-5 w-px bg-border"
                      aria-hidden
                    />
                  ) : null}
                  <HeaderNavLink link={link} reduceMotion={reduceMotion} />
                </span>
              ))}
            </nav>
          </div>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <div className="hidden h-9 items-center gap-2 rounded-lg border border-border px-3 text-sm font-medium text-foreground/85 transition-colors hover:border-brand-green/40 hover:bg-muted/60 md:flex">
              <FigmaImage
                src={headerIcons.flagCanada}
                alt=""
                width={20}
                height={10}
              />
              <span>{siteConfig.currency}</span>
              <ChevronDown className="h-2.5 w-2.5 opacity-60" aria-hidden />
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
            <form className="relative mb-4 block" onSubmit={handleSearchSubmit}>
              <label className="relative block">
                <span className="sr-only">Search products</span>
                <FigmaImage
                  src={headerIcons.search}
                  alt=""
                  width={16}
                  height={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 opacity-60"
                />
                <Input
                  name="q"
                  type="search"
                  placeholder="Search products, categories, or brands..."
                  className="h-12 rounded-xl bg-muted pl-11"
                />
              </label>
            </form>
            <nav className="flex flex-col gap-1" aria-label="Mobile main">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    link.accent
                      ? "text-primary hover:bg-primary/10"
                      : "text-foreground hover:bg-brand-green/10 hover:text-brand-green",
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
        <div className="mx-auto flex max-w-[1440px] items-center gap-6 px-4 py-3 sm:px-10">
          <form
            className="relative w-full max-w-[400px] shrink-0"
            onSubmit={handleSearchSubmit}
            role="search"
          >
            <label className="relative block">
              <span className="sr-only">Search products</span>
              <FigmaImage
                src={headerIcons.search}
                alt=""
                width={16}
                height={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 opacity-60"
              />
              <Input
                name="q"
                type="search"
                placeholder="Search products, categories, or brands..."
                className="h-11 w-full rounded-xl border-border bg-background pl-10"
              />
            </label>
          </form>

          <div
            className="flex min-w-0 flex-1 items-center gap-x-8 overflow-x-auto text-sm [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {categoryQuickLinks.map((link) => (
              <CategoryNavLink
                key={link.label}
                link={link}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
