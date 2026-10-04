"use client";

import { useMemo, useState } from "react";
import type { Artwork } from "@/db/schema";
import { ArtworkCard } from "./cards";
import { cn } from "@/lib/utils";
import { SearchX } from "lucide-react";

export function ArchiveBrowser({ artworks }: { artworks: Artwork[] }) {
  const years = useMemo(() => [...new Set(artworks.map((a) => a.year))].sort((a, b) => b - a), [artworks]);
  const techniques = useMemo(() => [...new Set(artworks.map((a) => a.technique))].sort(), [artworks]);
  const categories = useMemo(() => [...new Set(artworks.map((a) => a.category))].sort(), [artworks]);

  const [year, setYear] = useState<number | null>(null);
  const [technique, setTechnique] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  const filtered = artworks.filter(
    (a) => (!year || a.year === year) && (!technique || a.technique === technique) && (!category || a.category === category)
  );

  return (
    <div>
      {/* ===== Filter bar ===== */}
      <div className="sticky top-16 z-30 -mx-4 border-y-2 border-ink bg-paper px-4 py-4 sm:-mx-6 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3">
          <FilterGroup
            label="TEKNIK"
            options={techniques.map((t) => ({ value: t, label: t }))}
            active={technique}
            onChange={(v) => setTechnique(v as string | null)}
          />
          <FilterGroup
            label="TAHUN"
            options={years.map((y) => ({ value: y, label: String(y) }))}
            active={year}
            onChange={(v) => setYear(v as number | null)}
          />
          <FilterGroup
            label="KATEGORI"
            options={categories.map((c) => ({ value: c, label: c }))}
            active={category}
            onChange={(v) => setCategory(v as string | null)}
          />
          <span className="ml-auto font-mono text-[11px] tracking-widest text-ink-soft">
            {filtered.length} / {artworks.length} KARYA
          </span>
        </div>
      </div>

      {/* ===== Grid ===== */}
      {filtered.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((a) => (
            <ArtworkCard key={a.id} artwork={a} />
          ))}
        </div>
      ) : (
        <div className="mt-16 grid place-items-center border-2 border-dashed border-ink p-16 text-center">
          <SearchX className="h-10 w-10 text-ink/30" />
          <p className="mt-4 font-display text-xl uppercase">Tidak ada karya pada filter ini</p>
          <button
            onClick={() => {
              setYear(null);
              setTechnique(null);
              setCategory(null);
            }}
            className="mt-5 border-2 border-ink bg-ink px-5 py-2 font-mono text-xs tracking-widest text-paper transition-transform hover:-translate-y-0.5"
          >
            RESET FILTER
          </button>
        </div>
      )}
    </div>
  );
}

function FilterGroup({
  label,
  options,
  active,
  onChange,
}: {
  label: string;
  options: { value: string | number; label: string }[];
  active: string | number | null;
  onChange: (value: string | number | null) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="mr-1 font-mono text-[10px] font-semibold tracking-[0.25em] text-ink-soft">{label}:</span>
      {options.map((o) => (
        <button
          key={String(o.value)}
          onClick={() => onChange(active === o.value ? null : o.value)}
          className={cn(
            "border-2 border-ink px-2.5 py-1 font-mono text-[11px] tracking-wider transition-all",
            active === o.value ? "bg-ink text-paper riso-shadow-sm" : "bg-paper hover:bg-riso-yellow"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
