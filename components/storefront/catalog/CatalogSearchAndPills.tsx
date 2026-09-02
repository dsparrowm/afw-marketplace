"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FigmaImage } from "@/components/storefront/FigmaImage";
import { Input } from "@/components/ui/input";
import { headerIcons } from "@/lib/brand/assets";
import { catalogCategoryPills, buildShopHref } from "@/lib/storefront/catalog";
import { cn } from "@/lib/utils";

export function CatalogSearchAndPills() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");
  const currentQuery = searchParams.get("q") ?? "";

  function updateQuery(next: Record<string, string | undefined>) {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(next)) {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }

    params.delete("page");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <div className="space-y-6">
      <label className="relative block">
        <span className="sr-only">Search catalog</span>
        <FigmaImage
          src={headerIcons.search}
          alt=""
          width={18}
          height={18}
          className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 opacity-60"
        />
        <Input
          type="search"
          value={currentQuery}
          placeholder="Search African foods, ingredients and more..."
          className="h-[62px] rounded-xl border-border bg-muted pl-14 text-base"
          onChange={(event) => updateQuery({ q: event.target.value || undefined })}
        />
      </label>

      <div className="flex flex-wrap gap-3">
        {catalogCategoryPills.map((pill) => {
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
                sort: searchParams.get("sort") ?? undefined,
              })}
              className={cn(
                "inline-flex h-[42px] items-center rounded-xl border px-6 text-sm font-medium transition-colors",
                isActive
                  ? "border-brand-green bg-brand-green text-brand-green-foreground"
                  : "border-border bg-card text-foreground/85 hover:border-brand-green/40 hover:text-brand-green",
              )}
            >
              {pill.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
