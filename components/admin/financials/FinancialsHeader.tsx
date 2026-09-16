import { Calendar, Download } from "lucide-react";

export type FinancialsHeaderProps = {
  periodLabel: string;
};

export function FinancialsHeader({ periodLabel }: FinancialsHeaderProps) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-[1.75rem] font-semibold leading-tight tracking-tight text-foreground">
          Financials
        </h1>
        <p className="mt-1 max-w-xl text-sm text-muted-foreground">
          Track revenue, platform payouts, and marketplace operational fees.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="inline-flex h-8 items-center gap-2 rounded-md border border-border bg-card px-3.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          disabled
          aria-label={`Reporting period ${periodLabel}`}
        >
          <Calendar className="size-4 opacity-70" aria-hidden />
          {periodLabel}
        </button>
        <a
          href="/admin/financials/export"
          className="inline-flex h-8 items-center gap-2 rounded-md border border-border bg-card px-3.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <Download className="size-4 opacity-70" aria-hidden />
          Download Ledger
        </a>
      </div>
    </header>
  );
}
