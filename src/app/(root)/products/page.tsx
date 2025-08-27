import Card from "@/components/Card";
import Filters from "@/components/Filters";
import Sort from "@/components/Sort";
import {
  parseQueryState,
  applyFiltersAndSort,
  mockProducts,
} from "@/lib/utils/query";

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
  const { products, appliedFilters } = applyFiltersAndSort(mockProducts, state);

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
              <p className="text-dark-600 text-sm">
                {products.length} products
              </p>
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
          {products.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((p) => (
                <Card
                  key={p.id}
                  id={p.id}
                  title={p.name}
                  description={p.description}
                  price={p.price}
                  image={p.image}
                  category={p.gender}
                  inStock={p.inStock}
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
