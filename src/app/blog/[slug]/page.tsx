import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getPost } from "@/lib/data";
import { formatDate, micrositeUrl } from "@/lib/utils";
import { MiniRich } from "@/components/site/MiniRich";
import { Reveal } from "@/components/motion/Reveal";
import { LiveBadge } from "@/components/site/LiveBadge";
import { isEventLive } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) return { title: "Tulisan tidak ditemukan" };
  return { title: p.title, description: p.excerpt || undefined };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) notFound();

  const ms = p.microsite;
  const msLive = ms && ms.kind === "EVENT" && isEventLive(ms);

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 border-2 border-ink bg-paper px-3 py-1.5 font-mono text-[11px] tracking-[0.15em] uppercase transition-transform hover:-translate-x-1"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Semua kabar
      </Link>

      <Reveal>
        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase">
            <span className="border-2 border-ink bg-riso-yellow px-2.5 py-1">{p.category}</span>
            <span className="text-ink-soft">{formatDate(p.publishedAt)}</span>
            {ms && (
              <>
                <span className="text-ink-soft">— terhubung ke microsite</span>
                <span className="font-semibold" style={{ color: ms.themeColor }}>
                  {ms.title}
                </span>
              </>
            )}
          </div>
          <h1 className="mt-5 font-display text-3xl uppercase leading-tight sm:text-5xl">{p.title}</h1>
          {p.excerpt && <p className="mt-4 font-serif text-lg italic leading-relaxed text-ink-soft">{p.excerpt}</p>}
        </header>
      </Reveal>

      {p.coverImage && (
        <Reveal delay={0.1}>
          <figure className="mt-8 border-2 border-ink bg-paper p-3 riso-shadow">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.coverImage} alt={p.title} className="aspect-[16/9] w-full border-2 border-ink object-cover" />
          </figure>
        </Reveal>
      )}

      <Reveal delay={0.15}>
        <div className="mt-10 border-2 border-ink bg-paper p-6 sm:p-9">
          <MiniRich text={p.content} className="text-base text-ink-soft [font-size:1.05rem]" />
        </div>
      </Reveal>

      {/* ===== Kartu microsite terhubung ===== */}
      {ms && (
        <Reveal delay={0.2}>
          <Link
            href={micrositeUrl(ms)}
            className="group mt-10 block border-2 border-ink p-6 transition-transform hover:-translate-y-1 sm:p-8 riso-shadow"
            style={{ backgroundColor: `${ms.themeColor}18`, ["--shadow-color" as string]: ms.themeColor }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink-soft">
                  Kabar ini terhubung ke microsite
                </p>
                <p className="mt-2 font-display text-2xl uppercase" style={{ color: ms.themeColor }}>
                  {ms.title}
                </p>
                {msLive && (
                  <div className="mt-3">
                    <LiveBadge />
                  </div>
                )}
                <p className="mt-2 max-w-md text-sm text-ink-soft">
                  Jadwal, registrasi, dan info resmi lainnya tersedia di halaman microsite
                  {ms.kind === "EVENT" ? " event" : " program"} ini.
                </p>
              </div>
              <span className="grid h-12 w-12 place-items-center border-2 border-ink bg-paper transition-all group-hover:rotate-45 group-hover:bg-ink group-hover:text-paper">
                <ArrowUpRight className="h-6 w-6" />
              </span>
            </div>
          </Link>
        </Reveal>
      )}
    </article>
  );
}
