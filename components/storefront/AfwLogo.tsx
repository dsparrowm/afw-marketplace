import Link from "next/link";
import { FigmaImage } from "@/components/storefront/FigmaImage";
import { brandAssets } from "@/lib/brand/assets";
import { cn } from "@/lib/utils";

type AfwLogoProps = {
  className?: string;
  priority?: boolean;
  variant?: "header" | "footer";
};

/** Header/footer wordmarks at 210×124 (@2x), displayed at 62px height. */
export function AfwLogo({
  className,
  priority = false,
  variant = "header",
}: AfwLogoProps) {
  const isFooter = variant === "footer";
  const src = isFooter ? brandAssets.logoFooter : brandAssets.logo;

  return (
    <FigmaImage
      src={src}
      alt="African Food Warehouse"
      width={210}
      height={124}
      priority={priority}
      className={cn("h-[62px] w-auto max-w-[210px]", className)}
    />
  );
}

type AfwLogoLinkProps = AfwLogoProps & {
  href?: string;
};

export function AfwLogoLink({ href = "/", variant = "header", ...props }: AfwLogoLinkProps) {
  return (
    <Link href={href} className="inline-flex shrink-0">
      <AfwLogo variant={variant} {...props} />
    </Link>
  );
}

export function AfwFooterLogoLink(props: Omit<AfwLogoLinkProps, "variant">) {
  return <AfwLogoLink variant="footer" {...props} />;
}
