"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  deleteAddress,
  getSavedAddresses,
  saveAddress,
  setDefaultAddress,
} from "@/lib/account/addresses";
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

  useEffect(() => {
    setAddresses(getSavedAddresses());
  }, []);

  function openCreateForm() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
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
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const updated = saveAddress({
      id: editingId ?? undefined,
      ...form,
    });
    setAddresses(updated);
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  function handleDelete(id: string) {
    const updated = deleteAddress(id);
    setAddresses(updated);
    if (editingId === id) {
      setShowForm(false);
      setEditingId(null);
    }
  }

  function handleSetDefault(id: string) {
    setAddresses(setDefaultAddress(id));
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
        >
          <Plus className="mr-2 h-4 w-4" aria-hidden />
          Add New Address
        </Button>
      </div>

      {showForm ? (
        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-foreground">
            {editingId ? "Edit Address" : "Add New Address"}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Full Name">
              <Input
                value={form.fullName}
                onChange={(event) => setForm({ ...form, fullName: event.target.value })}
                required
                className="h-11"
              />
            </Field>
            <Field label="Street Address">
              <Input
                value={form.street}
                onChange={(event) => setForm({ ...form, street: event.target.value })}
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
                onChange={(event) => setForm({ ...form, province: event.target.value })}
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
                onChange={(event) => setForm({ ...form, postalCode: event.target.value })}
                required
                className="h-11"
              />
            </Field>
            <Field label="Country">
              <Input
                value={form.country}
                onChange={(event) => setForm({ ...form, country: event.target.value })}
                required
                className="h-11"
              />
            </Field>
          </div>
          <label className="mt-4 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.isDefault}
              onChange={(event) => setForm({ ...form, isDefault: event.target.checked })}
              className="h-4 w-4 accent-brand-green"
            />
            Set as default address
          </label>
          <div className="mt-6 flex gap-3">
            <Button type="submit">Save Address</Button>
            <Button
              type="button"
              variant="outline"
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

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {addresses.map((address) => (
          <article
            key={address.id}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1 text-sm">
                <p className="text-base font-semibold text-foreground">{address.fullName}</p>
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
                  className="text-brand-green hover:text-brand-green/90"
                >
                  Edit Address
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(address.id)}
                  className="text-destructive hover:text-destructive/90"
                >
                  Delete
                </button>
                {!address.isDefault ? (
                  <button
                    type="button"
                    onClick={() => handleSetDefault(address.id)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Set Default
                  </button>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
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
