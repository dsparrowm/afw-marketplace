"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart/cart-context";
import { computeOrderSummary, type ShippingMethodId } from "@/lib/cart/calculations";
import { createPlacedOrder, savePlacedOrder } from "@/lib/checkout/orders";
import type { CheckoutAddress, CheckoutStep } from "@/lib/checkout/types";
import {
  validateCheckoutAddress,
  validatePaymentFields,
} from "@/lib/checkout/validation";
import { CheckoutOrderSummary } from "@/components/storefront/checkout/CheckoutOrderSummary";
import { CheckoutStepIndicator } from "@/components/storefront/checkout/CheckoutStepIndicator";
import { MobileStickyCheckoutBar } from "@/components/storefront/mobile/MobileStickyCheckoutBar";
import { DeliveryMethodSelect } from "@/components/storefront/checkout/DeliveryMethodSelect";
import {
  CheckoutGuestBanner,
  ShippingAddressForm,
} from "@/components/storefront/checkout/ShippingAddressForm";
import {
  PaymentSection,
  type PaymentFields,
} from "@/components/storefront/checkout/PaymentSection";
import { Button } from "@/components/ui/button";
import { shippingMethods } from "@/lib/cart/calculations";
import { formatCad } from "@/lib/utils";

const defaultAddress: CheckoutAddress = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  streetAddress: "",
  city: "Toronto",
  province: "Ontario",
  postalCode: "",
  country: "Canada",
};

const defaultPayment: PaymentFields = {
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
};

/** Checkout wizard — Figma `2:1527` */
export function CheckoutPageContent() {
  const router = useRouter();
  const { items, isHydrated, clearCart } = useCart();
  const [step, setStep] = useState<CheckoutStep>("delivery");
  const [shippingMethodId, setShippingMethodId] = useState<ShippingMethodId>("courier");
  const [address, setAddress] = useState<CheckoutAddress>(defaultAddress);
  const [addressErrors, setAddressErrors] = useState<
    Partial<Record<keyof CheckoutAddress, string>>
  >({});
  const [payment, setPayment] = useState<PaymentFields>(defaultPayment);
  const [paymentErrors, setPaymentErrors] = useState<
    Partial<Record<keyof PaymentFields, string>>
  >({});
  const placingOrderRef = useRef(false);

  const summary = computeOrderSummary(items, shippingMethodId);
  const shippingLabel =
    shippingMethods.find((method) => method.id === shippingMethodId)?.label ?? "Courier";

  useEffect(() => {
    if (!isHydrated) return;
    if (placingOrderRef.current) return;
    if (items.length === 0) {
      router.replace("/cart");
    }
  }, [isHydrated, items.length, router]);

  if (!isHydrated || items.length === 0) {
    return (
      <div className="mx-auto max-w-[1200px] px-4 py-6 lg:px-6 lg:py-10">
        <div className="h-96 rounded-2xl border border-border bg-card" />
      </div>
    );
  }

  function updateAddress(field: keyof CheckoutAddress, value: string) {
    setAddress((current) => ({ ...current, [field]: value }));
    setAddressErrors((current) => ({ ...current, [field]: undefined }));
  }

  function updatePayment(field: keyof PaymentFields, value: string) {
    setPayment((current) => ({ ...current, [field]: value }));
    setPaymentErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleContinueToPayment() {
    const errors = validateCheckoutAddress(address);
    if (Object.keys(errors).length > 0) {
      setAddressErrors(errors);
      return;
    }
    setStep("payment");
  }

  function handleContinueToConfirm() {
    const errors = validatePaymentFields({
      cardName: payment.cardName,
      cardNumber: payment.cardNumber.replace(/\s/g, ""),
      expiry: payment.expiry,
      cvc: payment.cvc,
    });
    if (Object.keys(errors).length > 0) {
      setPaymentErrors(errors);
      return;
    }
    setStep("confirm");
  }

  function handlePlaceOrder() {
    const cardDigits = payment.cardNumber.replace(/\s/g, "");
    const order = createPlacedOrder({
      items,
      summary,
      address,
      shippingMethodId,
      paymentMethod: "Visa",
      cardLast4: cardDigits.slice(-4),
    });
    placingOrderRef.current = true;
    savePlacedOrder(order);
    clearCart();
    router.push(`/order/${order.id}/confirmation`);
  }

  const primaryAction =
    step === "delivery"
      ? {
          label: "Continue to Payment",
          onClick: handleContinueToPayment,
        }
      : step === "payment"
        ? {
            label: "Continue to Confirm",
            onClick: handleContinueToConfirm,
          }
        : {
            label: "Place Order",
            onClick: handlePlaceOrder,
          };

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-6 pb-28 lg:px-6 lg:py-10 lg:pb-10">
      <CheckoutStepIndicator currentStep={step} />

      <div className="mt-8 grid gap-8 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start lg:gap-10">
        <div className="min-w-0">
          {step === "delivery" ? (
            <div className="space-y-8 lg:space-y-10">
              <header>
                <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
                  Where should we deliver your order?
                </h1>
                <div className="mt-4">
                  <CheckoutGuestBanner />
                </div>
              </header>
              <ShippingAddressForm
                address={address}
                errors={addressErrors}
                onChange={updateAddress}
              />
              <DeliveryMethodSelect
                value={shippingMethodId}
                onChange={setShippingMethodId}
              />
            </div>
          ) : null}

          {step === "payment" ? (
            <PaymentSection
              fields={payment}
              errors={paymentErrors}
              onChange={updatePayment}
            />
          ) : null}

          {step === "confirm" ? (
            <div className="space-y-6 lg:space-y-8">
              <header>
                <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
                  Review and confirm
                </h1>
                <p className="mt-2 text-muted-foreground">
                  Confirm your delivery details and place your order.
                </p>
              </header>
              <div className="space-y-6 rounded-2xl border border-border bg-card p-6">
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Delivery Address
                  </h2>
                  <p className="mt-2 text-foreground">
                    {address.firstName} {address.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {address.streetAddress}, {address.city}, {address.province}{" "}
                    {address.postalCode}
                  </p>
                  <p className="text-sm text-muted-foreground">{address.email}</p>
                </div>
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Delivery Method
                  </h2>
                  <p className="mt-2 text-foreground">{shippingLabel}</p>
                </div>
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Payment
                  </h2>
                  <p className="mt-2 text-foreground">
                    Credit Card ending in{" "}
                    {payment.cardNumber.replace(/\s/g, "").slice(-4) || "····"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep("delivery")}>
                    Edit Delivery
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setStep("payment")}>
                    Edit Payment
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <CheckoutOrderSummary
          items={items}
          summary={summary}
          compact
          hideActionOnMobile
          action={
            <Button
              type="button"
              onClick={primaryAction.onClick}
              className="h-[68px] w-full rounded-xl bg-brand-green text-base font-semibold text-brand-green-foreground hover:bg-brand-green/90"
            >
              {primaryAction.label}
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Button>
          }
          footerNote={
            step !== "confirm"
              ? "By proceeding, you agree to our Terms of Service and Privacy Policy. All transactions are secure and encrypted."
              : `Order total ${formatCad(summary.total)} CAD will be charged to your card.`
          }
        />
      </div>

      <MobileStickyCheckoutBar
        label={primaryAction.label}
        total={summary.total}
        onClick={primaryAction.onClick}
      />
    </div>
  );
}
