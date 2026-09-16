import Link from "next/link";
import { Plus, Search } from "lucide-react";

export type ProductsHeaderProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export function ProductsHeader({ search, onSearchChange }: ProductsHeaderProps) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-[1.75rem] font-semibold leading-tight tracking-tight text-foreground">
          Products
        </h1>
        <p className="mt-1 max-w-md text-sm text-muted-foreground">
          Manage your online store offerings, prices, and classifications.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <label className="relative block w-[220px]">
          <span className="sr-only">Search products</span>
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search products..."
            className="h-8 w-full rounded-md border border-border bg-card pr-3 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          />
        </label>
        <Link
          href="/admin/products/new"
          className="inline-flex h-8 items-center gap-2 rounded-md bg-brand-green px-3.5 text-sm font-medium text-brand-green-foreground transition-colors hover:bg-brand-green/90"
        >
          <Plus className="size-4" aria-hidden />
          Add Product
        </Link>
      </div>
    </header>
  );
}
