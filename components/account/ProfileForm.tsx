"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth/auth-context";

const accountManager = {
  name: "Tunde Alabi",
  email: "tunde.a@africanfoodwarehouse.ca",
  phone: "+1 (800) 555-0150 ext. 204",
};

/** Profile settings — Figma `dashboard-profile` `29:453` */
export function ProfileForm() {
  const { customer, updateProfile } = useAuth();
  const [fullName, setFullName] = useState(customer?.fullName ?? "");
  const [email, setEmail] = useState(customer?.email ?? "");
  const [phone, setPhone] = useState(customer?.phone ?? "");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!customer) return;
    setFullName(customer.fullName);
    setEmail(customer.email);
    setPhone(customer.phone ?? "");
  }, [customer]);

  if (!customer) return null;

  const isBusiness = customer.accountType === "business";

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    updateProfile({ fullName, email, phone });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  }

  return (
    <section>
      <h1 className="text-[32px] font-bold tracking-tight text-foreground">
        My Profile
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">Personal Information</h2>

          <div className="mt-6 space-y-5">
            <Field label="Full Name">
              <Input
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className="h-11"
                required
              />
            </Field>

            <Field
              label={
                <span className="flex items-center gap-2">
                  Email Address
                  {customer.emailVerified ? (
                    <span className="rounded-full bg-brand-green/15 px-2 py-0.5 text-[11px] font-semibold text-brand-green">
                      Verified
                    </span>
                  ) : null}
                </span>
              }
            >
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-11"
                required
              />
            </Field>

            <Field label="Phone Number">
              <Input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="h-11"
              />
            </Field>

            <Field label="Password">
              <div className="relative">
                <Input value="••••••••••••" disabled className="h-11 pr-24" />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-brand-green"
                  onClick={(event) => event.preventDefault()}
                >
                  Change
                </button>
              </div>
            </Field>
          </div>
        </div>

        {isBusiness ? (
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-semibold text-foreground">
                Wholesale Business Info
              </h2>
              {customer.businessApproved ? (
                <span className="inline-flex h-6 items-center rounded-full bg-brand-green/15 px-2.5 text-xs font-semibold text-brand-green">
                  Approved
                </span>
              ) : (
                <span className="inline-flex h-6 items-center rounded-full bg-amber-100 px-2.5 text-xs font-semibold text-amber-900">
                  Pending
                </span>
              )}
            </div>

            <dl className="mt-6 space-y-5 text-sm">
              <div>
                <dt className="text-muted-foreground">Business Name</dt>
                <dd className="mt-1 font-medium text-foreground">
                  {customer.businessName ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Business Type</dt>
                <dd className="mt-1 font-medium text-foreground">
                  {customer.businessType ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Business Registration / Tax ID</dt>
                <dd className="mt-1 font-medium text-foreground">
                  {customer.taxId ?? "—"}
                </dd>
              </div>
            </dl>

            <div className="mt-6 rounded-xl bg-muted/60 p-4">
              <p className="text-sm font-medium text-foreground">
                Your Dedicated Account Manager
              </p>
              <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">{accountManager.name}</p>
                <p>{accountManager.email}</p>
                <p>{accountManager.phone}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-8">
            <h2 className="text-lg font-semibold text-foreground">Wholesale Business Info</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              You have a personal account. Apply for a business account during signup to
              unlock wholesale pricing and a dedicated account manager.
            </p>
          </div>
        )}
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" className="h-12 rounded-xl px-8">
            Save Changes
          </Button>
          {saved ? (
            <p className="text-sm font-medium text-brand-green">Profile saved.</p>
          ) : (
            <span aria-hidden className="hidden sm:block" />
          )}
          <button
            type="button"
            className="text-sm font-medium text-destructive hover:text-destructive/90 sm:ml-auto"
            onClick={(event) => event.preventDefault()}
          >
            Delete Account
          </button>
        </div>
      </form>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2 text-sm">
      <span className="font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}
