"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/program/residensi", label: "Residensi" },
  { href: "/program/workshop", label: "Workshop" },
  { href: "/event/print-parade", label: "Print Parade" },
  { href: "/event/pekan-seni-grafis-yogyakarta", label: "PSGY" },
  { href: "/arsip", label: "Arsip" },
  { href: "/artshop", label: "Artshop" },
  { href: "/blog", label: "Kabar" },
  { href: "/tentang", label: "Studio" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b-2 border-ink bg-paper/95 backdrop-blur-sm transition-transform duration-500",
          scrolled ? "translate-y-0" : "translate-y-0"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-stretch justify-between px-4 sm:px-6">
          <Link href="/" className="group flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center bg-ink font-display text-lg text-paper transition-transform duration-300 group-hover:-rotate-6 group-hover:bg-riso-pink">
              S
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-[13px] tracking-wide">STUDIO GRAFIS</span>
              <span className="font-mono text-[10px] tracking-[0.3em] text-ink-soft">MINGGIRAN — YK</span>
            </span>
          </Link>

          <nav className="hidden items-stretch lg:flex">
            {LINKS.map((l) => {
              const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "relative grid place-items-center border-l-2 border-ink px-4 font-mono text-[11px] tracking-[0.12em] uppercase transition-colors",
                    active ? "bg-ink text-paper" : "hover:bg-riso-yellow"
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link
              href="/artshop"
              className="grid place-items-center border-l-2 border-ink bg-riso-pink px-5 font-display text-[12px] tracking-wide text-paper transition-colors hover:bg-ink"
            >
              BELANJA ↗
            </Link>
          </nav>

          <button
            onClick={() => setOpen(true)}
            aria-label="Buka menu"
            className="grid w-12 place-items-center border-l-2 border-ink lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink text-paper"
          >
            <div className="flex h-16 items-center justify-between border-b-2 border-paper/20 px-4 sm:px-6">
              <span className="font-display text-sm tracking-wide">MENU — SGM</span>
              <button onClick={() => setOpen(false)} aria-label="Tutup menu" className="grid h-10 w-10 place-items-center border-2 border-paper/40">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ x: -32, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={l.href}
                    className={cn(
                      "group flex items-center justify-between border-b-2 border-paper/15 px-4 py-4 sm:px-6",
                      pathname === l.href ? "bg-riso-pink" : "hover:bg-paper hover:text-ink"
                    )}
                  >
                    <span className="font-display text-2xl uppercase sm:text-3xl">{l.label}</span>
                    <ArrowUpRight className="h-6 w-6 opacity-40 transition-transform group-hover:rotate-45" />
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="px-4 py-6 font-mono text-[11px] tracking-widest text-paper/60 sm:px-6">
              PADUKUHAN MINGGIRAN, SARDONOHARJO, NGAGLIK, SLEMAN — DIY
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="h-16" aria-hidden />
    </>
  );
}
