import Link from "next/link";
import { assertAdminPage } from "@/lib/admin-guard";
import { adminListProducts } from "@/lib/data";
import { formatIDR, parseJsonArray } from "@/lib/utils";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { Pencil, Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  await assertAdminPage();
  const list = await adminListProducts();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl uppercase">Artshop</h1>
          <p className="font-mono text-[11px] tracking-widest text-ink-soft">{list.length} PRODUK</p>
        </div>
        <Link href="/admin/products/new" className="inline-flex items-center gap-2 border-2 border-ink bg-ink px-4 py-2.5 font-display text-xs uppercase text-paper transition-transform hover:-translate-y-0.5">
          <Plus className="h-4 w-4" /> Produk Baru
        </Link>
      </div>

      <div className="mt-6 divide-y-2 divide-ink/10 border-2 border-ink bg-paper">
        {list.map((p) => {
          const imgs = parseJsonArray(p.images);
          return (
            <div key={p.id} className="flex flex-wrap items-center gap-3 px-4 py-3.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imgs[0]} alt="" className="h-12 w-12 border-2 border-ink object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-sm uppercase">
                  {p.name}
                  {!p.isAvailable && <span className="ml-2 bg-ink px-1.5 py-0.5 font-mono text-[9px] tracking-widest text-paper">NONAKTIF</span>}
                  {p.isFeatured && <span className="ml-1 bg-riso-yellow px-1.5 py-0.5 font-mono text-[9px] tracking-widest">UNGGULAN</span>}
                </p>
                <p className="font-mono text-[10px] tracking-widest text-ink-soft">
                  {formatIDR(p.price)} · STOK {p.stock} · {p.category.toUpperCase()} · {imgs.length} FOTO
                </p>
              </div>
              <Link href={`/artshop/${p.slug}`} target="_blank" className="border-2 border-ink/30 px-3 py-1.5 font-mono text-[10px] tracking-wider hover:border-ink">
                LIHAT
              </Link>
              <Link href={`/admin/products/${p.id}`} className="inline-flex items-center gap-1 border-2 border-ink px-3 py-1.5 font-mono text-[10px] tracking-wider hover:bg-riso-yellow">
                <Pencil className="h-3 w-3" /> SUNTING
              </Link>
              <DeleteButton entity="product" id={p.id} label="HAPUS" />
            </div>
          );
        })}
        {list.length === 0 && <p className="px-4 py-8 text-center font-mono text-xs text-ink-soft">Belum ada produk.</p>}
      </div>
    </div>
  );
}
