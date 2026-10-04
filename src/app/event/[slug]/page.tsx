import type { Metadata } from "next";
import { getMicrosite } from "@/lib/data";
import { MicrositeView } from "@/components/site/MicrositeView";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const m = await getMicrosite("EVENT", slug);
  if (!m) return { title: "Event tidak ditemukan" };
  return {
    title: m.title,
    description: m.description || m.tagline || undefined,
    openGraph: { title: m.title, description: m.description || undefined },
  };
}

export default async function EventMicrositePage({ params }: Props) {
  const { slug } = await params;
  const m = await getMicrosite("EVENT", slug);
  return <MicrositeView m={m} />;
}
