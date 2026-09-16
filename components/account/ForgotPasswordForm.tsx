"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AuthCard,
  AuthCardHeader,
  AuthField,
} from "@/components/account/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requestCustomerPasswordResetAction } from "@/lib/auth/customer-auth-actions";
import { isValidEmail } from "@/lib/auth/validation";
import { authContent } from "@/lib/storefront/auth-content";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setError(null);
    setSubmitting(true);
    const result = await requestCustomerPasswordResetAction(email);
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setMessage(result.message);
  }

  return (
    <AuthCard>
      <AuthCardHeader subtitle={authContent.brandSubtitle} />
      <h1 className="text-2xl font-bold tracking-tight text-foreground">Reset your password</h1>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Enter the email on your account. We always show the same confirmation, whether
        or not that email is registered.
      </p>

      {message ? (
        <p className="mt-6 text-sm leading-6 text-foreground">{message}</p>
      ) : (
        <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
          <AuthField label={authContent.login.emailLabel} htmlFor="email" error={error ?? undefined}>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={authContent.login.emailPlaceholder}
              className="h-11"
            />
          </AuthField>
          <Button
            type="submit"
            className="h-[50px] w-full rounded-xl text-base font-semibold"
            disabled={submitting}
          >
            {submitting ? "Sending…" : "Send reset link"}
          </Button>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link href="/login" className="font-semibold text-brand-green hover:text-brand-green/90">
          Back to log in
        </Link>
      </p>
    </AuthCard>
  );
}
