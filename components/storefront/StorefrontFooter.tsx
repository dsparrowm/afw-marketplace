import Link from "next/link";
import { AfwFooterLogoLink } from "@/components/storefront/AfwLogo";
import { FigmaImage } from "@/components/storefront/FigmaImage";
import { socialIcons } from "@/lib/brand/assets";
import {
  footerColumns,
  footerLegalLinks,
  siteConfig,
} from "@/lib/storefront/site";

const socialLinks = [
  { label: "Facebook", href: "#", icon: socialIcons.facebook, width: 10, height: 16 },
  { label: "Instagram", href: "#", icon: socialIcons.instagram, width: 14, height: 16 },
  { label: "Twitter", href: "#", icon: socialIcons.twitter, width: 16, height: 16 },
] as const;

export function StorefrontFooter() {
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
          <div className="space-y-6">
            <AfwFooterLogoLink />
            <p className="max-w-sm text-sm leading-6 text-footer-muted">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, href, icon, width, height }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-footer-foreground transition-colors hover:bg-white/10"
                >
                  <FigmaImage src={icon} alt="" width={width} height={height} />
                </Link>
              ))}
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h2 className="text-lg font-semibold">{column.title}</h2>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-footer-muted transition-colors hover:text-footer-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-footer-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{siteConfig.copyright}</p>
          <div className="flex flex-wrap gap-6">
            {footerLegalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-footer-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
