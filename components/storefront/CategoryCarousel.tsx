"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useRef } from "react";
import { CategoryTile } from "@/components/storefront/CategoryTile";
import { MotionReveal } from "@/components/storefront/motion/MotionReveal";
import { Button } from "@/components/ui/button";
import {
  CATEGORY_TILE_SCROLL_STEP,
  homepageCategories,
  type HomepageCategory,
} from "@/lib/storefront/categories";
import { cn } from "@/lib/utils";

export type CategoryCarouselProps = {
  className?: string;
  categories?: HomepageCategory[];
};

/** Homepage shop-by-category — Figma node `2:41`, `shop-by-category.xml` */
export function CategoryCarousel({ className, categories }: CategoryCarouselProps) {
  const items = categories ?? homepageCategories;
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: "prev" | "next") => {
    const el = scrollRef.current;
    if (!el) return;
    const delta =
      direction === "next" ? CATEGORY_TILE_SCROLL_STEP : -CATEGORY_TILE_SCROLL_STEP;
    el.scrollBy({ left: delta, behavior: "smooth" });
  }, []);

  return (
    <MotionReveal>
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
                className="h-10 w-10 rounded-full transition-colors hover:border-brand-green/40 hover:bg-brand-green/5 hover:text-brand-green"
                aria-label="Previous categories"
                onClick={() => scroll("prev")}
              >
                <ChevronLeft className="h-4 w-4" aria-hidden />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full transition-colors hover:border-brand-green/40 hover:bg-brand-green/5 hover:text-brand-green"
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
            {items.map((category) => (
              <CategoryTile key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </section>
    </MotionReveal>
  );
}
