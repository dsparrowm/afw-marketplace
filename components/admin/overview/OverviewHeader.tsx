import Link from "next/link";
import { ExternalLink, FileChartColumn } from "lucide-react";
import type { AdminProfile } from "@/lib/mocks/admin-overview";

function greetingForHour(hour: number): string {
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export type OverviewHeaderProps = {
  profile: AdminProfile;
  /** Fixed hour for SSR-stable greeting; omit to use current hour on client only pages */
  hour?: number;
};

export function OverviewHeader({ profile, hour = 9 }: OverviewHeaderProps) {
  const greeting = greetingForHour(hour);

  return (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-[1.75rem] font-semibold leading-tight tracking-tight text-foreground">
          {greeting}, {profile.firstName}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here&apos;s what&apos;s happening with your store today.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-8 items-center gap-2 rounded-md border border-border bg-card px-3.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <ExternalLink className="size-4 opacity-70" aria-hidden />
          Live Storefront
        </Link>
        <button
          type="button"
          className="inline-flex h-8 items-center gap-2 rounded-md border border-border bg-card px-3.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <FileChartColumn className="size-4 opacity-70" aria-hidden />
          Export Daily Summary
        </button>
      </div>
    </header>
  );
}
