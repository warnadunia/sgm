import { assertAdminPage } from "@/lib/admin-guard";
import { adminListMicrosites } from "@/lib/data";
import { PostForm } from "@/components/admin/PostForm";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  await assertAdminPage();
  const microsites = await adminListMicrosites();
  return <PostForm microsites={microsites} />;
}
