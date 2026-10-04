import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/db/client";
import { posts } from "@/db/schema";
import { assertAdminPage } from "@/lib/admin-guard";
import { adminListMicrosites } from "@/lib/data";
import { PostForm } from "@/components/admin/PostForm";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  await assertAdminPage();
  const { id } = await params;
  const [rows, microsites] = await Promise.all([
    db.select().from(posts).where(eq(posts.id, id)).limit(1),
    adminListMicrosites(),
  ]);
  if (!rows[0]) notFound();
  return <PostForm post={rows[0]} microsites={microsites} />;
}
