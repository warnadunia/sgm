/**
 * Dijalankan sekali oleh Next.js saat server start.
 * Menerapkan migrasi SQL yang ter-commit (folder ./drizzle) lalu memastikan
 * akun admin tersedia — sehingga deploy baru di Vercel langsung siap pakai
 * tanpa langkah setup database manual.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const { loadEnvFile } = await import("@/db/env");
  loadEnvFile();

  const fs = await import("node:fs");
  const path = await import("node:path");
  const migrationsFolder = path.join(process.cwd(), "drizzle");

  if (fs.existsSync(migrationsFolder)) {
    try {
      const { migrate } = await import("drizzle-orm/libsql/migrator");
      const { db } = await import("@/db/client");
      await migrate(db, { migrationsFolder });
      console.log("[sgm] Migrasi database OK");
      const { ensureAdminUser } = await import("@/db/ensure-admin");
      if (await ensureAdminUser()) {
        console.log("[sgm] Akun admin awal dibuat:", process.env.ADMIN_EMAIL);
      }
    } catch (err) {
      console.error("[sgm] Migrasi/inisialisasi DB gagal:", err);
    }
  }
}
