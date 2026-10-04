import Link from "next/link";
import { logoutAction } from "@/lib/actions/auth";
import { getAdminEmail } from "@/lib/session";
import {
  LayoutDashboard,
  Landmark,
  Palette,
  ShoppingBag,
  Newspaper,
  LogOut,
  Globe,
} from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dasbor", icon: LayoutDashboard },
  { href: "/admin/microsites", label: "Microsite", icon: Landmark },
  { href: "/admin/artworks", label: "Arsip Karya", icon: Palette },
  { href: "/admin/products", label: "Artshop", icon: ShoppingBag },
  { href: "/admin/posts", label: "Blog", icon: Newspaper },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const email = await getAdminEmail();

  if (!email) {
    // Halaman login & sekitarnya: tanpa chrome admin.
    return <div className="min-h-screen bg-ink">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-paper-deep">
      <header className="sticky top-0 z-40 border-b-2 border-ink bg-ink text-paper">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center bg-riso-pink font-display text-sm text-paper">S</span>
            <span className="font-display text-sm tracking-wide">SGM ADMIN</span>
            <span className="hidden font-mono text-[10px] tracking-widest text-paper/50 sm:inline">{email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 border border-paper/30 px-3 py-1.5 font-mono text-[11px] tracking-wider hover:bg-paper hover:text-ink"
            >
              <Globe className="h-3.5 w-3.5" /> LIHAT SITUS
            </Link>
            <form action={logoutAction}>
              <button className="inline-flex items-center gap-1.5 border border-riso-pink bg-riso-pink px-3 py-1.5 font-mono text-[11px] tracking-wider hover:bg-ink">
                <LogOut className="h-3.5 w-3.5" /> KELUAR
              </button>
            </form>
          </div>
        </div>
        <nav className="border-t border-paper/15">
          <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2 sm:px-6">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="inline-flex items-center gap-2 whitespace-nowrap border border-paper/20 px-3 py-1.5 font-mono text-[11px] tracking-wider transition-colors hover:border-riso-yellow hover:bg-riso-yellow hover:text-ink"
              >
                <n.icon className="h-3.5 w-3.5" /> {n.label.toUpperCase()}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
