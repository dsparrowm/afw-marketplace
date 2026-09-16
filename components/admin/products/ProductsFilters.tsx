import { ChevronDown } from "lucide-react";
import { adminProductStatuses } from "@/lib/mocks/admin-products";

export type ProductsFiltersProps = {
  category: string;
  status: string;
  origin: string;
  categoryOptions: readonly string[];
  originOptions: readonly string[];
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onOriginChange: (value: string) => void;
  onReset: () => void;
};

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly { value: string; label: string }[] | readonly string[];
  onChange: (value: string) => void;
}) {
  const normalized = options.map((option) =>
    typeof option === "string"
      ? { value: option, label: option }
      : option,
  );

  return (
    <label className="relative inline-flex h-7 items-center">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-7 appearance-none rounded-md border border-border bg-card py-0 pr-8 pl-3 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        {normalized.map((option) => (
          <option key={option.value} value={option.value}>
            {label}: {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-2 size-3.5 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
    </label>
  );
}

export function ProductsFilters({
  category,
  status,
  origin,
  categoryOptions,
  originOptions,
  onCategoryChange,
  onStatusChange,
  onOriginChange,
  onReset,
}: ProductsFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <FilterSelect
        label="Category"
        value={category}
        options={categoryOptions}
        onChange={onCategoryChange}
      />
      <FilterSelect
        label="Status"
        value={status}
        options={adminProductStatuses}
        onChange={onStatusChange}
      />
      <FilterSelect
        label="Origin"
        value={origin}
        options={originOptions}
        onChange={onOriginChange}
      />
      <button
        type="button"
        onClick={onReset}
        className="h-8 rounded-md px-3.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
      >
        Reset Filters
      </button>
    </div>
  );
}
