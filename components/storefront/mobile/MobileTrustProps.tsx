import { FigmaImage } from "@/components/storefront/FigmaImage";
import { trustIcons } from "@/lib/brand/assets";
import { trustBarItems } from "@/lib/storefront/trust-bar";
import { cn } from "@/lib/utils";

export type MobileTrustPropsProps = {
  className?: string;
};

/** Four trust rows — Figma `2:2073` + 4th item per design review */
export function MobileTrustProps({ className }: MobileTrustPropsProps) {
  return (
    <section
      className={cn("px-4 py-8", className)}
      aria-label="Why shop with us"
      data-figma-node="2:2073"
    >
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <ul className="space-y-6">
          {trustBarItems.map((item) => (
            <li key={item.title} className="flex gap-4">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted"
                aria-hidden
              >
                <FigmaImage
                  src={trustIcons[item.icon]}
                  alt=""
                  width={18}
                  height={18}
                  className="opacity-80"
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {item.subtitle}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
