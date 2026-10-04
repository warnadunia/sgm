import { redirect } from "next/navigation";
import { getAdminEmail } from "@/lib/session";

/** Guard untuk halaman admin (server component) — redirect ke login bila belum masuk. */
export async function assertAdminPage() {
  const email = await getAdminEmail();
  if (!email) redirect("/admin/login");
  return email;
}
