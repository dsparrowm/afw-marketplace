"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
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

/** Login form — Figma `29:15` */
export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const nextErrors: typeof errors = {};
    if (!isValidEmail(email)) nextErrors.email = "Enter a valid email address.";
    if (!isValidPassword(password)) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    const result = await login({ email, password });
    setSubmitting(false);

    if (!result.ok) {
      setErrors({ form: result.error });
      return;
    }

    const returnUrl = searchParams.get("returnUrl");
    router.push(returnUrl && returnUrl.startsWith("/") ? returnUrl : "/account/orders");
  }

  return (
    <AuthCard>
      <AuthCardHeader subtitle={authContent.brandSubtitle} />
      <AuthTabs />
      <SocialAuthButtons />
      <AuthDivider />

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <AuthField label={authContent.login.emailLabel} htmlFor="email" error={errors.email}>
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

        <AuthField label={authContent.login.passwordLabel} htmlFor="password" error={errors.password}>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-11"
          />
        </AuthField>

        <div className="pt-1">
          <Link
            href="#"
            className="text-sm font-medium text-brand-green hover:text-brand-green/90"
            onClick={(event) => event.preventDefault()}
          >
            {authContent.login.forgotPassword}
          </Link>
        </div>

        {errors.form ? <p className="text-sm text-destructive">{errors.form}</p> : null}

        <Button
          type="submit"
          className="mt-2 h-[50px] w-full rounded-xl text-base font-semibold"
          disabled={submitting}
        >
          {authContent.login.submit}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {authContent.login.bottomPrompt}{" "}
        <Link href="/signup" className="font-semibold text-brand-green hover:text-brand-green/90">
          {authContent.login.bottomLink}
        </Link>
      </p>
    </AuthCard>
  );
}
