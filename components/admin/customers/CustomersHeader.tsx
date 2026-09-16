import { Search } from "lucide-react";

export type CustomersHeaderProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export function CustomersHeader({
  search,
  onSearchChange,
}: CustomersHeaderProps) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-[1.75rem] font-semibold leading-tight tracking-tight text-foreground">
          Customers
        </h1>
        <p className="mt-1 max-w-xl text-sm text-muted-foreground">
          View client order history, active retention rates, and local
          demographic metrics.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <label className="relative block w-[220px]">
          <span className="sr-only">Search customers</span>
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search customers..."
            className="h-8 w-full rounded-md border border-border bg-card pr-3 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          />
        </label>
        <button
          type="button"
          className="inline-flex h-8 items-center rounded-md border border-border bg-card px-3.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Export List
        </button>
      </div>
    </header>
  );
}
