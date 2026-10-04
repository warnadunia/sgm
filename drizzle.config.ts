import { defineConfig } from "drizzle-kit";
import { loadEnvFile } from "./src/db/env";

loadEnvFile();

const url = process.env.DATABASE_URL || "file:./data/dev.db";

// dbCredentials untuk Turso/libSQL menerima authToken, tetapi tipe drizzle-kit
// lokal hanya mengenal { url } — maka diberi cast.
const dbCredentials = (
  process.env.DATABASE_AUTH_TOKEN ? { url, authToken: process.env.DATABASE_AUTH_TOKEN } : { url }
) as { url: string };

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials,
});
