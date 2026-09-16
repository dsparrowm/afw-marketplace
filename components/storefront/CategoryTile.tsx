"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { HomepageCategory } from "@/lib/storefront/categories";
import { cn } from "@/lib/utils";

export type CategoryTileProps = {
  category: HomepageCategory;
  className?: string;
};

/** Category carousel tile — Figma ~206.66×246.66 (`shop-by-category.xml`) */
export function CategoryTile({ category, className }: CategoryTileProps) {
  const reduceMotion = useReducedMotion();

  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className={cn(
        "group w-[206.66px] shrink-0 snap-start scroll-ml-4 first:scroll-ml-0",
        className,
      )}
    >
      <motion.div
        className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-border bg-card p-[25px] shadow-sm"
        initial="rest"
        whileHover={reduceMotion ? undefined : "hover"}
        variants={{
          rest: {
            y: 0,
            boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
          },
          hover: {
            y: -2,
            boxShadow:
              "0 10px 24px -10px rgb(0 0 0 / 0.16), 0 4px 8px -4px rgb(0 0 0 / 0.08)",
          },
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="h-auto max-h-[157px] w-full"
          variants={{
            rest: { scale: 1 },
            hover: { scale: reduceMotion ? 1 : 1.06 },
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={category.image}
            alt=""
            width={157}
            height={157}
            className="h-auto max-h-[157px] w-full object-contain"
          />
        </motion.div>
      </motion.div>
      <h3 className="mt-3 text-center text-sm font-medium leading-5 text-foreground transition-colors group-hover:text-brand-green sm:mt-4 sm:text-base sm:leading-6">
        {category.label}
      </h3>
    </Link>
  );
}
