import { ShipmentStatusBadge } from "@/components/admin/orders/ShipmentStatusBadge";
import type { AdminShipmentRow } from "@/lib/mocks/admin-orders";

export type ShipmentsPanelProps = {
  rows: AdminShipmentRow[];
};

export function ShipmentsPanel({ rows }: ShipmentsPanelProps) {
  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-foreground">
        Active Delivery Shipments
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="w-[120px] pb-3 font-medium">Carrier</th>
              <th className="w-[180px] pb-3 font-medium">Tracking Number</th>
              <th className="pb-3 font-medium">Destination</th>
              <th className="w-[150px] pb-3 font-medium">Est. Delivery</th>
              <th className="w-[120px] pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-8 text-center text-muted-foreground"
                >
                  No active shipments.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b border-border last:border-0">
                  <td className="py-3.5 font-medium">{row.carrier}</td>
                  <td className="py-3.5">{row.trackingNumber}</td>
                  <td className="py-3.5">{row.destination}</td>
                  <td className="py-3.5 text-muted-foreground">
                    {row.estDelivery}
                  </td>
                  <td className="py-3.5">
                    <ShipmentStatusBadge status={row.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
