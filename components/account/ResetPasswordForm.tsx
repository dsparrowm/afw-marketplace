"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  AuthCard,
  AuthCardHeader,
  AuthField,
} from "@/components/account/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { confirmCustomerPasswordResetAction } from "@/lib/auth/customer-auth-actions";
import { isValidPassword } from "@/lib/auth/validation";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState(searchParams.get("token") ?? "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!token.trim()) {
      setError("This reset link is missing a token. Paste it below or request a new link.");
      return;
    }
    if (!isValidPassword(password)) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError(null);
    setSubmitting(true);
    const result = await confirmCustomerPasswordResetAction({
      token,
      newPassword: password,
    });
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setDone(true);
  }

  return (
    <AuthCard>
      <AuthCardHeader subtitle="Choose a new password, then sign in." />
      <h1 className="text-2xl font-bold tracking-tight text-foreground">Set a new password</h1>

      {done ? (
        <div className="mt-6 space-y-4">
          <p className="text-sm leading-6 text-foreground">
            Your password has been updated. Sign in with the new password. This step
            does not sign you in automatically.
          </p>
          <Button asChild className="h-[50px] w-full rounded-xl text-base font-semibold">
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      ) : (
        <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
          {!searchParams.get("token") ? (
            <AuthField label="Reset token" htmlFor="token">
              <Input
                id="token"
                value={token}
                onChange={(event) => setToken(event.target.value)}
                className="h-11"
                autoComplete="off"
              />
            </AuthField>
          ) : null}
          <AuthField label="New password" htmlFor="password">
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-11"
            />
          </AuthField>
          <AuthField label="Confirm password" htmlFor="confirm-password">
            <Input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="h-11"
            />
          </AuthField>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button
            type="submit"
            className="h-[50px] w-full rounded-xl text-base font-semibold"
            disabled={submitting}
          >
            {submitting ? "Updating…" : "Update password"}
          </Button>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link
          href="/forgot-password"
          className="font-semibold text-brand-green hover:text-brand-green/90"
        >
          Request a new link
        </Link>
      </p>
    </AuthCard>
  );
}
