"use server";

import { revalidatePath } from "next/cache";

import { createStaffUser, listStaffUsers, updateStaffUser } from "@/lib/api/staff";
import { getInteractiveStaffIdentity } from "@/lib/admin/staff-session";

export type StaffMutationResult =
  | { ok: true }
  | { ok: false; error: string };

async function isCurrentStaffUser(staffId: string): Promise<boolean> {
  const identity = await getInteractiveStaffIdentity();
  if (identity.id && identity.id === staffId) return true;
  if (!identity.email) return false;

  try {
    const listed = await listStaffUsers(
      { page: 1, limit: 50, search: identity.email },
      { auth: "session" },
    );
    return listed.data.some(
      (user) =>
        user.id === staffId &&
        user.email.trim().toLowerCase() === identity.email,
    );
  } catch {
    return false;
  }
}

export async function inviteStaffMemberAction(input: {
  name: string;
  email: string;
  password: string;
  roleId: string;
}): Promise<StaffMutationResult> {
  const name = input.name.trim();
  const email = input.email.trim();
  const password = input.password;
  const roleId = input.roleId.trim();

  if (!name || !email || !password) {
    return { ok: false, error: "Name, email, and password are required." };
  }
  if (password.length < 8) {
    return { ok: false, error: "Password must be at least 8 characters." };
  }

  try {
    await createStaffUser({
      name,
      email,
      password,
      roleIds: roleId ? [roleId] : undefined,
    });
    revalidatePath("/admin/access");
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to invite staff member.",
    };
  }
}

export async function updateStaffRoleAction(input: {
  staffId: string;
  roleId: string;
}): Promise<StaffMutationResult> {
  const staffId = input.staffId.trim();
  const roleId = input.roleId.trim();

  if (!staffId || !roleId) {
    return { ok: false, error: "Staff and role are required." };
  }

  try {
    await updateStaffUser(staffId, { roleIds: [roleId] });
    revalidatePath("/admin/access");
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "Unable to update staff role.",
    };
  }
}

export async function setStaffActiveAction(input: {
  staffId: string;
  isActive: boolean;
}): Promise<StaffMutationResult> {
  const staffId = input.staffId.trim();
  if (!staffId) {
    return { ok: false, error: "Staff id is required." };
  }

  if (!input.isActive && (await isCurrentStaffUser(staffId))) {
    return {
      ok: false,
      error: "You cannot revoke your own access.",
    };
  }

  try {
    await updateStaffUser(staffId, { isActive: input.isActive });
    revalidatePath("/admin/access");
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : input.isActive
            ? "Unable to reactivate staff member."
            : "Unable to revoke staff access.",
    };
  }
}
