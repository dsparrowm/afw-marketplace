"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

/** Customer order history. The account list stays empty until a customer orders API exists. */
export function OrdersList() {
  return (
    <section>
      <h1 className="text-[32px] font-bold tracking-tight text-foreground">
        Order History
      </h1>

      <div className="mt-6 rounded-2xl border border-border bg-card p-8 shadow-sm">
        <p className="text-base font-medium text-foreground">No orders yet</p>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Orders are not listed here yet. After checkout, keep the confirmation
          page and your order number.
        </p>
        <Button asChild className="mt-5 rounded-xl">
          <Link href="/shop">Start shopping</Link>
        </Button>
      </div>
    </section>
  );
}
