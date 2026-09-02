import Link from "next/link";
import { CategoryTile } from "@/components/storefront/CategoryTile";
import {
  homepageCategories,
  type HomepageCategory,
} from "@/lib/storefront/categories";
import { cn } from "@/lib/utils";

export type MobileCategoryGridProps = {
  className?: string;
  categories?: HomepageCategory[];
};

/** 2×3 category grid — Figma `2:1963`; six tiles per design review */
export function MobileCategoryGrid({
  className,
  categories,
}: MobileCategoryGridProps) {
  const items = (categories ?? homepageCategories).slice(0, 6);
  return (
    <section
      className={cn("px-4 pt-8", className)}
      aria-labelledby="mobile-categories-heading"
      data-figma-node="2:1963"
    >
      <div className="mb-6 flex items-center justify-between">
        <h2
          id="mobile-categories-heading"
          className="text-xl font-bold tracking-tight text-foreground"
        >
          Categories
        </h2>
        <Link
          href="/shop"
          className="text-sm font-semibold text-brand-green hover:text-brand-green/90"
        >
          See All
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {items.map((category) => (
          <CategoryTile
            key={category.slug}
            category={category}
            className="w-full shrink snap-none"
          />
        ))}
      </div>
    </section>
  );
}
