import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/db/client";
import { microsites } from "@/db/schema";
import { assertAdminPage } from "@/lib/admin-guard";
import { MicrositeForm } from "@/components/admin/MicrositeForm";

export const dynamic = "force-dynamic";

export default async function EditMicrositePage({ params }: { params: Promise<{ id: string }> }) {
  await assertAdminPage();
  const { id } = await params;
  const rows = await db.select().from(microsites).where(eq(microsites.id, id)).limit(1);
  if (!rows[0]) notFound();
  return <MicrositeForm microsite={rows[0]} />;
}
