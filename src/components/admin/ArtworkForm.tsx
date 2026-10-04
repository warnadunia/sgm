"use client";

import { useActionState, useState } from "react";
import type { Artwork } from "@/db/schema";
import { saveArtworkAction, type FormState } from "@/lib/actions/content";
import { parseJsonArray } from "@/lib/utils";
import { Field, Input, Textarea, Select, Checkbox, FormShell } from "./fields";
import { ImageUploader } from "./ImageUploader";
import { Loader2, Save } from "lucide-react";

export function ArtworkForm({ artwork }: { artwork?: Artwork }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(saveArtworkAction, {});
  const [images, setImages] = useState<string[]>(artwork ? parseJsonArray(artwork.images) : []);

  return (
    <form action={formAction}>
      <FormShell
        title={artwork ? "Sunting Karya" : "Karya Baru"}
        subtitle="ARSIP & KATALOG SITUS"
        error={state.error}
      >
        {artwork && <input type="hidden" name="id" value={artwork.id} />}
        <input type="hidden" name="imagesJson" value={JSON.stringify(images)} />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Judul karya">
            <Input name="title" required defaultValue={artwork?.title} placeholder="Ladang, Kerbau, dan Merapi" />
          </Field>
          <Field label="Slug (opsional)" hint="Kosongkan agar dibuat otomatis dari judul.">
            <Input name="slug" defaultValue={artwork?.slug} placeholder="ladang-kerbau-dan-merapi" />
          </Field>
          <Field label="Perupa">
            <Input name="artist" required defaultValue={artwork?.artist} placeholder="Nama perupa / kolektif" />
          </Field>
          <Field label="Tahun">
            <Input name="year" type="number" required defaultValue={artwork?.year ?? 2026} min={1900} max={2100} />
          </Field>
          <Field label="Teknik">
            <Input name="technique" required defaultValue={artwork?.technique} placeholder="Cukil Kayu / Sablon 3 Warna / Etsa…" list="techniques" />
            <datalist id="techniques">
              {["Cukil Kayu", "Sablon", "Sablon 2 Warna", "Sablon 3 Warna", "Etsa", "Etsa + Aquatint", "Litografi", "Risograf", "Risograf 3 Warna", "Cetak Digital"].map((t) => (
                <option key={t} value={t} />
              ))}
            </datalist>
          </Field>
          <Field label="Kategori">
            <Select name="category" defaultValue={artwork?.category ?? "Karya"}>
              <option>Karya</option>
              <option>Poster</option>
              <option>Eksperimen</option>
            </Select>
          </Field>
          <Field label="Medium">
            <Input name="medium" defaultValue={artwork?.medium ?? ""} placeholder="Tinta hitam di kertas daluang" />
          </Field>
          <Field label="Ukuran">
            <Input name="dimensions" defaultValue={artwork?.dimensions ?? ""} placeholder="60 × 45 cm" />
          </Field>
          <Field label="Edisi">
            <Input name="edition" defaultValue={artwork?.edition ?? ""} placeholder="Edisi 12/30" />
          </Field>
        </div>

        <ImageUploader value={images} onChange={setImages} label="Foto karya (bisa lebih dari satu)" />

        <Field label="Catatan / deskripsi" hint="Paragraf dipisah baris kosong. Baris diawali '- ' menjadi daftar.">
          <Textarea name="description" rows={5} defaultValue={artwork?.description ?? ""} />
        </Field>

        <Checkbox name="featured" label="Unggulkan di landing" defaultChecked={artwork?.featured} description="Karya unggulan tampil di section Arsip halaman utama." />

        <Submit pending={pending} />
      </FormShell>
    </form>
  );
}

export function Submit({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full items-center justify-center gap-2 border-2 border-ink bg-ink px-5 py-3.5 font-display text-sm uppercase tracking-wide text-paper transition-transform enabled:hover:-translate-y-0.5 disabled:opacity-60"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
      {pending ? "Menyimpan…" : "Simpan"}
    </button>
  );
}
