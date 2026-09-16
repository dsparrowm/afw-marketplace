"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { brandAssets } from "@/lib/brand/assets";
import {
  adminLoginAction,
  type AdminLoginActionState,
} from "@/lib/admin/staff-auth-actions";

const initialState: AdminLoginActionState = {};

export function AdminLoginForm() {
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") ?? "/admin";
  const [state, formAction, pending] = useActionState(
    adminLoginAction,
    initialState,
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-10">
      <div className="w-full max-w-[420px] rounded-xl border border-border bg-card p-8 shadow-sm">
        <div className="mb-8 text-center">
          <Image
            src={brandAssets.logo}
            alt="AFW African Food Warehouse"
            width={105}
            height={62}
            className="mx-auto h-[62px] w-auto object-contain"
            priority
          />
          <h1 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
            Staff sign in
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Access the AFW Marketplace admin console.
          </p>
        </div>

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="returnUrl" value={returnUrl} />

          <div>
            <label
              htmlFor="admin-email"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Email
            </label>
            <input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="username"
              required
              className="h-10 w-full rounded-md border border-border bg-muted/40 px-3 text-sm text-foreground focus-visible:bg-card focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Password
            </label>
            <input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="h-10 w-full rounded-md border border-border bg-muted/40 px-3 text-sm text-foreground focus-visible:bg-card focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            />
          </div>

          {state.error ? (
            <p className="text-sm text-admin-status-delayed-foreground" role="alert">
              {state.error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={pending}
            className="inline-flex h-10 w-full items-center justify-center rounded-md bg-brand-green text-sm font-medium text-brand-green-foreground disabled:opacity-60"
          >
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
