import { count } from "drizzle-orm";
import { db } from "./client";
import { microsites } from "./schema";
import { seedDatabase } from "./seed";

export async function ensureInitialContent() {
  try {
    const res = await db.select({ c: count() }).from(microsites);
    if ((res[0]?.c ?? 0) === 0) {
      console.log("[sgm] Database kosong, mengisi data demo awal...");
      await seedDatabase({ clean: false });
    }
  } catch (err) {
    console.error("[sgm] Gagal memeriksa / mengisi data awal:", err);
  }
}
