import Image from "next/image";
import Link from "next/link";
import type { CartLine } from "@/lib/cart/cart-context";
import type { OrderSummary } from "@/lib/cart/calculations";
import { Info } from "lucide-react";
import { formatCad, formatCadParts } from "@/lib/utils";

export type OrderConfirmationSummaryProps = {
  items: CartLine[];
  summary: OrderSummary;
};

/** Items + paid total sidebar — Figma `2:1842` */
export function OrderConfirmationSummary({
  items,
  summary,
}: OrderConfirmationSummaryProps) {
  const totalParts = formatCadParts(summary.total);

  return (
    <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
      <h2 className="text-xl font-bold text-foreground">Items in Order</h2>

      <ul className="mt-6 space-y-6">
        {items.map((line) => {
          const lineTotal = line.unitPrice * line.quantity;
          const meta = [line.sizeLabel, `Qty: ${line.quantity}`]
            .filter(Boolean)
            .join(" • ");

          return (
            <li key={`${line.productId}-${line.sizeLabel ?? ""}`} className="flex gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/30 p-2">
                <Image
                  src={line.imageUrl ?? "/images/products/honey-beans.png"}
                  alt=""
                  width={48}
                  height={48}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{line.name}</p>
                <p className="text-xs text-muted-foreground">{meta}</p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  {formatCad(lineTotal)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <dl className="mt-8 space-y-3 border-t border-border pt-6 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd className="font-medium text-foreground">{formatCad(summary.subtotal)}</dd>
        </div>
        {summary.bulkDiscount > 0 ? (
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Bulk Discount</dt>
            <dd className="font-medium text-primary">-{formatCad(summary.bulkDiscount)}</dd>
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
          <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Paid Total
          </dt>
          <dd className="text-right">
            <span className="text-3xl font-bold text-foreground">{totalParts.amount}</span>
            <span className="mt-0.5 block text-xs text-muted-foreground">{totalParts.currency}</span>
          </dd>
        </div>
      </dl>

      <div className="mt-8 flex gap-3 rounded-xl bg-muted/50 p-4">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" aria-hidden />
        <p className="text-sm leading-relaxed text-muted-foreground">
          Need to make changes? You can modify or cancel your order within the next 2 hours
          from your account{" "}
          <Link
            href="/account/orders"
            className="font-medium text-foreground underline underline-offset-2 hover:text-brand-green"
          >
            dashboard
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
