import Image from "next/image";
import Link from "next/link";
import type { CartLine } from "@/lib/cart/cart-context";
import type { OrderSummary } from "@/lib/cart/calculations";
import { cn, formatCad, formatCadParts } from "@/lib/utils";

export type CheckoutOrderSummaryProps = {
  items: CartLine[];
  summary: OrderSummary;
  action?: React.ReactNode;
  footerNote?: React.ReactNode;
  compact?: boolean;
  hideActionOnMobile?: boolean;
};

export function CheckoutOrderSummary({
  items,
  summary,
  action,
  footerNote,
  compact = false,
  hideActionOnMobile = false,
}: CheckoutOrderSummaryProps) {
  const totalParts = formatCadParts(summary.total);

  return (
    <div className={cn("rounded-2xl border border-border bg-card shadow-sm", compact ? "p-4 lg:p-8" : "p-8")}>
      <div className="flex items-center justify-between gap-4">
        <h2 className={cn("font-bold text-foreground", compact ? "text-lg lg:text-xl" : "text-xl")}>
          Order Summary
        </h2>
        <Link
          href="/cart"
          className="text-sm font-semibold text-brand-green hover:text-brand-green/90"
        >
          Edit Cart
        </Link>
      </div>

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
          <dt className="text-lg font-semibold text-foreground">Total</dt>
          <dd>
            <span className="text-3xl font-bold text-foreground">{totalParts.amount}</span>
            <span className="ml-1 text-sm text-muted-foreground">{totalParts.currency}</span>
          </dd>
        </div>
      </dl>

      {action ? (
        <div className={cn("mt-8", hideActionOnMobile && "hidden lg:block")}>{action}</div>
      ) : null}

      {footerNote ? (
        <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
          {footerNote}
        </p>
      ) : null}
    </div>
  );
}
