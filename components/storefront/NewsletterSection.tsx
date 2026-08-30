"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { newsletterContent } from "@/lib/storefront/newsletter";
import { cn } from "@/lib/utils";

export type NewsletterSectionProps = {
  className?: string;
};

/** Newsletter signup — Figma node `6:3063` */
export function NewsletterSection({ className }: NewsletterSectionProps) {
  const [email, setEmail] = useState("");

  return (
    <section
      className={cn("py-12", className)}
      aria-labelledby="newsletter-heading"
      data-figma-node={newsletterContent.nodeId}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-10">
        <div
          className="rounded-3xl bg-brand-green px-6 py-10 text-brand-green-foreground sm:px-12 sm:py-14 lg:flex lg:items-center lg:justify-between lg:gap-12"
        >
          <div className="max-w-xl">
            <span
              className="inline-flex h-[26px] items-center rounded-full bg-white/15 px-3 text-[11px] font-semibold uppercase tracking-[0.08em]"
            >
              {newsletterContent.badge}
            </span>
            <h2
              id="newsletter-heading"
              className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl sm:leading-tight"
            >
              {newsletterContent.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brand-green-foreground/85">
              {newsletterContent.description}
            </p>
          </div>

          <div className="mt-8 w-full max-w-md shrink-0 lg:mt-0">
            <form
              className="flex flex-col gap-4 sm:flex-row sm:items-start"
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <Input
                type="email"
                name="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={newsletterContent.emailPlaceholder}
                className="h-[52px] rounded-xl border-0 bg-white text-foreground shadow-sm"
              />
              <Button
                type="submit"
                className="h-[52px] shrink-0 rounded-xl px-8 text-base font-semibold"
              >
                {newsletterContent.submitLabel}
              </Button>
            </form>
            <p className="mt-4 text-xs leading-5 text-brand-green-foreground/75">
              By subscribing, you agree to our{" "}
              <Link
                href={newsletterContent.privacyHref}
                className="font-medium text-brand-green-foreground underline-offset-2 hover:underline"
              >
                Privacy Policy
              </Link>
              . Never spam, unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
