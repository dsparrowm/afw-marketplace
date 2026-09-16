"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";
import { useCart } from "@/lib/cart/cart-context";
import {
  computeOrderSummary,
  ESTIMATED_TAX_RATE,
  shippingMethods,
  type ShippingMethodId,
} from "@/lib/cart/calculations";
import {
  checkoutCartAction,
  createCustomerAddressAction,
  listCustomerAddressesAction,
} from "@/lib/checkout/checkout-actions";
import { fromCountryCode, fromProvinceCode } from "@/lib/checkout/province";
import {
  deliveryRequiresAddress,
  toApiDeliveryMethod,
} from "@/lib/checkout/delivery-method";
import { createPlacedOrder, savePlacedOrder } from "@/lib/checkout/orders";
import type { CheckoutAddress, CheckoutStep, PlacedOrder } from "@/lib/checkout/types";
import {
  validateCheckoutAddress,
  validatePaymentFields,
} from "@/lib/checkout/validation";
import { CheckoutOrderSummary } from "@/components/storefront/checkout/CheckoutOrderSummary";
import { CheckoutStepIndicator } from "@/components/storefront/checkout/CheckoutStepIndicator";
import { MobileStickyCheckoutBar } from "@/components/storefront/mobile/MobileStickyCheckoutBar";
import { DeliveryMethodSelect } from "@/components/storefront/checkout/DeliveryMethodSelect";
import {
  NEW_SAVED_ADDRESS,
  SavedAddressPicker,
} from "@/components/storefront/checkout/SavedAddressPicker";
import {
  CheckoutGuestBanner,
  ShippingAddressForm,
} from "@/components/storefront/checkout/ShippingAddressForm";
import {
  PaymentSection,
  type PaymentFields,
} from "@/components/storefront/checkout/PaymentSection";
import {
  getStripePublishableKey,
  StripePaymentForm,
} from "@/components/storefront/checkout/StripePaymentForm";
import { Button } from "@/components/ui/button";
import { formatCad } from "@/lib/utils";
import type { ApiPublicAddress } from "@/types/api";

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

function postalKey(value: string) {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}

function applySavedAddress(
  current: CheckoutAddress,
  saved: ApiPublicAddress,
): CheckoutAddress {
  return {
    ...current,
    streetAddress: saved.line1,
    city: saved.city,
    province: fromProvinceCode(saved.province),
    postalCode: saved.postalCode,
    country: fromCountryCode(saved.country),
  };
}

function matchingSavedAddress(
  addresses: ApiPublicAddress[],
  address: CheckoutAddress,
) {
  const line1 = address.streetAddress.trim().toLowerCase();
  const postal = postalKey(address.postalCode);
  if (!line1 || !postal) return undefined;
  return addresses.find(
    (saved) =>
      saved.line1.trim().toLowerCase() === line1 &&
      postalKey(saved.postalCode) === postal,
  );
}

type PendingStripeCheckout = {
  orderId: string;
  orderNumber: number;
  total: number;
  clientSecret: string;
  draft: PlacedOrder;
};

