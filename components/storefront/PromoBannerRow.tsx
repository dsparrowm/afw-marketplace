import Link from "next/link";
import { promoBanners } from "@/lib/storefront/promo-banners";
import { cn } from "@/lib/utils";

const toneClasses = {
  amber: "bg-promo-banner-amber",
  green: "bg-promo-banner-green",
  orange: "bg-promo-banner-orange",
} as const;

export type PromoBannerRowProps = {
  className?: string;
};

/** Three promotional color blocks — Figma nodes `7:3458`–`7:3461`, ~413×221 */
export function PromoBannerRow({ className }: PromoBannerRowProps) {
  return (
    <section className={cn("py-8", className)} aria-label="Promotions">
      <div className="mx-auto grid max-w-[1440px] gap-5 px-4 sm:px-10 lg:grid-cols-3">
        {promoBanners.map((banner) => (
          <Link
            key={banner.id}
            href={banner.href}
            data-figma-node={banner.nodeId}
            className={cn(
              "block h-[221px] rounded-2xl transition-opacity hover:opacity-90",
              toneClasses[banner.tone],
            )}
            aria-label={`Promotion ${banner.id}`}
          />
        ))}
      </div>
    </section>
  );
}
