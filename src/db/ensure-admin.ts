import { eq } from "drizzle-orm";
import { db } from "./client";
import { adminUsers } from "./schema";
import { hashPassword } from "@/lib/session";

/**
 * Memastikan ada minimal satu akun admin.
 * Dipanggil otomatis saat server start (instrumentation) dan oleh seed.
 */
export async function ensureAdminUser() {
  const email = (process.env.ADMIN_EMAIL || "admin@studiografisminggiran.id").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "minggiran2026";
  const existing = await db.select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1);
  if (existing.length === 0) {
    await db.insert(adminUsers).values({
      email,
      name: "Admin SGM",
      passwordHash: hashPassword(password),
    });
    return true;
  }
  return false;
}
