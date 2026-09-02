"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";
import { OrderStatusBadge } from "@/components/account/OrderStatusBadge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart/cart-context";
import {
  formatOrderDateLong,
  getCustomerOrderById,
} from "@/lib/mocks/customer-orders";
import type { CustomerOrder } from "@/types/account";
import { formatCad } from "@/lib/utils";

export function OrderDetailView({ orderId }: { orderId: string }) {
  const { addItem } = useCart();
  const order = getCustomerOrderById(orderId);

  if (!order) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <p className="text-sm text-muted-foreground">Order not found.</p>
        <Button asChild className="mt-4" variant="outline">
          <Link href="/account/orders">Back to Orders</Link>
        </Button>
      </div>
    );
  }

  function handleReorder(current: CustomerOrder) {
    for (const item of current.items) {
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
      <Link
        href="/account/orders"
        className="inline-flex items-center gap-2 text-sm font-medium text-brand-green hover:text-brand-green/90"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to Orders
      </Link>

      <div className="mt-8 rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-[28px] font-bold tracking-tight text-foreground">
              Order {order.orderNumber}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Placed on {formatOrderDateLong(order.date)}
              {order.estimatedDelivery
                ? ` • Estimated Delivery: ${order.estimatedDelivery}`
                : null}
            </p>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_332px]">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">Order Items</h2>
          <ul className="mt-6 space-y-6">
            {order.items.map((item) => (
              <li
                key={`${item.productId}-${item.subtitle ?? ""}`}
                className="flex items-center justify-between gap-4 border-b border-border pb-6 last:border-b-0 last:pb-0"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <Package className="h-6 w-6 text-muted-foreground" aria-hidden />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-foreground">{item.name}</p>
                    {item.subtitle ? (
                      <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                    ) : null}
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  <p className="font-semibold text-foreground">
                    {formatCad(item.unitPrice * item.quantity)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <Button
            type="button"
            className="mt-8"
            onClick={() => handleReorder(order)}
          >
            Reorder Items
          </Button>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-base font-semibold text-foreground">Delivery Address</h2>
            <div className="mt-4 space-y-1 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.province}{" "}
                {order.shippingAddress.postalCode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-base font-semibold text-foreground">Payment Summary</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-medium text-foreground">{formatCad(order.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd className="font-medium text-foreground">{formatCad(order.shipping)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Estimated Tax</dt>
                <dd className="font-medium text-foreground">{formatCad(order.tax)}</dd>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between">
                  <dt className="font-semibold text-foreground">Total</dt>
                  <dd className="text-lg font-bold text-foreground">{formatCad(order.total)}</dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
