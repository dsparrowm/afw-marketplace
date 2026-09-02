"use client";

import { useState } from "react";
import { Heart, Leaf, Star, Truck } from "lucide-react";
import type { ProductDetail } from "@/types/product-detail";
import { useCart } from "@/lib/cart/cart-context";
import { parseBulkMinQuantity } from "@/lib/cart/parse-bulk";
import { cn, formatCadParts } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/storefront/product-detail/AddToCartButton";
import { QuantitySelector } from "@/components/storefront/product-detail/QuantitySelector";

export type ProductInfoProps = {
  product: ProductDetail;
};

export function ProductInfo({ product }: ProductInfoProps) {
  const { addItem } = useCart();
  const [selectedSizeId, setSelectedSizeId] = useState(product.sizeOptions[0]?.id ?? "default");
  const [quantity, setQuantity] = useState(1);

  const selectedSize =
    product.sizeOptions.find((option) => option.id === selectedSizeId) ??
    product.sizeOptions[0];

  const retail = formatCadParts(selectedSize.retailPrice);
  const bulk = formatCadParts(selectedSize.bulkPrice);
  const title = product.displayName ?? product.name;
  const stockLabel =
    product.stockStatus === "low-stock"
      ? product.stockLabel ?? "Low Stock"
      : "In Stock & Ready to Ship";
  const stockIsLow = product.stockStatus === "low-stock";

  function handleAddToCart() {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: title,
      unitPrice: selectedSize.retailPrice,
      quantity,
      sizeLabel: selectedSize.label,
      imageUrl: product.imageUrl,
      origin: product.origin,
      bulkPrice: selectedSize.bulkPrice,
      bulkMinQuantity: parseBulkMinQuantity(selectedSize.bulkLabel),
    });
  }

  return (
    <div className="space-y-6">
      {product.badges?.includes("organic") ? (
        <span
          className="inline-flex h-6 items-center gap-1.5 rounded-md bg-section-badge px-3 text-xs font-semibold uppercase tracking-wide text-section-badge-foreground"
        >
          <Leaf className="h-2.5 w-2.5 shrink-0" aria-hidden />
          100% Organic
        </span>
      ) : null}

      <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl lg:leading-tight xl:text-4xl">
        {title}
      </h1>

      <div className="flex flex-wrap items-center gap-4">
        <span className="inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5 text-sm text-foreground">
          <span aria-hidden>🇳🇬</span>
          Origin: {product.origin}
        </span>
        <div className="flex items-center gap-1 text-sm text-foreground">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className="h-4 w-4 fill-primary text-primary"
              aria-hidden
            />
          ))}
          <span className="ml-2 text-muted-foreground">
            ({product.reviewCount} Reviews)
          </span>
        </div>
      </div>

      <p className="text-base leading-relaxed text-muted-foreground">{product.description}</p>

      {product.sizeOptions.length > 1 ? (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Select Size</h2>
          <div className="flex flex-wrap gap-4">
            {product.sizeOptions.map((option) => {
              const isSelected = option.id === selectedSizeId;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedSizeId(option.id)}
                  className={cn(
                    "min-w-[120px] rounded-xl border px-6 py-3 text-base font-medium transition-colors",
                    isSelected
                      ? "border-brand-green bg-secondary text-foreground"
                      : "border-border bg-card text-foreground hover:border-brand-green/40",
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="rounded-2xl border border-border bg-section-badge/40 p-6">
        <div className="flex items-end justify-between gap-4">
          <span className="text-sm font-medium text-muted-foreground">Retail Price</span>
          <p className="text-right">
            <span className="text-3xl font-bold text-foreground">{retail.amount}</span>
            <span className="ml-1 text-base text-muted-foreground">{retail.currency}</span>
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between gap-4 border-t border-border pt-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="rounded bg-primary px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary-foreground">
              Bulk Deal
            </span>
            <span className="text-muted-foreground">{selectedSize.bulkLabel}</span>
          </div>
          <p className="text-lg font-semibold text-primary">
            {bulk.amount}
            <span className="ml-1 text-sm font-normal text-muted-foreground">/ unit</span>
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6 text-sm">
        <span className="flex items-center gap-2">
          <span
            className={cn(
              "h-2.5 w-2.5 rounded-full",
              stockIsLow ? "bg-amber-500" : "bg-brand-green",
            )}
            aria-hidden
          />
          <span className="font-medium text-foreground">{stockLabel}</span>
        </span>
        <span className="flex items-center gap-2 text-muted-foreground">
          <Truck className="h-4 w-4 shrink-0" aria-hidden />
          {product.deliveryEstimate}
        </span>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        <QuantitySelector
          value={quantity}
          onChange={setQuantity}
          className="w-full sm:w-[146px]"
        />
        <AddToCartButton onClick={handleAddToCart} className="w-full sm:flex-1" />
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="hidden h-16 w-16 shrink-0 rounded-xl sm:inline-flex"
          aria-label="Add to wishlist"
        >
          <Heart className="h-6 w-6" aria-hidden />
        </Button>
      </div>
    </div>
  );
}
