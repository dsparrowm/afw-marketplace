import { AdminSidebar } from "@/components/admin/AdminSidebar";

export type AdminShellProps = {
  children: React.ReactNode;
};

/** Staff admin chrome — Figma Admin canvas `71:2` */
export function AdminShell({ children }: AdminShellProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <div className="min-h-screen min-w-0 flex-1 overflow-x-auto">{children}</div>
    </div>
  );
}
