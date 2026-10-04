import fs from "node:fs";
import path from "node:path";

/**
 * Memuat variabel dari .env secara manual untuk skrip standalone (tsx),
 * karena hanya Next.js yang otomatis membaca .env.
 */
export function loadEnvFile() {
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), ".env"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*"?([^"\n]*)"?\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  } catch {
    // .env opsional
  }
}
