import qs from "query-string";

export type SortOption = "featured" | "newest" | "price_asc" | "price_desc";
export interface QueryState {
  gender: string[];
  size: string[];
  color: string[];
  price: string[]; // e.g. ['0-50','50-100'] ranges
  sort: SortOption;
}

export const defaultState: QueryState = {
  gender: [],
  size: [],
  color: [],
  price: [],
  sort: "featured",
};

export function parseQueryState(
  params: Record<string, string | string[] | undefined>
): QueryState {
  const getArray = (k: string): string[] => {
    const v = params[k];
    if (!v) return [];
    return Array.isArray(v) ? v : v.split(",");
  };
  return {
    gender: getArray("gender"),
    size: getArray("size"),
    color: getArray("color"),
    price: getArray("price"),
    sort: (params.sort as SortOption) || "featured",
  };
}

export function buildQuery(
  prev: Record<string, any>,
  updates: Partial<Record<keyof QueryState, string[] | string | undefined>>
): string {
  const next: Record<string, any> = { ...prev };
  for (const [k, v] of Object.entries(updates)) {
    if (v === undefined) continue;
    if (Array.isArray(v)) {
      if (!v.length) delete next[k];
      else next[k] = v.join(",");
    } else if (v === "" || v == null) {
      delete next[k];
    } else {
      next[k] = v;
    }
  }
  return qs.stringify(next, { sort: false });
}

// Mock product model similar to DB shape subset
export interface MockProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  gender: string; // men|women|unisex
  colors: string[];
  sizes: string[];
  image: string;
  inStock: boolean;
  createdAt: string;
}

export const mockProducts: MockProduct[] = [
  {
    id: "1",
    name: "Nike Air Force 1 Mid '07",
    description: "Classic cushioning and street style.",
    price: 98.3,
    gender: "men",
    colors: ["white", "black"],
    sizes: ["8", "9", "10"],
    image: "/shoes/shoe-1.jpg",
    inStock: true,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: "2",
    name: "Nike Court Vision Low Next Nature",
    description: "Retro basketball inspiration.",
    price: 98.3,
    gender: "men",
    colors: ["black", "blue"],
    sizes: ["9", "10", "11"],
    image: "/shoes/shoe-2.webp",
    inStock: true,
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
  {
    id: "3",
    name: "Nike Air Max SYSTM",
    description: "Visible Air cushioning everyday.",
    price: 98.3,
    gender: "men",
    colors: ["red", "white"],
    sizes: ["8", "9"],
    image: "/shoes/shoe-3.webp",
    inStock: true,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "4",
    name: "Nike Blazer Low '77 Jumbo",
    description: "Bold Swoosh heritage style.",
    price: 98.3,
    gender: "women",
    colors: ["white", "blue"],
    sizes: ["7", "8", "9"],
    image: "/shoes/shoe-15.avif",
    inStock: true,
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
];

export interface AppliedFilterItem {
  key: string;
  value: string;
  label: string;
}

export function applyFiltersAndSort(
  data: MockProduct[],
  state: QueryState
): { products: MockProduct[]; appliedFilters: AppliedFilterItem[] } {
  let result = data.filter((p) => {
    if (state.gender.length && !state.gender.includes(p.gender)) return false;
    if (state.color.length && !p.colors.some((c) => state.color.includes(c)))
      return false;
    if (state.size.length && !p.sizes.some((s) => state.size.includes(s)))
      return false;
    if (state.price.length) {
      const inRange = state.price.some((r) => {
        const [min, max] = r.split("-").map(Number);
        return (
          p.price >= (isNaN(min) ? 0 : min) &&
          p.price <= (isNaN(max) ? Infinity : max)
        );
      });
      if (!inRange) return false;
    }
    return true;
  });

  switch (state.sort) {
    case "price_asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
    default:
      break; // featured retains original mock ordering
  }

  const applied: AppliedFilterItem[] = [];
  state.gender.forEach((g) =>
    applied.push({
      key: "gender",
      value: g,
      label: g.charAt(0).toUpperCase() + g.slice(1),
    })
  );
  state.color.forEach((c) =>
    applied.push({ key: "color", value: c, label: c })
  );
  state.size.forEach((s) =>
    applied.push({ key: "size", value: s, label: `Size ${s}` })
  );
  state.price.forEach((r) =>
    applied.push({
      key: "price",
      value: r,
      label: `$${r.replace("-", " to $")}`,
    })
  );

  return { products: result, appliedFilters: applied };
}

export function toggleMultiValue(
  paramValues: string[],
  value: string
): string[] {
  return paramValues.includes(value)
    ? paramValues.filter((v) => v !== value)
    : [...paramValues, value];
}
