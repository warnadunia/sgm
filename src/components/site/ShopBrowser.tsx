"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/db/schema";
import { ProductCard } from "./cards";
import { cn } from "@/lib/utils";

export function ShopBrowser({ products }: { products: Product[] }) {
  const categories = useMemo(() => [...new Set(products.map((p) => p.category))].sort(), [products]);
  const [category, setCategory] = useState<string | null>(null);
  const filtered = category ? products.filter((p) => p.category === category) : products;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="mr-2 font-mono text-[10px] font-semibold tracking-[0.25em] text-ink-soft">KATEGORI:</span>
        <button
          onClick={() => setCategory(null)}
          className={cn(
            "border-2 border-ink px-3 py-1.5 font-mono text-[11px] tracking-wider transition-all",
            !category ? "bg-ink text-paper riso-shadow-sm" : "bg-paper hover:bg-riso-yellow"
          )}
        >
          SEMUA
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(category === c ? null : c)}
            className={cn(
              "border-2 border-ink px-3 py-1.5 font-mono text-[11px] tracking-wider transition-all",
              category === c ? "bg-ink text-paper riso-shadow-sm" : "bg-paper hover:bg-riso-yellow"
            )}
          >
            {c.toUpperCase()}
          </button>
        ))}
        <span className="ml-auto font-mono text-[11px] tracking-widest text-ink-soft">{filtered.length} PRODUK</span>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
