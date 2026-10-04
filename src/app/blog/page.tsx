import type { Metadata } from "next";
import { getPosts } from "@/lib/data";
import { SectionHeading, SectionTag } from "@/components/site/typography";
import { BlogBrowser } from "@/components/site/BlogBrowser";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kabar & Update",
  description:
    "Berita terbaru Studio Grafis Minggiran: pengumuman event, open call residensi, jadwal workshop, dan catatan di balik dinding studio.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <header className="border-b-2 border-ink bg-paper-deep paper-torn">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <SectionTag color="#0F8A76">Blog — News & Update</SectionTag>
          <SectionHeading className="mt-4">
            Kabar dari <span className="riso-offset" style={{ ["--offset-a" as string]: "#0F8A76" }}>Meja Cetak</span>
          </SectionHeading>
          <p className="mt-5 max-w-2xl leading-relaxed text-ink-soft">
            Pengumuman resmi program dan event (terhubung langsung ke microsite-nya), plus kabar umum seputar
            studio, arsip, dan komunitas grafis Yogyakarta.
          </p>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <BlogBrowser posts={posts} />
      </main>
    </>
  );
}
