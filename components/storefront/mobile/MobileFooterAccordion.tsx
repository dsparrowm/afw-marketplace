"use client";

import Link from "next/link";
import { ChevronDown, Leaf } from "lucide-react";
import { useState } from "react";
import { SocialIcon, type SocialNetwork } from "@/components/icons/SocialIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  footerColumns,
  footerLegalLinks,
  siteConfig,
} from "@/lib/storefront/site";
import { cn } from "@/lib/utils";

const socialLinks: { label: string; href: string; network: SocialNetwork }[] = [
  { label: "Facebook", href: "#", network: "facebook" },
  { label: "Instagram", href: "#", network: "instagram" },
  { label: "Twitter", href: "#", network: "twitter" },
];

const homepageAccordionSections = [
  { title: "Shop", links: footerColumns[0]?.links ?? [] },
  { title: "Support", links: footerColumns[2]?.links ?? [] },
  {
    title: "About AFW",
    links: footerColumns[1]?.links ?? [],
  },
];

const catalogAccordionSections = [
  { title: "Shop", links: footerColumns[0]?.links ?? [] },
  { title: "Support", links: footerColumns[2]?.links ?? [] },
];

export type MobileFooterAccordionProps = {
  className?: string;
  /** Catalog footer omits About + newsletter — Figma `3:2329` */
  variant?: "homepage" | "catalog";
};

/** Mobile footer accordion — Figma `2:2101` / `3:2329` */
export function MobileFooterAccordion({
  className,
  variant = "homepage",
}: MobileFooterAccordionProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const isCatalog = variant === "catalog";
  const accordionSections = isCatalog
    ? catalogAccordionSections
    : homepageAccordionSections;

  return (
    <footer
      className={cn(
        "mt-4 rounded-t-3xl bg-footer px-4 pb-8 pt-12 text-footer-foreground",
        className,
      )}
      data-figma-node={isCatalog ? "3:2329" : "2:2101"}
    >
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-2xl font-bold">
          <Leaf className="h-6 w-6 text-brand-green-foreground" aria-hidden />
          <span>{siteConfig.shortName}</span>
        </div>
        <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-footer-muted">
          Bringing the true taste of home to your kitchen in Canada.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          {socialLinks.map(({ label, href, network }) => (
            <Link
              key={label}
              href={href}
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-footer-foreground"
            >
              <SocialIcon network={network} size={16} />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 border-t border-white/10 pt-2">
        {accordionSections.map((section) => {
          const isOpen = openSection === section.title;

          return (
            <div key={section.title} className="border-b border-white/10">
              <button
                type="button"
                className="flex min-h-[44px] w-full items-center justify-between py-3 text-left text-sm font-semibold uppercase tracking-wide"
                aria-expanded={isOpen}
                onClick={() =>
                  setOpenSection(isOpen ? null : section.title)
                }
              >
                {section.title}
                <ChevronDown
                  className={cn(
                    "h-3 w-3 transition-transform",
                    isOpen && "rotate-180",
                  )}
                  aria-hidden
                />
              </button>
              {isOpen ? (
                <ul className="pb-4">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="block py-2 text-sm text-footer-muted hover:text-footer-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          );
        })}
      </div>

      {!isCatalog ? (
        <div className="mt-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-footer-muted">
            Subscribe to our newsletter
          </p>
          <form
            className="relative mx-auto mt-4 max-w-xs"
            onSubmit={(event) => event.preventDefault()}
          >
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email Address"
              className="h-[46px] rounded-xl border-white/10 bg-white/10 pr-20 text-footer-foreground placeholder:text-footer-muted"
            />
            <Button
              type="submit"
              className="absolute right-1.5 top-1.5 h-7 rounded-lg bg-brand-green px-4 text-xs font-semibold text-brand-green-foreground hover:bg-brand-green/90"
            >
              Join
            </Button>
          </form>
        </div>
      ) : null}

      <div className={cn("text-center", isCatalog ? "mt-8" : "mt-8")}>
        <p className="text-xs text-footer-muted">{siteConfig.copyright}</p>
        {!isCatalog ? (
          <div className="mt-3 flex flex-wrap justify-center gap-4">
            {footerLegalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-footer-muted hover:text-footer-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </footer>
  );
}
