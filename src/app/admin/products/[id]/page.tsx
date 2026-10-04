import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/db/client";
import { products } from "@/db/schema";
import { assertAdminPage } from "@/lib/admin-guard";
import { ProductForm } from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  await assertAdminPage();
  const { id } = await params;
  const rows = await db.select().from(products).where(eq(products.id, id)).limit(1);
  if (!rows[0]) notFound();
  return <ProductForm product={rows[0]} />;
}
