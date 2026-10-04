import Link from "next/link";
import { ArrowDown, ArrowRight, Info } from "lucide-react";
import type { Microsite } from "@/db/schema";
import { getArtworks, getEvents, getHeadlineMicrosites, getPosts, getProducts, getPrograms } from "@/lib/data";
import { formatDateRange, isEventLive, micrositeUrl } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { Marquee } from "@/components/site/Marquee";
import { SectionTag, SectionHeading } from "@/components/site/typography";
import { ArtworkCard, MicrositeCard, PostCard, ProductCard } from "@/components/site/cards";
import { LiveBadge } from "@/components/site/LiveBadge";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [headlines, programs, events, artworks, products, posts] = await Promise.all([
    getHeadlineMicrosites(),
    getPrograms(),
    getEvents(),
    getArtworks({ featured: true, take: 6 }),
    getProducts({ featured: true, take: 4 }),
    getPosts({ take: 3 }),
  ]);

  return (
    <>
      <Hero />
      <Marquee
        items={[
          "SENI GRAFIK ADALAH MILIK SEMUA",
          "✳",
          "CUKIL — ETSA — SABLON — RISO",
          "✳",
          "MINGGIRAN, YOGYAKARTA",
          "✳",
          "SEJAK 2018",
        ]}
      />

      {/* ============ SECTION HEADLINE MICROSITE ============ */}
      {headlines.length > 0 && (
        <section aria-label="Sorotan utama">
          {headlines.map((m) => (
            <HeadlineSpotlight key={m.id} microsite={m} />
          ))}
        </section>
      )}

      {/* ============ PROGRAM ============ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionTag color="#FF6B35">Program Studio</SectionTag>
              <SectionHeading className="mt-3">Tempat Tumbuh</SectionHeading>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
              Dua pintu masuk untuk bergabung dengan dapur cetak SGM — lewat residensi jangka panjang atau kelas
              workshop akhir pekan.
            </p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {programs.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <MicrositeCard microsite={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ EVENT ============ */}
      <section className="border-y-2 border-ink bg-paper-deep py-20 paper-torn">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <SectionTag color="#2438D8">Event Tahunan</SectionTag>
                <SectionHeading className="mt-3">
                  Dua Perayaan <span className="text-outline">Cetakan</span>
                </SectionHeading>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
                Saat event berlangsung, seluruh informasi resmi hanya diterbitkan lewat microsite masing-masing
                event — bukan media sosial, bukan selebaran.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {events.map((e, i) => (
              <Reveal key={e.id} delay={i * 0.08}>
                <div className="relative">
                  <MicrositeCard microsite={e} />
                  {e.kind === "EVENT" && isEventLive(e) && (
                    <p className="mt-2 flex items-center gap-2 border-2 border-dashed border-ink bg-paper px-3 py-2 font-mono text-[11px] tracking-wider">
                      <Info className="h-3.5 w-3.5 shrink-0 text-riso-pink" />
                      INFO LENGKAP EKSKLUSIF DI MICROSITE ↗
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ARSIP ============ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionTag color="#FF4D6D">Galeri & Katalog</SectionTag>
              <SectionHeading className="mt-3">Arsip Karya</SectionHeading>
            </div>
            <Link href="/arsip" className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase">
              Buka katalog lengkap
              <span className="grid h-8 w-8 place-items-center border-2 border-ink transition-all group-hover:translate-x-1 group-hover:bg-ink group-hover:text-paper">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {artworks.slice(0, 4).map((a, i) => (
            <Reveal key={a.id} delay={i * 0.06}>
              <ArtworkCard artwork={a} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ ARTSHOP ============ */}
      <section className="border-y-2 border-ink bg-ink py-20 text-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="inline-flex items-center gap-2 font-mono text-[11px] font-medium tracking-[0.25em] uppercase text-riso-yellow">
                  <span className="inline-block h-3 w-3 border-2 border-paper bg-riso-yellow" />
                  Artshop & Merchandise
                </p>
                <h2 className="mt-3 font-display text-4xl uppercase leading-none sm:text-5xl md:text-6xl">
                  Bawa Pulang <span className="riso-offset text-paper" style={{ ["--offset-a" as string]: "#FF4D6D", ["--offset-b" as string]: "#2438D8" }}>Cetakan</span>
                </h2>
              </div>
              <Link href="/artshop" className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase">
                Semua produk
                <span className="grid h-8 w-8 place-items-center border-2 border-paper transition-all group-hover:translate-x-1 group-hover:bg-riso-pink group-hover:border-riso-pink">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.06}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ KABAR ============ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionTag color="#0F8A76">Blog</SectionTag>
              <SectionHeading className="mt-3">Kabar & Update</SectionHeading>
            </div>
            <Link href="/blog" className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase">
              Semua kabar
              <span className="grid h-8 w-8 place-items-center border-2 border-ink transition-all group-hover:translate-x-1 group-hover:bg-ink group-hover:text-paper">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.07}>
              <PostCard post={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden border-2 border-ink bg-riso-yellow p-8 sm:p-14 riso-shadow">
            <div className="halftone-lg pointer-events-none absolute -right-10 -top-10 h-64 w-64 text-ink/10" />
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase">Mampir ke studio</p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl uppercase leading-tight sm:text-5xl">
              Studio terbuka setiap Selasa–Minggu. Bawa kaos polosmu, pulang membawa cetakan.
            </h2>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/tentang"
                className="border-2 border-ink bg-ink px-6 py-3 font-display text-sm uppercase tracking-wide text-paper transition-transform hover:-translate-y-0.5"
              >
                Tentang Studio ↗
              </Link>
              <a
                href="https://maps.google.com/?q=Minggiran,+Sardonoharjo,+Ngaglik,+Sleman"
                target="_blank"
                rel="noreferrer"
                className="border-2 border-ink bg-paper px-6 py-3 font-display text-sm uppercase tracking-wide transition-transform hover:-translate-y-0.5"
              >
                Rute ke Minggiran ↗
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

// ------------------------------------------------------------------ HERO
function Hero() {
  return (
    <section className="relative overflow-hidden border-b-2 border-ink">
      <div className="halftone pointer-events-none absolute right-0 top-16 h-72 w-72 text-riso-pink/25" />
      <div className="halftone-lg pointer-events-none absolute bottom-10 left-0 h-56 w-56 text-riso-blue/15" />

      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.15fr_1fr]">
        <div className="relative z-10">
          <Reveal>
            <p className="inline-flex items-center gap-2 border-2 border-ink bg-paper px-3 py-1.5 font-mono text-[11px] tracking-[0.25em] riso-shadow-sm">
              STUDIO CETAK & RUANG KOLEKTIF — EST. 2018
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 font-display text-[15vw] uppercase leading-[0.88] sm:text-7xl lg:text-[5.2rem] xl:text-8xl">
              <span className="block riso-offset" style={{ ["--offset-a" as string]: "#FF4D6D", ["--offset-b" as string]: "#2438D8" }}>
                Studio
              </span>
              <span className="block riso-offset" style={{ ["--offset-a" as string]: "#2438D8", ["--offset-b" as string]: "#FF6B35" }}>
                Grafis
              </span>
              <span className="block text-outline">Minggiran</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              Dari sebuah dusun di utara Yogyakarta, kami menjaga tradisi cetak-mencetak tetap hidup:{" "}
              <em className="font-serif italic text-ink">cukil, etsa, sablon, dan risograf</em> — lewat program
              residensi, kelas workshop, dan dua event tahunan yang turun ke jalan.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/event/pekan-seni-grafis-yogyakarta"
                className="group border-2 border-ink bg-riso-pink px-6 py-3.5 font-display text-sm uppercase tracking-wide text-paper riso-shadow transition-transform hover:-translate-y-0.5"
              >
                PSGY #6 Sedang Berlangsung ↗
              </Link>
              <Link
                href="/arsip"
                className="border-2 border-ink bg-paper px-6 py-3.5 font-display text-sm uppercase tracking-wide transition-transform hover:-translate-y-0.5 hover:bg-riso-yellow"
              >
                Jelajah Arsip
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.32}>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-px border-2 border-ink bg-ink font-mono riso-shadow-sm">
              {[
                ["14", "Perupa residen"],
                ["40+", "Kelas digelar"],
                ["120+", "Karya terarsip"],
              ].map(([num, label]) => (
                <div key={label} className="bg-paper p-3">
                  <dt className="order-2 text-[10px] tracking-[0.15em] uppercase text-ink-soft">{label}</dt>
                  <dd className="font-display text-2xl">{num}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="relative">
          <div className="relative mx-auto max-w-md rotate-2 border-2 border-ink bg-paper p-3 riso-shadow transition-transform duration-500 hover:rotate-0 lg:max-w-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/seed/hero-studio.jpg"
              alt="Suasana di dalam Studio Grafis Minggiran"
              className="aspect-[4/5] w-full border-2 border-ink object-cover"
            />
            <figcaption className="flex items-center justify-between px-1 pt-3 font-mono text-[10px] tracking-[0.2em] uppercase text-ink-soft">
              <span>Dok. SGM — Ruang cetak, sore hari</span>
              <span>№ 001</span>
            </figcaption>
          </div>
          <div className="absolute -left-2 top-8 -rotate-6 border-2 border-ink bg-riso-yellow px-4 py-2 font-display text-sm uppercase riso-shadow-sm sticker sm:-left-6">
            Tinta masih basah!
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-ink/50" />
      </div>
    </section>
  );
}

// ----------------------------------------------- HEADLINE MICROSITE SECTION
function HeadlineSpotlight({ microsite: m }: { microsite: Microsite }) {
  const url = micrositeUrl(m);
  const live = m.kind === "EVENT" && isEventLive(m);

  return (
    <div className="relative overflow-hidden border-y-2 border-ink" style={{ backgroundColor: m.themeColor }}>
      <div className="halftone-lg pointer-events-none absolute inset-0 text-ink/10" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            {live ? (
              <LiveBadge />
            ) : (
              <span className="inline-flex items-center gap-2 border-2 border-ink bg-paper px-3 py-1.5 font-mono text-[11px] font-semibold tracking-[0.2em] sticker riso-shadow-sm">
                SOROTAN
              </span>
            )}
            <span className="font-mono text-[11px] font-semibold tracking-[0.25em] uppercase text-paper/90 [text-shadow:1px_1px_0_rgba(0,0,0,0.25)]">
              {m.kind === "EVENT" ? "MICROSITE EVENT" : "MICROSITE PROGRAM"}
            </span>
          </div>
          <h2 className="mt-5 font-display text-5xl uppercase leading-[0.9] text-paper [text-shadow:3px_3px_0_rgba(0,0,0,0.3)] sm:text-7xl">
            {m.title}
          </h2>
          {m.tagline && (
            <p className="mt-5 max-w-xl font-serif text-lg italic leading-relaxed text-paper/95 sm:text-xl">
              “{m.tagline}”
            </p>
          )}
          <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs tracking-wider text-paper">
            {m.kind === "EVENT" && (
              <div>
                <dt className="text-[10px] uppercase text-paper/70">Tanggal</dt>
                <dd className="mt-1 font-semibold">{formatDateRange(m.startDate, m.endDate)}</dd>
              </div>
            )}
            {m.location && (
              <div>
                <dt className="text-[10px] uppercase text-paper/70">Lokasi</dt>
                <dd className="mt-1 font-semibold">{m.location}</dd>
              </div>
            )}
            {m.edition && (
              <div>
                <dt className="text-[10px] uppercase text-paper/70">Edisi</dt>
                <dd className="mt-1 font-semibold">{m.edition}</dd>
              </div>
            )}
          </dl>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href={url}
              className="border-2 border-ink bg-ink px-7 py-3.5 font-display text-sm uppercase tracking-wide text-paper transition-transform hover:-translate-y-0.5 hover:rotate-1"
            >
              Buka Microsite ↗
            </Link>
            {live && (
              <p className="max-w-xs font-mono text-[10px] leading-relaxed tracking-wider text-paper/90">
                ⚠ SELAMA EVENT BERLANGSUNG, INFORMASI RESMI HANYA TERSEDIA DI MICROSITE INI.
              </p>
            )}
          </div>
        </div>
        <div className="relative">
          <div className="-rotate-2 border-2 border-ink bg-paper p-2.5 riso-shadow transition-transform duration-500 hover:rotate-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={m.heroImage || "/images/seed/hero-studio.jpg"} alt={m.title} className="aspect-[4/3] w-full border-2 border-ink object-cover" />
          </div>
          {m.edition && (
            <div className="absolute -bottom-4 right-4 rotate-3 border-2 border-ink bg-riso-yellow px-3 py-1.5 font-display text-xs uppercase sticker">
              {m.edition}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
