import Link from "next/link";
import { Suspense } from "react";
import { CatalogBreadcrumb } from "@/components/storefront/catalog/CatalogBreadcrumb";
import { CatalogFilters } from "@/components/storefront/catalog/CatalogFilters";
import { CatalogPagination } from "@/components/storefront/catalog/CatalogPagination";
import { CatalogProductGrid } from "@/components/storefront/catalog/CatalogProductGrid";
import { CatalogSearchAndPills } from "@/components/storefront/catalog/CatalogSearchAndPills";
import { CatalogToolbar } from "@/components/storefront/catalog/CatalogToolbar";
import { MobileCatalogPage } from "@/components/storefront/mobile/MobileCatalogPage";
import type { CatalogQueryResult } from "@/lib/catalog/query-catalog";
import type { CatalogQuery } from "@/lib/mocks/catalog-products";

export type CatalogPageProps = {
  query: CatalogQuery;
  result: CatalogQueryResult;
};

/** Shop catalog main content — Figma `2:242` desktop / `3:2189` mobile */
export function CatalogPage({ query, result }: CatalogPageProps) {
  const allProducts = result.filteredProducts;

  return (
    <>
      <MobileCatalogPage products={allProducts} displayTotal={result.displayTotal} />

      <div className="mx-auto hidden max-w-[1440px] px-4 py-8 sm:px-10 sm:py-10 lg:block">
        <CatalogBreadcrumb />

        <header className="mt-6 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Shop African Food
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Explore 100% organic foods sourced from farms and producers across Nigeria and
          Africa. Fresh, authentic, and delivered to your door.
        </p>
        </header>

        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-brand-green px-6 py-4 text-center text-sm sm:gap-4 sm:text-base"
        >
        <span className="rounded-md bg-primary px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary-foreground">
          New
        </span>
        <p className="font-medium text-white">
          FRESH FROM AFRICA — Discover our latest organic arrivals
        </p>
        <Link
          href="/shop?filter=new"
          className="font-semibold text-white hover:text-white/90"
        >
          Learn more
        </Link>
        </div>

        <div className="mt-8">
          <Suspense fallback={null}>
            <CatalogSearchAndPills />
          </Suspense>
        </div>

        <div className="mt-10 flex flex-col gap-8 lg:flex-row">
          <div className="hidden w-full max-w-[288px] shrink-0 lg:block">
            <Suspense fallback={null}>
              <CatalogFilters />
            </Suspense>
          </div>

          <div className="min-w-0 flex-1 space-y-6">
            <Suspense fallback={null}>
              <CatalogToolbar
                total={result.displayTotal}
                categoryLabel={result.activeCategoryLabel}
              />
            </Suspense>

            <CatalogProductGrid products={result.products} />

            <CatalogPagination
              query={query}
              page={result.page}
              totalPages={result.totalPages}
            />
          </div>
        </div>
      </div>
    </>
  );
}
