import type { ContentBlock } from "@/lib/blocks";
import { MiniRich } from "./MiniRich";
import { Reveal } from "@/components/motion/Reveal";

/** Render blok-blok konten microsite (jadwal, partisipan, info, galeri, richtext). */
export function BlockRenderer({ blocks, accent }: { blocks: ContentBlock[]; accent: string }) {
  return (
    <div className="space-y-14">
      {blocks.map((block, i) => (
        <Reveal key={i} delay={0.05}>
          <BlockSection block={block} accent={accent} index={i} />
        </Reveal>
      ))}
    </div>
  );
}

function BlockSection({ block, accent, index }: { block: ContentBlock; accent: string; index: number }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <section className="relative border-2 border-ink bg-paper p-6 sm:p-8 riso-shadow" style={{ ["--shadow-color" as string]: accent }}>
      {block.heading && (
        <div className="mb-6 flex items-baseline gap-4">
          <span className="font-mono text-xs tracking-widest text-ink-soft">{num}</span>
          <h3 className="font-display text-xl uppercase sm:text-2xl">{block.heading}</h3>
          <span className="h-0.5 flex-1 -translate-y-1" style={{ backgroundColor: accent }} />
        </div>
      )}

      {block.type === "richtext" && <MiniRich text={block.body} className="max-w-3xl text-[15px] text-ink-soft" />}

      {block.type === "schedule" && (
        <ol className="divide-y-2 divide-ink/10">
          {block.items.map((item, j) => (
            <li key={j} className="group grid gap-1 py-3 sm:grid-cols-[180px_1fr] sm:gap-6">
              <span className="font-mono text-xs tracking-wider text-ink-soft pt-1">{item.time}</span>
              <span>
                <span className="font-semibold transition-colors text-[15px]" style={{ color: "inherit" }}>
                  {item.title}
                </span>
                {item.note && <span className="block text-sm text-ink-soft">{item.note}</span>}
              </span>
            </li>
          ))}
        </ol>
      )}

      {block.type === "lineup" && (
        <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {block.items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 border-b-2 border-dashed border-ink/20 pb-3">
              <span className="mt-1.5 h-3 w-3 shrink-0 border-2 border-ink" style={{ backgroundColor: accent }} />
              <span>
                <span className="block font-display text-base uppercase leading-tight">{item.name}</span>
                {item.role && <span className="text-sm text-ink-soft">{item.role}</span>}
              </span>
            </li>
          ))}
        </ul>
      )}

      {block.type === "info" && (
        <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2" id="tiket">
          {block.items.map((item, j) => (
            <div key={j} className="border-l-4 pl-4" style={{ borderColor: accent }}>
              <dt className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink-soft">{item.label}</dt>
              <dd className="mt-1 font-medium text-[15px]">{item.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {block.type === "gallery" && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {block.images.map((src, j) => (
            <figure key={j} className="group relative aspect-square overflow-hidden border-2 border-ink">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Dokumentasi ${j + 1}`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
