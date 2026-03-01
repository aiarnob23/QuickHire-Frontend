"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";

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

  // clear filters
  function handleClearFilters() {
    startTransition(() => {
      router.push(pathname);
    });
  }

  const hasFilters = searchParams.get("search") || searchParams.get("category") || searchParams.get("location");

  return (
    <div className={`p-6 bg-white shadow-sm border rounded-xl transition-opacity ${isPending ? 'opacity-50' : 'opacity-100'}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search by Title */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Search Job</label>
          <input
            type="text"
            placeholder="e.g. Frontend Developer"
            className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-black"
            onChange={(e) => handleSearch(e.target.value, "search")}
            value={searchParams.get("search") || ""}
          />
        </div>

        {/* Filter by Category */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Category</label>
          <select
            className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-black"
            onChange={(e) => handleSearch(e.target.value, "category")}
            value={searchParams.get("category") || ""}
          >
            <option value="">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Marketing">Marketing</option>
            <option value="Design">Design</option>
          </select>
        </div>

        {/* Filter by Location */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Location</label>
          <input
            type="text"
            placeholder="e.g. Dhaka"
            className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-black"
            onChange={(e) => handleSearch(e.target.value, "location")}
            value={searchParams.get("location") || ""}
          />
        </div>
      </div>

      {/* Clear Filter Button */}
      {hasFilters && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleClearFilters}
            className="text-sm font-medium text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}