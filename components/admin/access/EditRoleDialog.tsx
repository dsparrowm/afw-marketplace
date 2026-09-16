"use client";

import { useEffect, useId, useState, useTransition } from "react";
import { X } from "lucide-react";
import type {
  AdminRoleDefinition,
  AdminTeamMember,
} from "@/lib/mocks/admin-access";

const fieldClassName =
  "h-[37px] w-full rounded-md border border-border bg-muted/40 px-3.5 text-sm text-foreground focus-visible:bg-card focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

type EditRoleDialogProps = {
  open: boolean;
  member: AdminTeamMember | null;
  roles: AdminRoleDefinition[];
  onClose: () => void;
  onSubmit: (input: {
    staffId: string;
    roleId: string;
  }) => Promise<{ ok: true } | { ok: false; error: string }>;
};

export function EditRoleDialog({
  open,
  member,
  roles,
  onClose,
  onSubmit,
}: EditRoleDialogProps) {
  const titleId = useId();
  const [roleId, setRoleId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!open || !member) return;
    setRoleId(member.roleIds[0] ?? roles[0]?.id ?? "");
    setError(null);
  }, [open, member, roles]);

  if (!open || !member) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2
              id={titleId}
              className="text-lg font-semibold text-foreground"
            >
              Edit Role
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {member.name} · {member.email}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>

        <form
          className="mt-5 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            setError(null);
            startTransition(async () => {
              const result = await onSubmit({
                staffId: member.id,
                roleId,
              });
              if (!result.ok) {
                setError(result.error);
                return;
              }
              onClose();
            });
          }}
        >
          <label className="block space-y-1.5">
            <span className="text-sm text-muted-foreground">Role</span>
            <select
              className={fieldClassName}
              value={roleId}
              onChange={(event) => setRoleId(event.target.value)}
              required
            >
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.title}
                </option>
              ))}
            </select>
          </label>

          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 items-center rounded-md px-4 text-sm font-medium text-foreground hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={pending || !roleId}
              className="inline-flex h-9 items-center rounded-md bg-brand-green px-4 text-sm font-medium text-brand-green-foreground hover:bg-brand-green/90 disabled:opacity-60"
            >
              {pending ? "Saving…" : "Save Role"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
