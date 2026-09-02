"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import type { PlacedOrder } from "@/lib/checkout/types";
import { getPlacedOrder } from "@/lib/checkout/orders";
import {
  OrderConfirmationHero,
  OrderDeliveryCard,
  OrderPaymentCard,
} from "@/components/storefront/order/OrderConfirmationSections";
import { OrderConfirmationSummary } from "@/components/storefront/order/OrderConfirmationSummary";
import { OrderStatusTimeline } from "@/components/storefront/order/OrderStatusTimeline";
import { Button } from "@/components/ui/button";

export type OrderConfirmationPageProps = {
  orderId: string;
};

/** Order confirmation main content — Figma `2:1748` */
export function OrderConfirmationPage({ orderId }: OrderConfirmationPageProps) {
  const router = useRouter();
  const [order, setOrder] = useState<PlacedOrder | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const placed = getPlacedOrder(orderId);
    setOrder(placed);
    setReady(true);
    if (!placed) {
      router.replace("/shop");
    }
  }, [orderId, router]);

  if (!ready || !order) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-10 sm:py-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="h-64 rounded-2xl border border-border bg-card" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-10 sm:py-10">
      <div className="mx-auto max-w-[1200px]">
        <OrderConfirmationHero order={order} />

        <div className="mt-8 lg:mt-12">
          <OrderStatusTimeline />
        </div>

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(0,704px)_400px] lg:justify-between lg:gap-10">
          <div className="space-y-6">
            <OrderDeliveryCard order={order} />
            <OrderPaymentCard order={order} />
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              <Button
                asChild
                className="h-14 rounded-2xl bg-brand-green text-base font-semibold text-brand-green-foreground hover:bg-brand-green/90 lg:h-[72px]"
              >
                <Link href={`/account/orders/${order.id}`}>
                  <MapPin className="h-5 w-5" aria-hidden />
                  Track My Order
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-14 rounded-2xl border-border bg-card text-base font-semibold text-foreground hover:bg-muted/50 lg:h-[72px]"
              >
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>

          <OrderConfirmationSummary items={order.items} summary={order.summary} />
        </div>
      </div>
    </div>
  );
}
