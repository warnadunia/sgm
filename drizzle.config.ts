import { defineConfig } from "drizzle-kit";
import { loadEnvFile } from "./src/db/env";

loadEnvFile();

const url =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_YzcGMTdeq3A6@ep-calm-shadow-azo3mput-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url,
  },
});
