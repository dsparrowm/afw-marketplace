"use client";

import { useState } from "react";
import Image from "next/image";
import type { AdminProductDetail } from "@/lib/mocks/admin-product-detail";
import { cn } from "@/lib/utils";

export type ProductDetailGalleryProps = {
  product: AdminProductDetail;
};

export function ProductDetailGallery({ product }: ProductDetailGalleryProps) {
  const images = [product.images.hero, ...product.images.thumbs];
  const [active, setActive] = useState(0);

  return (
    <div className="w-full max-w-[440px]">
      <div className="overflow-hidden rounded-xl border border-border bg-muted">
        <Image
          src={images[active] ?? product.images.hero}
          alt={product.name}
          width={880}
          height={720}
          className="aspect-[440/360] h-auto w-full object-cover"
          priority
        />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {product.images.thumbs.map((src, index) => {
          const thumbIndex = index + 1;
          return (
            <button
              key={src}
              type="button"
              onClick={() => setActive(thumbIndex)}
              className={cn(
                "overflow-hidden rounded-lg border bg-muted",
                active === thumbIndex
                  ? "border-brand-green"
                  : "border-border hover:border-muted-foreground/40",
              )}
            >
              <Image
                src={src}
                alt=""
                width={276}
                height={192}
                className="aspect-[138/96] h-auto w-full object-cover"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
