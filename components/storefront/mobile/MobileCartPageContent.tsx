"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart/cart-context";
import { CartBulkAlerts } from "@/components/storefront/cart/CartBulkAlerts";
import { CartSummary } from "@/components/storefront/cart/CartSummary";
import { EmptyCart } from "@/components/storefront/cart/EmptyCart";
import { MobileCartLineItem } from "@/components/storefront/mobile/MobileCartLineItem";
import { Button } from "@/components/ui/button";
import {
  computeOrderSummary,
  ESTIMATED_TAX_RATE,
} from "@/lib/cart/calculations";
import { formatCadParts } from "@/lib/utils";

/** Mobile cart page — compact layout with sticky checkout bar */
export function MobileCartPageContent() {
  const { items, itemCount, isHydrated, isLive, discountTotal } = useCart();

  if (!isHydrated) {
    return (
      <div className="px-4 py-6 lg:hidden">
        <div className="h-48 rounded-2xl border border-border bg-card" />
      </div>
    );
  }

  const summary = computeOrderSummary(items, "courier");
  const liveDiscount = isLive ? discountTotal : summary.bulkDiscount;
  const discountedSubtotal = Math.max(0, summary.subtotal - liveDiscount);
  const tax = (discountedSubtotal + summary.shipping) * ESTIMATED_TAX_RATE;
  const stickyTotal = discountedSubtotal + summary.shipping + tax;
  const totalParts = formatCadParts(stickyTotal);

  return (
    <div className="lg:hidden">
      <div className="px-4 py-6 pb-28">
        <header>
          <h1 className="text-[28px] font-bold tracking-tight text-foreground">Your Cart</h1>
          {itemCount > 0 ? (
            <p className="mt-1 text-sm text-muted-foreground">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          ) : null}
        </header>

        {items.length === 0 ? (
          <div className="mt-8">
            <EmptyCart />
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              {items.map((line) => (
                <MobileCartLineItem key={`${line.productId}-${line.sizeLabel ?? ""}`} line={line} />
              ))}
            </div>

            <CartBulkAlerts items={items} />

            <CartSummary items={items} compact hideCheckoutButton />

            <Link
              href="/shop"
              className="inline-flex min-h-[44px] items-center text-sm font-semibold text-brand-green"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>

      {items.length > 0 ? (
        <div className="fixed inset-x-0 bottom-[calc(76px+env(safe-area-inset-bottom))] z-40 border-t border-border bg-background px-4 py-3 lg:hidden">
          <Button
            asChild
            className="h-12 w-full rounded-xl bg-brand-green text-base font-semibold text-brand-green-foreground"
          >
            <Link href={isLive ? "/checkout" : "/login?returnUrl=/checkout"}>
              {isLive ? "Proceed to Checkout" : "Sign in to check out"} · {totalParts.amount}
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
          </Button>
        </div>
      ) : null}
    </div>
  );
}
