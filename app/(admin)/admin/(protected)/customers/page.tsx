import type { Metadata } from "next";
import { CustomersPage } from "@/components/admin/customers/CustomersPage";
import { loadAdminCustomers } from "@/lib/admin/load-admin-customers";

export const metadata: Metadata = {
  title: "Customers · Admin · AFW Marketplace",
};

export default async function AdminCustomersRoute() {
  const data = await loadAdminCustomers();

  return (
    <CustomersPage
      initialRows={data.rows}
      metrics={data.metrics}
      loadError={data.error}
    />
  );
}
