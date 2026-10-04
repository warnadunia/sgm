import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getArtwork } from "@/lib/data";
import { parseJsonArray } from "@/lib/utils";
import { MiniRich } from "@/components/site/MiniRich";
import { Reveal } from "@/components/motion/Reveal";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArtwork(slug);
  if (!a) return { title: "Karya tidak ditemukan" };
  return { title: `${a.title} — ${a.artist}`, description: a.description || undefined };
}

export default async function ArtworkPage({ params }: Props) {
  const { slug } = await params;
  const a = await getArtwork(slug);
  if (!a) notFound();

  const images = parseJsonArray(a.images);

  return (
    <article className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Link
        href="/arsip"
        className="inline-flex items-center gap-2 border-2 border-ink bg-paper px-3 py-1.5 font-mono text-[11px] tracking-[0.15em] uppercase transition-transform hover:-translate-x-1"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Kembali ke arsip
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-4">
          {images.map((src, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <figure className="border-2 border-ink bg-paper p-3 riso-shadow" style={{ ["--shadow-color" as string]: "#2438D8" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`${a.title} — tampak ${i + 1}`} className="w-full border-2 border-ink object-cover" />
                <figcaption className="mt-3 flex justify-between px-1 font-mono text-[10px] tracking-[0.2em] uppercase text-ink-soft">
                  <span>
                    {a.title} — {a.artist}
                  </span>
                  <span>
                    {i + 1}/{images.length}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <Reveal delay={0.1}>
            <p className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] uppercase text-riso-blue">
              <span className="inline-block h-3 w-3 border-2 border-ink bg-riso-blue" />
              {a.category} — {a.technique}
            </p>
            <h1 className="mt-3 font-display text-4xl uppercase leading-none sm:text-5xl">{a.title}</h1>
            <p className="mt-2 font-serif text-xl italic text-ink-soft">{a.artist}</p>

            <dl className="mt-8 divide-y-2 divide-ink/10 border-2 border-ink bg-paper font-mono text-xs tracking-wider riso-shadow-sm">
              {[
                ["TAHUN", String(a.year)],
                ["TEKNIK", a.technique],
                a.medium && ["MEDIUM", a.medium],
                a.dimensions && ["UKURAN", a.dimensions],
                a.edition && ["EDISI", a.edition],
              ]
                .filter(Boolean)
                .map((row) => {
                  const [k, v] = row as [string, string];
                  return (
                    <div key={k} className="flex justify-between gap-4 p-3.5">
                      <dt className="text-ink-soft">{k}</dt>
                      <dd className="text-right font-semibold">{v}</dd>
                    </div>
                  );
                })}
            </dl>

            {a.description && (
              <div className="mt-6 border-2 border-ink bg-riso-yellow/40 p-5">
                <p className="mb-2 font-mono text-[10px] tracking-[0.25em] uppercase text-ink-soft">Catatan karya</p>
                <MiniRich text={a.description} className="text-[15px]" />
              </div>
            )}

            <Link
              href="/artshop"
              className="mt-6 block border-2 border-ink bg-ink px-6 py-3.5 text-center font-display text-sm uppercase tracking-wide text-paper transition-transform hover:-translate-y-0.5"
            >
              Cek cetakan terkait di Artshop ↗
            </Link>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
