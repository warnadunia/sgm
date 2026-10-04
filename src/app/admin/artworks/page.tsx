import Link from "next/link";
import { assertAdminPage } from "@/lib/admin-guard";
import { adminListArtworks } from "@/lib/data";
import { firstImage } from "@/lib/utils";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteArtworkAction } from "@/lib/actions/content";
import { Pencil, Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminArtworksPage() {
  await assertAdminPage();
  const list = await adminListArtworks();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl uppercase">Arsip Karya</h1>
          <p className="font-mono text-[11px] tracking-widest text-ink-soft">{list.length} ENTRI KATALOG</p>
        </div>
        <Link href="/admin/artworks/new" className="inline-flex items-center gap-2 border-2 border-ink bg-ink px-4 py-2.5 font-display text-xs uppercase text-paper transition-transform hover:-translate-y-0.5">
          <Plus className="h-4 w-4" /> Karya Baru
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((a) => (
          <div key={a.id} className="border-2 border-ink bg-paper">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={firstImage(a.images)} alt={a.title} className="aspect-[4/3] w-full border-b-2 border-ink object-cover" />
            <div className="p-3">
              <p className="truncate font-display text-xs uppercase">
                {a.title}
                {a.featured && <span className="ml-1.5 bg-riso-yellow px-1 py-0.5 font-mono text-[8px] tracking-widest">UNGGULAN</span>}
              </p>
              <p className="mt-0.5 font-mono text-[10px] text-ink-soft">
                {a.artist} · {a.year} · {a.technique}
              </p>
              <div className="mt-2.5 flex gap-2">
                <Link href={`/admin/artworks/${a.id}`} className="inline-flex flex-1 items-center justify-center gap-1 border-2 border-ink px-2 py-1.5 font-mono text-[10px] tracking-wider hover:bg-riso-yellow">
                  <Pencil className="h-3 w-3" /> SUNTING
                </Link>
                <DeleteButton onDelete={async () => deleteArtworkAction(a.id)} label="HAPUS" />
              </div>
            </div>
          </div>
        ))}
      </div>
      {list.length === 0 && <p className="mt-6 border-2 border-dashed border-ink p-10 text-center font-mono text-xs text-ink-soft">Belum ada karya.</p>}
    </div>
  );
}
