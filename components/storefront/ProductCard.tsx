"use client";

import Image from "next/image";
import Link from "next/link";
import { Leaf, Plus } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WishlistButton } from "@/components/storefront/WishlistButton";
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
  const reduceMotion = useReducedMotion();
  const retail = formatCadParts(product.retailPrice);
  const bulk = formatCadParts(product.bulkPrice);
  const stockLabel =
    product.stockStatus === "low-stock"
      ? product.stockLabel ?? "Low Stock"
      : "In Stock";
  const stockIsLow = product.stockStatus === "low-stock";

  return (
    <motion.article
      className={cn(
        "group relative flex w-[240px] shrink-0 flex-col rounded-xl border border-border bg-card p-[21px] shadow-sm lg:w-full lg:shrink",
        className,
      )}
      initial="rest"
      whileHover={reduceMotion ? undefined : "hover"}
      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
      variants={{
        rest: {
          y: 0,
          boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
          borderColor: "var(--color-border)",
        },
        hover: {
          y: -4,
          boxShadow:
            "0 12px 28px -12px rgb(0 0 0 / 0.18), 0 4px 10px -4px rgb(0 0 0 / 0.08)",
          borderColor:
            "color-mix(in oklab, var(--brand-green) 30%, var(--color-border))",
        },
      }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {product.badges && product.badges.length > 0 && (
        <div className="absolute left-[17px] top-[17px] z-10 flex flex-col gap-2">
          {product.badges.map((badge) => (
            <ProductBadge key={badge} kind={badge} />
          ))}
        </div>
      )}

      <WishlistButton
        slug={product.slug}
        label={product.name}
        className="absolute right-[17px] top-[17px] z-10 h-8 w-8 rounded-full border-border bg-card text-muted-foreground shadow-none transition-colors hover:border-brand-green/40 hover:bg-brand-green/5 hover:text-brand-green"
        iconClassName="h-4 w-4"
      />

      <div className="mb-6 overflow-hidden">
        <Link
          href={`/shop/${product.slug}`}
          className="block aspect-square overflow-hidden"
        >
          <motion.div
            className="h-full w-full"
            variants={{
              rest: { scale: 1 },
              hover: { scale: reduceMotion ? 1 : 1.05 },
            }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={198}
              height={192}
              className="h-full w-full object-contain"
            />
          </motion.div>
        </Link>
      </div>

      <div className="flex flex-1 flex-col">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          <span>{product.sizeLabel}</span>
          <span className="mx-1">•</span>
          <span>{product.origin}</span>
        </p>

        <h3 className="mt-1 text-base font-semibold leading-snug text-foreground">
          <Link href={`/shop/${product.slug}`} className="transition-colors hover:text-brand-green">
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

        <motion.div
          className="mt-4"
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        >
          <Button
            type="button"
            className="h-12 w-full gap-2 rounded-xl bg-brand-green text-brand-green-foreground hover:bg-brand-green/90"
          >
            <Plus className="h-4 w-4" aria-hidden />
            Add to Cart
          </Button>
        </motion.div>
      </div>
    </motion.article>
  );
}
