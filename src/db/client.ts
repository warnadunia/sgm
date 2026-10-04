import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import { loadEnvFile } from "./env";
import * as schema from "./schema";

loadEnvFile();

const defaultUrl =
  "postgresql://neondb_owner:npg_YzcGMTdeq3A6@ep-calm-shadow-azo3mput-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
const connectionString = process.env.DATABASE_URL || defaultUrl;

const globalForDb = globalThis as unknown as {
  sql?: NeonQueryFunction<false, false>;
  drizzle?: NeonHttpDatabase<typeof schema>;
};

export const sql = globalForDb.sql ?? neon(connectionString);
export const db = globalForDb.drizzle ?? drizzle(sql, { schema });

if (process.env.NODE_ENV !== "production") {
  globalForDb.sql = sql;
  globalForDb.drizzle = db;
}

export { schema };
