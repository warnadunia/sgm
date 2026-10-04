"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/db/client";
import { artworks, posts, products } from "@/db/schema";
import { requireAdmin } from "@/lib/session";
import { slugify } from "@/lib/utils";

function jsonImages(raw?: string): string[] {
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((x) => typeof x === "string" && x) : [];
  } catch {
    return [];
  }
}

function isUniqueError(e: unknown) {
  return String(e).toLowerCase().includes("unique");
}

export type FormState = { error?: string };

// ------------------------------ ARTWORK ------------------------------
const artworkSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3),
  slug: z.string().optional(),
  artist: z.string().min(2),
  year: z.coerce.number().int().min(1900).max(2100),
  technique: z.string().min(2),
  medium: z.string().optional(),
  dimensions: z.string().optional(),
  edition: z.string().optional(),
  category: z.string().default("Karya"),
  description: z.string().optional(),
  featured: z.coerce.boolean().default(false),
  imagesJson: z.string().optional(),
});

export async function saveArtworkAction(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = artworkSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  const d = parsed.data;
  const data = {
    title: d.title,
    slug: d.slug?.trim() || slugify(d.title),
    artist: d.artist,
    year: d.year,
    technique: d.technique,
    medium: d.medium || null,
    dimensions: d.dimensions || null,
    edition: d.edition || null,
    category: d.category,
    description: d.description || null,
    featured: d.featured,
    images: JSON.stringify(jsonImages(d.imagesJson)),
  };
  try {
    if (d.id) await db.update(artworks).set({ ...data, updatedAt: new Date() }).where(eq(artworks.id, d.id));
    else await db.insert(artworks).values(data);
  } catch (e) {
    if (isUniqueError(e)) return { error: "Slug sudah dipakai." };
    throw e;
  }
  revalidatePath("/arsip");
  revalidatePath("/");
  redirect("/admin/artworks");
}

export async function deleteArtworkAction(id: string) {
  await requireAdmin();
  await db.delete(artworks).where(eq(artworks.id, id));
  revalidatePath("/arsip");
  revalidatePath("/admin/artworks");
}

// ------------------------------ PRODUCT ------------------------------
const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3),
  slug: z.string().optional(),
  description: z.string().optional(),
  price: z.coerce.number().int().min(0),
  comparePrice: z.coerce.number().int().min(0).optional().or(z.literal(0)),
  stock: z.coerce.number().int().min(0).default(0),
  category: z.string().default("Merchandise"),
  imagesJson: z.string().optional(),
  isFeatured: z.coerce.boolean().default(false),
  isAvailable: z.coerce.boolean().default(true),
});

export async function saveProductAction(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = productSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  const d = parsed.data;
  const images = jsonImages(d.imagesJson);
  if (images.length === 0) return { error: "Tambahkan minimal satu foto produk." };
  const data = {
    name: d.name,
    slug: d.slug?.trim() || slugify(d.name),
    description: d.description || null,
    price: d.price,
    comparePrice: d.comparePrice ? d.comparePrice : null,
    stock: d.stock,
    category: d.category,
    images: JSON.stringify(images),
    isFeatured: d.isFeatured,
    isAvailable: d.isAvailable,
  };
  try {
    if (d.id) await db.update(products).set({ ...data, updatedAt: new Date() }).where(eq(products.id, d.id));
    else await db.insert(products).values(data);
  } catch (e) {
    if (isUniqueError(e)) return { error: "Slug sudah dipakai." };
    throw e;
  }
  revalidatePath("/artshop");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function deleteProductAction(id: string) {
  await requireAdmin();
  await db.delete(products).where(eq(products.id, id));
  revalidatePath("/artshop");
  revalidatePath("/admin/products");
}

// ------------------------------ POST ------------------------------
const postSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  coverImage: z.string().optional(),
  category: z.string().default("Umum"),
  micrositeId: z.string().optional(),
  published: z.coerce.boolean().default(false),
  publishedAt: z.string().optional(),
});

export async function savePostAction(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = postSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  const d = parsed.data;
  const data = {
    title: d.title,
    slug: d.slug?.trim() || slugify(d.title),
    excerpt: d.excerpt || null,
    content: d.content || null,
    coverImage: d.coverImage || null,
    category: d.category,
    micrositeId: d.micrositeId || null,
    published: d.published,
    publishedAt: d.publishedAt ? new Date(d.publishedAt) : new Date(),
  };
  try {
    if (d.id) await db.update(posts).set({ ...data, updatedAt: new Date() }).where(eq(posts.id, d.id));
    else await db.insert(posts).values(data);
  } catch (e) {
    if (isUniqueError(e)) return { error: "Slug sudah dipakai." };
    throw e;
  }
  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin/posts");
}

export async function deletePostAction(id: string) {
  await requireAdmin();
  await db.delete(posts).where(eq(posts.id, id));
  revalidatePath("/blog");
  revalidatePath("/admin/posts");
}
