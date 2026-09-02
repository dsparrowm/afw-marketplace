import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buildShopHref } from "@/lib/storefront/catalog";
import type { CatalogQuery } from "@/lib/mocks/catalog-products";
import { cn } from "@/lib/utils";

export type CatalogPaginationProps = {
  query: CatalogQuery;
  page: number;
  totalPages: number;
};

export function CatalogPagination({ query, page, totalPages }: CatalogPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(page, totalPages);

  return (
    <nav
      className="flex items-center justify-center gap-2 pt-8"
      aria-label="Catalog pagination"
    >
      <PageLink
        href={buildShopHref({ ...query, page: page > 1 ? page - 1 : undefined })}
        disabled={page <= 1}
        label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
      </PageLink>

      {pages.map((item, index) =>
        item === "ellipsis" ? (
          <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
            ...
          </span>
        ) : (
          <PageLink
            key={item}
            href={buildShopHref({ ...query, page: item === 1 ? undefined : item })}
            active={item === page}
            label={`Page ${item}`}
          >
            {item}
          </PageLink>
        ),
      )}

      <PageLink
        href={buildShopHref({ ...query, page: page < totalPages ? page + 1 : page })}
        disabled={page >= totalPages}
        label="Next page"
      >
        <ChevronRight className="h-4 w-4" aria-hidden />
      </PageLink>
    </nav>
  );
}

function PageLink({
  href,
  children,
  active = false,
  disabled = false,
  label,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  label: string;
}) {
  if (disabled) {
    return (
      <span
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground opacity-40"
        aria-disabled="true"
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      aria-label={label}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-medium transition-colors",
        active
          ? "border-brand-green bg-brand-green text-brand-green-foreground"
          : "border-border bg-card text-foreground/85 hover:border-brand-green/40 hover:text-brand-green",
      )}
    >
      {children}
    </Link>
  );
}

function getPageNumbers(current: number, total: number): Array<number | "ellipsis"> {
  if (total <= 5) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  if (current <= 3) {
    return [1, 2, 3, "ellipsis", total];
  }

  if (current >= total - 2) {
    return [1, "ellipsis", total - 2, total - 1, total];
  }

  return [1, "ellipsis", current, "ellipsis", total];
}
