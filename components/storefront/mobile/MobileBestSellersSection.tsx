import { MobileProductCard } from "@/components/storefront/mobile/MobileProductCard";
import { mobileBestSellersContent } from "@/lib/storefront/mobile-homepage";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";

export type MobileBestSellersSectionProps = {
  className?: string;
  products?: Product[];
};

/** Best Sellers 2-up grid — Figma `2:2025` */
export function MobileBestSellersSection({
  className,
  products,
}: MobileBestSellersSectionProps) {
  const items = (products ?? mobileBestSellersContent.products).slice(0, 4);
  return (
    <section
      className={cn("px-4 pt-8", className)}
      aria-labelledby="mobile-best-sellers-heading"
      data-figma-node={mobileBestSellersContent.nodeId}
    >
      <div className="mb-6">
        <h2
          id="mobile-best-sellers-heading"
          className="text-xl font-bold tracking-tight text-foreground"
        >
          {mobileBestSellersContent.title}
        </h2>
        <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {mobileBestSellersContent.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {items.map((product) => (
          <MobileProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
