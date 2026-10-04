import Link from "next/link";
import { assertAdminPage } from "@/lib/admin-guard";
import { adminListMicrosites } from "@/lib/data";
import { formatDateRange, micrositeUrl } from "@/lib/utils";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteMicrositeAction } from "@/lib/actions/microsite";
import { ExternalLink, Pencil, Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminMicrositesPage() {
  await assertAdminPage();
  const list = await adminListMicrosites();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl uppercase">Microsite</h1>
          <p className="font-mono text-[11px] tracking-widest text-ink-soft">PROGRAM & EVENT — SATU TABEL</p>
        </div>
        <Link href="/admin/microsites/new" className="inline-flex items-center gap-2 border-2 border-ink bg-ink px-4 py-2.5 font-display text-xs uppercase text-paper transition-transform hover:-translate-y-0.5">
          <Plus className="h-4 w-4" /> Microsite Baru
        </Link>
      </div>

      <div className="mt-6 divide-y-2 divide-ink/10 border-2 border-ink bg-paper">
        {list.map((m) => (
          <div key={m.id} className="flex flex-wrap items-center gap-3 px-4 py-3.5">
            <span className="h-3 w-3 shrink-0 border border-ink" style={{ backgroundColor: m.themeColor }} />
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-sm uppercase">
                {m.title}
                {m.isHeadline && <span className="ml-2 bg-riso-yellow px-1.5 py-0.5 font-mono text-[9px] tracking-widest">HEADLINE</span>}
                {m.isLiveNow && <span className="ml-1 bg-riso-pink px-1.5 py-0.5 font-mono text-[9px] tracking-widest text-paper">LIVE</span>}
              </p>
              <p className="font-mono text-[10px] tracking-widest text-ink-soft">
                {m.kind} · {m.status} · {m.kind === "EVENT" ? formatDateRange(m.startDate, m.endDate) : m.edition ?? "—"}
              </p>
            </div>
            <Link
              href={micrositeUrl(m)}
              target="_blank"
              className="inline-flex items-center gap-1 border-2 border-ink/30 px-3 py-1.5 font-mono text-[10px] tracking-wider hover:border-ink"
            >
              <ExternalLink className="h-3 w-3" /> LIHAT
            </Link>
            <Link href={`/admin/microsites/${m.id}`} className="inline-flex items-center gap-1 border-2 border-ink px-3 py-1.5 font-mono text-[10px] tracking-wider hover:bg-riso-yellow">
              <Pencil className="h-3 w-3" /> SUNTING
            </Link>
            <DeleteButton onDelete={async () => deleteMicrositeAction(m.id)} />
          </div>
        ))}
        {list.length === 0 && <p className="px-4 py-8 text-center font-mono text-xs text-ink-soft">Belum ada microsite.</p>}
      </div>
    </div>
  );
}
