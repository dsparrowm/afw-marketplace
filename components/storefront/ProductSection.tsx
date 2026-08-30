import Link from "next/link";
import { ProductCard } from "@/components/storefront/ProductCard";
import { Button } from "@/components/ui/button";
import type { HomepageProductSectionConfig } from "@/lib/storefront/homepage-products";
import { cn } from "@/lib/utils";

export type ProductSectionProps = {
  section: HomepageProductSectionConfig;
  className?: string;
  /** Light panel behind section — Figma `7:3710` behind trending row */
  panelBackground?: boolean;
};

/** Reusable homepage product row — header + five-card grid per Figma `6:3169` pattern */
export function ProductSection({
  section,
  className,
  panelBackground = false,
}: ProductSectionProps) {
  const headingId = `${section.slug}-heading`;

  return (
    <section
      className={cn(
        "py-10",
        panelBackground && "bg-trending-panel",
        className,
      )}
      aria-labelledby={headingId}
      data-figma-node={section.nodeId}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-10">
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            {section.badge && (
              <span
                className="mb-3 inline-flex h-[26px] items-center rounded-full bg-section-badge px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-section-badge-foreground"
              >
                {section.badge}
              </span>
            )}
            <h2
              id={headingId}
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl sm:leading-tight"
            >
              {section.title}
            </h2>
            {section.description && (
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {section.description}
              </p>
            )}
          </div>

          <Button
            asChild
            variant="outline"
            className="h-[42px] shrink-0 self-start rounded-xl px-6 sm:self-end"
          >
            <Link href={section.viewAllHref}>{section.viewAllLabel}</Link>
          </Button>
        </div>

        <div className="hidden gap-6 lg:grid lg:grid-cols-5">
          {section.products.map((product, index) => (
            <ProductCard key={`${product.id}-${index}`} product={product} />
          ))}
        </div>

        <div
          className="flex gap-6 overflow-x-auto pb-2 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {section.products.map((product, index) => (
            <ProductCard key={`${product.id}-${index}`} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
