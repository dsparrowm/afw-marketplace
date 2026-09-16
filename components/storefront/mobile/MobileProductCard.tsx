"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WishlistButton } from "@/components/storefront/WishlistButton";
import { useCart } from "@/lib/cart/cart-context";
import type { Product } from "@/types/product";
import { cn, formatCad } from "@/lib/utils";

export type MobileProductCardProps = {
  product: Product;
  className?: string;
  /** Catalog grid: badge on image, title + price only — Figma `3:2221` */
  variant?: "home" | "catalog";
};

/** Compact 2-up product card — Figma `2:2033` / `3:2221` */
export function MobileProductCard({
  product,
  className,
  variant = "home",
}: MobileProductCardProps) {
  const { addItem } = useCart();
  const reduceMotion = useReducedMotion();
  const isCatalog = variant === "catalog";
  const showOrganicBadge = product.badges?.includes("organic");

  return (
    <motion.article
      className={cn(
        "flex min-w-0 flex-col",
        isCatalog && "rounded-2xl border border-border bg-card p-3 shadow-sm",
        className,
      )}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.15 }}
    >
      <div className="relative">
        <Link
          href={`/shop/${product.slug}`}
          className={cn(
            "relative block aspect-square overflow-hidden",
            isCatalog
              ? "rounded-xl bg-muted/30 p-3"
              : "rounded-2xl border border-border bg-card p-4 shadow-sm",
          )}
        >
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={130}
            height={130}
            className="mx-auto h-full w-full object-contain"
          />
          {isCatalog && showOrganicBadge ? (
            <span className="absolute left-2 top-2 rounded-md border border-border bg-card px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-foreground">
              Organic
            </span>
          ) : null}
        </Link>
        <WishlistButton
          slug={product.slug}
          label={product.name}
          className={cn(
            "absolute rounded-full border-border bg-card transition-colors hover:border-brand-green/40 hover:text-brand-green",
            isCatalog ? "right-1 top-1 h-7 w-7" : "right-3 top-3 h-8 w-8",
          )}
          iconClassName="h-3.5 w-3.5 text-muted-foreground"
        />
      </div>

      <div className={cn("mt-3", isCatalog ? "px-1" : "mt-4 px-1")}>
        {!isCatalog ? (
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
            {showOrganicBadge ? "Organic" : "Authentic"}
            <span className="mx-1">•</span>
            {product.sizeLabel || product.origin}
          </p>
        ) : null}
        <h3
          className={cn(
            "font-semibold leading-snug text-foreground",
            isCatalog ? "min-h-[42px] text-sm" : "mt-1 min-h-[42px] text-sm",
          )}
        >
          <Link
            href={`/shop/${product.slug}`}
            className="hover:text-brand-green"
          >
            {product.name}
          </Link>
        </h3>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-foreground">
            {formatCad(product.retailPrice)}
          </span>
          <Button
            type="button"
            size="icon"
            className="h-11 w-11 shrink-0 rounded-xl bg-brand-green text-brand-green-foreground hover:bg-brand-green/90"
            aria-label={`Add ${product.name} to cart`}
            onClick={() =>
              void addItem({
                productId: product.id,
                slug: product.slug,
                name: product.name,
                unitPrice: product.retailPrice,
                sizeLabel: product.sizeLabel,
                imageUrl: product.imageUrl,
                origin: product.origin,
                bulkPrice: product.bulkPrice,
                bulkMinQuantity: 5,
              })
            }
          >
            <Plus className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
