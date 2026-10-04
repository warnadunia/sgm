import Link from "next/link";
import { Instagram, Mail, MapPin } from "lucide-react";
import { Marquee } from "./Marquee";

export function Footer() {
  return (
    <footer className="mt-24 border-t-2 border-ink bg-ink text-paper">
      <Marquee
        dark
        items={["STUDIO GRAFIS MINGGIRAN", "CETAK • GANDA • SEKARANG", "PRINT PARADE", "PEKAN SENI GRAFIS YOGYAKARTA", "RESIDENSI", "WORKSHOP", "ARTSHOP"]}
      />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center bg-riso-pink font-display text-xl text-paper">S</span>
            <div className="leading-tight">
              <p className="font-display text-lg">STUDIO GRAFIS MINGGIRAN</p>
              <p className="font-mono text-[10px] tracking-[0.3em] text-paper/60">EST. 2018 — YOGYAKARTA</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-paper/70">
            Studio cetak dan ruang kolektif seni grafis di Padukuhan Minggiran. Kami membuka program residensi,
            kelas workshop, event tahunan Print Parade & Pekan Seni Grafis Yogyakarta, serta merawat arsip karya
            dan artshop agar cetakan terus beredar.
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] text-riso-yellow">JELAJAH</p>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              ["/program/residensi", "Residensi"],
              ["/program/workshop", "Workshop"],
              ["/event/print-parade", "Print Parade"],
              ["/event/pekan-seni-grafis-yogyakarta", "Pekan Seni Grafis"],
              ["/arsip", "Arsip & Katalog"],
              ["/artshop", "Artshop"],
              ["/blog", "Kabar & Update"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="link-slide text-paper/80 hover:text-paper">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] text-riso-yellow">SAPA KAMI</p>
          <ul className="mt-4 space-y-3 text-sm text-paper/80">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-riso-pink" />
              <span>
                Padukuhan Minggiran, Sardonoharjo,
                <br />
                Ngaglik, Sleman, DIY 55581
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Instagram className="h-4 w-4 shrink-0 text-riso-pink" />
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="link-slide">
                @studiografisminggiran
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-riso-pink" />
              <a href="mailto:halo@studiografisminggiran.id" className="link-slide">
                halo@studiografisminggiran.id
              </a>
            </li>
          </ul>
          <p className="mt-6 border-2 border-paper/20 p-3 font-mono text-[10px] leading-relaxed tracking-wider text-paper/50">
            JAM STUDIO:
            <br />
            SELASA–MINGGU, 09.00–17.00 WIB
          </p>
        </div>
      </div>
      <div className="border-t border-paper/15">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-4 py-4 font-mono text-[10px] tracking-widest text-paper/50 sm:flex-row sm:items-center sm:px-6">
          <span>© 2026 STUDIO GRAFIS MINGGIRAN — DICETAK DENGAN TINTA & KODE</span>
          <Link href="/admin" className="link-slide hover:text-paper">
            LOGIN ADMIN ↗
          </Link>
        </div>
      </div>
    </footer>
  );
}
