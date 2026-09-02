import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { freshArrivalsContent } from "@/lib/storefront/mobile-homepage";
import { cn } from "@/lib/utils";

export type FreshArrivalsAlertProps = {
  className?: string;
};

/** Peach urgency card below hero — Figma `2:1949` */
export function FreshArrivalsAlert({ className }: FreshArrivalsAlertProps) {
  return (
    <section
      className={cn("px-4 pt-4", className)}
      aria-labelledby="fresh-arrivals-heading"
      data-figma-node={freshArrivalsContent.nodeId}
    >
      <div className="rounded-2xl border border-border bg-promo-banner-orange p-5">
        <div className="flex gap-4">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary"
            aria-hidden
          >
            <Zap className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h2
              id="fresh-arrivals-heading"
              className="text-base font-semibold text-foreground"
            >
              {freshArrivalsContent.title}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {freshArrivalsContent.description}
            </p>
          </div>
        </div>
        <Link
          href={freshArrivalsContent.ctaHref}
          className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-primary"
        >
          {freshArrivalsContent.ctaLabel}
          <ArrowRight className="h-3 w-3" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
