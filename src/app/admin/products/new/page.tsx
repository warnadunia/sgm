import { assertAdminPage } from "@/lib/admin-guard";
import { ProductForm } from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  await assertAdminPage();
  return <ProductForm />;
}
