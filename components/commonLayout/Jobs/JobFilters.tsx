"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { X } from "lucide-react";

export default function JobFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function handleSearch(term: string, key: string) {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set(key, term);
    } else {
      params.delete(key);
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  function handleClearFilters() {
    startTransition(() => {
      router.push(pathname);
    });
  }

  const hasFilters =
    searchParams.get("search") ||
    searchParams.get("category") ||
    searchParams.get("location");

  const inputStyle =
    "w-full h-11 px-4 rounded-lg border border-border bg-background text-foreground text-sm outline-none transition-all focus:ring-2 focus:ring-primary/40 focus:border-primary";

  return (
    <div
      className={`p-6 bg-card border border-border rounded-xl shadow-sm transition-opacity ${
        isPending ? "opacity-60" : "opacity-100"
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Search */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-muted-foreground">
            Search Job
          </label>
          <input
            type="text"
            placeholder="Frontend Developer"
            className={inputStyle}
            onChange={(e) => handleSearch(e.target.value, "search")}
            value={searchParams.get("search") || ""}
          />
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-muted-foreground">
            Category
          </label>
          <select
            className={`${inputStyle} appearance-none`}
            onChange={(e) => handleSearch(e.target.value, "category")}
            value={searchParams.get("category") || ""}
          >
            <option value="">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Marketing">Marketing</option>
            <option value="Design">Design</option>
          </select>
        </div>

        {/* Location */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-muted-foreground">
            Location
          </label>
          <input
            type="text"
            placeholder="Dhaka"
            className={inputStyle}
            onChange={(e) => handleSearch(e.target.value, "location")}
            value={searchParams.get("location") || ""}
          />
        </div>
      </div>

      {/* Clear Button */}
      {hasFilters && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleClearFilters}
            className="flex items-center gap-2 text-sm font-medium text-destructive hover:opacity-80 transition-opacity"
          >
            <X size={16} />
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}