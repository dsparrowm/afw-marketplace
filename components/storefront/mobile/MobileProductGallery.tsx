"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type MobileProductGalleryProps = {
  images: string[];
  name: string;
};

/** Full-width PDP gallery for mobile viewports */
export function MobileProductGallery({ images, name }: MobileProductGalleryProps) {
  const galleryImages = images.length > 0 ? images : ["/images/products/honey-beans.png"];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = galleryImages[activeIndex] ?? galleryImages[0];

  return (
    <div className="space-y-3">
      <div className="relative flex aspect-square items-center justify-center rounded-2xl border border-border bg-card p-6">
        <Image
          src={activeImage}
          alt={name}
          width={320}
          height={320}
          className="h-full w-full object-contain"
          priority
        />
      </div>

      {galleryImages.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {galleryImages.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border bg-card p-1",
                index === activeIndex ? "border-brand-green" : "border-border",
              )}
              aria-label={`View image ${index + 1}`}
              aria-pressed={index === activeIndex}
            >
              <Image src={src} alt="" width={56} height={56} className="h-full w-full object-contain" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
