import type { AdminRoleDefinition } from "@/lib/mocks/admin-access";

export type AccessRolesDefinitionProps = {
  roles: AdminRoleDefinition[];
};

export function AccessRolesDefinition({ roles }: AccessRolesDefinitionProps) {
  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-foreground">
        Access Roles Definition
      </h2>
      {roles.length === 0 ? (
        <p className="text-sm text-muted-foreground">No roles defined yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-6 md:gap-y-5">
          {roles.map((role) => (
            <div key={role.id}>
              <h3 className="text-sm font-semibold text-foreground">
                {role.title}
              </h3>
              <p className="mt-1 text-sm leading-snug text-muted-foreground">
                {role.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
