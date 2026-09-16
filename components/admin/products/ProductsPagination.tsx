import { cn } from "@/lib/utils";

export type ProductsPaginationProps = {
  page: number;
  totalPages: number;
  showingFrom: number;
  showingTo: number;
  total: number;
  onPageChange: (page: number) => void;
  /** Defaults to "products" — customers screen uses "clients" */
  itemLabel?: string;
};

export function ProductsPagination({
  page,
  totalPages,
  showingFrom,
  showingTo,
  total,
  onPageChange,
  itemLabel = "products",
}: ProductsPaginationProps) {
  const pages = Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-muted-foreground">
        Showing {showingFrom}-{showingTo} of {total.toLocaleString("en-CA")}{" "}
        {itemLabel}
      </p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="inline-flex h-8 items-center rounded-md border border-border bg-card px-3.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            onClick={() => onPageChange(pageNumber)}
            className={cn(
              "inline-flex size-8 items-center justify-center rounded-md border text-sm font-medium",
              pageNumber === page
                ? "border-admin-nav-active bg-admin-nav-active text-admin-nav-active-foreground"
                : "border-border bg-card text-foreground hover:bg-muted",
            )}
            aria-current={pageNumber === page ? "page" : undefined}
          >
            {pageNumber}
          </button>
        ))}
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="inline-flex h-8 items-center rounded-md border border-border bg-card px-3.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
