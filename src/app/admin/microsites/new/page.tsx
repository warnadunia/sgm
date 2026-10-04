import { assertAdminPage } from "@/lib/admin-guard";
import { MicrositeForm } from "@/components/admin/MicrositeForm";

export const dynamic = "force-dynamic";

export default async function NewMicrositePage() {
  await assertAdminPage();
  return <MicrositeForm />;
}
