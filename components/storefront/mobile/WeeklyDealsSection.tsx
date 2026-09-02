import Image from "next/image";
import Link from "next/link";
import { weeklyDealsContent } from "@/lib/storefront/mobile-homepage";
import { cn, formatCad } from "@/lib/utils";

export type WeeklyDealsSectionProps = {
  className?: string;
};

/** Horizontal sale cards — Figma `2:1990` */
export function WeeklyDealsSection({ className }: WeeklyDealsSectionProps) {
  return (
    <section
      className={cn("mt-8 bg-promo-banner-amber py-8", className)}
      aria-labelledby="weekly-deals-heading"
      data-figma-node={weeklyDealsContent.nodeId}
    >
      <div className="px-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {weeklyDealsContent.eyebrow}
        </p>
        <h2
          id="weekly-deals-heading"
          className="mt-1 text-2xl font-bold tracking-tight text-foreground"
        >
          {weeklyDealsContent.title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {weeklyDealsContent.description}
        </p>
      </div>

      <div
        className="mt-6 flex gap-4 overflow-x-auto px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {weeklyDealsContent.products.map((product) => (
          <Link
            key={product.id}
            href={`/shop/${product.slug}`}
            className="w-[201px] shrink-0 snap-start rounded-2xl border border-border bg-card p-4 shadow-sm"
          >
            <div className="relative mb-4 aspect-square">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="201px"
                className="object-contain"
              />
              <span className="absolute left-0 top-0 rounded-md bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                {product.saveLabel}
              </span>
            </div>
            <h3 className="text-sm font-semibold leading-snug text-foreground">
              {product.name}
            </h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-lg font-bold text-foreground">
                {formatCad(product.salePrice)}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                {formatCad(product.originalPrice)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
