"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { PromotionsHeader } from "@/components/admin/promotions/PromotionsHeader";
import { PromotionsTabs } from "@/components/admin/promotions/PromotionsTabs";
import { PromotionsTable } from "@/components/admin/promotions/PromotionsTable";
import { PromotionMetricCards } from "@/components/admin/promotions/PromotionMetricCards";
import { PromotionFormDialog } from "@/components/admin/promotions/PromotionFormDialog";
import {
  createPromotionAction,
  deletePromotionAction,
  updatePromotionAction,
} from "@/lib/admin/promotion-actions";
import {
  adminPromotionTabs,
  filterAdminPromotions,
  type AdminPromotionMetric,
  type AdminPromotionRow,
  type AdminPromotionTab,
} from "@/lib/mocks/admin-promotions";

export type PromotionsPageProps = {
  initialRows: AdminPromotionRow[];
  metrics: AdminPromotionMetric[];
  loadError?: string | null;
};

/** Promotions — live list + CRUD (Figma `72:1238` layout) */
export function PromotionsPage({
  initialRows,
  metrics,
  loadError = null,
}: PromotionsPageProps) {
  const router = useRouter();
  const [tab, setTab] = useState<AdminPromotionTab>("all");
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<AdminPromotionRow | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const rows = useMemo(
    () => filterAdminPromotions(initialRows, tab),
    [initialRows, tab],
  );

  function refresh() {
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-[1180px] px-8 py-8">
      <PromotionsHeader onCreate={() => setCreateOpen(true)} />

      {loadError ? (
        <p
          className="mt-4 rounded-md border border-admin-status-delayed bg-admin-status-delayed px-4 py-3 text-sm text-admin-status-delayed-foreground"
          role="alert"
        >
          Could not load promotions from staging: {loadError}
        </p>
      ) : null}
      {actionError ? (
        <p className="mt-4 text-sm text-destructive" role="alert">
          {actionError}
        </p>
      ) : null}
      {statusMessage ? (
        <p className="mt-4 text-sm text-admin-status-positive" role="status">
          {statusMessage}
        </p>
      ) : null}

      <div className="mt-5">
        <PromotionsTabs
          tabs={adminPromotionTabs}
          active={tab}
          onChange={setTab}
        />
      </div>

      <div className="mt-5">
        <PromotionsTable
          rows={rows}
          busyId={pending ? busyId : null}
          onEdit={(row) => {
            setActionError(null);
            setStatusMessage(null);
            setEditing(row);
          }}
          onDelete={(row) => {
            const confirmed = window.confirm(
              `Delete promotion ${row.code}? This cannot be undone.`,
            );
            if (!confirmed) return;
            setActionError(null);
            setStatusMessage(null);
            setBusyId(row.id);
            startTransition(async () => {
              const result = await deletePromotionAction(row.id);
              setBusyId(null);
              if (!result.ok) {
                setActionError(result.error);
                return;
              }
              setStatusMessage(`Deleted ${row.code}.`);
              refresh();
            });
          }}
        />
      </div>

      <div className="mt-6">
        <PromotionMetricCards metrics={metrics} />
      </div>

      <PromotionFormDialog
        open={createOpen}
        mode="create"
        onClose={() => setCreateOpen(false)}
        onSubmit={async (form) => {
          const result = await createPromotionAction(form);
          if (result.ok) {
            setStatusMessage(`Created ${form.code.toUpperCase()}.`);
            refresh();
          }
          return result;
        }}
      />

      <PromotionFormDialog
        open={Boolean(editing)}
        mode="edit"
        initial={editing}
        onClose={() => setEditing(null)}
        onSubmit={async (form) => {
          if (!editing) return { ok: false, error: "No promotion selected." };
          const result = await updatePromotionAction({
            id: editing.id,
            form,
          });
          if (result.ok) {
            setStatusMessage(`Updated ${form.code.toUpperCase()}.`);
            refresh();
          }
          return result;
        }}
      />
    </div>
  );
}
