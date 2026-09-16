"use client";

import { Plus } from "lucide-react";

export type PromotionsHeaderProps = {
  onCreate: () => void;
};

export function PromotionsHeader({ onCreate }: PromotionsHeaderProps) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-[1.75rem] font-semibold leading-tight tracking-tight text-foreground">
          Promotions
        </h1>
        <p className="mt-1 max-w-xl text-sm text-muted-foreground">
          Manage discount codes, campaign rules, bundles, and seasonal offers.
        </p>
      </div>
      <button
        type="button"
        onClick={onCreate}
        className="inline-flex h-8 items-center gap-2 rounded-md bg-brand-green px-3.5 text-sm font-medium text-brand-green-foreground transition-colors hover:bg-brand-green/90"
      >
        <Plus className="size-4" aria-hidden />
        Create Promotion
      </button>
    </header>
  );
}
