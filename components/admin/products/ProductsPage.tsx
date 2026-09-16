"use client";

import { useMemo, useState } from "react";
import { ProductsHeader } from "@/components/admin/products/ProductsHeader";
import { ProductsFilters } from "@/components/admin/products/ProductsFilters";
import { ProductsTable } from "@/components/admin/products/ProductsTable";
import { ProductsPagination } from "@/components/admin/products/ProductsPagination";
import {
  ADMIN_PRODUCTS_PAGE_SIZE,
  filterAdminProducts,
  type AdminProductRow,
} from "@/lib/mocks/admin-products";

export type ProductsPageProps = {
  initialRows: AdminProductRow[];
  loadError?: string | null;
};

/** Products list — live `GET /admin/products` (Figma `72:203` layout) */
export function ProductsPage({
  initialRows,
  loadError = null,
}: ProductsPageProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [origin, setOrigin] = useState("All");
  const [page, setPage] = useState(1);

  const categoryOptions = useMemo(() => {
    const names = Array.from(
      new Set(initialRows.map((row) => row.category)),
    ).sort();
    return ["All", ...names] as const;
  }, [initialRows]);

  const originOptions = useMemo(() => {
    const names = Array.from(
      new Set(initialRows.map((row) => row.origin).filter(Boolean)),
    ).sort();
    return ["All", ...names] as const;
  }, [initialRows]);

  const filtered = useMemo(
    () =>
      filterAdminProducts(initialRows, {
        search,
        category,
        status,
        origin,
      }),
    [initialRows, search, category, status, origin],
  );

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / ADMIN_PRODUCTS_PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice(
    (safePage - 1) * ADMIN_PRODUCTS_PAGE_SIZE,
    safePage * ADMIN_PRODUCTS_PAGE_SIZE,
  );

  const showingFrom =
    total === 0 ? 0 : (safePage - 1) * ADMIN_PRODUCTS_PAGE_SIZE + 1;
  const showingTo = Math.min(safePage * ADMIN_PRODUCTS_PAGE_SIZE, total);

  function resetFilters() {
    setSearch("");
    setCategory("All");
    setStatus("All");
    setOrigin("All");
    setPage(1);
  }

  return (
    <div className="mx-auto max-w-[1180px] px-8 py-8">
      <ProductsHeader
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />

      {loadError ? (
        <p
          className="mt-4 rounded-md border border-admin-status-delayed bg-admin-status-delayed px-4 py-3 text-sm text-admin-status-delayed-foreground"
          role="alert"
        >
          Could not load products from staging: {loadError}
        </p>
      ) : null}

      <div className="mt-5">
        <ProductsFilters
          category={category}
          status={status}
          origin={origin}
          categoryOptions={categoryOptions}
          originOptions={originOptions}
          onCategoryChange={(value) => {
            setCategory(value);
            setPage(1);
          }}
          onStatusChange={(value) => {
            setStatus(value);
            setPage(1);
          }}
          onOriginChange={(value) => {
            setOrigin(value);
            setPage(1);
          }}
          onReset={resetFilters}
        />
      </div>

      <div className="mt-5">
        <ProductsTable rows={pageRows} />
      </div>

      <div className="mt-5">
        <ProductsPagination
          page={safePage}
          totalPages={totalPages}
          showingFrom={showingFrom}
          showingTo={showingTo}
          total={total}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
