import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { homepageAssets } from "@/lib/brand/assets";
import { heroContent } from "@/lib/storefront/hero";
import { cn } from "@/lib/utils";

export type MobileHeroSectionProps = {
  className?: string;
};

/** Mobile homepage hero — Figma `2:1932`; badge unified to desktop copy */
export function MobileHeroSection({ className }: MobileHeroSectionProps) {
  return (
    <section
      className={cn("px-4 pt-4", className)}
      aria-labelledby="mobile-hero-heading"
      data-figma-node="2:1932"
    >
      <div className="relative h-[520px] overflow-hidden rounded-2xl">
        <Image
          src={homepageAssets.heroBackground}
          alt=""
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 0px"
          className="object-cover object-left"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/25"
          aria-hidden
        />

        <div className="relative flex h-full flex-col px-8 pb-8 pt-[82px]">
          <span className="mb-4 inline-flex h-[25px] w-fit items-center rounded-full bg-hero-badge px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-hero-badge-foreground">
            {heroContent.badge}
          </span>

          <h1
            id="mobile-hero-heading"
            className="max-w-[280px] text-[32px] font-bold leading-[1.15] tracking-tight text-white"
          >
            {heroContent.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-5 max-w-[264px] text-sm leading-relaxed text-white/90">
            100% organic products delivered fresh to your door in Canada.
          </p>

          <div className="mt-auto flex flex-col gap-3">
            <Button
              asChild
              className="h-14 w-full rounded-full text-base font-semibold shadow-md shadow-black/20"
            >
              <Link href={heroContent.primaryCta.href}>
                {heroContent.primaryCta.label}
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="h-[58px] w-full rounded-full border-0 bg-white/20 text-base text-white backdrop-blur-md hover:bg-white/30 hover:text-white"
            >
              <Link href={heroContent.secondaryCta.href}>
                {heroContent.secondaryCta.label}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
