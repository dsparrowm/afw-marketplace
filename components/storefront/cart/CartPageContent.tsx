"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart/cart-context";
import { CartBreadcrumb } from "@/components/storefront/cart/CartBreadcrumb";
import { CartBulkAlerts } from "@/components/storefront/cart/CartBulkAlerts";
import { CartLineItem } from "@/components/storefront/cart/CartLineItem";
import { CartSummary } from "@/components/storefront/cart/CartSummary";
import { EmptyCart } from "@/components/storefront/cart/EmptyCart";
import { MobileCartPageContent } from "@/components/storefront/mobile/MobileCartPageContent";

/** Cart page content — Figma `2:1187` */
export function CartPageContent() {
  const { items, itemCount, isHydrated } = useCart();

  if (!isHydrated) {
    return (
      <>
        <MobileCartPageContent />
        <div className="mx-auto hidden max-w-[1440px] px-4 py-8 sm:px-10 sm:py-10 lg:block">
          <CartBreadcrumb />
          <div className="mt-8 h-64 rounded-2xl border border-border bg-card" />
        </div>
      </>
    );
  }

  return (
    <>
      <MobileCartPageContent />

      <div className="mx-auto hidden max-w-[1440px] px-4 py-8 sm:px-10 sm:py-10 lg:block">
        <CartBreadcrumb />

      <header className="mt-6 flex flex-wrap items-baseline gap-3">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Your Cart
        </h1>
        {itemCount > 0 ? (
          <span className="text-lg text-muted-foreground">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </span>
        ) : null}
      </header>

      {items.length === 0 ? (
        <div className="mt-10">
          <EmptyCart />
        </div>
      ) : (
        <>
          <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-start">
            <div className="min-w-0 flex-1 space-y-6">
              <div className="rounded-2xl border border-border bg-card shadow-sm">
                {items.map((line) => (
                  <CartLineItem key={`${line.productId}-${line.sizeLabel ?? ""}`} line={line} />
                ))}
              </div>
              <CartBulkAlerts items={items} />
              <Link
                href="/shop"
                className="inline-flex text-sm font-semibold text-brand-green hover:text-brand-green/90"
              >
                Continue Shopping
              </Link>
            </div>

            <div className="w-full shrink-0 lg:w-[450px]">
              <CartSummary items={items} />
            </div>
          </div>
        </>
      )}
      </div>
    </>
  );
}
