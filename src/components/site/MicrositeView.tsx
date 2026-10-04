import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin, ShieldAlert, Ticket } from "lucide-react";
import type { MicrositeWithPosts } from "@/lib/data";
import { parseBlocks } from "@/lib/blocks";
import { formatDateRange, isEventLive, parseJsonArray } from "@/lib/utils";
import { MiniRich } from "./MiniRich";
import { BlockRenderer } from "./BlockRenderer";
import { LiveBadge } from "./LiveBadge";
import { Reveal } from "@/components/motion/Reveal";
import { Marquee } from "./Marquee";
import { PostCard } from "./cards";

export function MicrositeView({ m }: { m: MicrositeWithPosts | null }) {
  if (!m) notFound();

  const blocks = parseBlocks(m.blocks);
  const gallery = parseJsonArray(m.images);
  const live = m.kind === "EVENT" && isEventLive(m);
  const backHref = m.kind === "EVENT" ? "/#event" : "/";
  const backLabel = m.kind === "EVENT" ? "Semua event" : "Beranda";

  return (
    <article>
      {/* ================= HERO MICROSITE ================= */}
      <header className="relative overflow-hidden border-b-2 border-ink" style={{ backgroundColor: m.themeColor }}>
        <div className="halftone-lg pointer-events-none absolute inset-0 text-ink/10" />
        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6">
          <div className="flex items-center justify-between">
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 border-2 border-ink bg-paper px-3 py-1.5 font-mono text-[11px] tracking-[0.15em] uppercase transition-transform hover:-translate-x-1"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> {backLabel}
            </Link>
            <span className="font-mono text-[11px] font-semibold tracking-[0.3em] uppercase text-paper [text-shadow:1px_1px_0_rgba(0,0,0,0.25)]">
              MICROSITE {m.kind === "EVENT" ? "EVENT" : "PROGRAM"} — SGM
            </span>
          </div>

          <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1.25fr_1fr]">
            <div>
              <Reveal>
                <div className="flex flex-wrap items-center gap-3">
                  {live && <LiveBadge />}
                  {m.status === "ARCHIVED" && (
                    <span className="border-2 border-ink bg-paper px-3 py-1.5 font-mono text-[11px] font-semibold tracking-[0.2em] sticker">
                      ARSIP DOKUMENTASI
                    </span>
                  )}
                  {m.edition && (
                    <span className="border-2 border-ink bg-riso-yellow px-3 py-1.5 font-mono text-[11px] font-semibold tracking-[0.2em] sticker">
                      {m.edition}
                    </span>
                  )}
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="mt-5 font-display text-4xl uppercase leading-[0.92] text-paper [text-shadow:3px_3px_0_rgba(0,0,0,0.3)] sm:text-6xl lg:text-7xl">
                  {m.title}
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                {m.tagline && <p className="mt-5 max-w-2xl font-serif text-lg italic text-paper/95 sm:text-xl">“{m.tagline}”</p>}
              </Reveal>
              <Reveal delay={0.24}>
                <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs tracking-wider text-paper">
                  {(m.startDate || m.endDate) && (
                    <span className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />
                      {formatDateRange(m.startDate, m.endDate)}
                    </span>
                  )}
                  {m.location && (
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {m.location}
                    </span>
                  )}
                </div>
              </Reveal>
              {m.ctaLabel && m.ctaUrl && (
                <Reveal delay={0.32}>
                  <a
                    href={m.ctaUrl}
                    className="mt-8 inline-flex items-center gap-2 border-2 border-ink bg-ink px-6 py-3 font-display text-sm uppercase tracking-wide text-paper transition-transform hover:-translate-y-0.5 hover:rotate-1"
                  >
                    <Ticket className="h-4 w-4" />
                    {m.ctaLabel}
                  </a>
                </Reveal>
              )}
            </div>

            <Reveal delay={0.2}>
              <div className="rotate-2 border-2 border-ink bg-paper p-2.5 riso-shadow transition-transform duration-500 hover:rotate-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.heroImage || "/images/seed/hero-studio.jpg"}
                  alt={m.title}
                  className="aspect-[4/3] w-full border-2 border-ink object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </header>

      {/* ============ BANNER: INFO HANYA DI MICROSITE (event live) ============ */}
      {live && (
        <div className="border-b-2 border-ink bg-ink text-paper">
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6">
            <ShieldAlert className="h-6 w-6 shrink-0 text-riso-yellow" />
            <p className="font-mono text-[11px] leading-relaxed tracking-wider sm:text-xs">
              SELAMA {m.title.toUpperCase()} BERLANGSUNG, SELURUH INFORMASI RESMI — JADWAL, REGISTRASI, DAN
              PENGUMUMAN — <span className="bg-riso-pink px-1.5 py-0.5 font-semibold">HANYA DITERBITKAN DI HALAMAN INI</span>.
            </p>
          </div>
        </div>
      )}

      {/* ================= ISI ================= */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6" id="program">
        <div className="grid gap-14 lg:grid-cols-[1fr_360px]">
          <div className="space-y-14">
            {m.content && (
              <Reveal>
                <div className="border-2 border-ink bg-paper p-6 sm:p-8 riso-shadow-sm">
                  <p className="mb-4 font-mono text-[11px] tracking-[0.25em] uppercase text-ink-soft">Tentang</p>
                  <MiniRich text={m.content} className="max-w-3xl text-[15px] text-ink-soft" />
                </div>
              </Reveal>
            )}
            <BlockRenderer blocks={blocks} accent={m.themeColor} />
          </div>

          {/* ================= SIDEBAR ================= */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <Reveal delay={0.1}>
              <div className="border-2 border-ink bg-riso-yellow p-5 riso-shadow-sm sticker">
                <p className="font-display text-sm uppercase">Ringkasan</p>
                <dl className="mt-4 space-y-3 font-mono text-[11px] leading-relaxed tracking-wider">
                  {m.edition && (
                    <div className="flex justify-between gap-3 border-b border-ink/20 pb-2">
                      <dt className="text-ink-soft">EDISI/ANGKATAN</dt>
                      <dd className="text-right font-semibold">{m.edition}</dd>
                    </div>
                  )}
                  {(m.startDate || m.endDate) && (
                    <div className="flex justify-between gap-3 border-b border-ink/20 pb-2">
                      <dt className="text-ink-soft">TANGGAL</dt>
                      <dd className="text-right font-semibold">{formatDateRange(m.startDate, m.endDate)}</dd>
                    </div>
                  )}
                  {m.location && (
                    <div className="flex justify-between gap-3 border-b border-ink/20 pb-2">
                      <dt className="text-ink-soft">LOKASI</dt>
                      <dd className="text-right font-semibold">{m.location}</dd>
                    </div>
                  )}
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-soft">STATUS</dt>
                    <dd className="text-right font-semibold">
                      {live ? "BERLANGSUNG" : m.status === "ARCHIVED" ? "SELESAI — DOKUMENTASI" : m.startDate && new Date(m.startDate) > new Date() ? "SEGERA" : "BERJALAN"}
                    </dd>
                  </div>
                </dl>
                {m.ctaUrl && m.ctaLabel && (
                  <a
                    href={m.ctaUrl}
                    className="mt-5 block border-2 border-ink bg-ink px-4 py-2.5 text-center font-display text-xs uppercase tracking-wide text-paper transition-transform hover:-translate-y-0.5"
                  >
                    {m.ctaLabel} ↗
                  </a>
                )}
              </div>
            </Reveal>

            {gallery.length > 0 && (
              <Reveal delay={0.16}>
                <div className="border-2 border-ink bg-paper p-5 riso-shadow-sm">
                  <p className="font-display text-sm uppercase">Dokumentasi</p>
                  <div className="mt-4 grid grid-cols-2 gap-2.5">
                    {gallery.slice(0, 4).map((src, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={i} src={src} alt={`Dokumentasi ${m.title} ${i + 1}`} className="aspect-square w-full border-2 border-ink object-cover" loading="lazy" />
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            <Reveal delay={0.22}>
              <div className="border-2 border-dashed border-ink bg-paper p-5">
                <p className="font-mono text-[11px] leading-relaxed tracking-wider text-ink-soft">
                  PUNYA PERTANYAAN TENTANG {m.kind === "EVENT" ? "EVENT" : "PROGRAM"} INI?
                </p>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 font-display text-sm uppercase underline decoration-riso-pink decoration-4 underline-offset-4 hover:text-riso-pink"
                >
                  Hubungi studio ↗
                </a>
              </div>
            </Reveal>
          </aside>
        </div>

        {/* ================= KABAR TERHUBUNG ================= */}
        {m.relatedPosts.length > 0 && (
          <section className="mt-20">
            <Reveal>
              <div className="flex items-baseline gap-4">
                <h2 className="font-display text-3xl uppercase">Kabar Terkait</h2>
                <span className="h-0.5 flex-1" style={{ backgroundColor: m.themeColor }} />
              </div>
              <p className="mt-2 font-mono text-[11px] tracking-[0.2em] uppercase text-ink-soft">
                Dari blog — terhubung ke microsite ini
              </p>
            </Reveal>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {m.relatedPosts.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.07}>
                  <PostCard post={{ ...p, microsite: null }} />
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </div>

      <Marquee
        items={[
          m.title.toUpperCase(),
          m.edition?.toUpperCase() || "STUDIO GRAFIS MINGGIRAN",
          "STUDIO GRAFIS MINGGIRAN",
          m.kind === "EVENT" ? "INFO RESMI HANYA DI MICROSITE INI" : "DAFTAR LEWAT MICROSITE INI",
        ]}
      />
    </article>
  );
}
