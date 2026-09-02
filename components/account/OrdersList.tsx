"use client";

import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { OrderStatusBadge } from "@/components/account/OrderStatusBadge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart/cart-context";
import {
  formatOrderDate,
  mockCustomerOrders,
} from "@/lib/mocks/customer-orders";
import { formatCad } from "@/lib/utils";

/** Order history cards — Figma `dashboard-orders` `29:104` */
export function OrdersList() {
  const { addItem } = useCart();

  function handleReorder(orderId: string) {
    const order = mockCustomerOrders.find((item) => item.id === orderId);
    if (!order) return;

    for (const item of order.items) {
      addItem({
        productId: item.productId,
        slug: item.slug,
        name: item.name,
        unitPrice: item.unitPrice,
        sizeLabel: item.subtitle,
        imageUrl: item.imageUrl,
        quantity: item.quantity,
      });
    }
  }

  return (
    <section>
      <h1 className="text-[32px] font-bold tracking-tight text-foreground">
        Order History
      </h1>

      <div className="mt-6 space-y-4">
        {mockCustomerOrders.map((order) => (
          <article
            key={order.id}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-xs text-muted-foreground">Order Number</p>
                  <p className="mt-1 text-base font-semibold text-foreground">
                    {order.orderNumber}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date Placed</p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {formatOrderDate(order.date)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Value</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {formatCad(order.total)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <div className="mt-1">
                    <OrderStatusBadge status={order.status} />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Button asChild variant="outline" className="h-[38px] rounded-lg px-4">
                  <Link href={`/account/orders/${order.id}`}>View Details</Link>
                </Button>
                <button
                  type="button"
                  onClick={() => handleReorder(order.id)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-green hover:text-brand-green/90"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden />
                  Reorder
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
