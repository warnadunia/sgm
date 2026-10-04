import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

const MIME: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  avif: "image/avif",
  gif: "image/gif",
};

/**
 * Melayani file dari public/uploads (fallback penyimpanan lokal untuk dev &
 * self-host). Di Vercel production, upload disimpan di Blob sehingga route ini
 * tidak dipakai — URL upload langsung menunjuk ke blob.vercel-storage.com.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  // Cegah path traversal — hanya nama file sederhana.
  if (!/^[\w-]+\.[a-z0-9]+$/i.test(name)) {
    return new NextResponse("Not found", { status: 404 });
  }
  const ext = name.split(".").pop()!.toLowerCase();
  const type = MIME[ext];
  if (!type) return new NextResponse("Not found", { status: 404 });

  try {
    const file = await readFile(path.join(process.cwd(), "public", "uploads", name));
    return new NextResponse(new Uint8Array(file), {
      headers: { "Content-Type": type, "Cache-Control": "public, max-age=31536000, immutable" },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
