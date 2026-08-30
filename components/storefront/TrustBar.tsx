import { FigmaImage } from "@/components/storefront/FigmaImage";
import { trustIcons } from "@/lib/brand/assets";
import { trustBarItems } from "@/lib/storefront/trust-bar";
import { cn } from "@/lib/utils";

export type TrustBarProps = {
  className?: string;
};

/** Homepage trust bar — Figma node `6:2690`, 1440×108, directly below hero */
export function TrustBar({ className }: TrustBarProps) {
  return (
    <section
      className={cn("bg-trust-bar text-trust-bar-foreground", className)}
      aria-label="Why shop with us"
    >
      <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-8 sm:px-10 lg:grid-cols-4 lg:gap-8 lg:py-8 lg:pl-20 lg:pr-10">
        {trustBarItems.map((item) => (
          <div key={item.title} className="flex min-w-0 items-center gap-4">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-trust-bar-icon"
              aria-hidden
            >
              <FigmaImage
                src={trustIcons[item.icon]}
                alt=""
                width={20}
                height={20}
                className="brightness-0 invert"
              />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-[18px]">{item.title}</p>
              <p className="mt-0.5 text-xs leading-4 text-trust-bar-muted">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
