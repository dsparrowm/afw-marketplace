"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  CloudUpload,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import {
  adminProductOrigins,
  adminShippingClasses,
  adminUnitTypes,
  adminWarehouseLocations,
  type CommercialModel,
  type ProductFormTier,
  type ProductFormValues,
} from "@/lib/mocks/admin-product-form";
import type { AdminFormCategoryOption } from "@/lib/admin/product-form-mappers";
import {
  saveProductFormAction,
  type SaveProductActionState,
} from "@/lib/admin/product-form-actions";
import { cn } from "@/lib/utils";

export type ProductFormProps = {
  mode: "add" | "edit";
  initialValues: ProductFormValues;
  categories: AdminFormCategoryOption[];
  productId?: string | null;
  variantId?: string | null;
  initialStock?: number;
  loadError?: string | null;
};

const inputClass =
  "h-10 w-full rounded-md border border-border bg-muted/40 px-3 text-sm text-foreground focus-visible:bg-card focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

const initialActionState: SaveProductActionState = {};

export function ProductForm({
  mode,
  initialValues,
  categories,
  productId = null,
  variantId = null,
  initialStock = 0,
  loadError = null,
}: ProductFormProps) {
  const [form, setForm] = useState<ProductFormValues>(initialValues);
  const [actionState, formAction, pending] = useActionState(
    saveProductFormAction,
    initialActionState,
  );

  const title = mode === "add" ? "Add Product" : "Edit Product";
  const subtitle =
    mode === "add"
      ? "Create a new premium catalog entry for the African Food Warehouse inventory."
      : "Update catalog details, pricing, and inventory for this product.";

  const selectedCategoryId =
    categories.find((category) => category.name === form.category)?.id ??
    categories[0]?.id ??
    "";

  function update<K extends keyof ProductFormValues>(
    key: K,
    value: ProductFormValues[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function updateTier(id: string, patch: Partial<ProductFormTier>) {
    update(
      "tiers",
      form.tiers.map((tier) => (tier.id === id ? { ...tier, ...patch } : tier)),
    );
  }

  function removeTier(id: string) {
    update(
      "tiers",
      form.tiers.filter((tier) => tier.id !== id),
    );
  }

  function addTier() {
    update("tiers", [
      ...form.tiers,
      {
        id: `t-${Date.now()}`,
        quantityLabel: "New tier",
        price: "0.00",
      },
    ]);
  }

  return (
    <div className="mx-auto max-w-[1180px] px-8 py-6 pb-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/admin/products" className="hover:text-foreground hover:underline">
                Products
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-foreground">{title}</li>
          </ol>
        </nav>
        <div className="flex items-center gap-2">
          <label className="relative hidden w-[240px] sm:block">
            <span className="sr-only">Search inventory</span>
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              type="search"
              placeholder="Search inventory, shipments..."
              className="h-9 w-full rounded-md border border-border bg-card pr-3 pl-9 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            />
          </label>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:bg-muted"
            aria-label="Notifications"
          >
            <Bell className="size-[18px]" />
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h1 className="text-[1.75rem] font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="mt-1 max-w-xl text-sm text-muted-foreground">{subtitle}</p>
      </div>

      {loadError ? (
        <p
          className="mt-4 rounded-md border border-admin-status-delayed bg-admin-status-delayed px-4 py-3 text-sm text-admin-status-delayed-foreground"
          role="alert"
        >
          {loadError}
        </p>
      ) : null}

      <form action={formAction} className="mt-8">
        <input type="hidden" name="mode" value={mode} />
        <input type="hidden" name="categoryId" value={selectedCategoryId} />
        <input type="hidden" name="productId" value={productId ?? ""} />
        <input type="hidden" name="variantId" value={variantId ?? ""} />
        <input type="hidden" name="initialStock" value={String(initialStock)} />
        <input type="hidden" name="values" value={JSON.stringify(form)} />

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,720px)_minmax(280px,380px)]">
          <div className="flex flex-col gap-5">
            <Section title="1. Product Images">
              <div className="flex flex-col items-center rounded-xl border border-dashed border-border bg-muted/30 px-6 py-8 text-center">
                <CloudUpload className="size-8 text-muted-foreground" aria-hidden />
                <p className="mt-3 text-sm font-medium text-foreground">
                  Drag and drop product photos here
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  PNG, JPG, or WEBP up to 8MB. Recommended 1000×1000px square.
                </p>
                <button
                  type="button"
                  className="mt-4 inline-flex h-8 items-center rounded-md bg-brand-green px-3.5 text-sm font-medium text-brand-green-foreground"
                >
                  + Add Images
                </button>
              </div>
              <div className="mt-4 flex gap-3">
                <div className="size-20 overflow-hidden rounded-lg border border-border bg-muted">
                  {form.previewImage ? (
                    <Image
                      src={form.previewImage}
                      alt=""
                      width={80}
                      height={80}
                      className="size-20 object-cover"
                    />
                  ) : null}
                </div>
                <button
                  type="button"
                  className="inline-flex size-20 items-center justify-center rounded-lg border border-dashed border-border text-muted-foreground hover:bg-muted"
                  aria-label="Add image slot"
                >
                  <Plus className="size-4" />
                </button>
              </div>
            </Section>

            <Section title="2. Product Information">
              <Field label="Product Name *">
                <input
                  className={inputClass}
                  value={form.name}
                  onChange={(event) => update("name", event.target.value)}
                  required
                />
              </Field>
              <Field label="Description *">
                <textarea
                  className={`${inputClass} h-[100px] resize-y py-2.5`}
                  value={form.description}
                  onChange={(event) => update("description", event.target.value)}
                  required
                />
              </Field>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <Field label="SKU (Stock Keeping Unit)" className="min-w-[240px] flex-1">
                  <input
                    className={inputClass}
                    value={form.sku}
                    onChange={(event) => update("sku", event.target.value)}
                    disabled={form.autoSku}
                  />
                </Field>
                <Toggle
                  checked={form.autoSku}
                  onChange={(checked) => update("autoSku", checked)}
                  label="Auto-generate SKU"
                />
              </div>
            </Section>

            <Section
              title="3. Pricing & Commercial Model"
              headerRight={
                <CommercialModelToggle
                  value={form.commercialModel}
                  onChange={(value) => update("commercialModel", value)}
                />
              }
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Retail Price ($) *">
                  <div className="relative">
                    <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
                      $
                    </span>
                    <input
                      className={`${inputClass} pl-7`}
                      value={form.retailPrice}
                      onChange={(event) =>
                        update("retailPrice", event.target.value)
                      }
                      required
                    />
                  </div>
                </Field>
                <Field label="Wholesale Base ($) *">
                  <div className="relative">
                    <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
                      $
                    </span>
                    <input
                      className={`${inputClass} pl-7`}
                      value={form.wholesaleBase}
                      onChange={(event) =>
                        update("wholesaleBase", event.target.value)
                      }
                      required
                    />
                  </div>
                </Field>
              </div>

              <div className="mt-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-foreground">
                    Wholesale Volume Discount Tiers
                  </p>
                  <button
                    type="button"
                    onClick={addTier}
                    className="text-sm font-medium text-admin-nav-active-foreground hover:underline"
                  >
                    + Add Tier
                  </button>
                </div>
                <div className="space-y-2">
                  {form.tiers.map((tier) => (
                    <div
                      key={tier.id}
                      className="flex flex-wrap items-center gap-2"
                    >
                      <input
                        className={`${inputClass} min-w-[140px] flex-1`}
                        value={tier.quantityLabel}
                        onChange={(event) =>
                          updateTier(tier.id, {
                            quantityLabel: event.target.value,
                          })
                        }
                        aria-label={`${tier.quantityLabel} quantity`}
                      />
                      <input
                        className={`${inputClass} w-[120px]`}
                        value={tier.price}
                        onChange={(event) =>
                          updateTier(tier.id, { price: event.target.value })
                        }
                        aria-label={`${tier.quantityLabel} price`}
                      />
                      <button
                        type="button"
                        onClick={() => removeTier(tier.id)}
                        className="inline-flex size-9 items-center justify-center rounded-md text-admin-status-delayed-foreground hover:bg-admin-status-delayed"
                        aria-label={`Remove ${tier.quantityLabel}`}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </Section>
          </div>

          <div className="flex flex-col gap-5">
            <Section title="4. Classification">
              <Field label="Category *">
                <select
                  className={inputClass}
                  value={form.category}
                  onChange={(event) => update("category", event.target.value)}
                  required
                >
                  {categories.length === 0 ? (
                    <option value={form.category}>{form.category}</option>
                  ) : (
                    categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))
                  )}
                </select>
              </Field>
              <Field label="Country of Origin *">
                <select
                  className={inputClass}
                  value={form.origin}
                  onChange={(event) => update("origin", event.target.value)}
                  required
                >
                  {adminProductOrigins.map((origin) => (
                    <option key={origin} value={origin}>
                      {origin}
                    </option>
                  ))}
                </select>
              </Field>
              <div className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Organic Certification
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Check if 100% certified organic
                  </p>
                </div>
                <Toggle
                  checked={form.organic}
                  onChange={(checked) => update("organic", checked)}
                  label="Organic certification"
                />
              </div>
            </Section>

            <Section title="5. Pack Size & Units">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Unit Type">
                  <select
                    className={inputClass}
                    value={form.unitType}
                    onChange={(event) => update("unitType", event.target.value)}
                  >
                    {adminUnitTypes.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Size / Weight">
                  <input
                    className={inputClass}
                    value={form.sizeWeight}
                    onChange={(event) =>
                      update("sizeWeight", event.target.value)
                    }
                  />
                </Field>
              </div>
            </Section>

            <Section title="6. Inventory Management">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Stock Qty *">
                  <input
                    className={inputClass}
                    value={form.stockQty}
                    onChange={(event) => update("stockQty", event.target.value)}
                    required
                  />
                </Field>
                <Field label="Low Stock Alert">
                  <input
                    className={inputClass}
                    value={form.lowStockAlert}
                    onChange={(event) =>
                      update("lowStockAlert", event.target.value)
                    }
                  />
                </Field>
              </div>
              <Field label="Warehouse Location">
                <select
                  className={inputClass}
                  value={form.warehouseLocation}
                  onChange={(event) =>
                    update("warehouseLocation", event.target.value)
                  }
                >
                  {adminWarehouseLocations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </Field>
            </Section>

            <Section title="7. Shipping Logistics">
              <Field label="Weight (kg)">
                <input
                  className={inputClass}
                  value={form.weightKg}
                  onChange={(event) => update("weightKg", event.target.value)}
                />
              </Field>
              <Field label="Dimensions (cm)">
                <div className="flex items-center gap-2">
                  <input
                    className={inputClass}
                    value={form.dimL}
                    onChange={(event) => update("dimL", event.target.value)}
                    aria-label="Length"
                  />
                  <span className="text-muted-foreground">×</span>
                  <input
                    className={inputClass}
                    value={form.dimW}
                    onChange={(event) => update("dimW", event.target.value)}
                    aria-label="Width"
                  />
                  <span className="text-muted-foreground">×</span>
                  <input
                    className={inputClass}
                    value={form.dimH}
                    onChange={(event) => update("dimH", event.target.value)}
                    aria-label="Height"
                  />
                </div>
              </Field>
              <Field label="Shipping Class">
                <select
                  className={inputClass}
                  value={form.shippingClass}
                  onChange={(event) =>
                    update("shippingClass", event.target.value)
                  }
                >
                  {adminShippingClasses.map((shippingClass) => (
                    <option key={shippingClass} value={shippingClass}>
                      {shippingClass}
                    </option>
                  ))}
                </select>
              </Field>
            </Section>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
          <Link
            href="/admin/products"
            className="text-sm font-medium text-foreground hover:underline"
          >
            Cancel
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            {actionState.error ? (
              <p
                className="mr-2 max-w-sm text-sm text-admin-status-delayed-foreground"
                role="alert"
              >
                {actionState.error}
              </p>
            ) : null}
            <button
              type="submit"
              name="draft"
              value="true"
              disabled={pending || !selectedCategoryId}
              className="inline-flex h-9 items-center rounded-md border border-border bg-card px-4 text-sm font-medium hover:bg-muted disabled:opacity-60"
            >
              {pending ? "Saving…" : "Save as Draft"}
            </button>
            <button
              type="submit"
              name="draft"
              value="false"
              disabled={pending || !selectedCategoryId}
              className="inline-flex h-9 items-center rounded-md bg-brand-green px-5 text-sm font-medium text-brand-green-foreground hover:bg-brand-green/90 disabled:opacity-60"
            >
              {pending ? "Saving…" : "Save Product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function Section({
  title,
  children,
  headerRight,
}: {
  title: string;
  children: React.ReactNode;
  headerRight?: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        {headerRight}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-sm text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors",
        checked ? "bg-brand-green" : "bg-muted",
      )}
    >
      <span
        className={cn(
          "inline-block size-5 translate-x-0.5 rounded-full bg-white transition-transform",
          checked && "translate-x-[22px]",
        )}
      />
    </button>
  );
}

function CommercialModelToggle({
  value,
  onChange,
}: {
  value: CommercialModel;
  onChange: (value: CommercialModel) => void;
}) {
  const options: CommercialModel[] = ["retail", "wholesale", "both"];
  return (
    <div className="inline-flex rounded-md border border-border p-0.5">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={cn(
            "rounded px-2.5 py-1 text-xs font-medium capitalize",
            value === option
              ? "bg-brand-green text-brand-green-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
