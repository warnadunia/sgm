import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Artwork, Microsite, Post, Product } from "@/db/schema";
import { firstImage, formatDate, formatDateRange, formatIDR, isEventLive, micrositeUrl } from "@/lib/utils";
import { LiveBadge } from "./LiveBadge";
import { cn } from "@/lib/utils";
import type { PostWithMicrosite } from "@/lib/data";

// ---------------------------------------------------------------- MICROSITE
export function MicrositeCard({ microsite, large = false }: { microsite: Microsite; large?: boolean }) {
  const url = micrositeUrl(microsite);
  const live = microsite.kind === "EVENT" && isEventLive(microsite);
  const archived = microsite.status === "ARCHIVED";

  return (
    <Link
      href={url}
      className={cn(
        "group relative flex flex-col border-2 border-ink bg-paper hover-lift",
        large ? "" : ""
      )}
      style={{ ["--shadow-color" as string]: microsite.themeColor }}
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-ink">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={microsite.heroImage || "/images/seed/hero-studio.jpg"}
          alt={microsite.title}
          className={cn(
            "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105",
            archived && "grayscale group-hover:grayscale-0"
          )}
          loading="lazy"
        />
        <div className="absolute inset-0 border-[10px] border-transparent transition-colors duration-500 group-hover:border-[color:var(--theme)]" style={{ ["--theme" as string]: `${microsite.themeColor}55` }} />
        {live && <LiveBadge className="absolute left-3 top-3" />}
        {archived && (
          <span className="absolute left-3 top-3 border-2 border-ink bg-paper px-3 py-1.5 font-mono text-[11px] font-semibold tracking-[0.2em] sticker">
            ARSIP DOKUMENTASI
          </span>
        )}
        <span
          className="absolute right-3 top-3 border-2 border-ink px-2 py-1 font-mono text-[10px] tracking-[0.2em]"
          style={{ backgroundColor: microsite.themeColor }}
        >
          {microsite.kind === "EVENT" ? "EVENT" : "PROGRAM"}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        {microsite.edition && (
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: microsite.themeColor }}>
            {microsite.edition}
          </p>
        )}
        <h3 className="mt-1.5 font-display text-2xl uppercase leading-none group-hover:riso-offset" style={{ ["--offset-a" as string]: microsite.themeColor }}>
          {microsite.title}
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-soft">{microsite.description}</p>
        <div className="mt-4 flex items-center justify-between border-t-2 border-dashed border-ink/20 pt-3">
          <span className="font-mono text-[11px] tracking-wider text-ink-soft">
            {microsite.kind === "EVENT" ? formatDateRange(microsite.startDate, microsite.endDate) : "Program berjalan"}
          </span>
          <span className="grid h-8 w-8 place-items-center border-2 border-ink transition-all group-hover:rotate-45 group-hover:bg-ink group-hover:text-paper">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ----------------------------------------------------------------- ARTWORK
export function ArtworkCard({ artwork }: { artwork: Artwork }) {
  return (
    <Link href={`/arsip/${artwork.slug}`} className="group block border-2 border-ink bg-paper hover-lift">
      <div className="relative aspect-[4/5] overflow-hidden border-b-2 border-ink bg-paper-deep">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={firstImage(artwork.images)}
          alt={artwork.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute bottom-2 right-2 border border-ink bg-paper px-2 py-0.5 font-mono text-[10px] tracking-widest">
          {artwork.year}
        </span>
      </div>
      <div className="p-4">
        <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-riso-blue">{artwork.technique}</p>
        <h3 className="mt-1 font-display text-lg uppercase leading-tight">{artwork.title}</h3>
        <p className="mt-1 flex items-center justify-between text-sm text-ink-soft">
          {artwork.artist}
          <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
        </p>
      </div>
    </Link>
  );
}

// ----------------------------------------------------------------- PRODUCT
export function ProductCard({ product }: { product: Product }) {
  const images = JSON.parse(product.images || "[]") as string[];
  const second = images[1];
  const soldOut = product.stock <= 0;

  return (
    <Link href={`/artshop/${product.slug}`} className="group block border-2 border-ink bg-paper hover-lift" style={{ ["--shadow-color" as string]: "#2438D8" }}>
      <div className="relative aspect-square overflow-hidden border-b-2 border-ink bg-paper-deep">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[0] || "/images/seed/hero-studio.jpg"}
          alt={product.name}
          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {second && (
          // Swap ke foto kedua saat hover — produk multi-gambar
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={second}
            alt={`${product.name} — tampak lain`}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            loading="lazy"
          />
        )}
        <span className="absolute left-3 top-3 border-2 border-ink bg-riso-yellow px-2 py-1 font-mono text-[10px] font-semibold tracking-[0.18em] uppercase">
          {product.category}
        </span>
        {soldOut && (
          <span className="absolute inset-0 grid place-items-center bg-ink/60">
            <span className="border-2 border-paper px-4 py-2 font-display text-lg uppercase text-paper sticker">Habis</span>
          </span>
        )}
      </div>
      <div className="flex items-start justify-between gap-3 p-4">
        <div>
          <h3 className="font-display text-base uppercase leading-tight">{product.name}</h3>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="font-mono text-sm font-semibold">{formatIDR(product.price)}</span>
            {product.comparePrice && (
              <span className="font-mono text-xs text-ink-soft line-through">{formatIDR(product.comparePrice)}</span>
            )}
          </div>
        </div>
        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center border-2 border-ink transition-all group-hover:rotate-45 group-hover:bg-ink group-hover:text-paper">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

// -------------------------------------------------------------------- POST
export function PostCard({ post, big = false }: { post: PostWithMicrosite | (Post & { microsite?: { title: string; slug: string; kind: string; themeColor: string } | null }); big?: boolean }) {
  const ms = post.microsite;
  const msUrl = ms ? (ms.kind === "EVENT" ? `/event/${ms.slug}` : `/program/${ms.slug}`) : null;

  return (
    <article className={cn("group relative border-2 border-ink bg-paper hover-lift", big && "md:col-span-2")}>
      <Link href={`/blog/${post.slug}`} className={cn("flex flex-col", big && "md:grid md:grid-cols-2")}>
        <div className={cn("relative overflow-hidden border-b-2 border-ink", big ? "aspect-[16/10] md:aspect-auto md:border-b-0 md:border-r-2" : "aspect-[16/10]")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage || "/images/seed/hero-studio.jpg"}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase">
            <span className="border border-ink bg-riso-yellow px-2 py-0.5">{post.category}</span>
            {ms && <span style={{ color: ms.themeColor }}>↳ {ms.title}</span>}
          </div>
          <h3 className={cn("mt-3 font-display uppercase leading-tight", big ? "text-2xl md:text-3xl" : "text-xl")}>{post.title}</h3>
          {post.excerpt && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-soft">{post.excerpt}</p>}
          <p className="mt-auto pt-4 font-mono text-[11px] tracking-wider text-ink-soft">{formatDate(post.publishedAt)}</p>
        </div>
      </Link>
      {msUrl && (
        <Link
          href={msUrl}
          className="absolute bottom-3 right-3 border-2 border-ink bg-paper px-2.5 py-1 font-mono text-[10px] tracking-widest opacity-0 transition-opacity hover:bg-ink hover:text-paper group-hover:opacity-100"
        >
          KE MICROSITE ↗
        </Link>
      )}
    </article>
  );
}
