"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  parseQueryState,
  buildQuery,
  toggleMultiValue,
  defaultState,
  QueryState,
} from "@/lib/utils/query";
import qs from "query-string";
import { useState } from "react";

interface FiltersProps {
  initialState: QueryState;
  mobileOnly?: boolean;
  resetButton?: boolean;
}

const genderOptions = [
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
  { value: "unisex", label: "Unisex" },
];
const sizeOptions = ["7", "8", "9", "10", "11", "12"].map((s) => ({
  value: s,
  label: s,
}));
const colorOptions = ["white", "black", "red", "blue", "green", "gray"].map(
  (c) => ({ value: c, label: c.charAt(0).toUpperCase() + c.slice(1) })
);
const priceOptions = [
  { value: "0-50", label: "$0 - $50" },
  { value: "50-100", label: "$50 - $100" },
  { value: "100-150", label: "$100 - $150" },
  { value: "150-999", label: "$150+" },
];

export default function Filters({
  initialState,
  mobileOnly,
  resetButton,
}: FiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const state = parseQueryState(Object.fromEntries(searchParams.entries()));

  const update = (partial: Partial<QueryState>) => {
    const prev = Object.fromEntries(searchParams.entries());
    const next = buildQuery(prev, partial as any);
    router.push(`${pathname}?${next}`, { scroll: false });
  };

  const toggleValue = (key: keyof QueryState, value: string) => {
    const arr = (state as any)[key] as string[];
    const nextArr = toggleMultiValue(arr, value);
    update({ [key]: nextArr } as any);
  };

  if (mobileOnly) {
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden px-3 py-2 border rounded-md text-sm"
        >
          Filters
        </button>
        {open && (
          <div className="fixed inset-0 z-50 flex">
            <div className="bg-white w-80 p-5 overflow-y-auto shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">Filters</h2>
                <button onClick={() => setOpen(false)} aria-label="Close">
                  ✕
                </button>
              </div>
              <FilterGroups state={state} toggleValue={toggleValue} />
              <button
                onClick={() => {
                  update(defaultState);
                  setOpen(false);
                }}
                className="mt-6 w-full text-sm underline"
              >
                Clear all
              </button>
            </div>
            <div
              className="flex-1 bg-black/40"
              onClick={() => setOpen(false)}
            />
          </div>
        )}
      </>
    );
  }

  if (resetButton) {
    return (
      <button
        onClick={() => update(defaultState)}
        className="px-4 py-2 bg-dark-900 text-white rounded-md text-sm"
      >
        Reset Filters
      </button>
    );
  }

  return (
    <div className="space-y-6">
      <FilterGroups state={state} toggleValue={toggleValue} />
      <button
        onClick={() => update(defaultState)}
        className="text-xs underline"
      >
        Clear all
      </button>
    </div>
  );
}

interface FGProps {
  state: QueryState;
  toggleValue: (k: keyof QueryState, v: string) => void;
}
function FilterGroups({ state, toggleValue }: FGProps) {
  return (
    <div className="space-y-6">
      <FilterSection title="Gender">
        {genderOptions.map((o) => (
          <Checkbox
            key={o.value}
            checked={state.gender.includes(o.value)}
            label={o.label}
            onChange={() => toggleValue("gender", o.value)}
          />
        ))}
      </FilterSection>
      <FilterSection title="Size">
        {sizeOptions.map((o) => (
          <Checkbox
            key={o.value}
            checked={state.size.includes(o.value)}
            label={o.label}
            onChange={() => toggleValue("size", o.value)}
          />
        ))}
      </FilterSection>
      <FilterSection title="Color">
        {colorOptions.map((o) => (
          <Checkbox
            key={o.value}
            checked={state.color.includes(o.value)}
            label={o.label}
            onChange={() => toggleValue("color", o.value)}
          />
        ))}
      </FilterSection>
      <FilterSection title="Price">
        {priceOptions.map((o) => (
          <Checkbox
            key={o.value}
            checked={state.price.includes(o.value)}
            label={o.label}
            onChange={() => toggleValue("price", o.value)}
          />
        ))}
      </FilterSection>
    </div>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="text-sm font-semibold mb-2">{title}</h3>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm cursor-pointer">
      <input
        type="checkbox"
        className="accent-black"
        checked={checked}
        onChange={onChange}
      />
      <span>{label}</span>
    </label>
  );
}
