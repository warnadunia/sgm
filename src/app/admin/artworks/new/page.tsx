import { assertAdminPage } from "@/lib/admin-guard";
import { ArtworkForm } from "@/components/admin/ArtworkForm";

export const dynamic = "force-dynamic";

export default async function NewArtworkPage() {
  await assertAdminPage();
  return <ArtworkForm />;
}
