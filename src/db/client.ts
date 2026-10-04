import { createClient, type Client } from "@libsql/client";
import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql";
import { loadEnvFile } from "./env";
import * as schema from "./schema";

loadEnvFile();

const url = process.env.DATABASE_URL || "file:./data/dev.db";
const authToken = process.env.DATABASE_AUTH_TOKEN;

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
