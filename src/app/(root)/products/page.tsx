import Card from "@/components/Card";
import Filters from "@/components/Filters";
import Sort from "@/components/Sort";
import { parseQueryState, parseFilterParams } from "@/lib/utils/query";
import { getAllProducts } from "@/lib/actions/product";

interface ProductsPageProps {
  // In newer Next.js versions searchParams can be provided as an async object.
  searchParams:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams; // awaiting supports both promise & plain object
  const state = parseQueryState(params || {});
  const filters = parseFilterParams(params || {});
  const { products: dbProducts, totalCount } = await getAllProducts(filters);
  const appliedFilters = [] as { key: string; value: string; label: string }[]; // TODO: map labels (gender/color/size etc.) using lookup tables

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar (desktop) / Drawer trigger (mobile) */}
        <div className="hidden lg:block w-64 shrink-0">
          <Filters initialState={state} />
        </div>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-dark-900 mb-1">New</h1>
              <p className="text-dark-600 text-sm">{totalCount} products</p>
            </div>
            <div className="flex items-center gap-4">
              <Filters initialState={state} mobileOnly />
              <Sort sort={state.sort} />
            </div>
          </div>
          {/* Active filter badges */}
          {appliedFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {appliedFilters.map((f) => (
                <span
                  key={f.key + f.value}
                  className="px-3 py-1 bg-light-200 text-dark-700 text-xs rounded-full"
                >
                  {f.label}
                </span>
              ))}
            </div>
          )}
          {dbProducts.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {dbProducts.map((p) => (
                <Card
                  key={p.id}
                  id={p.id}
                  title={p.name}
                  description={p.description || undefined}
                  // Prefer minPrice (sale/variant) then fallback to max
                  price={p.minPrice ?? p.maxPrice ?? 0}
                  image={p.imageUrls[0] || "/shoes/shoe-1.jpg"}
                  category={p.gender || ""}
                  inStock={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-dark-600 mb-4">
                No products match your filters.
              </p>
              <Filters initialState={state} resetButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
