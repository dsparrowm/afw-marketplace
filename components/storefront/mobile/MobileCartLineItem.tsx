"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import type { CartLine } from "@/lib/cart/cart-context";
import { useCart } from "@/lib/cart/cart-context";
import { Button } from "@/components/ui/button";
import { formatCadParts } from "@/lib/utils";

export type MobileCartLineItemProps = {
  line: CartLine;
};

/** Compact cart line item for mobile viewports */
export function MobileCartLineItem({ line }: MobileCartLineItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const lineTotal = line.unitPrice * line.quantity;
  const totalPrice = formatCadParts(lineTotal);

  return (
    <div className="flex gap-4 border-b border-border p-4 last:border-b-0">
      <Link
        href={`/shop/${line.slug}`}
        className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-muted/30 p-2"
      >
        <Image
          src={line.imageUrl ?? "/images/products/honey-beans.png"}
          alt={line.name}
          width={64}
          height={64}
          className="h-full w-full object-contain"
        />
      </Link>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/shop/${line.slug}`} className="text-sm font-semibold text-foreground">
            {line.name}
          </Link>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0 text-muted-foreground"
            onClick={() => removeItem(line.productId, line.sizeLabel)}
            aria-label={`Remove ${line.name} from cart`}
          >
            <X className="h-4 w-4" aria-hidden />
          </Button>
        </div>

        {line.sizeLabel || line.origin ? (
          <p className="mt-1 text-xs text-muted-foreground">
            {[line.sizeLabel, line.origin ? `🇳🇬 ${line.origin}` : null]
              .filter(Boolean)
              .join(" • ")}
          </p>
        ) : null}

        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex h-9 items-center rounded-lg border border-border bg-muted/30 px-2">
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center text-muted-foreground"
              onClick={() =>
                updateQuantity(line.productId, line.sizeLabel, line.quantity - 1)
              }
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" aria-hidden />
            </button>
            <span className="min-w-[28px] text-center text-sm font-semibold tabular-nums">
              {line.quantity}
            </span>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center text-muted-foreground"
              onClick={() =>
                updateQuantity(line.productId, line.sizeLabel, line.quantity + 1)
              }
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" aria-hidden />
            </button>
          </div>
          <p className="text-base font-bold text-foreground">{totalPrice.amount}</p>
        </div>
      </div>
    </div>
  );
}
