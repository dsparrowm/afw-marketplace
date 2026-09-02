"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

/** Mobile catalog search — Figma `3:2196` */
export function MobileCatalogSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") ?? "";

  function updateQuery(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("q", value);
    else params.delete("q");
    params.delete("page");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <label className="relative block px-4" data-figma-node="3:2196">
      <span className="sr-only">Search catalog</span>
      <Search
        className="pointer-events-none absolute left-8 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <Input
        type="search"
        value={currentQuery}
        placeholder="Search African foods..."
        className="h-[54px] rounded-xl border-border bg-muted pl-12 text-base"
        onChange={(event) => updateQuery(event.target.value)}
      />
    </label>
  );
}
