import type { Metadata } from "next";
import { getProducts } from "@/lib/data";
import { SectionHeading, SectionTag } from "@/components/site/typography";
import { ShopBrowser } from "@/components/site/ShopBrowser";
import { Marquee } from "@/components/site/Marquee";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Artshop & Merchandise",
  description:
    "Art print edisi terbatas, kaos sablon, totebag, dan zine — dicetak manual di Studio Grafis Minggiran. Setiap pembelian menopang program studio.",
};

export default async function ArtshopPage() {
  const products = await getProducts();

  return (
    <>
      <header className="border-b-2 border-ink bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <SectionTag color="#FFC532" className="text-paper">
            Artshop & Merchandise
          </SectionTag>
          <SectionHeading className="mt-4 text-paper">
            Bawa Pulang <span className="text-outline">Kertas Bau Tinta</span>
          </SectionHeading>
          <p className="mt-5 max-w-2xl leading-relaxed text-paper/70">
            Semua barang dicetak dan dirakit langsung di studio — jumlahnya terbatas karena kami bukan pabrik.
            Pemesanan lewat WhatsApp, pengiriman dari Yogyakarta ke seluruh Indonesia.
          </p>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <ShopBrowser products={products} />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            ["01", "PILIH BARANG", "Setiap produk punya beberapa foto — putar sampai yakin."],
            ["02", "PESAN VIA WHATSAPP", "Klik tombol pesan di halaman produk, kami balas cepat."],
            ["03", "KIRIM / AMBIL", "Dikirim dari Sleman, atau ambil sendiri di studio."],
          ].map(([num, title, body]) => (
            <div key={num} className="border-2 border-ink bg-paper p-5 riso-shadow-sm">
              <span className="font-display text-3xl text-riso-pink">{num}</span>
              <p className="mt-2 font-display text-sm uppercase">{title}</p>
              <p className="mt-1.5 text-sm text-ink-soft">{body}</p>
            </div>
          ))}
        </div>
      </main>
      <div className="mt-6">
        <Marquee items={["DICETAK MANUAL, BUKAN PABRIKAN", "EDISI TERBATAS", "HASIL PENJUALAN MENOPANG PROGRAM STUDIO"]} slow />
      </div>
    </>
  );
}
