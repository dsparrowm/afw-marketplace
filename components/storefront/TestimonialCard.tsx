import { Star } from "lucide-react";
import type { Testimonial } from "@/lib/storefront/testimonials";
import { cn } from "@/lib/utils";

export type TestimonialCardProps = {
  testimonial: Testimonial;
  className?: string;
};

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <article
      className={cn(
        "flex h-full min-h-[276px] flex-col rounded-2xl bg-card p-8 text-card-foreground shadow-sm",
        className,
      )}
    >
      <div className="flex gap-1" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className="h-4 w-4 fill-none text-primary"
            strokeWidth={2}
            aria-hidden
          />
        ))}
      </div>

      <blockquote className="mt-4 text-sm leading-6 text-foreground">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <footer className="mt-6 flex items-center gap-3">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-testimonial-avatar text-sm font-semibold text-testimonial-avatar-foreground"
          aria-hidden
        >
          {testimonial.initial}
        </div>
        <div>
          <p className="text-sm font-semibold leading-5">{testimonial.author}</p>
          <p className="text-xs text-muted-foreground">{testimonial.location}</p>
        </div>
      </footer>
    </article>
  );
}
