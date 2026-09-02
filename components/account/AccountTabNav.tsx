"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/account/orders", label: "Orders", match: (path: string) => path.startsWith("/account/orders") },
  { href: "/account/addresses", label: "Addresses", match: (path: string) => path === "/account/addresses" },
  { href: "/account/reorder", label: "Reorder List", match: (path: string) => path === "/account/reorder" },
  { href: "/account/profile", label: "Profile", match: (path: string) => path === "/account/profile" },
] as const;

/** Dashboard tab nav — Figma `29:97` */
export function AccountTabNav() {
  const pathname = usePathname();

  return (
    <nav
      className="border-b border-border bg-card"
      aria-label="Account sections"
    >
      <div className="mx-auto flex max-w-[1200px] gap-8 overflow-x-auto px-4 sm:px-16">
        {tabs.map((tab) => {
          const isActive = tab.match(pathname);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "shrink-0 border-b-2 py-4 text-sm font-medium transition-colors",
                isActive
                  ? "border-brand-green text-brand-green"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
