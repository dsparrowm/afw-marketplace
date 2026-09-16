import { RefreshCw, Search } from "lucide-react";

export type InventoryHeaderProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export function InventoryHeader({
  search,
  onSearchChange,
}: InventoryHeaderProps) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-[1.75rem] font-semibold leading-tight tracking-tight text-foreground">
          Inventory
        </h1>
        <p className="mt-1 max-w-xl text-sm text-muted-foreground">
          Track stock levels, configure low-stock triggers, and coordinate
          reorders.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <label className="relative block w-[220px]">
          <span className="sr-only">Search SKU or product</span>
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search SKU or product..."
            className="h-8 w-full rounded-md border border-border bg-card pr-3 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          />
        </label>
        <button
          type="button"
          className="inline-flex h-8 items-center gap-2 rounded-md bg-brand-green px-3.5 text-sm font-medium text-brand-green-foreground transition-colors hover:bg-brand-green/90"
        >
          <RefreshCw className="size-4" aria-hidden />
          Update Stock
        </button>
      </div>
    </header>
  );
}
