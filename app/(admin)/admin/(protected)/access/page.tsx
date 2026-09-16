import type { Metadata } from "next";
import { AccessPage } from "@/components/admin/access/AccessPage";
import { loadAdminAccess } from "@/lib/admin/load-admin-access";

export const metadata: Metadata = {
  title: "Team & Access · Admin · AFW Marketplace",
};

export default async function AdminAccessRoute() {
  const result = await loadAdminAccess();

  return (
    <AccessPage
      members={result.members}
      roles={result.roles}
      currentStaffId={result.currentStaffId}
      loadError={result.error}
    />
  );
}
