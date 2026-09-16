import { CustomerStatusBadge } from "@/components/admin/customers/CustomerStatusBadge";
import type { AdminCustomerRow } from "@/lib/mocks/admin-customers";

export type CustomersTableProps = {
  rows: AdminCustomerRow[];
};

export function CustomersTable({ rows }: CustomersTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
      <table className="w-full min-w-[1020px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            <th className="px-4 py-4 font-medium">Customer Name</th>
            <th className="w-[220px] px-2 py-4 font-medium">Email Address</th>
            <th className="w-[90px] px-2 py-4 font-medium">Orders</th>
            <th className="w-[120px] px-2 py-4 font-medium">Total Spent</th>
            <th className="w-[160px] px-2 py-4 font-medium">Last Order Date</th>
            <th className="w-[140px] px-2 py-4 font-medium">Location</th>
            <th className="w-[100px] px-2 py-4 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="px-4 py-10 text-center text-muted-foreground"
              >
                No customers match this search.
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id} className="border-b border-border last:border-0">
                <td className="px-4 py-4 font-medium">{row.name}</td>
                <td className="px-2 py-4 text-muted-foreground">{row.email}</td>
                <td className="px-2 py-4">{row.orders}</td>
                <td className="px-2 py-4 font-medium">{row.totalSpent}</td>
                <td className="px-2 py-4 text-muted-foreground">
                  {row.lastOrder}
                </td>
                <td className="px-2 py-4">{row.location}</td>
                <td className="px-2 py-4">
                  <CustomerStatusBadge status={row.status} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
