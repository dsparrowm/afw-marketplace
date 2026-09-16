"use client";

import { MemberStatusBadge } from "@/components/admin/access/MemberStatusBadge";
import type { AdminTeamMember } from "@/lib/mocks/admin-access";

export type TeamMembersTableProps = {
  rows: AdminTeamMember[];
  currentStaffId?: string | null;
  busyId?: string | null;
  onEditRole: (member: AdminTeamMember) => void;
  onRevoke: (member: AdminTeamMember) => void;
  onReactivate: (member: AdminTeamMember) => void;
};

export function TeamMembersTable({
  rows,
  currentStaffId = null,
  busyId = null,
  onEditRole,
  onRevoke,
  onReactivate,
}: TeamMembersTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
      <table className="w-full min-w-[960px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            <th className="px-4 py-4 font-medium">Team Member</th>
            <th className="w-[280px] px-2 py-4 font-medium">Email Address</th>
            <th className="w-[140px] px-2 py-4 font-medium">Role</th>
            <th className="w-[160px] px-2 py-4 font-medium">Last Active</th>
            <th className="w-[120px] px-2 py-4 font-medium">Status</th>
            <th className="w-[180px] px-2 py-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const busy = busyId === row.id;
            const isCurrentUser = Boolean(
              currentStaffId && row.id === currentStaffId,
            );
            return (
              <tr key={row.id} className="border-b border-border last:border-0">
                <td className="px-4 py-4 font-medium">
                  {row.name}
                  {isCurrentUser ? (
                    <span className="ml-2 text-xs font-normal text-muted-foreground">
                      (you)
                    </span>
                  ) : null}
                </td>
                <td className="px-2 py-4 text-muted-foreground">{row.email}</td>
                <td className="px-2 py-4">{row.role}</td>
                <td className="px-2 py-4 text-muted-foreground">
                  {row.lastActive}
                </td>
                <td className="px-2 py-4">
                  <MemberStatusBadge status={row.status} />
                </td>
                <td className="px-2 py-4 text-right">
                  <MemberActions
                    member={row}
                    busy={busy}
                    isCurrentUser={isCurrentUser}
                    onEditRole={onEditRole}
                    onRevoke={onRevoke}
                    onReactivate={onReactivate}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function MemberActions({
  member,
  busy,
  isCurrentUser,
  onEditRole,
  onRevoke,
  onReactivate,
}: {
  member: AdminTeamMember;
  busy: boolean;
  isCurrentUser: boolean;
  onEditRole: (member: AdminTeamMember) => void;
  onRevoke: (member: AdminTeamMember) => void;
  onReactivate: (member: AdminTeamMember) => void;
}) {
  if (member.status === "inactive") {
    return (
      <button
        type="button"
        disabled={busy || isCurrentUser}
        onClick={() => onReactivate(member)}
        className="text-sm font-medium text-foreground underline-offset-4 hover:underline disabled:opacity-60"
      >
        {busy ? "Working…" : "Reactivate"}
      </button>
    );
  }

  return (
    <div className="inline-flex items-center justify-end gap-3">
      <button
        type="button"
        disabled={busy}
        onClick={() => onEditRole(member)}
        className="text-sm font-medium text-foreground underline-offset-4 hover:underline disabled:opacity-60"
      >
        Edit Role
      </button>
      {isCurrentUser ? (
        <span
          className="text-sm text-muted-foreground"
          title="You cannot revoke your own access"
        >
          You
        </span>
      ) : (
        <button
          type="button"
          disabled={busy}
          onClick={() => onRevoke(member)}
          className="text-sm font-medium text-destructive underline-offset-4 hover:underline disabled:opacity-60"
        >
          {busy ? "Working…" : "Revoke"}
        </button>
      )}
    </div>
  );
}
