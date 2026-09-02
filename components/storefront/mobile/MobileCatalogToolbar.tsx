"use client";

import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export type MobileCatalogToolbarProps = {
  total: number;
  onOpenFilters: () => void;
};

/** Product count + filter trigger — Figma `3:2213` */
export function MobileCatalogToolbar({
  total,
  onOpenFilters,
}: MobileCatalogToolbarProps) {
  return (
    <div
      className="flex items-center justify-between px-4 pb-2 pt-4"
      data-figma-node="3:2213"
    >
      <p className="text-sm font-semibold text-foreground">{total} Products</p>
      <Button
        type="button"
        variant="outline"
        className="h-[38px] gap-2 rounded-xl px-4 text-sm font-medium"
        onClick={onOpenFilters}
      >
        <SlidersHorizontal className="h-3 w-3" aria-hidden />
        Filter &amp; Sort
      </Button>
    </div>
  );
}
