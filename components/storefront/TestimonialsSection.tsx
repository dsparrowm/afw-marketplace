"use client";

import { MotionReveal } from "@/components/storefront/motion/MotionReveal";
import { TestimonialCard } from "@/components/storefront/TestimonialCard";
import { testimonialsContent } from "@/lib/storefront/testimonials";
import { cn } from "@/lib/utils";

export type TestimonialsSectionProps = {
  className?: string;
};

/** Customer testimonials — Figma node `6:2981` */
export function TestimonialsSection({ className }: TestimonialsSectionProps) {
  return (
    <MotionReveal>
      <section
        className={cn(
          "bg-brand-green py-24 text-brand-green-foreground",
          className,
        )}
        aria-labelledby="testimonials-heading"
        data-figma-node={testimonialsContent.nodeId}
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span
              className="inline-flex h-[26px] items-center rounded-full bg-primary px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary-foreground"
            >
              {testimonialsContent.badge}
            </span>
            <h2
              id="testimonials-heading"
              className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl sm:leading-tight"
            >
              {testimonialsContent.title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-brand-green-foreground/90">
              {testimonialsContent.description}
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {testimonialsContent.items.map((item) => (
              <TestimonialCard key={item.id} testimonial={item} />
            ))}
          </div>
        </div>
      </section>
    </MotionReveal>
  );
}
