import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle, PackageCheck, PackageX } from "lucide-react";
import { getProduct, getProducts } from "@/lib/data";
import { formatIDR, parseJsonArray, waOrderLink } from "@/lib/utils";
import { MiniRich } from "@/components/site/MiniRich";
import { ProductGallery } from "@/components/site/ProductGallery";
import { ProductCard } from "@/components/site/cards";
import { Reveal } from "@/components/motion/Reveal";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) return { title: "Produk tidak ditemukan" };
  return { title: p.name, description: p.description?.slice(0, 160) || undefined };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) notFound();

  const images = parseJsonArray(p.images);
  const soldOut = p.stock <= 0 || !p.isAvailable;
  const related = (await getProducts({ take: 4 })).filter((r) => r.id !== p.id).slice(0, 3);

  return (
    <article className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav className="flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] uppercase text-ink-soft">
        <Link href="/artshop" className="inline-flex items-center gap-1.5 border-2 border-ink bg-paper px-3 py-1.5 text-ink transition-transform hover:-translate-x-1">
          <ArrowLeft className="h-3.5 w-3.5" /> Artshop
        </Link>
        <span>/</span>
        <span>{p.category}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <Reveal>
          <ProductGallery images={images.length ? images : ["/images/seed/hero-studio.jpg"]} name={p.name} />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="lg:sticky lg:top-24">
            <p className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] uppercase text-riso-blue">
              <span className="inline-block h-3 w-3 border-2 border-ink bg-riso-yellow" />
              {p.category}
            </p>
            <h1 className="mt-3 font-display text-3xl uppercase leading-tight sm:text-4xl">{p.name}</h1>

            <div className="mt-5 flex flex-wrap items-baseline gap-3">
              <span className="font-display text-4xl">{formatIDR(p.price)}</span>
              {p.comparePrice && (
                <span className="font-mono text-lg text-ink-soft line-through">{formatIDR(p.comparePrice)}</span>
              )}
            </div>

            <div className="mt-4">
              {soldOut ? (
                <span className="inline-flex items-center gap-2 border-2 border-ink bg-paper px-3 py-1.5 font-mono text-xs font-semibold tracking-widest sticker">
                  <PackageX className="h-4 w-4 text-riso-pink" /> STOK HABIS
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 border-2 border-ink bg-riso-yellow px-3 py-1.5 font-mono text-xs font-semibold tracking-widest sticker">
                  <PackageCheck className="h-4 w-4" /> STOK TERSEDIA: {p.stock}
                </span>
              )}
            </div>

            {p.description && (
              <div className="mt-7 border-2 border-ink bg-paper p-5">
                <p className="mb-2 font-mono text-[10px] tracking-[0.25em] uppercase text-ink-soft">Detail produk</p>
                <MiniRich text={p.description} className="text-[15px] text-ink-soft" />
              </div>
            )}

            <div className="mt-7 space-y-3">
              <a
                href={soldOut ? undefined : waOrderLink(p.name)}
                target="_blank"
                rel="noreferrer"
                aria-disabled={soldOut}
                className={
                  soldOut
                    ? "pointer-events-none block border-2 border-ink/30 bg-paper-deep px-6 py-4 text-center font-display text-sm uppercase tracking-wide text-ink/40"
                    : "block border-2 border-ink bg-riso-pink px-6 py-4 text-center font-display text-sm uppercase tracking-wide text-paper riso-shadow transition-transform hover:-translate-y-0.5"
                }
              >
                <span className="inline-flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  {soldOut ? "Stok habis — tanyakan restock" : "Pesan via WhatsApp"}
                </span>
              </a>
              <p className="text-center font-mono text-[10px] tracking-widest text-ink-soft">
                BAYAR SAAT TERKONFIRMASI — TRANSFER / QRIS / TUNAI DI STUDIO
              </p>
            </div>

            <dl className="mt-7 grid grid-cols-3 gap-px border-2 border-ink bg-ink font-mono text-center riso-shadow-sm">
              {[
                ["SKU", p.slug.slice(0, 10).toUpperCase()],
                ["KATEGORI", p.category.toUpperCase()],
                ["ASAL", "MINGGIRAN"],
              ].map(([k, v]) => (
                <div key={k} className="bg-paper p-3">
                  <dt className="text-[9px] tracking-[0.2em] text-ink-soft">{k}</dt>
                  <dd className="mt-1 truncate text-[11px] font-semibold tracking-wider">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl uppercase">Barang Lain yang Menunggu Pemilik</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ProductCard key={r.id} product={r} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
