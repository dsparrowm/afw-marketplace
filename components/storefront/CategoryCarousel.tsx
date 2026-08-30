"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useRef } from "react";
import { CategoryTile } from "@/components/storefront/CategoryTile";
import { Button } from "@/components/ui/button";
import {
  CATEGORY_TILE_SCROLL_STEP,
  homepageCategories,
} from "@/lib/storefront/categories";
import { cn } from "@/lib/utils";

export type CategoryCarouselProps = {
  className?: string;
};

/** Homepage shop-by-category — Figma node `2:41`, `shop-by-category.xml` */
export function CategoryCarousel({ className }: CategoryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: "prev" | "next") => {
    const el = scrollRef.current;
    if (!el) return;
    const delta =
      direction === "next" ? CATEGORY_TILE_SCROLL_STEP : -CATEGORY_TILE_SCROLL_STEP;
    el.scrollBy({ left: delta, behavior: "smooth" });
  }, []);

  return (
    <section
      className={cn("py-4 sm:py-6", className)}
      aria-labelledby="shop-by-category-heading"
      data-figma-node="2:41"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2
            id="shop-by-category-heading"
            className="text-2xl font-semibold tracking-tight text-foreground"
          >
            Shop by Category
          </h2>
          <div className="flex shrink-0 gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full"
              aria-label="Previous categories"
              onClick={() => scroll("prev")}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full"
              aria-label="Next categories"
              onClick={() => scroll("next")}
            >
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {homepageCategories.map((category) => (
            <CategoryTile key={category.slug} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
