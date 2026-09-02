"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import type { CartLine } from "@/lib/cart/cart-context";
import { useCart } from "@/lib/cart/cart-context";
import { Button } from "@/components/ui/button";
import { formatCadParts } from "@/lib/utils";

export type CartLineItemProps = {
  line: CartLine;
};

export function CartLineItem({ line }: CartLineItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const lineTotal = line.unitPrice * line.quantity;
  const unitPrice = formatCadParts(line.unitPrice);
  const totalPrice = formatCadParts(lineTotal);

  return (
    <div className="flex gap-6 border-b border-border p-8 last:border-b-0">
      <Link
        href={`/shop/${line.slug}`}
        className="flex h-32 w-32 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/30 p-4"
      >
        <Image
          src={line.imageUrl ?? "/images/products/honey-beans.png"}
          alt={line.name}
          width={96}
          height={96}
          className="h-full w-full object-contain"
        />
      </Link>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-4">
          <Link
            href={`/shop/${line.slug}`}
            className="text-lg font-semibold text-foreground hover:text-brand-green"
          >
            {line.name}
          </Link>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 shrink-0 text-muted-foreground hover:text-foreground"
            onClick={() => removeItem(line.productId, line.sizeLabel)}
            aria-label={`Remove ${line.name} from cart`}
          >
            <X className="h-4 w-4" aria-hidden />
          </Button>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {line.sizeLabel ? (
            <span className="rounded-md bg-muted px-2.5 py-0.5 font-medium text-foreground">
              {line.sizeLabel}
            </span>
          ) : null}
          {line.sizeLabel && line.origin ? (
            <span aria-hidden>•</span>
          ) : null}
          {line.origin ? (
            <span>
              <span aria-hidden>🇳🇬</span> {line.origin}
            </span>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex h-[38px] items-center rounded-lg border border-border bg-muted/30 px-3">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() =>
                updateQuantity(line.productId, line.sizeLabel, line.quantity - 1)
              }
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" aria-hidden />
            </Button>
            <span className="min-w-[40px] text-center text-base font-semibold tabular-nums">
              {line.quantity}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() =>
                updateQuantity(line.productId, line.sizeLabel, line.quantity + 1)
              }
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" aria-hidden />
            </Button>
          </div>

          <div className="text-right">
            <p className="text-xs text-muted-foreground">{unitPrice.amount} each</p>
            <p className="text-xl font-bold text-foreground">{totalPrice.amount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
