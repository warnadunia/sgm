import { createClient, type Client } from "@libsql/client";
import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql";
import { loadEnvFile } from "./env";
import * as schema from "./schema";

import fs from "node:fs";
import path from "node:path";

loadEnvFile();

const url = process.env.DATABASE_URL || "file:./data/dev.db";
const authToken = process.env.DATABASE_AUTH_TOKEN;

if (url.startsWith("file:")) {
  const filePath = url.replace(/^file:/, "");
  const dir = path.dirname(path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath));
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch {
      // Ignore if cannot create directory (e.g. read-only environment)
    }
  }
}

const globalForDb = globalThis as unknown as {
  libsql?: Client;
  drizzle?: LibSQLDatabase<typeof schema>;
};

export const libsql =
  globalForDb.libsql ?? createClient({ url, authToken: authToken || undefined });

export const db =
  globalForDb.drizzle ?? drizzle(libsql, { schema });

if (process.env.NODE_ENV !== "production") {
  globalForDb.libsql = libsql;
  globalForDb.drizzle = db;
}

export { schema };
