"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/db/client";
import { microsites } from "@/db/schema";
import { requireAdmin } from "@/lib/session";
import { serializeBlocks, type ContentBlock } from "@/lib/blocks";

const schema = z.object({
  id: z.string().optional(),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, "Slug hanya huruf kecil, angka, dan tanda hubung"),
  kind: z.enum(["PROGRAM", "EVENT"]),
  title: z.string().min(3),
  tagline: z.string().optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  heroImage: z.string().optional(),
  themeColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).default("#FF4D6D"),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("PUBLISHED"),
  edition: z.string().optional(),
  location: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  isLiveNow: z.coerce.boolean().default(false),
  isHeadline: z.coerce.boolean().default(false),
  headlineOrder: z.coerce.number().int().default(0),
  ctaLabel: z.string().optional(),
  ctaUrl: z.string().optional(),
  blocksJson: z.string().optional(),
  imagesJson: z.string().optional(),
});

export type MicrositeFormState = { error?: string };

export async function saveMicrositeAction(_prev: MicrositeFormState, formData: FormData): Promise<MicrositeFormState> {
  await requireAdmin();
  const raw = Object.fromEntries(formData.entries());
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }
  const d = parsed.data;

  let blocks = "[]";
  try {
    blocks = serializeBlocks(d.blocksJson ? (JSON.parse(d.blocksJson) as ContentBlock[]) : []);
  } catch {
    return { error: "Format blok konten tidak valid." };
  }

  let images: string[] = [];
  try {
    const parsedImgs = d.imagesJson ? JSON.parse(d.imagesJson) : [];
    if (Array.isArray(parsedImgs)) images = parsedImgs.filter(Boolean);
  } catch {
    return { error: "Format galeri gambar tidak valid." };
  }

  const data = {
    slug: d.slug,
    kind: d.kind,
    title: d.title,
    tagline: d.tagline || null,
    description: d.description || null,
    content: d.content || null,
    heroImage: d.heroImage || null,
    themeColor: d.themeColor,
    status: d.status,
    edition: d.edition || null,
    location: d.location || null,
    startDate: d.startDate ? new Date(d.startDate) : null,
    endDate: d.endDate ? new Date(d.endDate) : null,
    isLiveNow: d.isLiveNow,
    isHeadline: d.isHeadline,
    headlineOrder: d.headlineOrder,
    ctaLabel: d.ctaLabel || null,
    ctaUrl: d.ctaUrl || null,
    blocks,
    images: JSON.stringify(images),
  };

  try {
    if (d.id) {
      await db.update(microsites).set({ ...data, updatedAt: new Date() }).where(eq(microsites.id, d.id));
    } else {
      await db.insert(microsites).values(data);
    }
  } catch (e: unknown) {
    if (String(e).toLowerCase().includes("unique")) return { error: "Slug sudah dipakai. Gunakan slug lain." };
    throw e;
  }

  revalidatePath("/");
  revalidatePath(`/program/${d.slug}`);
  revalidatePath(`/event/${d.slug}`);
  redirect("/admin/microsites");
}

export async function toggleHeadlineAction(id: string, value: boolean) {
  await requireAdmin();
  await db.update(microsites).set({ isHeadline: value, updatedAt: new Date() }).where(eq(microsites.id, id));
  revalidatePath("/");
  revalidatePath("/admin/microsites");
}

export async function toggleLiveAction(id: string, value: boolean) {
  await requireAdmin();
  await db.update(microsites).set({ isLiveNow: value, updatedAt: new Date() }).where(eq(microsites.id, id));
  revalidatePath("/");
  revalidatePath("/admin/microsites");
}

export async function deleteMicrositeAction(id: string) {
  await requireAdmin();
  await db.delete(microsites).where(eq(microsites.id, id));
  revalidatePath("/");
  revalidatePath("/admin/microsites");
}
