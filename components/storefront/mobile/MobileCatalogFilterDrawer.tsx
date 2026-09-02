"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { useEffect } from "react";
import { CatalogFilters } from "@/components/storefront/catalog/CatalogFilters";
import { Button } from "@/components/ui/button";
import { catalogSortOptions } from "@/lib/storefront/catalog";
import { cn } from "@/lib/utils";

export type MobileCatalogFilterDrawerProps = {
  open: boolean;
  onClose: () => void;
};

/** Full-screen filter + sort drawer for mobile catalog */
export function MobileCatalogFilterDrawer({
  open,
  onClose,
}: MobileCatalogFilterDrawerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") ?? "recommended";

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open) return null;

  function updateSort(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "recommended") params.delete("sort");
    else params.set("sort", value);
    params.delete("page");
    router.push(`/shop?${params.toString()}`);
  }

  return (
    <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close filters"
        onClick={onClose}
      />
      <div className="absolute inset-x-0 bottom-0 top-12 flex flex-col rounded-t-3xl bg-background shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <h2 className="text-lg font-semibold text-foreground">Filter &amp; Sort</h2>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            aria-label="Close"
            onClick={onClose}
          >
            <X className="h-5 w-5" aria-hidden />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="mb-6">
            <h3 className="text-base font-semibold text-foreground">Sort by</h3>
            <div className="mt-3 flex flex-col gap-2">
              {catalogSortOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => updateSort(option.value)}
                  className={cn(
                    "flex min-h-[44px] items-center rounded-xl border px-4 text-left text-sm font-medium transition-colors",
                    currentSort === option.value
                      ? "border-brand-green bg-secondary text-foreground"
                      : "border-border bg-card text-foreground/85",
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <CatalogFilters />
        </div>

        <div className="border-t border-border p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <Button
            type="button"
            className="h-12 w-full bg-brand-green text-brand-green-foreground hover:bg-brand-green/90"
            onClick={onClose}
          >
            View Results
          </Button>
        </div>
      </div>
    </div>
  );
}
