// Tipe blok konten fleksibel untuk microsite.
// Disimpan sebagai JSON string di kolom Microsite.blocks.

export type ScheduleItem = { time: string; title: string; note?: string };
export type LineupItem = { name: string; role?: string };
export type InfoItem = { label: string; value: string };

export type ContentBlock =
  | { type: "richtext"; heading?: string; body: string }
  | { type: "schedule"; heading?: string; items: ScheduleItem[] }
  | { type: "lineup"; heading?: string; items: LineupItem[] }
  | { type: "info"; heading?: string; items: InfoItem[] }
  | { type: "gallery"; heading?: string; images: string[] };

export function parseBlocks(value?: string | null): ContentBlock[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((b) => b && typeof b === "object" && "type" in b) as ContentBlock[];
  } catch {
    return [];
  }
}

/** Serialisasi aman: buang item kosong agar JSON bersih. */
export function serializeBlocks(blocks: ContentBlock[]): string {
  const cleaned = blocks
    .map((b) => {
      if (b.type === "schedule") return { ...b, items: b.items.filter((i) => i.title?.trim()) };
      if (b.type === "lineup") return { ...b, items: b.items.filter((i) => i.name?.trim()) };
      if (b.type === "info") return { ...b, items: b.items.filter((i) => i.label?.trim() && i.value?.trim()) };
      if (b.type === "gallery") return { ...b, images: b.images.filter(Boolean) };
      return b;
    })
    .filter((b) => {
      if (b.type === "richtext") return b.body?.trim();
      if (b.type === "schedule" || b.type === "lineup" || b.type === "info") return b.items.length > 0;
      if (b.type === "gallery") return b.images.length > 0;
      return false;
    });
  return JSON.stringify(cleaned);
}

// Helper format baris untuk editor admin:
// schedule: "19:00 | Pembukaan | Panggung utama"
// lineup:   "Ki Jagat Cukil | Orkes grafis"
// info:     "Tiket | Rp25.000"
export function linesToItems<T>(raw: string, map: (parts: string[]) => T): T[] {
  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => map(l.split("|").map((p) => p.trim())));
}

export function itemsToLines(items: { [k: string]: string | undefined }[], keys: string[]): string {
  return items.map((i) => keys.map((k) => i[k] ?? "").filter((_, idx) => idx === 0 || i[keys[idx]]).join(" | ")).join("\n");
}
