import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/db/client";
import { artworks } from "@/db/schema";
import { assertAdminPage } from "@/lib/admin-guard";
import { ArtworkForm } from "@/components/admin/ArtworkForm";

export const dynamic = "force-dynamic";

export default async function EditArtworkPage({ params }: { params: Promise<{ id: string }> }) {
  await assertAdminPage();
  const { id } = await params;
  const rows = await db.select().from(artworks).where(eq(artworks.id, id)).limit(1);
  if (!rows[0]) notFound();
  return <ArtworkForm artwork={rows[0]} />;
}
