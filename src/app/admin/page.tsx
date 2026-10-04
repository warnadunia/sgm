import Link from "next/link";
import { db } from "@/db/client";
import { artworks, microsites, posts, products } from "@/db/schema";
import { assertAdminPage } from "@/lib/admin-guard";
import { ArrowUpRight, Landmark, Newspaper, Palette, ShoppingBag } from "lucide-react";
import { MicrositeToggles } from "@/components/admin/MicrositeToggles";
import { count } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  await assertAdminPage();

  const [[m], [a], [p], [b], allMicrosites] = await Promise.all([
    db.select({ count: count() }).from(microsites),
    db.select({ count: count() }).from(artworks),
    db.select({ count: count() }).from(products),
    db.select({ count: count() }).from(posts),
    db.select().from(microsites),
  ]);

  const stats = [
    { label: "Microsite", value: m.count, href: "/admin/microsites", icon: Landmark },
    { label: "Karya Arsip", value: a.count, href: "/admin/artworks", icon: Palette },
    { label: "Produk", value: p.count, href: "/admin/products", icon: ShoppingBag },
    { label: "Tulisan Blog", value: b.count, href: "/admin/posts", icon: Newspaper },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl uppercase">Dasbor</h1>
        <p className="mt-1 font-mono text-xs tracking-widest text-ink-soft">
          KELOLA KONTEN SITUS STUDIO GRAFIS MINGGIRAN
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="group flex items-center justify-between border-2 border-ink bg-paper p-5 riso-shadow-sm transition-transform hover:-translate-y-0.5"
          >
            <div>
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink-soft">{s.label}</p>
              <p className="mt-1 font-display text-4xl">{s.value}</p>
            </div>
            <s.icon className="h-8 w-8 text-ink/20 transition-colors group-hover:text-riso-pink" />
          </Link>
        ))}
      </div>

      <section className="border-2 border-ink bg-paper p-5">
        <h2 className="font-display text-lg uppercase">Kontrol Microsite</h2>
        <p className="mt-1 font-mono text-[11px] tracking-wider text-ink-soft">
          HEADLINE = tampil sebagai section khusus di landing page · LIVE = tandai event sedang berlangsung (info
          eksklusif di microsite)
        </p>
        <MicrositeToggles microsites={allMicrosites} />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="border-2 border-ink bg-ink p-6 text-paper">
          <h3 className="font-display text-lg uppercase">Tambah Konten Baru</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              ["/admin/microsites/new", "+ Microsite"],
              ["/admin/artworks/new", "+ Karya"],
              ["/admin/products/new", "+ Produk"],
              ["/admin/posts/new", "+ Tulisan"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-1 border border-paper/40 px-3.5 py-2 font-mono text-xs tracking-wider hover:bg-riso-pink hover:border-riso-pink"
              >
                {label} <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>
        <div className="border-2 border-ink bg-riso-yellow p-6">
          <h3 className="font-display text-lg uppercase">Alur Singkat</h3>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed">
            <li>1. Foto diunggah lewat formulir konten (tersimpan di Vercel Blob saat production).</li>
            <li>2. Microsite event/program disunting di menu Microsite — blok jadwal & info bisa diubah kapan pun.</li>
            <li>3. Aktifkan HEADLINE agar microsite muncul sebagai section khusus di landing page.</li>
            <li>4. Saat event dimulai, aktifkan LIVE — spanduk “info hanya di microsite” menyala otomatis.</li>
          </ol>
        </div>
      </section>
    </div>
  );
}
