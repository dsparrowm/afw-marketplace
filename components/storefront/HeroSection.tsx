import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { homepageAssets } from "@/lib/brand/assets";
import { heroContent } from "@/lib/storefront/hero";
import { cn } from "@/lib/utils";

export type HeroSectionProps = {
  className?: string;
};

/** Homepage hero — Figma node `2:8`, 1440×600. Vertical offsets from `hero.xml`. */
export function HeroSection({ className }: HeroSectionProps) {
  return (
    <section
      className={cn("relative h-[600px] w-full overflow-hidden", className)}
      aria-labelledby="hero-heading"
    >
      <Image
        src={homepageAssets.heroBackground}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/35 to-black/20"
        aria-hidden
      />

      <div className="relative mx-auto flex h-full max-w-[1440px] flex-col items-center px-4 pt-[95px] text-center sm:px-10">
        <span className="mb-[23px] inline-flex h-[26px] items-center rounded-full bg-hero-badge px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-hero-badge-foreground">
          {heroContent.badge}
        </span>

        <h1
          id="hero-heading"
          className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[56px] lg:leading-[60px]"
        >
          {heroContent.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <p className="mt-[54px] max-w-[672px] text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
          {heroContent.subtext}
        </p>

        <div className="mt-[54px] flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="h-[60px] min-w-[152px] rounded-full px-8 text-base shadow-md shadow-black/25"
          >
            <Link href={heroContent.primaryCta.href}>
              {heroContent.primaryCta.label}
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="h-[62px] min-w-[207px] rounded-full border-0 bg-white/20 px-8 text-base text-white backdrop-blur-md hover:bg-white/30 hover:text-white"
          >
            <Link href={heroContent.secondaryCta.href}>
              {heroContent.secondaryCta.label}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
