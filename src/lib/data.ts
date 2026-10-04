import { and, asc, desc, eq, inArray } from "drizzle-orm";
import { db } from "@/db/client";
import { artworks, microsites, posts, products, type Microsite, type Post } from "@/db/schema";

export type PostMicrositeRef = Pick<Microsite, "title" | "slug" | "kind" | "themeColor"> | null;
export type PostWithMicrosite = Post & { microsite: PostMicrositeRef };

// ---------- MICROSITE ----------
export async function getHeadlineMicrosites() {
  return db
    .select()
    .from(microsites)
    .where(and(eq(microsites.isHeadline, true), eq(microsites.status, "PUBLISHED")))
    .orderBy(asc(microsites.headlineOrder), desc(microsites.updatedAt));
}

export async function getPrograms() {
  return db
    .select()
    .from(microsites)
    .where(and(eq(microsites.kind, "PROGRAM"), eq(microsites.status, "PUBLISHED")))
    .orderBy(desc(microsites.updatedAt));
}

export async function getEvents() {
  return db
    .select()
    .from(microsites)
    .where(and(eq(microsites.kind, "EVENT"), inArray(microsites.status, ["PUBLISHED", "ARCHIVED"])))
    .orderBy(desc(microsites.startDate));
}

export type MicrositeWithPosts = Microsite & { relatedPosts: Post[] };

export async function getMicrosite(kind: "PROGRAM" | "EVENT", slug: string): Promise<MicrositeWithPosts | null> {
  const rows = await db
    .select()
    .from(microsites)
    .where(and(eq(microsites.kind, kind), eq(microsites.slug, slug), inArray(microsites.status, ["PUBLISHED", "ARCHIVED"])))
    .limit(1);
  const m = rows[0];
  if (!m) return null;
  const relatedPosts = await db
    .select()
    .from(posts)
    .where(and(eq(posts.micrositeId, m.id), eq(posts.published, true)))
    .orderBy(desc(posts.publishedAt))
    .limit(3);
  return { ...m, relatedPosts };
}

// ---------- ARTWORK ----------
export async function getArtworks(opts?: { featured?: boolean; take?: number }) {
  const base = db.select().from(artworks).$dynamic();
  const rows = await (opts?.featured ? base.where(eq(artworks.featured, true)) : base).orderBy(
    desc(artworks.year),
    desc(artworks.createdAt)
  );
  return opts?.take ? rows.slice(0, opts.take) : rows;
}

export async function getArtwork(slug: string) {
  const rows = await db.select().from(artworks).where(eq(artworks.slug, slug)).limit(1);
  return rows[0] ?? null;
}

// ---------- PRODUCT ----------
export async function getProducts(opts?: { featured?: boolean; take?: number }) {
  const base = db.select().from(products).$dynamic();
  const where = opts?.featured
    ? and(eq(products.isAvailable, true), eq(products.isFeatured, true))
    : eq(products.isAvailable, true);
  const rows = await base.where(where).orderBy(desc(products.createdAt));
  return opts?.take ? rows.slice(0, opts.take) : rows;
}

export async function getProduct(slug: string) {
  const rows = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  return rows[0] ?? null;
}

// ---------- POST ----------
export async function getPosts(opts?: { take?: number }): Promise<PostWithMicrosite[]> {
  const base = db
    .select({
      post: posts,
      msTitle: microsites.title,
      msSlug: microsites.slug,
      msKind: microsites.kind,
      msColor: microsites.themeColor,
    })
    .from(posts)
    .leftJoin(microsites, eq(posts.micrositeId, microsites.id))
    .$dynamic();

  const rows = await base.where(eq(posts.published, true)).orderBy(desc(posts.publishedAt));
  const mapped = rows.map((r) => ({
    ...r.post,
    microsite: r.msSlug ? { title: r.msTitle!, slug: r.msSlug, kind: r.msKind!, themeColor: r.msColor! } : null,
  }));
  return opts?.take ? mapped.slice(0, opts.take) : mapped;
}

export async function getPost(slug: string): Promise<(Post & { microsite: Microsite | null }) | null> {
  const rows = await db
    .select({ post: posts, microsite: microsites })
    .from(posts)
    .leftJoin(microsites, eq(posts.micrositeId, microsites.id))
    .where(and(eq(posts.slug, slug), eq(posts.published, true)))
    .limit(1);
  const r = rows[0];
  if (!r) return null;
  return { ...r.post, microsite: r.microsite };
}

// ---------- ADMIN LIST QUERIES ----------
export async function adminListMicrosites() {
  return db.select().from(microsites).orderBy(desc(microsites.updatedAt));
}
export async function adminListArtworks() {
  return db.select().from(artworks).orderBy(desc(artworks.updatedAt));
}
export async function adminListProducts() {
  return db.select().from(products).orderBy(desc(products.updatedAt));
}
export async function adminListPosts() {
  return db.select().from(posts).orderBy(desc(posts.updatedAt));
}
