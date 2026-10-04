"use client";

import { useState } from "react";
import type { PostWithMicrosite } from "@/lib/data";
import { PostCard } from "./cards";
import { cn } from "@/lib/utils";
import { Newspaper } from "lucide-react";

const FILTERS = [
  { value: null, label: "SEMUA" },
  { value: "Umum", label: "UMUM" },
  { value: "Kabar Program", label: "KABAR PROGRAM" },
  { value: "Kabar Event", label: "KABAR EVENT" },
  { value: "__connected", label: "TERHUBUNG MICROSITE" },
] as const;

export function BlogBrowser({ posts }: { posts: PostWithMicrosite[] }) {
  const [filter, setFilter] = useState<string | null>(null);

  const filtered = posts.filter((p) => {
    if (!filter) return true;
    if (filter === "__connected") return Boolean(p.micrositeId);
    return p.category === filter;
  });

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1.5">
        <Newspaper className="mr-1 h-4 w-4 text-ink-soft" />
        {FILTERS.map((f) => (
          <button
            key={f.label}
            onClick={() => setFilter(f.value)}
            className={cn(
              "border-2 border-ink px-3 py-1.5 font-mono text-[11px] tracking-wider transition-all",
              filter === f.value ? "bg-ink text-paper riso-shadow-sm" : "bg-paper hover:bg-riso-yellow"
            )}
          >
            {f.label}
          </button>
        ))}
        <span className="ml-auto font-mono text-[11px] tracking-widest text-ink-soft">{filtered.length} TULISAN</span>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <PostCard key={p.id} post={p} big={i === 0 && posts.length > 2} />
          ))}
        </div>
      ) : (
        <p className="mt-16 border-2 border-dashed border-ink p-16 text-center font-display text-xl uppercase">
          Belum ada tulisan pada kategori ini
        </p>
      )}
    </div>
  );
}
