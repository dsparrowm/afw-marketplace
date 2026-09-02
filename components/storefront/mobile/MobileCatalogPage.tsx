"use client";

import { Suspense, useState } from "react";
import { MobileCatalogCategoryPills } from "@/components/storefront/mobile/MobileCatalogCategoryPills";
import { MobileCatalogFilterDrawer } from "@/components/storefront/mobile/MobileCatalogFilterDrawer";
import { MobileCatalogProductGrid } from "@/components/storefront/mobile/MobileCatalogProductGrid";
import { MobileCatalogSearch } from "@/components/storefront/mobile/MobileCatalogSearch";
import { MobileCatalogToolbar } from "@/components/storefront/mobile/MobileCatalogToolbar";
import { MobileFooterAccordion } from "@/components/storefront/mobile/MobileFooterAccordion";
import type { Product } from "@/types/product";

export type MobileCatalogPageProps = {
  products: Product[];
  displayTotal: number;
};

function MobileCatalogContent({
  products,
  displayTotal,
}: MobileCatalogPageProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className="lg:hidden" data-figma-node="3:2189">
      <div className="px-4 pt-6">
        <h1
          className="text-[28px] font-bold leading-9 tracking-tight text-foreground"
          data-figma-node="3:2194"
        >
          Shop African Food
        </h1>
      </div>

      <div className="mt-2">
        <MobileCatalogSearch />
      </div>

      <Suspense fallback={null}>
        <MobileCatalogCategoryPills />
      </Suspense>

      <MobileCatalogToolbar
        total={displayTotal}
        onOpenFilters={() => setFiltersOpen(true)}
      />

      <MobileCatalogProductGrid
        products={products}
        displayTotal={displayTotal}
      />

      <MobileFooterAccordion variant="catalog" />

      <MobileCatalogFilterDrawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
      />
    </div>
  );
}

/** Mobile shop catalog — Figma `3:2189` */
export function MobileCatalogPage(props: MobileCatalogPageProps) {
  return (
    <Suspense fallback={null}>
      <MobileCatalogContent {...props} />
    </Suspense>
  );
}
