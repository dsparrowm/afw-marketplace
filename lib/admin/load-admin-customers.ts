import { getCustomerById, listCustomers } from "@/lib/api/customers";
import { listOrders } from "@/lib/api/orders";
import {
  buildAdminCustomerMetrics,
  mapApiCustomerToAdminRow,
} from "@/lib/admin/map-admin-customer";
import type {
  AdminCustomerMetric,
  AdminCustomerRow,
} from "@/lib/mocks/admin-customers";
import type { ApiCustomer, ApiOrder } from "@/types/api";

export type AdminCustomersLoadResult = {
  rows: AdminCustomerRow[];
  metrics: AdminCustomerMetric[];
  error: string | null;
};

async function loadAllCustomers(): Promise<ApiCustomer[]> {
  const first = await listCustomers(
    { page: 1, limit: 50 },
    { auth: "session" },
  );
  const customers = [...first.data];
  const totalPages = first.meta.totalPages || 1;

  for (let page = 2; page <= totalPages; page += 1) {
    const next = await listCustomers(
      { page, limit: 50 },
      { auth: "session" },
    );
    customers.push(...next.data);
  }

  return customers;
}

async function loadAllOrders(): Promise<ApiOrder[]> {
  const first = await listOrders({ page: 1, limit: 50 }, { auth: "session" });
  const orders = [...first.data];
  const totalPages = first.meta.totalPages || 1;

  for (let page = 2; page <= totalPages; page += 1) {
    const next = await listOrders({ page, limit: 50 }, { auth: "session" });
    orders.push(...next.data);
  }

  return orders;
}

/** Loads customers for the admin Customers screen via staff session. */
export async function loadAdminCustomers(): Promise<AdminCustomersLoadResult> {
  try {
    const [listed, orders] = await Promise.all([
      loadAllCustomers(),
      loadAllOrders(),
    ]);

    const detailed = await Promise.all(
      listed.map(async (customer) => {
        try {
          return await getCustomerById(customer.id, { auth: "session" });
        } catch {
          return customer;
        }
      }),
    );

    const ordersByCustomer = new Map<string, ApiOrder[]>();
    for (const order of orders) {
      const bucket = ordersByCustomer.get(order.customerId) ?? [];
      bucket.push(order);
      ordersByCustomer.set(order.customerId, bucket);
    }

    const rows = detailed.map((customer) =>
      mapApiCustomerToAdminRow(
        customer,
        ordersByCustomer.get(customer.id) ?? customer.orders ?? [],
      ),
    );

    rows.sort((a, b) => a.name.localeCompare(b.name));

    return {
      rows,
      metrics: buildAdminCustomerMetrics(rows, detailed, orders),
      error: null,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load customers.";
    return {
      rows: [],
      metrics: buildAdminCustomerMetrics([], [], []),
      error: message,
    };
  }
}
