"use client";

import { useMemo, useState } from "react";
import { CustomersHeader } from "@/components/admin/customers/CustomersHeader";
import { CustomerMetricCards } from "@/components/admin/customers/CustomerMetricCards";
import { CustomersTable } from "@/components/admin/customers/CustomersTable";
import { ProductsPagination } from "@/components/admin/products/ProductsPagination";
import {
  ADMIN_CUSTOMERS_PAGE_SIZE,
  filterAdminCustomers,
  type AdminCustomerMetric,
  type AdminCustomerRow,
} from "@/lib/mocks/admin-customers";

export type CustomersPageProps = {
  initialRows: AdminCustomerRow[];
  metrics: AdminCustomerMetric[];
  loadError?: string | null;
};

/** Customers — live `GET /admin/customers` (Figma `72:1408` layout) */
export function CustomersPage({
  initialRows,
  metrics,
  loadError = null,
}: CustomersPageProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => filterAdminCustomers(initialRows, search),
    [initialRows, search],
  );

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / ADMIN_CUSTOMERS_PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice(
    (safePage - 1) * ADMIN_CUSTOMERS_PAGE_SIZE,
    safePage * ADMIN_CUSTOMERS_PAGE_SIZE,
  );

  const showingFrom =
    total === 0 ? 0 : (safePage - 1) * ADMIN_CUSTOMERS_PAGE_SIZE + 1;
  const showingTo = Math.min(safePage * ADMIN_CUSTOMERS_PAGE_SIZE, total);

  return (
    <div className="mx-auto max-w-[1180px] px-8 py-8">
      <CustomersHeader
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
          Could not load customers from staging: {loadError}
        </p>
      ) : null}

      <div className="mt-6">
        <CustomerMetricCards metrics={metrics} />
      </div>

      <div className="mt-6">
        <CustomersTable rows={pageRows} />
      </div>

      <div className="mt-5">
        <ProductsPagination
          page={safePage}
          totalPages={totalPages}
          showingFrom={showingFrom}
          showingTo={showingTo}
          total={total}
          onPageChange={setPage}
          itemLabel="clients"
        />
      </div>
    </div>
  );
}
