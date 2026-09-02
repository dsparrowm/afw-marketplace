"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, LayoutGrid } from "lucide-react";
import { catalogSortOptions } from "@/lib/storefront/catalog";
import { cn } from "@/lib/utils";

export type CatalogToolbarProps = {
  total: number;
  categoryLabel: string | null;
};

export function CatalogToolbar({ total, categoryLabel }: CatalogToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") ?? "recommended";
  const sortLabel =
    catalogSortOptions.find((option) => option.value === currentSort)?.label ??
    "Recommended";

  function updateSort(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "recommended") params.delete("sort");
    else params.set("sort", value);
    params.delete("page");
    router.push(`/shop?${params.toString()}`);
  }

  return (
    <div
      className="flex flex-col gap-4 rounded-2xl border border-border bg-card px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="text-sm text-foreground/85">
        <span className="font-semibold text-foreground">{total} Products</span>
        {categoryLabel ? (
          <span className="text-muted-foreground"> showing in {categoryLabel}</span>
        ) : null}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Sort by:</span>
          <div className="relative">
            <select
              value={currentSort}
              onChange={(event) => updateSort(event.target.value)}
              className="appearance-none bg-transparent pr-6 font-medium text-foreground focus:outline-none"
              aria-label="Sort products"
            >
              {catalogSortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 opacity-60"
              aria-hidden
            />
          </div>
          <span className="sr-only">{sortLabel}</span>
        </div>

        <div className="flex items-center rounded-xl border border-border p-1">
          <button
            type="button"
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-green text-brand-green-foreground",
            )}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
