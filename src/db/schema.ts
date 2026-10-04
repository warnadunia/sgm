import { boolean, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createId } from "../lib/id";

// ---------------------------------------------------------------------------
// MICROSITE — satu tabel untuk Program (Residensi, Workshop) & Event
// (Print Parade, Pekan Seni Grafis Yogyakarta). Setiap entri punya halaman
// microsite sendiri, bisa dijadikan "headline" di landing page, dan untuk
// event yang sedang berlangsung info lengkap HANYA tampil di microsite.
// ---------------------------------------------------------------------------
export const microsites = pgTable("microsites", {
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
  startDate: timestamp("start_date", { mode: "date" }),
  endDate: timestamp("end_date", { mode: "date" }),
  isLiveNow: boolean("is_live_now").notNull().default(false),
  isHeadline: boolean("is_headline").notNull().default(false),
  headlineOrder: integer("headline_order").notNull().default(0),
  ctaLabel: text("cta_label"),
  ctaUrl: text("cta_url"),
  blocks: text("blocks"), // JSON ContentBlock[]
  images: text("images"), // JSON string[]
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// ARTWORK — galeri & katalog karya (arsip)
// ---------------------------------------------------------------------------
export const artworks = pgTable("artworks", {
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
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// PRODUCT — artshop & merchandise (multi-image)
// ---------------------------------------------------------------------------
export const products = pgTable("products", {
  id: text("id").primaryKey().$defaultFn(createId),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  price: integer("price").notNull(),
  comparePrice: integer("compare_price"),
  stock: integer("stock").notNull().default(0),
  category: text("category").notNull().default("Merchandise"),
  images: text("images"), // JSON string[] — bisa lebih dari satu gambar
  isFeatured: boolean("is_featured").notNull().default(false),
  isAvailable: boolean("is_available").notNull().default(true),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// POST — blog / news & update. Opsional terhubung ke microsite.
// ---------------------------------------------------------------------------
export const posts = pgTable("posts", {
  id: text("id").primaryKey().$defaultFn(createId),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  content: text("content"),
  coverImage: text("cover_image"),
  category: text("category").notNull().default("Umum"),
  micrositeId: text("microsite_id").references(() => microsites.id, { onDelete: "set null" }),
  published: boolean("published").notNull().default(true),
  publishedAt: timestamp("published_at", { mode: "date" }).notNull().defaultNow(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

export const adminUsers = pgTable("admin_users", {
  id: text("id").primaryKey().$defaultFn(createId),
  email: text("email").notNull().unique(),
  name: text("name"),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

export type Microsite = typeof microsites.$inferSelect;
export type NewMicrosite = typeof microsites.$inferInsert;
export type Artwork = typeof artworks.$inferSelect;
export type NewArtwork = typeof artworks.$inferInsert;
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export type AdminUser = typeof adminUsers.$inferSelect;
export type NewAdminUser = typeof adminUsers.$inferInsert;
