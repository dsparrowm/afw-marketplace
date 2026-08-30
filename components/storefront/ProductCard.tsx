import Image from "next/image";
import Link from "next/link";
import { Heart, Leaf, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product, ProductBadgeKind } from "@/types/product";
import { cn, formatCadParts } from "@/lib/utils";

const badgeConfig: Record<
  Exclude<ProductBadgeKind, "organic">,
  { label: string; className: string }
> = {
  "best-seller": {
    label: "Best Seller",
    className:
      "bg-product-badge-best-seller text-product-badge-best-seller-foreground",
  },
  "new-arrival": {
    label: "New Arrival",
    className: "bg-product-badge-new text-product-badge-new-foreground",
  },
};

export type ProductCardProps = {
  product: Product;
  className?: string;
};

function ProductBadge({ kind }: { kind: ProductBadgeKind }) {
  if (kind === "organic") {
    return (
      <span
        className="inline-flex h-[23px] items-center gap-1.5 rounded-md bg-section-badge px-2 text-[11px] font-semibold uppercase tracking-wide text-section-badge-foreground"
      >
        <Leaf className="h-2 w-2 shrink-0" aria-hidden />
        Organic
      </span>
    );
  }

  const config = badgeConfig[kind];
  return (
    <span
      className={cn(
        "inline-flex h-[23px] items-center rounded-md px-2 text-[11px] font-semibold uppercase tracking-wide",
        config.className,
      )}
    >
      {config.label}
    </span>
  );
}

/** Homepage / catalog product card — Figma `6:3223` */
export function ProductCard({ product, className }: ProductCardProps) {
  const retail = formatCadParts(product.retailPrice);
  const bulk = formatCadParts(product.bulkPrice);
  const stockLabel =
    product.stockStatus === "low-stock"
      ? product.stockLabel ?? "Low Stock"
      : "In Stock";
  const stockIsLow = product.stockStatus === "low-stock";

  return (
    <article
      className={cn(
        "relative flex w-[240px] shrink-0 flex-col rounded-xl border border-border bg-card p-[21px] shadow-sm lg:w-full lg:shrink",
        className,
      )}
    >
      {product.badges && product.badges.length > 0 && (
        <div className="absolute left-[17px] top-[17px] z-10 flex flex-col gap-2">
          {product.badges.map((badge) => (
            <ProductBadge key={badge} kind={badge} />
          ))}
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        size="icon"
        className="absolute right-[17px] top-[17px] z-10 h-8 w-8 rounded-full border-border bg-card text-muted-foreground shadow-none"
        aria-label={`Save ${product.name}`}
      >
        <Heart className="h-4 w-4" aria-hidden />
      </Button>

      <div className="mb-6">
        <Link
          href={`/shop/${product.slug}`}
          className="block aspect-square overflow-hidden"
        >
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={198}
            height={192}
            className="h-full w-full object-contain"
          />
        </Link>
      </div>

      <div className="flex flex-1 flex-col">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          <span>{product.sizeLabel}</span>
          <span className="mx-1">•</span>
          <span>{product.origin}</span>
        </p>

        <h3 className="mt-1 text-base font-semibold leading-snug text-foreground">
          <Link href={`/shop/${product.slug}`} className="hover:text-brand-green">
            {product.name}
          </Link>
        </h3>

        <div className="mt-3 flex items-center gap-2 text-sm">
          <span
            className={cn(
              "h-2 w-2 rounded-full",
              stockIsLow ? "bg-stock-low" : "bg-stock-in",
            )}
            aria-hidden
          />
          <span
            className={cn(
              stockIsLow ? "text-stock-low" : "text-stock-in",
            )}
          >
            {stockLabel}
          </span>
        </div>

        <div className="mt-4 rounded-lg bg-muted p-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-muted-foreground">Retail Price</span>
            <p className="text-right font-semibold text-foreground">
              <span className="text-lg">{retail.amount}</span>
              <span className="ml-1 text-sm font-medium text-muted-foreground">
                {retail.currency}
              </span>
            </p>
          </div>
          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-primary">
              {product.bulkLabel}
            </span>
            <p className="text-right text-sm font-semibold text-primary">
              <span>{bulk.amount}</span>
              <span>/unit</span>
            </p>
          </div>
        </div>

        <Button
          type="button"
          className="mt-4 h-12 w-full gap-2 rounded-xl bg-brand-green text-brand-green-foreground hover:bg-brand-green/90"
        >
          <Plus className="h-4 w-4" aria-hidden />
          Add to Cart
        </Button>
      </div>
    </article>
  );
}
