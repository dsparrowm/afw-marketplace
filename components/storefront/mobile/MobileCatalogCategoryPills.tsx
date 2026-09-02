"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  buildShopHref,
  mobileCatalogCategoryPills,
} from "@/lib/storefront/catalog";
import { cn } from "@/lib/utils";

/** Horizontal category pills — Figma `3:2201` */
export function MobileCatalogCategoryPills() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");
  const currentQuery = searchParams.get("q") ?? "";
  const currentSort = searchParams.get("sort") ?? undefined;

  return (
    <div
      className="flex gap-3 overflow-x-auto px-4 py-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      data-figma-node="3:2201"
    >
      {mobileCatalogCategoryPills.map((pill) => {
        const isActive =
          pill.slug === null
            ? !activeCategory && !searchParams.get("filter")
            : activeCategory === pill.slug;

        return (
          <Link
            key={pill.label}
            href={buildShopHref({
              category: pill.slug ?? undefined,
              q: currentQuery || undefined,
              sort: currentSort,
            })}
            className={cn(
              "inline-flex h-[38px] shrink-0 snap-start items-center rounded-xl px-5 text-sm font-medium shadow-sm transition-colors",
              isActive
                ? "bg-brand-green text-brand-green-foreground"
                : "border border-border bg-card text-foreground/85",
            )}
          >
            {pill.label}
          </Link>
        );
      })}
    </div>
  );
}
