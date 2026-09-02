import Link from "next/link";
import { Calendar, Check, CreditCard, Truck } from "lucide-react";
import type { PlacedOrder } from "@/lib/checkout/types";
import { shippingMethods } from "@/lib/cart/calculations";
import {
  formatEstimatedArrival,
  getShippingSubLabel,
} from "@/lib/checkout/delivery-estimate";

function SectionIcon({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-green text-brand-green-foreground"
    >
      {children}
    </div>
  );
}

export type OrderDeliveryCardProps = {
  order: PlacedOrder;
};

export function OrderDeliveryCard({ order }: OrderDeliveryCardProps) {
  const shippingLabel =
    shippingMethods.find((method) => method.id === order.shippingMethodId)?.label ??
    "Ship (Courier)";
  const shippingSubLabel = getShippingSubLabel(order.shippingMethodId);
  const estimatedArrival = formatEstimatedArrival(order.createdAt);

  return (
    <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
      <div className="flex items-center gap-3">
        <SectionIcon>
          <Truck className="h-5 w-5" aria-hidden />
        </SectionIcon>
        <h2 className="text-xl font-semibold text-foreground">Delivery Information</h2>
      </div>

      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Shipping Address
          </p>
          <p className="mt-3 text-base font-semibold text-foreground">
            {order.address.firstName} {order.address.lastName}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {order.address.streetAddress}
            <br />
            {order.address.city}, {order.address.province} {order.address.postalCode}
            <br />
            {order.address.country}
          </p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Delivery Method
          </p>
          <p className="mt-3 text-base font-semibold text-foreground">{shippingLabel}</p>
          <p className="text-sm text-muted-foreground">{shippingSubLabel}</p>
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Estimated Arrival
          </p>
          <p className="mt-2 flex items-center gap-2 font-medium text-brand-green">
            <Calendar className="h-4 w-4 shrink-0" aria-hidden />
            {estimatedArrival}
          </p>
        </div>
      </div>
    </div>
  );
}

export type OrderPaymentCardProps = {
  order: PlacedOrder;
};

export function OrderPaymentCard({ order }: OrderPaymentCardProps) {
  const cardLast4 = order.cardLast4 ?? "····";

  return (
    <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
      <div className="flex items-center gap-3">
        <SectionIcon>
          <CreditCard className="h-5 w-5" aria-hidden />
        </SectionIcon>
        <h2 className="text-xl font-semibold text-foreground">Payment Information</h2>
      </div>

      <div className="mt-8 flex items-start gap-4">
        <div
          className="flex h-11 min-w-[52px] items-center justify-center rounded-md border border-border bg-muted/30 px-2 text-xs font-bold tracking-wider text-foreground"
        >
          VISA
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Visa ending in {cardLast4}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Billing matches shipping address
          </p>
        </div>
      </div>
    </div>
  );
}

export function OrderConfirmationHero({ order }: { order: PlacedOrder }) {
  return (
    <div className="text-center">
      <div
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-hero-badge text-hero-badge-foreground shadow-sm"
      >
        <Check className="h-9 w-9" strokeWidth={2.5} aria-hidden />
      </div>
      <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground">
        Order Confirmed!
      </h1>
      <p className="mt-3 text-xl font-semibold text-brand-green">Order #{order.id}</p>
      <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
        Thank you for your order! We&apos;ve sent a confirmation email to{" "}
        {order.address.email}. We&apos;ll let you know once your items are on their way.
      </p>
    </div>
  );
}
