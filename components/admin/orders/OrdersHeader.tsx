import { Calendar, Search } from "lucide-react";
import { adminOrderDateRange } from "@/lib/mocks/admin-orders";

export type OrdersHeaderProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export function OrdersHeader({ search, onSearchChange }: OrdersHeaderProps) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-[1.75rem] font-semibold leading-tight tracking-tight text-foreground">
          Orders &amp; Delivery
        </h1>
        <p className="mt-1 max-w-xl text-sm text-muted-foreground">
          Fulfill customer orders, print shipping labels, and track delivery
          partners.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <label className="relative block w-[220px]">
          <span className="sr-only">Search orders</span>
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search Order # or customer..."
            className="h-8 w-full rounded-md border border-border bg-card pr-3 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          />
        </label>
        <button
          type="button"
          className="inline-flex h-8 items-center gap-2 rounded-md border border-border bg-card px-3.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <Calendar className="size-4 opacity-70" aria-hidden />
          {adminOrderDateRange}
        </button>
      </div>
    </header>
  );
}
