import type { Metadata } from "next";
import Link from "next/link";
import { faqIntro, faqItems } from "@/lib/storefront/policies";

export const metadata: Metadata = {
  title: "FAQs",
};

export default function FaqPage() {
  return (
    <article className="mx-auto max-w-[1440px] px-4 py-12 sm:px-10 lg:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
          FAQs
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">{faqIntro}</p>
        <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
          {faqItems.map((item) => (
            <details key={item.question} className="group px-5 py-4">
              <summary className="cursor-pointer text-base font-semibold text-foreground">
                {item.question}
              </summary>
              <p className="mt-3 text-sm leading-6 text-foreground/85">{item.answer}</p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Shipping details are on the{" "}
          <Link href="/shipping" className="font-medium text-brand-green hover:underline">
            shipping policy
          </Link>
          . Account and checkout rules are on the{" "}
          <Link href="/terms" className="font-medium text-brand-green hover:underline">
            terms
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
