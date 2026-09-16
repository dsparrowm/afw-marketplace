"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { brandAssets } from "@/lib/brand/assets";
import {
  adminHelpItem,
  adminNavItems,
  isAdminNavActive,
} from "@/lib/admin/nav";
import { adminLogoutAction } from "@/lib/admin/staff-auth-actions";
import { adminOverviewProfile } from "@/lib/mocks/admin-overview";
import { cn } from "@/lib/utils";

/** Admin sidebar — Figma `72:9` */
export function AdminSidebar() {
  const pathname = usePathname();
  const profile = adminOverviewProfile;

  return (
    <aside className="flex h-screen w-[260px] shrink-0 flex-col border-r border-border bg-admin-sidebar">
      <div className="flex flex-1 flex-col px-4 pt-6">
        <Link href="/admin" className="mb-7 block px-2">
          <Image
            src={brandAssets.logo}
            alt="AFW African Food Warehouse"
            width={105}
            height={62}
            className="h-[62px] w-auto object-contain"
            priority
          />
        </Link>

        <nav className="flex flex-col gap-1" aria-label="Admin">
          {adminNavItems.map((item) => {
            const active = isAdminNavActive(pathname, item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex h-[34px] items-center gap-3 rounded-md px-3 text-sm transition-colors",
                  active
                    ? "bg-admin-nav-active font-medium text-admin-nav-active-foreground"
                    : "text-foreground/80 hover:bg-muted hover:text-foreground",
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="size-[18px] shrink-0 opacity-80" aria-hidden />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-4 pb-6">
        <Link
          href={adminHelpItem.href}
          className="flex h-[34px] items-center gap-3 rounded-md px-3 text-sm text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
        >
          <adminHelpItem.icon
            className="size-[18px] shrink-0 opacity-80"
            aria-hidden
          />
          <span>{adminHelpItem.label}</span>
        </Link>

        <div className="my-2 border-t border-border" />

        <div className="flex items-center gap-3 px-2 py-2">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-admin-nav-active text-xs font-semibold text-admin-nav-active-foreground"
            aria-hidden
          >
            {profile.initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium leading-tight">
              {profile.fullName}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {profile.role}
            </p>
          </div>
          <form action={adminLogoutAction}>
            <button
              type="submit"
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Log out"
            >
              <LogOut className="size-4" />
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
