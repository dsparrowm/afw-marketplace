import "server-only";

import { listStaffRoles, listStaffUsers } from "@/lib/api/staff";
import {
  mapApiStaffRoleToDefinition,
  mapApiStaffUserToMember,
} from "@/lib/admin/map-admin-access";
import { getInteractiveStaffIdentity } from "@/lib/admin/staff-session";
import type {
  AdminRoleDefinition,
  AdminTeamMember,
} from "@/lib/mocks/admin-access";
import type { ApiStaffUser } from "@/types/api";

export type AdminAccessLoadResult = {
  members: AdminTeamMember[];
  roles: AdminRoleDefinition[];
  currentStaffId: string | null;
  error: string | null;
};

async function loadAllStaffUsers(): Promise<ApiStaffUser[]> {
  const first = await listStaffUsers(
    { page: 1, limit: 50 },
    { auth: "session" },
  );
  const users = [...first.data];
  const totalPages = first.meta.totalPages || 1;

  for (let page = 2; page <= totalPages; page += 1) {
    const next = await listStaffUsers(
      { page, limit: 50 },
      { auth: "session" },
    );
    users.push(...next.data);
  }

  return users;
}

function resolveCurrentStaffId(
  users: ApiStaffUser[],
  identity: { id: string | null; email: string | null },
): string | null {
  if (identity.id) {
    const byId = users.find((user) => user.id === identity.id);
    if (byId) return byId.id;
  }
  if (identity.email) {
    const byEmail = users.find(
      (user) => user.email.trim().toLowerCase() === identity.email,
    );
    if (byEmail) return byEmail.id;
  }
  // JWT sub may be staff id even when not present in a truncated list page.
  return identity.id;
}

/** Loads Team & Access data via interactive staff session. */
export async function loadAdminAccess(): Promise<AdminAccessLoadResult> {
  try {
    // Resolve identity first so JWT sub is available even if list calls share
    // the request-memoized access token.
    const identity = await getInteractiveStaffIdentity();
    const [users, roles] = await Promise.all([
      loadAllStaffUsers(),
      listStaffRoles({ auth: "session" }),
    ]);

    return {
      members: users.map(mapApiStaffUserToMember),
      roles: roles.map(mapApiStaffRoleToDefinition),
      currentStaffId: resolveCurrentStaffId(users, identity),
      error: null,
    };
  } catch (error) {
    return {
      members: [],
      roles: [],
      currentStaffId: null,
      error:
        error instanceof Error
          ? error.message
          : "Unable to load staff and roles.",
    };
  }
}
