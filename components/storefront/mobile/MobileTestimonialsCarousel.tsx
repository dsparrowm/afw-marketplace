"use client";

import { TestimonialCard } from "@/components/storefront/TestimonialCard";
import { testimonialsContent } from "@/lib/storefront/testimonials";
import { cn } from "@/lib/utils";

export type MobileTestimonialsCarouselProps = {
  className?: string;
};

/** Single-card swipe carousel — added per design review; reuses desktop content */
export function MobileTestimonialsCarousel({
  className,
}: MobileTestimonialsCarouselProps) {
  return (
    <section
      className={cn(
        "mt-8 bg-brand-green py-12 text-brand-green-foreground",
        className,
      )}
      aria-labelledby="mobile-testimonials-heading"
    >
      <div className="px-4">
        <div className="text-center">
          <span className="inline-flex h-[26px] items-center rounded-full bg-primary px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary-foreground">
            {testimonialsContent.badge}
          </span>
          <h2
            id="mobile-testimonials-heading"
            className="mt-3 text-2xl font-bold tracking-tight"
          >
            {testimonialsContent.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-brand-green-foreground/90">
            {testimonialsContent.description}
          </p>
        </div>

        <div
          className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonialsContent.items.map((item) => (
            <div
              key={item.id}
              className="w-[calc(100%-0px)] shrink-0 snap-center"
            >
              <TestimonialCard testimonial={item} className="min-h-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
