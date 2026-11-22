"use client";

import { useState } from "react";
import { productCategories, products, type ProductCategory } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/format";

export function StoreGrid() {
  const [category, setCategory] = useState<"All" | ProductCategory>("All");
  const filtered =
    category === "All" ? products : products.filter((product) => product.category === category);

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter products by category">
          {productCategories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={cn(
                "min-h-10 border px-4 font-condensed text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition-colors",
                category === item
                  ? "border-gold bg-gold text-ink"
                  : "border-line text-cream-2 hover:border-cream hover:text-cream",
              )}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="font-condensed text-[0.65rem] uppercase tracking-[0.2em] text-cream-3">
          {filtered.length} {filtered.length === 1 ? "item" : "items"}
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
