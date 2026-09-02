"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  catalogFilterCategories,
  catalogOrigins,
  buildShopHref,
} from "@/lib/storefront/catalog";
import { cn } from "@/lib/utils";

export function CatalogFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategories = searchParams.get("categories")?.split(",").filter(Boolean) ?? [];
  const selectedStock = searchParams.get("stock")?.split(",").filter(Boolean) ?? [];
  const selectedOrigins = searchParams.get("origin")?.split(",").filter(Boolean) ?? [];
  const minPrice = searchParams.get("minPrice") ?? "";
  const maxPrice = searchParams.get("maxPrice") ?? "";
  const purchaseType = searchParams.get("purchase") ?? "retail";

  function toggleValue(key: string, value: string, current: string[]) {
    return current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
  }

  function applyFilters() {
    router.push(
      buildShopHref({
        category: searchParams.get("category"),
        q: searchParams.get("q"),
        sort: searchParams.get("sort"),
        filter: searchParams.get("filter"),
        categories: selectedCategories.join(",") || undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        stock: selectedStock.join(",") || undefined,
        origin: selectedOrigins.join(",") || undefined,
        purchase: purchaseType !== "retail" ? purchaseType : undefined,
      }),
    );
  }

  function updateListParam(key: string, values: string[]) {
    const params = new URLSearchParams(searchParams.toString());
    if (values.length > 0) {
      params.set(key, values.join(","));
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`/shop?${params.toString()}`);
  }

  return (
    <aside className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <FilterSection title="Categories">
        <div className="space-y-4">
          {catalogFilterCategories.map((category) => (
            <label
              key={category.slug}
              className="flex items-center gap-3 text-sm text-foreground/85"
            >
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-border accent-brand-green"
                checked={selectedCategories.includes(category.slug)}
                onChange={() =>
                  updateListParam(
                    "categories",
                    toggleValue("categories", category.slug, selectedCategories),
                  )
                }
              />
              {category.label}
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price Range" className="mt-8">
        <div className="flex items-center gap-3">
          <Input
            type="number"
            min={0}
            placeholder="$ Min"
            value={minPrice}
            onChange={(event) => {
              const params = new URLSearchParams(searchParams.toString());
              const value = event.target.value;
              if (value) params.set("minPrice", value);
              else params.delete("minPrice");
              params.delete("page");
              router.push(`/shop?${params.toString()}`);
            }}
            className="h-[38px]"
          />
          <span className="text-muted-foreground">—</span>
          <Input
            type="number"
            min={0}
            placeholder="$ Max"
            value={maxPrice}
            onChange={(event) => {
              const params = new URLSearchParams(searchParams.toString());
              const value = event.target.value;
              if (value) params.set("maxPrice", value);
              else params.delete("maxPrice");
              params.delete("page");
              router.push(`/shop?${params.toString()}`);
            }}
            className="h-[38px]"
          />
        </div>
      </FilterSection>

      <FilterSection title="Availability" className="mt-8">
        <div className="space-y-4">
          {[
            { value: "in-stock", label: "In Stock" },
            { value: "low-stock", label: "Low Stock" },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 text-sm text-foreground/85"
            >
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-border accent-brand-green"
                checked={selectedStock.includes(option.value)}
                onChange={() =>
                  updateListParam(
                    "stock",
                    toggleValue("stock", option.value, selectedStock),
                  )
                }
              />
              {option.label}
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Purchase Type" className="mt-8">
        <div className="space-y-2">
          {[
            { value: "retail", label: "Retail" },
            { value: "bulk", label: "Bulk / Wholesale" },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                if (option.value === "retail") params.delete("purchase");
                else params.set("purchase", option.value);
                params.delete("page");
                router.push(`/shop?${params.toString()}`);
              }}
              className={cn(
                "flex h-[38px] w-full items-center rounded-lg border px-4 text-sm font-medium transition-colors",
                purchaseType === option.value
                  ? "border-brand-green bg-secondary text-foreground"
                  : "border-border bg-card text-foreground/85 hover:border-brand-green/40",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Origin" className="mt-8">
        <div className="space-y-4">
          {catalogOrigins.map((origin) => (
            <label
              key={origin.slug}
              className="flex items-center gap-3 text-sm text-foreground/85"
            >
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-border accent-brand-green"
                checked={selectedOrigins.includes(origin.slug)}
                onChange={() =>
                  updateListParam(
                    "origin",
                    toggleValue("origin", origin.slug, selectedOrigins),
                  )
                }
              />
              {origin.label}
            </label>
          ))}
        </div>
      </FilterSection>

      <Button
        type="button"
        className="mt-8 h-12 w-full bg-brand-green text-brand-green-foreground hover:bg-brand-green/90"
        onClick={applyFilters}
      >
        Apply Filters
      </Button>
    </aside>
  );
}

function FilterSection({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}
