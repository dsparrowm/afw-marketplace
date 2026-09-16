import type {
  AdminMemberStatus,
  AdminRoleDefinition,
  AdminTeamMember,
} from "@/lib/mocks/admin-access";
import type { ApiStaffRole, ApiStaffUser } from "@/types/api";

export function mapApiStaffUserToMember(user: ApiStaffUser): AdminTeamMember {
  const roleIds = user.roles
    .map((assignment) => assignment.roleId || assignment.role?.id)
    .filter((id): id is string => Boolean(id));

  const roleNames = user.roles
    .map((assignment) => assignment.role?.name?.trim())
    .filter(Boolean);

  const status: AdminMemberStatus = user.isActive ? "active" : "inactive";

  return {
    id: user.id,
    name: user.name || "—",
    email: user.email,
    role: roleNames.length > 0 ? roleNames.join(", ") : "—",
    roleIds,
    // API has no last-login field yet
    lastActive: "—",
    status,
    action: user.isActive ? "edit-role" : "reactivate",
  };
}

export function mapApiStaffRoleToDefinition(
  role: ApiStaffRole,
): AdminRoleDefinition {
  const keys = role.permissions
    .map((entry) => entry.permission?.key)
    .filter((key): key is string => Boolean(key))
    .sort();

  let description: string;
  if (keys.length === 0) {
    description = "No permissions assigned.";
  } else {
    const preview = keys.slice(0, 8).join(", ");
    const more =
      keys.length > 8 ? ` (+${keys.length - 8} more)` : "";
    description = `${keys.length} permissions: ${preview}${more}.`;
  }

  return {
    id: role.id,
    title: role.name,
    description,
  };
}
