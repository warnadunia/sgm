import type { Metadata } from "next";
import { getArtworks } from "@/lib/data";
import { SectionHeading, SectionTag } from "@/components/site/typography";
import { ArchiveBrowser } from "@/components/site/ArchiveBrowser";
import { Marquee } from "@/components/site/Marquee";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Arsip & Katalog Karya",
  description:
    "Katalog digital koleksi cetakan Studio Grafis Minggiran 2019–2026: cukil kayu, sablon, etsa, litografi, dan risograf dari perupa residen dan kolektif.",
};

export default async function ArsipPage() {
  const artworks = await getArtworks();

  return (
    <>
      <header className="border-b-2 border-ink bg-paper-deep paper-torn">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <SectionTag color="#FF4D6D">Galeri & Katalog — Terus Bertumbuh</SectionTag>
          <SectionHeading className="mt-4">
            Arsip <span className="riso-offset" style={{ ["--offset-a" as string]: "#FF4D6D" }}>Cetakan</span>
          </SectionHeading>
          <p className="mt-5 max-w-2xl leading-relaxed text-ink-soft">
            Setiap cetakan yang lahir di Minggiran dicatat: teknik, tahun, edisi, dan perupanya. Gunakan filter di
            bawah untuk menyusuri katalog menurut teknik, tahun pembuatan, atau kategori.
          </p>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
        <ArchiveBrowser artworks={artworks} />
      </main>
      <div className="mt-10">
        <Marquee items={["SATU PLAT, RIBUAN KEMUNGKINAN", "ARSIP ADALAH INGATAN KOLEKTIF", "CETAK • GANDA • SEKARANG"]} slow />
      </div>
    </>
  );
}
