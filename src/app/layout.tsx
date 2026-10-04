import type { Metadata } from "next";
// Font self-hosted via Fontsource — tidak bergantung pada CDN, cepat & stabil.
import "@fontsource/archivo-black/400.css";
import "@fontsource-variable/archivo";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/site/SmoothScroll";

export const metadata: Metadata = {
  title: {
    default: "Studio Grafis Minggiran — Studio Cetak & Ruang Tumbuh Grafis Yogyakarta",
    template: "%s | Studio Grafis Minggiran",
  },
  description:
    "Studio Grafis Minggiran (SGM) adalah studio cetak dan ruang kolektif seni grafis di Minggiran, Yogyakarta. Program residensi, workshop, serta event tahunan Print Parade dan Pekan Seni Grafis Yogyakarta.",
  keywords: [
    "studio grafis minggiran",
    "seni grafis yogyakarta",
    "print parade",
    "pekan seni grafis yogyakarta",
    "residensi seni",
    "workshop sablon",
    "cukil",
    "risograf",
  ],
  openGraph: {
    title: "Studio Grafis Minggiran",
    description: "Studio cetak & ruang tumbuh seni grafis di Minggiran, Yogyakarta.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className="grain flex min-h-screen flex-col">
        <SmoothScroll />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
