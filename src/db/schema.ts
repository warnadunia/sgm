import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createId } from "../lib/id";

// ---------------------------------------------------------------------------
// MICROSITE — satu tabel untuk Program (Residensi, Workshop) & Event
// (Print Parade, Pekan Seni Grafis Yogyakarta). Setiap entri punya halaman
// microsite sendiri, bisa dijadikan "headline" di landing page, dan untuk
// event yang sedang berlangsung info lengkap HANYA tampil di microsite.
// ---------------------------------------------------------------------------
export const microsites = sqliteTable("microsites", {
  id: text("id").primaryKey().$defaultFn(createId),
  slug: text("slug").notNull().unique(),
  kind: text("kind").notNull(), // "PROGRAM" | "EVENT"
  title: text("title").notNull(),
  tagline: text("tagline"),
  description: text("description"),
  content: text("content"),
  heroImage: text("hero_image"),
  themeColor: text("theme_color").notNull().default("#FF4D6D"),
  status: text("status").notNull().default("PUBLISHED"), // DRAFT | PUBLISHED | ARCHIVED
  edition: text("edition"),
  location: text("location"),
  startDate: integer("start_date", { mode: "timestamp_ms" }),
  endDate: integer("end_date", { mode: "timestamp_ms" }),
  isLiveNow: integer("is_live_now", { mode: "boolean" }).notNull().default(false),
  isHeadline: integer("is_headline", { mode: "boolean" }).notNull().default(false),
  headlineOrder: integer("headline_order").notNull().default(0),
  ctaLabel: text("cta_label"),
  ctaUrl: text("cta_url"),
  blocks: text("blocks"), // JSON ContentBlock[]
  images: text("images"), // JSON string[]
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
});

// ---------------------------------------------------------------------------
// ARTWORK — galeri & katalog karya (arsip)
// ---------------------------------------------------------------------------
export const artworks = sqliteTable("artworks", {
  id: text("id").primaryKey().$defaultFn(createId),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  artist: text("artist").notNull(),
  year: integer("year").notNull(),
  technique: text("technique").notNull(),
  medium: text("medium"),
  dimensions: text("dimensions"),
  edition: text("edition"),
  category: text("category").notNull().default("Karya"),
  description: text("description"),
  images: text("images"), // JSON string[]
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
});

// ---------------------------------------------------------------------------
// PRODUCT — artshop & merchandise (multi-image)
// ---------------------------------------------------------------------------
export const products = sqliteTable("products", {
  id: text("id").primaryKey().$defaultFn(createId),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  price: integer("price").notNull(),
  comparePrice: integer("compare_price"),
  stock: integer("stock").notNull().default(0),
  category: text("category").notNull().default("Merchandise"),
  images: text("images"), // JSON string[] — bisa lebih dari satu gambar
  isFeatured: integer("is_featured", { mode: "boolean" }).notNull().default(false),
  isAvailable: integer("is_available", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
});

// ---------------------------------------------------------------------------
// POST — blog / news & update. Opsional terhubung ke microsite.
// ---------------------------------------------------------------------------
export const posts = sqliteTable("posts", {
  id: text("id").primaryKey().$defaultFn(createId),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  content: text("content"),
  coverImage: text("cover_image"),
  category: text("category").notNull().default("Umum"),
  micrositeId: text("microsite_id").references(() => microsites.id, { onDelete: "set null" }),
  published: integer("published", { mode: "boolean" }).notNull().default(true),
  publishedAt: integer("published_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
});

export const adminUsers = sqliteTable("admin_users", {
  id: text("id").primaryKey().$defaultFn(createId),
  email: text("email").notNull().unique(),
  name: text("name"),
  passwordHash: text("password_hash").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
});

export type Microsite = typeof microsites.$inferSelect;
export type NewMicrosite = typeof microsites.$inferInsert;
export type Artwork = typeof artworks.$inferSelect;
export type NewArtwork = typeof artworks.$inferInsert;
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
