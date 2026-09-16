"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AccessHeader } from "@/components/admin/access/AccessHeader";
import { TeamMembersTable } from "@/components/admin/access/TeamMembersTable";
import { AccessRolesDefinition } from "@/components/admin/access/AccessRolesDefinition";
import { InviteMemberDialog } from "@/components/admin/access/InviteMemberDialog";
import { EditRoleDialog } from "@/components/admin/access/EditRoleDialog";
import {
  inviteStaffMemberAction,
  setStaffActiveAction,
  updateStaffRoleAction,
} from "@/lib/admin/staff-actions";
import type {
  AdminRoleDefinition,
  AdminTeamMember,
} from "@/lib/mocks/admin-access";

export type AccessPageProps = {
  members: AdminTeamMember[];
  roles: AdminRoleDefinition[];
  currentStaffId?: string | null;
  loadError?: string | null;
};

/** Team & Access — live staff/roles + mutations (Figma `72:1589` layout) */
export function AccessPage({
  members,
  roles,
  currentStaffId = null,
  loadError = null,
}: AccessPageProps) {
  const router = useRouter();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [editing, setEditing] = useState<AdminTeamMember | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function refresh() {
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-[1180px] px-8 py-8">
      <AccessHeader onInvite={() => setInviteOpen(true)} />

      {loadError ? (
        <p className="mt-4 text-sm text-destructive" role="alert">
          {loadError}
        </p>
      ) : null}
      {actionError ? (
        <p className="mt-4 text-sm text-destructive" role="alert">
          {actionError}
        </p>
      ) : null}

      <div className="mt-6">
        {members.length === 0 && !loadError ? (
          <p className="rounded-xl border border-border bg-card px-4 py-8 text-center text-sm text-muted-foreground shadow-sm">
            No staff users found.
          </p>
        ) : members.length > 0 ? (
          <TeamMembersTable
            rows={members}
            currentStaffId={currentStaffId}
            busyId={pending ? busyId : null}
            onEditRole={(member) => {
              setActionError(null);
              setEditing(member);
            }}
            onRevoke={(member) => {
              if (currentStaffId && member.id === currentStaffId) {
                setActionError("You cannot revoke your own access.");
                return;
              }
              const confirmed = window.confirm(
                `Revoke access for ${member.name}? They will no longer be able to sign in.`,
              );
              if (!confirmed) return;
              setActionError(null);
              setBusyId(member.id);
              startTransition(async () => {
                const result = await setStaffActiveAction({
                  staffId: member.id,
                  isActive: false,
                });
                setBusyId(null);
                if (!result.ok) {
                  setActionError(result.error);
                  return;
                }
                refresh();
              });
            }}
            onReactivate={(member) => {
              setActionError(null);
              setBusyId(member.id);
              startTransition(async () => {
                const result = await setStaffActiveAction({
                  staffId: member.id,
                  isActive: true,
                });
                setBusyId(null);
                if (!result.ok) {
                  setActionError(result.error);
                  return;
                }
                refresh();
              });
            }}
          />
        ) : null}
      </div>

      <div className="mt-6">
        <AccessRolesDefinition roles={roles} />
      </div>

      <InviteMemberDialog
        open={inviteOpen}
        roles={roles}
        onClose={() => setInviteOpen(false)}
        onSubmit={async (input) => {
          const result = await inviteStaffMemberAction(input);
          if (result.ok) refresh();
          return result;
        }}
      />

      <EditRoleDialog
        open={Boolean(editing)}
        member={editing}
        roles={roles}
        onClose={() => setEditing(null)}
        onSubmit={async (input) => {
          const result = await updateStaffRoleAction(input);
          if (result.ok) refresh();
          return result;
        }}
      />
    </div>
  );
}
