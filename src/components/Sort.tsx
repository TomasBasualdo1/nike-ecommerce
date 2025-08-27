"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { buildQuery, parseQueryState, SortOption } from "@/lib/utils/query";

interface SortProps {
  sort: SortOption;
}

const options: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price_desc", label: "Price (High → Low)" },
  { value: "price_asc", label: "Price (Low → High)" },
];

export default function Sort({ sort }: SortProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const state = parseQueryState(Object.fromEntries(searchParams.entries()));

  return (
    <select
      value={sort}
      onChange={(e) => {
        const prev = Object.fromEntries(searchParams.entries());
        const next = buildQuery(prev, { sort: e.target.value });
        router.push(`${pathname}?${next}`, { scroll: false });
      }}
      className="border rounded-md px-3 py-2 text-sm"
      aria-label="Sort products"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
