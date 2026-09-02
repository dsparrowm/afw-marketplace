import Image from "next/image";
import Link from "next/link";
import type { HomepageCategory } from "@/lib/storefront/categories";
import { cn } from "@/lib/utils";

export type CategoryTileProps = {
  category: HomepageCategory;
  className?: string;
};

/** Category carousel tile — Figma ~206.66×246.66 (`shop-by-category.xml`) */
export function CategoryTile({ category, className }: CategoryTileProps) {
  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className={cn(
        "group w-[206.66px] shrink-0 snap-start scroll-ml-4 first:scroll-ml-0",
        className,
      )}
    >
      <div
        className="flex aspect-square items-center justify-center rounded-2xl border border-border bg-card p-[25px] shadow-sm transition-shadow group-hover:shadow-md"
      >
        <Image
          src={category.image}
          alt=""
          width={157}
          height={157}
          className="h-auto max-h-[157px] w-full object-contain"
        />
      </div>
      <h3 className="mt-3 text-center text-sm font-medium leading-5 text-foreground sm:mt-4 sm:text-base sm:leading-6">
        {category.label}
      </h3>
    </Link>
  );
}
