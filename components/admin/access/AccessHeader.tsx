"use client";

import { Plus } from "lucide-react";

export type AccessHeaderProps = {
  onInvite: () => void;
};

export function AccessHeader({ onInvite }: AccessHeaderProps) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-[1.75rem] font-semibold leading-tight tracking-tight text-foreground">
          Team &amp; Access
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Configure role-based access control rules, invite warehouse staff, and
          check system logs.
        </p>
      </div>
      <button
        type="button"
        onClick={onInvite}
        className="inline-flex h-8 items-center gap-2 rounded-md bg-brand-green px-3.5 text-sm font-medium text-brand-green-foreground transition-colors hover:bg-brand-green/90"
      >
        <Plus className="size-4" aria-hidden />
        Invite Member
      </button>
    </header>
  );
}
