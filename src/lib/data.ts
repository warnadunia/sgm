import { and, asc, desc, eq, inArray } from "drizzle-orm";
import { db } from "@/db/client";
import { artworks, microsites, posts, products, type Microsite, type Post } from "@/db/schema";

export type PostMicrositeRef = Pick<Microsite, "title" | "slug" | "kind" | "themeColor"> | null;
export type PostWithMicrosite = Post & { microsite: PostMicrositeRef };

// ---------- MICROSITE ----------
export async function getHeadlineMicrosites() {
  try {
    return await db
      .select()
      .from(microsites)
      .where(and(eq(microsites.isHeadline, true), eq(microsites.status, "PUBLISHED")))
      .orderBy(asc(microsites.headlineOrder), desc(microsites.updatedAt));
  } catch (err) {
    console.error("[getHeadlineMicrosites error]:", err);
    return [];
  }
}

export async function getPrograms() {
  try {
    return await db
      .select()
      .from(microsites)
      .where(and(eq(microsites.kind, "PROGRAM"), eq(microsites.status, "PUBLISHED")))
      .orderBy(desc(microsites.updatedAt));
  } catch (err) {
    console.error("[getPrograms error]:", err);
    return [];
  }
}

export async function getEvents() {
  try {
    return await db
      .select()
      .from(microsites)
      .where(and(eq(microsites.kind, "EVENT"), inArray(microsites.status, ["PUBLISHED", "ARCHIVED"])))
      .orderBy(desc(microsites.startDate));
  } catch (err) {
    console.error("[getEvents error]:", err);
    return [];
  }
}

export type MicrositeWithPosts = Microsite & { relatedPosts: Post[] };

export async function getMicrosite(kind: "PROGRAM" | "EVENT", slug: string): Promise<MicrositeWithPosts | null> {
  try {
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
  } catch (err) {
    console.error("[getMicrosite error]:", err);
    return null;
  }
}

// ---------- ARTWORK ----------
export async function getArtworks(opts?: { featured?: boolean; take?: number }) {
  try {
    const base = db.select().from(artworks).$dynamic();
    const rows = await (opts?.featured ? base.where(eq(artworks.featured, true)) : base).orderBy(
      desc(artworks.year),
      desc(artworks.createdAt)
    );
    return opts?.take ? rows.slice(0, opts.take) : rows;
  } catch (err) {
    console.error("[getArtworks error]:", err);
    return [];
  }
}

export async function getArtwork(slug: string) {
  try {
    const rows = await db.select().from(artworks).where(eq(artworks.slug, slug)).limit(1);
    return rows[0] ?? null;
  } catch (err) {
    console.error("[getArtwork error]:", err);
    return null;
  }
}

// ---------- PRODUCT ----------
export async function getProducts(opts?: { featured?: boolean; take?: number }) {
  try {
    const base = db.select().from(products).$dynamic();
    const where = opts?.featured
      ? and(eq(products.isAvailable, true), eq(products.isFeatured, true))
      : eq(products.isAvailable, true);
    const rows = await base.where(where).orderBy(desc(products.createdAt));
    return opts?.take ? rows.slice(0, opts.take) : rows;
  } catch (err) {
    console.error("[getProducts error]:", err);
    return [];
  }
}

export async function getProduct(slug: string) {
  try {
    const rows = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
    return rows[0] ?? null;
  } catch (err) {
    console.error("[getProduct error]:", err);
    return null;
  }
}

// ---------- POST ----------
export async function getPosts(opts?: { take?: number }): Promise<PostWithMicrosite[]> {
  try {
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
  } catch (err) {
    console.error("[getPosts error]:", err);
    return [];
  }
}

export async function getPost(slug: string): Promise<(Post & { microsite: Microsite | null }) | null> {
  try {
    const rows = await db
      .select({ post: posts, microsite: microsites })
      .from(posts)
      .leftJoin(microsites, eq(posts.micrositeId, microsites.id))
      .where(and(eq(posts.slug, slug), eq(posts.published, true)))
      .limit(1);
    const r = rows[0];
    if (!r) return null;
    return { ...r.post, microsite: r.microsite };
  } catch (err) {
    console.error("[getPost error]:", err);
    return null;
  }
}

// ---------- ADMIN LIST QUERIES ----------
export async function adminListMicrosites() {
  try {
    return await db.select().from(microsites).orderBy(desc(microsites.updatedAt));
  } catch (err) {
    console.error("[adminListMicrosites error]:", err);
    return [];
  }
}
export async function adminListArtworks() {
  try {
    return await db.select().from(artworks).orderBy(desc(artworks.updatedAt));
  } catch (err) {
    console.error("[adminListArtworks error]:", err);
    return [];
  }
}
export async function adminListProducts() {
  try {
    return await db.select().from(products).orderBy(desc(products.updatedAt));
  } catch (err) {
    console.error("[adminListProducts error]:", err);
    return [];
  }
}
export async function adminListPosts() {
  try {
    return await db.select().from(posts).orderBy(desc(posts.updatedAt));
  } catch (err) {
    console.error("[adminListPosts error]:", err);
    return [];
  }
}
