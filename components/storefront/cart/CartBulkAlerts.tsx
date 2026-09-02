"use client";

import Link from "next/link";
import { Tag, TrendingUp } from "lucide-react";
import type { CartLine } from "@/lib/cart/cart-context";
import {
  bulkUnitsNeeded,
  computeBulkDiscount,
  isBulkUnlocked,
} from "@/lib/cart/calculations";
import { formatCad } from "@/lib/utils";

export type CartBulkAlertsProps = {
  items: CartLine[];
};

export function CartBulkAlerts({ items }: CartBulkAlertsProps) {
  const unlocked = items.filter(isBulkUnlocked);
  const pending = items.filter(
    (line) =>
      line.bulkPrice &&
      line.bulkMinQuantity &&
      !isBulkUnlocked(line) &&
      bulkUnitsNeeded(line) > 0,
  );

  if (unlocked.length === 0 && pending.length === 0) return null;

  const totalBulkSavings = computeBulkDiscount(items);

  return (
    <div className="space-y-4">
      {unlocked.length > 0 ? (
        <div
          className="flex flex-wrap items-center gap-4 rounded-2xl border border-brand-green/30 bg-section-badge/50 px-5 py-5"
        >
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green text-brand-green-foreground"
          >
            <Tag className="h-4 w-4" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-foreground">
              Bulk price unlocked — you save {formatCad(totalBulkSavings)}!
            </p>
            <p className="text-sm text-muted-foreground">
              {unlocked
                .map((line) => `${line.name} (${line.bulkMinQuantity}+ units)`)
                .join(", ")}
            </p>
          </div>
          <span className="rounded-full border border-brand-green px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-green">
            Active
          </span>
        </div>
      ) : null}

      {pending.map((line) => {
        const needed = bulkUnitsNeeded(line);
        const savingsPerUnit = line.bulkPrice
          ? line.unitPrice - line.bulkPrice
          : 0;

        return (
          <div
            key={`${line.productId}-${line.sizeLabel ?? ""}`}
            className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card px-5 py-5"
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary"
            >
              <TrendingUp className="h-4 w-4" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-foreground">
                Buy {needed} more to unlock bulk pricing on {line.name}
              </p>
              <p className="text-sm text-muted-foreground">
                Save {formatCad(savingsPerUnit)} per unit
              </p>
            </div>
            <Link
              href={`/shop/${line.slug}`}
              className="text-sm font-semibold text-brand-green hover:text-brand-green/90"
            >
              Add More
            </Link>
          </div>
        );
      })}
    </div>
  );
}
