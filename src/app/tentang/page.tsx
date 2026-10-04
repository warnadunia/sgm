import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading, SectionTag } from "@/components/site/typography";
import { Marquee } from "@/components/site/Marquee";

export const metadata: Metadata = {
  title: "Tentang Studio",
  description:
    "Studio Grafis Minggiran (SGM) — studio cetak dan ruang kolektif di Padukuhan Minggiran, Sleman, Yogyakarta sejak 2018.",
};

const TIMELINE = [
  ["2018", "Berdiri di garasi rumah warga Minggiran dengan satu mesin etsa tangan."],
  ["2019", "Angkatan pertama residensi — tiga perupa dari Yogyakarta, Bandung, dan Makassar."],
  ["2021", "Print Parade edisi pertama: 200 orang mengarak cetakan menyusuri Jalan Minggiran."],
  ["2022", "PSGY #1 digelar bersama 6 studio dan kolektif se-Yogyakarta."],
  ["2024", "Mesin riso dan studio sablon skala penuh berdiri; kelas rutin tiap akhir pekan."],
  ["2026", "Arsip digital katalog karya diluncurkan; PSGY #6 “Tinta di Atas Kota”."],
] as const;

export default function TentangPage() {
  return (
    <>
      <header className="border-b-2 border-ink bg-riso-blue text-paper">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <SectionTag color="#FFC532" className="text-paper">
            Tentang Studio
          </SectionTag>
          <SectionHeading className="mt-4 max-w-4xl text-paper">
            Dusun Kecil, <span className="text-outline">Meja Cetak Besar</span>
          </SectionHeading>
          <p className="mt-6 max-w-2xl font-serif text-lg italic leading-relaxed text-paper/85">
            Kami adalah tetangga yang kebetulan percaya bahwa cetakan adalah bentuk seni paling demokratis: satu
            plat bisa jadi ribuan lembar, dan ribuan lembar bisa sampai ke ribuan tangan.
          </p>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="-rotate-2 border-2 border-ink bg-paper p-3 riso-shadow">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/seed/hero-studio.jpg" alt="Ruang cetak Studio Grafis Minggiran" className="aspect-[4/3] w-full border-2 border-ink object-cover" />
            </div>
            <div className="absolute -bottom-5 right-6 rotate-3 border-2 border-ink bg-riso-pink px-4 py-2 font-display text-sm uppercase text-paper sticker">
              Sejak 2018
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <SectionTag color="#FF6B35">Cerita Kami</SectionTag>
          <h2 className="mt-4 font-display text-3xl uppercase leading-tight sm:text-4xl">
            Dimulai dari garasi, tumbuh jadi pekan raya grafis
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-ink-soft">
            <p>
              Studio Grafis Minggiran (SGM) berdiri 2018 di Padukuhan Minggiran, Sardonoharjo, Ngaglik, Sleman —
              dusun kecil di utara Yogyakarta. Berawal dari satu mesin etsa bekas dan dua meja kayu, kami membuka
              diri bagi siapa pun yang ingin belajar mencetak.
            </p>
            <p>
              Delapan tahun berjalan, SGM kini menjalankan <strong>program residensi</strong> untuk perupa grafis
              lintas kota, <strong>kelas workshop</strong> sablon, cukil, etsa, dan risograf setiap akhir pekan,
              serta dua event tahunan yang lahir dari meja yang sama: <strong>Print Parade</strong> dan{" "}
              <strong>Pekan Seni Grafis Yogyakarta</strong>.
            </p>
            <p>
              Semua itu kami topang lewat artshop — art print edisi terbatas, kaos, totebag, dan zine yang dicetak
              manual di studio — serta oleh huhuran para relawan yang percaya tinta bisa menyatukan kampung.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="border-y-2 border-ink bg-paper-deep py-20 paper-torn">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal>
            <SectionTag color="#2438D8">Linimasa</SectionTag>
            <SectionHeading className="mt-4">Jejak Tinta</SectionHeading>
          </Reveal>
          <ol className="relative mt-12 space-y-10 border-l-4 border-ink pl-8">
            {TIMELINE.map(([year, text], i) => (
              <Reveal key={year} delay={i * 0.06}>
                <li className="relative">
                  <span className="absolute -left-[3.35rem] grid h-12 w-12 -translate-y-1 place-items-center border-2 border-ink bg-riso-yellow font-display text-sm riso-shadow-sm">
                    {year.slice(2)}
                  </span>
                  <p className="font-mono text-[11px] tracking-[0.3em] text-riso-blue">{year}</p>
                  <p className="mt-1.5 max-w-2xl leading-relaxed">{text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal>
          <SectionTag color="#FF4D6D">Fasilitas Studio</SectionTag>
          <SectionHeading className="mt-4">Alat Tempur Kami</SectionHeading>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Mesin Etsa & Cukil", "Press intaglio 60cm, papan relief berbagai ukuran, perkakas cukil lengkap."],
            ["Studio Sablon", "Meja cetak 4 stasiun, tikuhot, screen berbagai mesh, ruang afdruk fotoemulsi."],
            ["Mesin Riso", "Duplikator riso 2 drum warna fluor — andalan zine dan poster edisi cepat."],
            ["Ruang Pamer & Arsip", "Galeri kecil + ruang arsip katalog karya 2019–sekarang, terbuka untuk riset."],
          ].map(([title, body], i) => (
            <Reveal key={title} delay={i * 0.06}>
              <div className="h-full border-2 border-ink bg-paper p-5 hover-lift">
                <span className="font-display text-2xl text-riso-pink">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-base uppercase">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link href="/program/workshop" className="border-2 border-ink bg-ink px-6 py-3 font-display text-sm uppercase tracking-wide text-paper transition-transform hover:-translate-y-0.5">
              Ikut Kelas di Studio ↗
            </Link>
            <Link href="/program/residensi" className="border-2 border-ink bg-paper px-6 py-3 font-display text-sm uppercase tracking-wide transition-transform hover:-translate-y-0.5 hover:bg-riso-yellow">
              Lamar Residensi ↗
            </Link>
          </div>
        </Reveal>
      </section>

      <Marquee items={["DARI MINGGIRAN UNTUK SEMUA", "TINTA • KERTAS • KAMPUNG", "EST. 2018"]} />
    </>
  );
}
