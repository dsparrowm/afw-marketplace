"use client";

import { useState, useTransition } from "react";
import { ChevronDown } from "lucide-react";
import { saveStoreSettingsAction } from "@/lib/admin/settings-actions";
import {
  adminCurrencyOptions,
  adminTimezoneOptions,
  type AdminStoreDetails,
} from "@/lib/mocks/admin-settings";

const fieldClassName =
  "h-[37px] w-full rounded-md border border-border bg-muted/40 px-3.5 text-sm text-foreground focus-visible:bg-card focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

type StoreDetailsPanelProps = {
  initialDetails: AdminStoreDetails;
  loadError?: string | null;
};

export function StoreDetailsPanel({
  initialDetails,
  loadError = null,
}: StoreDetailsPanelProps) {
  const [form, setForm] = useState<AdminStoreDetails>(initialDetails);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(loadError);
  const [pending, startTransition] = useTransition();

  function updateField<K extends keyof AdminStoreDetails>(
    key: K,
    value: AdminStoreDetails[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
    setMessage(null);
    setError(null);
  }

  return (
    <section className="min-w-0 flex-1 rounded-xl border border-border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-foreground">Store Details</h2>

      <form
        className="mt-6 space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          setMessage(null);
          setError(null);
          startTransition(async () => {
            const result = await saveStoreSettingsAction(form);
            if (!result.ok) {
              setError(result.error);
              return;
            }
            setForm(result.details);
            setMessage("Store details saved.");
          });
        }}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Store Name">
            <input
              className={fieldClassName}
              value={form.storeName}
              onChange={(event) => updateField("storeName", event.target.value)}
              required
            />
          </Field>
          <Field
            label="Store URL"
            hint="Display only — not stored by the API yet"
          >
            <input
              className={fieldClassName}
              value={form.storeUrl}
              onChange={(event) => updateField("storeUrl", event.target.value)}
            />
          </Field>
          <Field label="Contact Email">
            <input
              type="email"
              className={fieldClassName}
              value={form.contactEmail}
              onChange={(event) =>
                updateField("contactEmail", event.target.value)
              }
              required
            />
          </Field>
          <Field label="Phone Number">
            <input
              className={fieldClassName}
              value={form.phoneNumber}
              onChange={(event) =>
                updateField("phoneNumber", event.target.value)
              }
              required
            />
          </Field>
        </div>

        <Field label="Business Address">
          <textarea
            className={`${fieldClassName} h-auto min-h-[74px] resize-y py-2`}
            value={form.businessAddress}
            onChange={(event) =>
              updateField("businessAddress", event.target.value)
            }
            rows={3}
            required
          />
        </Field>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field
            label="Store Currency"
            hint="Display only — not stored by the API yet"
          >
            <div className="relative">
              <select
                className={`${fieldClassName} appearance-none pr-10`}
                value={form.currency}
                onChange={(event) => updateField("currency", event.target.value)}
              >
                {adminCurrencyOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
            </div>
          </Field>
          <Field
            label="Store Timezone"
            hint="Display only — not stored by the API yet"
          >
            <div className="relative">
              <select
                className={`${fieldClassName} appearance-none pr-10`}
                value={form.timezone}
                onChange={(event) => updateField("timezone", event.target.value)}
              >
                {adminTimezoneOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
            </div>
          </Field>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex h-9 items-center rounded-md bg-brand-green px-6 text-sm font-medium text-brand-green-foreground transition-colors hover:bg-brand-green/90 disabled:opacity-60"
          >
            {pending ? "Saving…" : "Save Changes"}
          </button>
          {message ? (
            <p className="text-sm text-admin-status-positive" role="status">
              {message}
            </p>
          ) : null}
          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}
        </div>
      </form>
    </section>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      {children}
      {hint ? (
        <span className="block text-xs text-muted-foreground/80">{hint}</span>
      ) : null}
    </label>
  );
}
