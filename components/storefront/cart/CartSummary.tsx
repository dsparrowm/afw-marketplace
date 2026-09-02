"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Lock } from "lucide-react";
import type { CartLine } from "@/lib/cart/cart-context";
import {
  computeOrderSummary,
  shippingMethods,
  type ShippingMethodId,
} from "@/lib/cart/calculations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn, formatCad, formatCadParts } from "@/lib/utils";

export type CartSummaryProps = {
  items: CartLine[];
  compact?: boolean;
  hideCheckoutButton?: boolean;
};

export function CartSummary({ items, compact = false, hideCheckoutButton = false }: CartSummaryProps) {
  const [shippingMethodId, setShippingMethodId] = useState<ShippingMethodId>("courier");
  const [promoOpen, setPromoOpen] = useState(true);

  const summary = computeOrderSummary(items, shippingMethodId);
  const totalParts = formatCadParts(summary.total);

  return (
    <div className="space-y-4">
      <div className={cn("rounded-2xl border border-border bg-card shadow-sm", compact ? "p-4" : "p-8")}>
        <h2 className={cn("font-bold text-foreground", compact ? "text-xl" : "text-2xl")}>
          Order Summary
        </h2>

        {summary.amountToFreeShipping > 0 ? (
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                You&apos;re {formatCad(summary.amountToFreeShipping)} away from FREE SHIPPING
              </span>
              <span className="font-medium text-foreground">
                {Math.round(summary.freeShippingProgress)}%
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-brand-green transition-all"
                style={{ width: `${summary.freeShippingProgress}%` }}
              />
            </div>
          </div>
        ) : (
          <p className="mt-6 text-sm font-medium text-brand-green">
            You&apos;ve unlocked FREE SHIPPING!
          </p>
        )}

        <dl className="mt-8 space-y-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd className="font-medium text-foreground">{formatCad(summary.subtotal)}</dd>
          </div>
          {summary.bulkDiscount > 0 ? (
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Discount (Bulk)</dt>
              <dd className="font-medium text-primary">
                -{formatCad(summary.bulkDiscount)}
              </dd>
            </div>
          ) : null}
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Shipping</dt>
            <dd className="font-medium text-foreground">
              {summary.shipping === 0 ? "Free" : formatCad(summary.shipping)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Estimated Tax</dt>
            <dd className="font-medium text-foreground">{formatCad(summary.tax)}</dd>
          </div>
          <div className="flex items-end justify-between border-t border-border pt-4">
            <dt className="text-lg font-semibold text-foreground">Total</dt>
            <dd>
              <span className="text-3xl font-bold text-foreground">{totalParts.amount}</span>
              <span className="ml-1 text-base text-muted-foreground">{totalParts.currency}</span>
            </dd>
          </div>
        </dl>

        <div className="mt-8 space-y-3">
          {shippingMethods.map((method) => (
            <label
              key={method.id}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors",
                shippingMethodId === method.id
                  ? "border-brand-green bg-section-badge/30"
                  : "border-border hover:border-brand-green/40",
              )}
            >
              <input
                type="radio"
                name="shipping"
                value={method.id}
                checked={shippingMethodId === method.id}
                onChange={() => setShippingMethodId(method.id)}
                className="mt-1 accent-brand-green"
              />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-foreground">{method.label}</p>
                <p className="text-xs text-muted-foreground">{method.description}</p>
              </div>
              <span className="text-sm font-medium text-foreground">
                {method.price === 0 ? "Free" : formatCad(method.price)}
              </span>
            </label>
          ))}
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={() => setPromoOpen((open) => !open)}
            className="flex w-full items-center justify-between text-sm font-medium text-foreground"
          >
            Have a promo code?
            <ChevronDown
              className={cn("h-4 w-4 transition-transform", promoOpen && "rotate-180")}
              aria-hidden
            />
          </button>
          {promoOpen ? (
            <div className="mt-4 flex gap-2">
              <Input placeholder="Enter code" className="h-11" aria-label="Promo code" />
              <Button type="button" variant="outline" className="h-11 shrink-0 px-6">
                Apply
              </Button>
            </div>
          ) : null}
        </div>

        <Button
          asChild
          className={cn(
            "mt-8 h-[68px] w-full rounded-xl bg-brand-green text-base font-semibold text-brand-green-foreground hover:bg-brand-green/90",
            hideCheckoutButton && "hidden",
          )}
        >
          <Link href="/checkout">
            Proceed to Checkout
            <ArrowRight className="h-5 w-5" aria-hidden />
          </Link>
        </Button>
      </div>

      <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Lock className="h-4 w-4" aria-hidden />
        Secure Encrypted Checkout
      </p>
    </div>
  );
}
