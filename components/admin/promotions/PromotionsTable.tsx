"use client";

import { useEffect, useRef, useState } from "react";
import { MoreHorizontal, Pencil } from "lucide-react";
import { PromotionStatusBadge } from "@/components/admin/promotions/PromotionStatusBadge";
import type { AdminPromotionRow } from "@/lib/mocks/admin-promotions";

export type PromotionsTableProps = {
  rows: AdminPromotionRow[];
  busyId?: string | null;
  onEdit: (row: AdminPromotionRow) => void;
  onDelete: (row: AdminPromotionRow) => void;
};

export function PromotionsTable({
  rows,
  busyId = null,
  onEdit,
  onDelete,
}: PromotionsTableProps) {
  const [menuId, setMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuId(null);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
      <table className="w-full min-w-[960px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            <th className="px-4 py-4 font-medium">Promotion Name</th>
            <th className="w-[180px] px-2 py-4 font-medium">Type</th>
            <th className="w-[130px] px-2 py-4 font-medium">Discount Value</th>
            <th className="w-[130px] px-2 py-4 font-medium">Start Date</th>
            <th className="w-[130px] px-2 py-4 font-medium">End Date</th>
            <th className="w-[120px] px-2 py-4 font-medium">Status</th>
            <th className="w-[100px] px-2 py-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="px-4 py-10 text-center text-muted-foreground"
              >
                No promotions in this view.
              </td>
            </tr>
          ) : (
            rows.map((row) => {
              const busy = busyId === row.id;
              return (
                <tr
                  key={row.id}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-4 py-4 font-medium">{row.name}</td>
                  <td className="px-2 py-4">{row.type}</td>
                  <td className="px-2 py-4">{row.discountValue}</td>
                  <td className="px-2 py-4 text-muted-foreground">
                    {row.startDate}
                  </td>
                  <td className="px-2 py-4 text-muted-foreground">
                    {row.endDate}
                  </td>
                  <td className="px-2 py-4">
                    <PromotionStatusBadge status={row.status} />
                  </td>
                  <td className="px-2 py-4">
                    <div className="relative flex items-center justify-end gap-1.5 pr-2">
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => onEdit(row)}
                        className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-60"
                        aria-label={`Edit ${row.name}`}
                      >
                        <Pencil className="size-[18px]" />
                      </button>
                      <div
                        ref={menuId === row.id ? menuRef : undefined}
                        className="relative"
                      >
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() =>
                            setMenuId((current) =>
                              current === row.id ? null : row.id,
                            )
                          }
                          className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-60"
                          aria-label={`More actions for ${row.name}`}
                        >
                          <MoreHorizontal className="size-[18px]" />
                        </button>
                        {menuId === row.id ? (
                          <div
                            role="menu"
                            className="absolute right-0 z-20 mt-1 min-w-[140px] rounded-md border border-border bg-card py-1 shadow-lg"
                          >
                            <button
                              type="button"
                              role="menuitem"
                              className="flex w-full px-3 py-2 text-left text-sm text-destructive hover:bg-muted"
                              onClick={() => {
                                setMenuId(null);
                                onDelete(row);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
