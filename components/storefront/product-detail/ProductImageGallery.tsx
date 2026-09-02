"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type ProductImageGalleryProps = {
  images: string[];
  name: string;
};

export function ProductImageGallery({ images, name }: ProductImageGalleryProps) {
  const galleryImages = images.length > 0 ? images : ["/images/products/honey-beans.png"];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = galleryImages[activeIndex] ?? galleryImages[0];
  const extraCount = galleryImages.length > 5 ? galleryImages.length - 4 : 0;

  return (
    <div className="space-y-6">
      <div
        className="relative flex aspect-square max-h-[600px] items-center justify-center rounded-2xl border border-border bg-card p-8 shadow-sm"
      >
        <Image
          src={activeImage}
          alt={name}
          width={550}
          height={502}
          className="h-auto max-h-[502px] w-full object-contain"
          priority
        />
      </div>

      <div className="flex gap-4 overflow-x-auto pb-1">
        {galleryImages.slice(0, 5).map((src, index) => {
          const isLastWithMore = index === 4 && extraCount > 0;
          const isActive = index === activeIndex;

          return (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative h-24 w-[117px] shrink-0 overflow-hidden rounded-xl border bg-card p-2 transition-colors",
                isActive ? "border-brand-green" : "border-border hover:border-brand-green/40",
              )}
              aria-label={`View image ${index + 1}`}
              aria-pressed={isActive}
            >
              <Image
                src={src}
                alt=""
                width={98}
                height={78}
                className="h-full w-full object-contain"
              />
              {isLastWithMore ? (
                <span
                  className="absolute inset-0 flex items-center justify-center bg-black/45 text-lg font-semibold text-white"
                >
                  +{extraCount}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
