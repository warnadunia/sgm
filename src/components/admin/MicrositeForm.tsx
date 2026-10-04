"use client";

import { useActionState, useState } from "react";
import type { Microsite } from "@/db/schema";
import { saveMicrositeAction, type MicrositeFormState } from "@/lib/actions/microsite";
import { parseBlocks, linesToItems, type ContentBlock } from "@/lib/blocks";
import { parseJsonArray } from "@/lib/utils";
import { Field, Input, Textarea, Select, Checkbox, FormShell } from "./fields";
import { ImageUploader } from "./ImageUploader";
import { Submit } from "./ArtworkForm";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";

function toDateInput(date?: Date | null) {
  if (!date) return "";
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const BLOCK_TYPES = [
  { value: "richtext", label: "Teks Bebas" },
  { value: "schedule", label: "Jadwal / Rundown" },
  { value: "lineup", label: "Partisipan / Susunan" },
  { value: "info", label: "Info Kunci-Nilai" },
  { value: "gallery", label: "Galeri Gambar" },
] as const;

export function MicrositeForm({ microsite }: { microsite?: Microsite }) {
  const [state, formAction, pending] = useActionState<MicrositeFormState, FormData>(saveMicrositeAction, {});
  const [blocks, setBlocks] = useState<ContentBlock[]>(microsite ? parseBlocks(microsite.blocks) : []);
  const [gallery, setGallery] = useState<string[]>(microsite ? parseJsonArray(microsite.images) : []);
  const [hero, setHero] = useState<string[]>(microsite?.heroImage ? [microsite.heroImage] : []);
  const [color, setColor] = useState(microsite?.themeColor ?? "#FF4D6D");

  return (
    <form action={formAction}>
      <FormShell
        title={microsite ? "Sunting Microsite" : "Microsite Baru"}
        subtitle={microsite ? `${microsite.kind} · /${microsite.kind === "EVENT" ? "event" : "program"}/${microsite.slug}` : "PROGRAM / EVENT"}
        error={state.error}
      >
        {microsite && <input type="hidden" name="id" value={microsite.id} />}
        <input type="hidden" name="blocksJson" value={JSON.stringify(blocks)} />
        <input type="hidden" name="imagesJson" value={JSON.stringify(gallery)} />
        <input type="hidden" name="heroImage" value={hero[0] ?? ""} />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Jenis">
            <Select name="kind" defaultValue={microsite?.kind ?? "PROGRAM"}>
              <option value="PROGRAM">PROGRAM (Residensi, Workshop…)</option>
              <option value="EVENT">EVENT (Print Parade, PSGY…)</option>
            </Select>
          </Field>
          <Field label="Status">
            <Select name="status" defaultValue={microsite?.status ?? "PUBLISHED"}>
              <option value="DRAFT">DRAFT — tidak tampil</option>
              <option value="PUBLISHED">PUBLISHED — tayang</option>
              <option value="ARCHIVED">ARCHIVED — arsip dokumentasi</option>
            </Select>
          </Field>
          <Field label="Judul">
            <Input name="title" required defaultValue={microsite?.title} placeholder="Pekan Seni Grafis Yogyakarta" />
          </Field>
          <Field label="Slug" hint="huruf kecil, angka, tanda hubung — jadi alamat URL microsite.">
            <Input name="slug" required pattern="[a-z0-9-]+" defaultValue={microsite?.slug} placeholder="pekan-seni-grafis-yogyakarta" />
          </Field>
          <Field label="Tagline">
            <Input name="tagline" defaultValue={microsite?.tagline ?? ""} placeholder="Satu kalimat puitis…" />
          </Field>
          <Field label="Edisi / Angkatan">
            <Input name="edition" defaultValue={microsite?.edition ?? ""} placeholder="Edisi #6 — 2026" />
          </Field>
          <Field label="Lokasi">
            <Input name="location" defaultValue={microsite?.location ?? ""} placeholder="Studio Grafis Minggiran, Sleman" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Tanggal mulai">
              <Input name="startDate" type="date" defaultValue={toDateInput(microsite?.startDate)} />
            </Field>
            <Field label="Tanggal selesai">
              <Input name="endDate" type="date" defaultValue={toDateInput(microsite?.endDate)} />
            </Field>
          </div>
          <Field label="Warna tema microsite">
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-11 w-14 cursor-pointer border-2 border-ink bg-paper p-1"
              />
              <Input name="themeColor" value={color} onChange={(e) => setColor(e.target.value)} pattern="#[0-9a-fA-F]{6}" />
            </div>
          </Field>
          <Field label="CTA — label & URL" hint="Tombol utama di hero microsite (opsional).">
            <div className="grid grid-cols-2 gap-3">
              <Input name="ctaLabel" defaultValue={microsite?.ctaLabel ?? ""} placeholder="Registrasi" />
              <Input name="ctaUrl" defaultValue={microsite?.ctaUrl ?? ""} placeholder="#tiket atau https://…" />
            </div>
          </Field>
        </div>

        <Field label="Deskripsi singkat" hint="Tampil di kartu, meta sosial, dan ringkasan.">
          <Textarea name="description" rows={3} defaultValue={microsite?.description ?? ""} />
        </Field>

        <Field label="Konten utama (Tentang)">
          <Textarea name="content" rows={7} defaultValue={microsite?.content ?? ""} />
        </Field>

        <ImageUploader value={hero} onChange={setHero} label="Gambar hero microsite" multiple={false} />
        <ImageUploader value={gallery} onChange={setGallery} label="Galeri dokumentasi (sidebar microsite)" />

        <div className="grid gap-3 sm:grid-cols-2">
          <Checkbox
            name="isHeadline"
            label="Headline di landing"
            defaultChecked={microsite?.isHeadline}
            description="Microsite tampil sebagai section khusus (spotlight) di halaman utama."
          />
          <Checkbox
            name="isLiveNow"
            label="Sedang berlangsung (LIVE)"
            defaultChecked={microsite?.isLiveNow}
            description="Khusus event: spanduk 'info resmi hanya di microsite ini' menyala di seluruh tampilan."
          />
        </div>
        <Field label="Urutan headline" hint="Angka lebih kecil tampil lebih dulu di landing.">
          <Input name="headlineOrder" type="number" defaultValue={microsite?.headlineOrder ?? 0} className="w-32" />
        </Field>

        {/* ================= BLOK KONTEN ================= */}
        <BlockEditor blocks={blocks} onChange={setBlocks} />

        <Submit pending={pending} />
      </FormShell>
    </form>
  );
}

// ============================================================ BLOCK EDITOR
function BlockEditor({ blocks, onChange }: { blocks: ContentBlock[]; onChange: (b: ContentBlock[]) => void }) {
  function update(index: number, patch: Partial<ContentBlock>) {
    onChange(blocks.map((b, i) => (i === index ? ({ ...b, ...patch } as ContentBlock) : b)));
  }
  function move(index: number, dir: -1 | 1) {
    const next = [...blocks];
    const to = index + dir;
    if (to < 0 || to >= next.length) return;
    [next[index], next[to]] = [next[to], next[index]];
    onChange(next);
  }
  function add(type: ContentBlock["type"]) {
    const base = { heading: "" };
    const block: ContentBlock =
      type === "richtext"
        ? { ...base, type, body: "" }
        : type === "schedule"
          ? { ...base, type, items: [] }
          : type === "lineup"
            ? { ...base, type, items: [] }
            : type === "info"
              ? { ...base, type, items: [] }
              : { ...base, type, images: [] };
    onChange([...blocks, block]);
  }

  return (
    <div className="border-2 border-ink bg-paper-deep p-4">
      <p className="font-display text-sm uppercase">Blok Konten Microsite</p>
      <p className="mt-1 font-mono text-[10px] tracking-wider text-ink-soft">
        SUSUN JADWAL, PARTISIPAN, INFO TIKET, DLL — TAMPIL BERURUTAN DI HALAMAN MICROSITE
      </p>

      <div className="mt-4 space-y-4">
        {blocks.map((block, i) => (
          <div key={i} className="border-2 border-ink bg-paper p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="border border-ink bg-riso-yellow px-2 py-0.5 font-mono text-[10px] font-semibold tracking-widest">
                {BLOCK_TYPES.find((t) => t.value === block.type)?.label?.toUpperCase()}
              </span>
              <span className="font-mono text-[10px] text-ink-soft">BLOK {i + 1}</span>
              <div className="ml-auto flex gap-1">
                <button type="button" onClick={() => move(i, -1)} aria-label="Naikkan blok" className="grid h-7 w-7 place-items-center border border-ink/40 hover:bg-riso-yellow">
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
                <button type="button" onClick={() => move(i, 1)} aria-label="Turunkan blok" className="grid h-7 w-7 place-items-center border border-ink/40 hover:bg-riso-yellow">
                  <ArrowDown className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onChange(blocks.filter((_, j) => j !== i))}
                  aria-label="Hapus blok"
                  className="grid h-7 w-7 place-items-center border border-riso-pink text-riso-pink hover:bg-riso-pink hover:text-paper"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="mt-3 space-y-3">
              <Input
                placeholder="Judul blok (opsional) — mis. “Agenda Utama”"
                value={block.heading ?? ""}
                onChange={(e) => update(i, { heading: e.target.value })}
              />

              {block.type === "richtext" && (
                <Textarea
                  rows={4}
                  placeholder="Isi teks…"
                  value={block.body}
                  onChange={(e) => update(i, { body: e.target.value })}
                />
              )}

              {block.type === "schedule" && (
                <LinesEditor
                  placeholder={"4 Okt · 10.00 | Tur Kuratorial #1 | Kumpul di meja registrasi"}
                  value={block.items.map((it) => [it.time, it.title, it.note].filter((x) => x !== undefined && x !== "").join(" | ")).join("\n")}
                  onChange={(raw) => update(i, { items: linesToItems(raw, (p) => ({ time: p[0] ?? "", title: p[1] ?? "", note: p[2] })) })}
                  hint="Format per baris: waktu | judul | catatan (catatan opsional)"
                />
              )}

              {block.type === "lineup" && (
                <LinesEditor
                  placeholder={"Sari Widyastuti | Cukil — Yogyakarta"}
                  value={block.items.map((it) => [it.name, it.role].filter((x) => x !== undefined && x !== "").join(" | ")).join("\n")}
                  onChange={(raw) => update(i, { items: linesToItems(raw, (p) => ({ name: p[0] ?? "", role: p[1] })) })}
                  hint="Format per baris: nama | peran/keterangan (opsional)"
                />
              )}

              {block.type === "info" && (
                <LinesEditor
                  placeholder={"Tiket | Gratis, registrasi di meja depan"}
                  value={block.items.map((it) => `${it.label} | ${it.value}`).join("\n")}
                  onChange={(raw) => update(i, { items: linesToItems(raw, (p) => ({ label: p[0] ?? "", value: p[1] ?? "" })) })}
                  hint="Format per baris: label | nilai"
                />
              )}

              {block.type === "gallery" && (
                <ImageUploader value={block.images} onChange={(imgs) => update(i, { images: imgs })} label="Gambar blok galeri" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {BLOCK_TYPES.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => add(t.value)}
            className="inline-flex items-center gap-1.5 border-2 border-ink bg-paper px-3 py-1.5 font-mono text-[10px] tracking-widest transition-colors hover:bg-riso-yellow"
          >
            <Plus className="h-3 w-3" /> {t.label.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}

function LinesEditor({ value, onChange, placeholder, hint }: { value: string; onChange: (raw: string) => void; placeholder: string; hint: string }) {
  return (
    <div>
      <Textarea rows={5} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="font-mono text-xs" />
      <p className="mt-1 font-mono text-[10px] text-ink-soft/70">{hint}</p>
    </div>
  );
}
