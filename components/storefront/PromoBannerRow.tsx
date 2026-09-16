"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MotionReveal } from "@/components/storefront/motion/MotionReveal";
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
  const reduceMotion = useReducedMotion();

  return (
    <MotionReveal>
      <section className={cn("py-8", className)} aria-label="Promotions">
        <div className="mx-auto grid max-w-[1440px] gap-5 px-4 sm:px-10 lg:grid-cols-3">
          {promoBanners.map((banner) => (
            <motion.div
              key={banner.id}
              whileHover={
                reduceMotion ? undefined : { scale: 1.02, opacity: 0.95 }
              }
              whileTap={reduceMotion ? undefined : { scale: 0.99 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={banner.href}
                data-figma-node={banner.nodeId}
                className={cn(
                  "block h-[221px] rounded-2xl",
                  toneClasses[banner.tone],
                )}
                aria-label={`Promotion ${banner.id}`}
              />
            </motion.div>
          ))}
        </div>
      </section>
    </MotionReveal>
  );
}
