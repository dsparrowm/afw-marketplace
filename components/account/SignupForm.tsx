"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AccountTypeToggle } from "@/components/account/AccountTypeToggle";
import { BusinessDetailsFields } from "@/components/account/BusinessDetailsFields";
import {
  AuthCard,
  AuthCardHeader,
  AuthDivider,
  AuthField,
} from "@/components/account/AuthLayout";
import { AuthTabs } from "@/components/account/AuthTabs";
import { SocialAuthButtons } from "@/components/account/SocialAuthButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth/auth-context";
import { isValidEmail, isValidPassword } from "@/lib/auth/validation";
import { authContent } from "@/lib/storefront/auth-content";
import type { AccountType, OrderVolume } from "@/types/customer";
import { cn } from "@/lib/utils";

/** Signup form — Figma `28:1161` */
export function SignupForm() {
  const router = useRouter();
  const { signup } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState<AccountType>("personal");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [orderVolume, setOrderVolume] = useState<OrderVolume | "">("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [submitting, setSubmitting] = useState(false);

  const isBusiness = accountType === "business";

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const nextErrors: Record<string, string | undefined> = {};
    if (!fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!isValidEmail(email)) nextErrors.email = "Enter a valid email address.";
    if (!isValidPassword(password)) {
      nextErrors.password = "Password must be at least 8 characters.";
    }
    if (!consent) nextErrors.consent = "You must agree to the terms to continue.";

    if (isBusiness) {
      if (!businessName.trim()) nextErrors.businessName = "Business name is required.";
      if (!businessType) nextErrors.businessType = "Select a business type.";
      if (!orderVolume) nextErrors.orderVolume = "Select an expected order volume.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    const result = await signup({
      fullName,
      email,
      password,
      accountType,
      businessName: isBusiness ? businessName : undefined,
      businessType: isBusiness ? businessType : undefined,
      orderVolume: isBusiness ? orderVolume || undefined : undefined,
    });

    setSubmitting(false);

    if (!result.ok) {
      setErrors({ form: result.error });
      return;
    }

    router.push("/account/orders");
  }

  return (
    <AuthCard>
      <AuthCardHeader subtitle={authContent.brandSubtitle} />
      <AuthTabs />
      <SocialAuthButtons />
      <AuthDivider />

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <AuthField label={authContent.signup.nameLabel} htmlFor="fullName" error={errors.fullName}>
          <Input
            id="fullName"
            autoComplete="name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder={authContent.signup.namePlaceholder}
            className="h-11"
          />
        </AuthField>

        <AuthField label={authContent.signup.emailLabel} htmlFor="signup-email" error={errors.email}>
          <Input
            id="signup-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={authContent.signup.emailPlaceholder}
            className="h-11"
          />
        </AuthField>

        <AuthField label={authContent.signup.passwordLabel} htmlFor="signup-password" error={errors.password}>
          <Input
            id="signup-password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-11"
          />
        </AuthField>

        <div className="space-y-2 pt-2">
          <p className="text-sm font-medium text-foreground">
            {authContent.signup.accountTypeLabel}
          </p>
          <AccountTypeToggle
            value={accountType}
            onChange={setAccountType}
            personalLabel={authContent.signup.personal}
            businessLabel={authContent.signup.business}
          />
        </div>

        {isBusiness ? (
          <BusinessDetailsFields
            businessName={businessName}
            businessType={businessType}
            orderVolume={orderVolume}
            onBusinessNameChange={setBusinessName}
            onBusinessTypeChange={setBusinessType}
            onOrderVolumeChange={setOrderVolume}
            errors={{
              businessName: errors.businessName,
              businessType: errors.businessType,
              orderVolume: errors.orderVolume,
            }}
          />
        ) : null}

        <label className="flex items-start gap-3 pt-2">
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            className={cn(
              "mt-0.5 h-[18px] w-[18px] rounded border-border accent-brand-green",
            )}
          />
          <span className="text-sm text-foreground/85">
            I agree to the{" "}
            <Link href="/terms" className="font-medium text-brand-green hover:underline">
              Terms
            </Link>{" "}
            &{" "}
            <Link href="/privacy" className="font-medium text-brand-green hover:underline">
              Privacy Policy
            </Link>
          </span>
        </label>
        {errors.consent ? <p className="text-xs text-destructive">{errors.consent}</p> : null}

        {errors.form ? <p className="text-sm text-destructive">{errors.form}</p> : null}

        <Button
          type="submit"
          className="mt-2 h-[50px] w-full rounded-xl text-base font-semibold"
          disabled={submitting}
        >
          {isBusiness ? authContent.signup.submitBusiness : authContent.signup.submitPersonal}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {authContent.signup.bottomPrompt}{" "}
        <Link href="/login" className="font-semibold text-brand-green hover:text-brand-green/90">
          {authContent.signup.bottomLink}
        </Link>
      </p>
    </AuthCard>
  );
}
