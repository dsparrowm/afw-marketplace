"use client";

import { useMemo, useState } from "react";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";

let stripePromise: Promise<Stripe | null> | null = null;

function getStripe(publishableKey: string) {
  if (!stripePromise) {
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
}

type StripePaymentFormInnerProps = {
  onSuccess: (cardLast4?: string) => void;
  onError: (message: string) => void;
};

function StripePaymentFormInner({
  onSuccess,
  onError,
}: StripePaymentFormInnerProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    setSubmitting(false);

    if (result.error) {
      onError(result.error.message ?? "Payment could not be confirmed.");
      return;
    }

    const last4 =
      result.paymentIntent?.payment_method &&
      typeof result.paymentIntent.payment_method === "object" &&
      "card" in result.paymentIntent.payment_method
        ? (
            result.paymentIntent.payment_method as {
              card?: { last4?: string };
            }
          ).card?.last4
        : undefined;

    onSuccess(last4);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button
        type="submit"
        disabled={!stripe || submitting}
        className="h-14 w-full rounded-xl bg-brand-green text-base font-semibold text-brand-green-foreground"
      >
        {submitting ? "Confirming…" : "Pay now"}
      </Button>
    </form>
  );
}

export type StripePaymentFormProps = {
  clientSecret: string;
  publishableKey: string;
  onSuccess: (cardLast4?: string) => void;
  onError: (message: string) => void;
};

export function StripePaymentForm({
  clientSecret,
  publishableKey,
  onSuccess,
  onError,
}: StripePaymentFormProps) {
  const stripe = useMemo(() => getStripe(publishableKey), [publishableKey]);

  return (
    <Elements stripe={stripe} options={{ clientSecret }}>
      <StripePaymentFormInner onSuccess={onSuccess} onError={onError} />
    </Elements>
  );
}

export function getStripePublishableKey(): string | null {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim();
  return key || null;
}