/** Checkout wizard — Figma `2:1527` */
export function CheckoutPageContent() {
  const router = useRouter();
  const { customer, isAuthenticated, isHydrated: authHydrated } = useAuth();
  const { items, isHydrated, isLive, clearCart, discountTotal } = useCart();
  const [step, setStep] = useState<CheckoutStep>("delivery");
  const [shippingMethodId, setShippingMethodId] =
    useState<ShippingMethodId>("courier");
  const [address, setAddress] = useState<CheckoutAddress>(defaultAddress);
  const [addressErrors, setAddressErrors] = useState<
    Partial<Record<keyof CheckoutAddress, string>>
  >({});
  const [payment, setPayment] = useState<PaymentFields>(defaultPayment);
  const [paymentErrors, setPaymentErrors] = useState<
    Partial<Record<keyof PaymentFields, string>>
  >({});
  const [placeError, setPlaceError] = useState<string | null>(null);
  const [isPlacing, setIsPlacing] = useState(false);
  const [pendingStripe, setPendingStripe] = useState<PendingStripeCheckout | null>(
    null,
  );
  const placingOrderRef = useRef(false);
  const stripeKey = getStripePublishableKey();
  const [savedAddresses, setSavedAddresses] = useState<ApiPublicAddress[]>([]);
  const [addressChoice, setAddressChoice] = useState(NEW_SAVED_ADDRESS);
  const [addressLoadError, setAddressLoadError] = useState<string | null>(null);

  const baseSummary = computeOrderSummary(items, shippingMethodId);
  const liveDiscount = isLive ? discountTotal : baseSummary.bulkDiscount;
  const discountedSubtotal = Math.max(0, baseSummary.subtotal - liveDiscount);
  const tax = (discountedSubtotal + baseSummary.shipping) * ESTIMATED_TAX_RATE;
  const summary = {
    ...baseSummary,
    bulkDiscount: liveDiscount,
    tax,
    total: discountedSubtotal + baseSummary.shipping + tax,
  };
  const shippingLabel =
    shippingMethods.find((method) => method.id === shippingMethodId)?.label ??
    "Courier";

  useEffect(() => {
    if (!authHydrated) return;
    if (!isAuthenticated) {
      router.replace("/login?returnUrl=/checkout");
    }
  }, [authHydrated, isAuthenticated, router]);

  useEffect(() => {
    if (!customer) return;
    const parts = customer.fullName.trim().split(/\s+/);
    setAddress((current) => ({
      ...current,
      firstName: current.firstName || parts[0] || "",
      lastName: current.lastName || parts.slice(1).join(" ") || "",
      email: current.email || customer.email || "",
      phone: current.phone || customer.phone || "",
    }));
  }, [customer]);

  useEffect(() => {
    if (!isAuthenticated) return;
    let cancelled = false;
    void (async () => {
      const result = await listCustomerAddressesAction();
      if (cancelled) return;
      if (!result.ok) {
        setAddressLoadError(result.error);
        setAddressChoice(NEW_SAVED_ADDRESS);
        return;
      }
      setSavedAddresses(result.addresses);
      const preferred =
        result.addresses.find((item) => item.isDefault) ?? result.addresses[0];
      if (!preferred) {
        setAddressChoice(NEW_SAVED_ADDRESS);
        return;
      }
      setAddressChoice(preferred.id);
      setAddress((current) => applySavedAddress(current, preferred));
    })();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isHydrated || !authHydrated) return;
    if (placingOrderRef.current || pendingStripe) return;
    if (!isAuthenticated) return;
    if (items.length === 0) {
      router.replace("/cart");
    }
  }, [
    isHydrated,
    authHydrated,
    isAuthenticated,
    items.length,
    router,
    pendingStripe,
  ]);

  if (!authHydrated || !isAuthenticated || !isHydrated) {
    return (
      <div className="mx-auto max-w-[1200px] px-4 py-6 lg:px-6 lg:py-10">
        <div className="h-96 rounded-2xl border border-border bg-card" />
      </div>
    );
  }

  if (items.length === 0 && !pendingStripe) {
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
    const errors = validateCheckoutAddress(address, {
      requireStreet:
        deliveryRequiresAddress(shippingMethodId) &&
        addressChoice === NEW_SAVED_ADDRESS,
    });
    if (Object.keys(errors).length > 0) {
      setAddressErrors(errors);
      return;
    }
    setPlaceError(null);
    setStep("payment");
  }

  function handleContinueToConfirm() {
    if (!isLive) {
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
    }
    setPlaceError(null);
    setStep("confirm");
  }

  function finishPlacedOrder(order: PlacedOrder) {
    placingOrderRef.current = true;
    savePlacedOrder(order);
    clearCart();
    setPendingStripe(null);
    router.push(`/order/${order.id}/confirmation`);
  }

  async function handlePlaceOrder() {
    if (isPlacing) return;
    setPlaceError(null);

    if (!isLive) {
      const cardDigits = payment.cardNumber.replace(/\s/g, "");
      const order = createPlacedOrder({
        items,
        summary,
        address,
        shippingMethodId,
        paymentMethod: "Visa",
        cardLast4: cardDigits.slice(-4),
      });
      finishPlacedOrder({ ...order, paymentStatus: "paid" });
      return;
    }

    setIsPlacing(true);

    let deliveryAddressId: string | undefined;
    if (deliveryRequiresAddress(shippingMethodId)) {
      const selected =
        addressChoice === NEW_SAVED_ADDRESS
          ? matchingSavedAddress(savedAddresses, address)
          : savedAddresses.find((item) => item.id === addressChoice);
      if (selected) {
        deliveryAddressId = selected.id;
      } else {
        const addressResult = await createCustomerAddressAction({
          label: "Delivery",
          line1: address.streetAddress,
          city: address.city,
          province: address.province,
          postalCode: address.postalCode,
          country: address.country,
          isDefault: savedAddresses.length === 0,
        });
        if (!addressResult.ok) {
          setPlaceError(addressResult.error);
          setIsPlacing(false);
          return;
        }
        deliveryAddressId = addressResult.address.id;
      }
    }

    const checkoutResult = await checkoutCartAction({
      deliveryMethod: toApiDeliveryMethod(shippingMethodId),
      deliveryAddressId,
    });

    if (!checkoutResult.ok) {
      setPlaceError(checkoutResult.error);
      setIsPlacing(false);
      return;
    }

    const draft: PlacedOrder = {
      id: checkoutResult.orderId,
      orderNumber: checkoutResult.orderNumber,
      createdAt: new Date().toISOString(),
      items,
      summary: {
        ...summary,
        total: checkoutResult.total || summary.total,
      },
      shippingMethodId,
      address,
      paymentMethod: "Payment pending",
      paymentStatus: "pending",
    };

    if (checkoutResult.clientSecret && stripeKey) {
      setPendingStripe({
        orderId: checkoutResult.orderId,
        orderNumber: checkoutResult.orderNumber,
        total: checkoutResult.total,
        clientSecret: checkoutResult.clientSecret,
        draft,
      });
      clearCart();
      setStep("payment");
      setIsPlacing(false);
      return;
    }

    finishPlacedOrder(draft);
    setIsPlacing(false);
  }

  const primaryAction =
    pendingStripe
      ? null
      : step === "delivery"
        ? {
            label: "Continue to Payment",
            onClick: handleContinueToPayment,
            disabled: false,
          }
        : step === "payment"
          ? {
              label: "Continue to Confirm",
              onClick: handleContinueToConfirm,
              disabled: false,
            }
          : {
              label: isPlacing ? "Placing…" : "Place Order",
              onClick: () => {
                void handlePlaceOrder();
              },
              disabled: isPlacing,
            };

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-6 pb-28 lg:px-6 lg:py-10 lg:pb-10">
      <CheckoutStepIndicator currentStep={step} />

      <div className="mt-8 grid gap-8 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start lg:gap-10">
        <div className="min-w-0">
          {step === "delivery" && !pendingStripe ? (
            <div className="space-y-8 lg:space-y-10">
              <header>
                <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
                  Where should we deliver your order?
                </h1>
                <div className="mt-4">
              <CheckoutGuestBanner signedIn />
              </div>
              </header>
              {deliveryRequiresAddress(shippingMethodId) ? (
                <SavedAddressPicker
                  addresses={savedAddresses}
                  value={addressChoice}
                  error={addressLoadError}
                  onChange={(choice) => {
                    setAddressChoice(choice);
                    const selected = savedAddresses.find((item) => item.id === choice);
                    if (selected) {
                      setAddress((current) => applySavedAddress(current, selected));
                      setAddressErrors({});
                    }
                  }}
                />
              ) : null}
              <ShippingAddressForm
                address={address}
                errors={addressErrors}
                onChange={updateAddress}
                requireStreet={
                  deliveryRequiresAddress(shippingMethodId) &&
                  addressChoice === NEW_SAVED_ADDRESS
                }
              />
              <DeliveryMethodSelect
                value={shippingMethodId}
                onChange={setShippingMethodId}
              />
            </div>
          ) : null}

          {step === "payment" ? (
            pendingStripe && stripeKey ? (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Complete payment
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Order #{pendingStripe.orderNumber} ·{" "}
                    {formatCad(pendingStripe.total)}
                  </p>
                </div>
                {placeError ? (
                  <p className="text-sm text-primary">{placeError}</p>
                ) : null}
                <StripePaymentForm
                  clientSecret={pendingStripe.clientSecret}
                  publishableKey={stripeKey}
                  onSuccess={(cardLast4) => {
                    finishPlacedOrder({
                      ...pendingStripe.draft,
                      paymentMethod: "Card",
                      cardLast4,
                      paymentStatus: "paid",
                    });
                  }}
                  onError={(message) => setPlaceError(message)}
                />
              </div>
            ) : (
              <PaymentSection
                fields={payment}
                errors={paymentErrors}
                onChange={updatePayment}
                mode={isLive ? "deferred" : "card"}
              />
            )
          ) : null}

          {step === "confirm" && !pendingStripe ? (
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
                  {deliveryRequiresAddress(shippingMethodId) ? (
                    <p className="text-sm text-muted-foreground">
                      {address.streetAddress}, {address.city}, {address.province}{" "}
                      {address.postalCode}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">Store pickup</p>
                  )}
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
                    {isLive
                      ? "Secure checkout — card entry appears if Stripe returns a payment intent"
                      : `Credit Card ending in ${
                          payment.cardNumber.replace(/\s/g, "").slice(-4) || "····"
                        }`}
                  </p>
                </div>
                {placeError ? (
                  <p className="text-sm text-primary">{placeError}</p>
                ) : null}
                <div className="flex flex-wrap gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep("delivery")}
                    disabled={isPlacing}
                  >
                    Edit Delivery
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep("payment")}
                    disabled={isPlacing}
                  >
                    Edit Payment
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <CheckoutOrderSummary
          items={items.length > 0 ? items : pendingStripe?.draft.items ?? []}
          summary={
            items.length > 0
              ? summary
              : pendingStripe?.draft.summary ?? summary
          }
          compact
          hideActionOnMobile
          action={
            primaryAction ? (
              <Button
                type="button"
                onClick={primaryAction.onClick}
                disabled={primaryAction.disabled}
                className="h-[68px] w-full rounded-xl bg-brand-green text-base font-semibold text-brand-green-foreground hover:bg-brand-green/90"
              >
                {primaryAction.label}
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Button>
            ) : null
          }
          footerNote={
            step !== "confirm" ? (
              <>
                By proceeding, you agree to our{" "}
                <Link href="/terms" className="font-medium text-brand-green hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="font-medium text-brand-green hover:underline">
                  Privacy Policy
                </Link>
                . A signed-in account is required to place an order.
              </>
            ) : (
              `Order total ${formatCad(
                pendingStripe?.total ?? summary.total,
              )} CAD will be charged when payment is confirmed.`
            )
          }
        />
      </div>

      {primaryAction ? (
        <MobileStickyCheckoutBar
          label={primaryAction.label}
          total={summary.total}
          onClick={primaryAction.onClick}
          disabled={primaryAction.disabled}
        />
      ) : null}
    </div>
  );
}
