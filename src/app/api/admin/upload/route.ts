import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getAdminEmail } from "@/lib/session";
import crypto from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req: Request) {
  const email = await getAdminEmail();
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File tidak ditemukan." }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json({ error: "Format harus JPG/PNG/WebP/AVIF/GIF." }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Ukuran maksimal 5MB." }, { status: 400 });
  }

  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : file.type === "image/avif" ? "avif" : file.type === "image/gif" ? "gif" : "jpg";
  const name = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${ext}`;

  // Production: Vercel Blob (token otomatis tersedia saat Blob store terhubung)
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`sgm/${name}`, file, { access: "public", addRandomSuffix: false });
    return NextResponse.json({ url: blob.url });
  }

  // Dev fallback: simpan ke public/uploads (tidak persisten di Vercel — hanya lokal)
  const buffer = Buffer.from(await file.arrayBuffer());
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), buffer);
  return NextResponse.json({ url: `/uploads/${name}` });
}
