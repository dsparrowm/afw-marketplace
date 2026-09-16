"use client";

import { useEffect, useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  createCustomerAddressPageAction,
  deleteCustomerAddressPageAction,
  listCustomerAddressesPageAction,
  setDefaultCustomerAddressPageAction,
  updateCustomerAddressPageAction,
} from "@/lib/account/address-actions";
import { CANADIAN_PROVINCES } from "@/lib/checkout/types";
import type { SavedAddress } from "@/types/account";
import { cn } from "@/lib/utils";

type AddressFormState = {
  fullName: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
};

const emptyForm: AddressFormState = {
  fullName: "",
  street: "",
  city: "",
  province: "Ontario",
  postalCode: "",
  country: "Canada",
  isDefault: false,
};

/** Saved addresses grid — Figma `dashboard-addresses` `29:297` */
export function AddressesManager() {
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<AddressFormState>(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const result = await listCustomerAddressesPageAction();
      if (cancelled) return;
      if (result.ok) {
        setAddresses(result.addresses);
        setError(null);
      } else {
        setAddresses([]);
        setError(result.error);
      }
      setHydrated(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  function openCreateForm() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
    setError(null);
  }

  function openEditForm(address: SavedAddress) {
    setEditingId(address.id);
    setForm({
      fullName: address.fullName,
      street: address.street,
      city: address.city,
      province: address.province,
      postalCode: address.postalCode,
      country: address.country,
      isDefault: address.isDefault,
    });
    setShowForm(true);
    setError(null);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = editingId
        ? await updateCustomerAddressPageAction({ id: editingId, ...form })
        : await createCustomerAddressPageAction(form);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setAddresses(result.addresses);
      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
    });
  }

  function handleDelete(id: string) {
    setError(null);
    startTransition(async () => {
      const result = await deleteCustomerAddressPageAction(id);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setAddresses(result.addresses);
      if (editingId === id) {
        setShowForm(false);
        setEditingId(null);
      }
    });
  }

  function handleSetDefault(id: string) {
    setError(null);
    startTransition(async () => {
      const result = await setDefaultCustomerAddressPageAction(id);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setAddresses(result.addresses);
    });
  }

  if (!hydrated) {
    return (
      <section>
        <div className="h-10 w-64 rounded-lg bg-muted" />
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="h-40 rounded-2xl border border-border bg-card" />
          <div className="h-40 rounded-2xl border border-border bg-card" />
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-[32px] font-bold tracking-tight text-foreground">
          Saved Addresses
        </h1>
        <Button
          type="button"
          className="h-[42px] rounded-xl px-5"
          onClick={openCreateForm}
          disabled={isPending}
        >
          <Plus className="mr-2 h-4 w-4" aria-hidden />
          Add New Address
        </Button>
      </div>

      {error ? (
        <p className="mt-4 text-sm text-primary" role="alert">
          {error}
        </p>
      ) : null}

      {showForm ? (
        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-foreground">
            {editingId ? "Edit Address" : "Add New Address"}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Full Name / Label">
              <Input
                value={form.fullName}
                onChange={(event) =>
                  setForm({ ...form, fullName: event.target.value })
                }
                required
                className="h-11"
              />
            </Field>
            <Field label="Street Address">
              <Input
                value={form.street}
                onChange={(event) =>
                  setForm({ ...form, street: event.target.value })
                }
                required
                className="h-11"
              />
            </Field>
            <Field label="City">
              <Input
                value={form.city}
                onChange={(event) => setForm({ ...form, city: event.target.value })}
                required
                className="h-11"
              />
            </Field>
            <Field label="Province">
              <select
                value={form.province}
                onChange={(event) =>
                  setForm({ ...form, province: event.target.value })
                }
                className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                {CANADIAN_PROVINCES.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Postal Code">
              <Input
                value={form.postalCode}
                onChange={(event) =>
                  setForm({ ...form, postalCode: event.target.value })
                }
                required
                className="h-11"
              />
            </Field>
            <Field label="Country">
              <Input
                value={form.country}
                onChange={(event) =>
                  setForm({ ...form, country: event.target.value })
                }
                required
                className="h-11"
                readOnly
              />
            </Field>
          </div>
          <label className="mt-4 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.isDefault}
              onChange={(event) =>
                setForm({ ...form, isDefault: event.target.checked })
              }
              className="h-4 w-4 accent-brand-green"
            />
            Set as default address
          </label>
          <div className="mt-6 flex gap-3">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving…" : "Save Address"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : null}

      {addresses.length === 0 && !showForm ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border bg-card p-8 text-center">
          <p className="text-base font-semibold text-foreground">
            No saved addresses yet
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Add a delivery address to speed up checkout.
          </p>
          <Button type="button" className="mt-6" onClick={openCreateForm}>
            <Plus className="mr-2 h-4 w-4" aria-hidden />
            Add New Address
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {addresses.map((address) => (
            <article
              key={address.id}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1 text-sm">
                  <p className="text-base font-semibold text-foreground">
                    {address.fullName}
                  </p>
                  <p className="text-muted-foreground">{address.street}</p>
                  <p className="text-muted-foreground">
                    {address.city}, {address.province} {address.postalCode}
                  </p>
                  <p className="text-muted-foreground">{address.country}</p>
                </div>
                {address.isDefault ? (
                  <span className="inline-flex h-6 shrink-0 items-center rounded-full bg-brand-green/15 px-2.5 text-xs font-semibold text-brand-green">
                    Default
                  </span>
                ) : null}
              </div>

              <div className="mt-6 border-t border-border pt-4">
                <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                  <button
                    type="button"
                    onClick={() => openEditForm(address)}
                    disabled={isPending}
                    className="text-brand-green hover:text-brand-green/90 disabled:opacity-50"
                  >
                    Edit Address
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(address.id)}
                    disabled={isPending}
                    className="text-destructive hover:text-destructive/90 disabled:opacity-50"
                  >
                    Delete
                  </button>
                  {!address.isDefault ? (
                    <button
                      type="button"
                      onClick={() => handleSetDefault(address.id)}
                      disabled={isPending}
                      className="text-muted-foreground hover:text-foreground disabled:opacity-50"
                    >
                      Set Default
                    </button>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block space-y-2 text-sm")}>
      <span className="font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}
