"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/** Galeri produk multi-gambar: tampak utama + thumbnail yang bisa dipilih. */
export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const src = images[active] ?? images[0];

  return (
    <div>
      <div className="border-2 border-ink bg-paper p-3 riso-shadow" style={{ ["--shadow-color" as string]: "#FF4D6D" }}>
        <div className="relative aspect-square overflow-hidden border-2 border-ink bg-paper-deep">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={src} src={src} alt={`${name} — foto ${active + 1}`} className="h-full w-full object-cover" />
          <span className="absolute bottom-3 right-3 border-2 border-ink bg-paper px-2 py-1 font-mono text-[10px] tracking-widest">
            {active + 1} / {images.length}
          </span>
        </div>
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Lihat foto ${i + 1}`}
              className={cn(
                "relative aspect-square overflow-hidden border-2 transition-all",
                i === active ? "border-ink riso-shadow-sm -translate-y-0.5" : "border-ink/30 opacity-60 hover:opacity-100"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
