"use client";

import { useActionState, useState } from "react";
import type { Microsite, Post } from "@/db/schema";
import { savePostAction, type FormState } from "@/lib/actions/content";
import { Field, Input, Textarea, Select, Checkbox, FormShell } from "./fields";
import { ImageUploader } from "./ImageUploader";
import { Submit } from "./ArtworkForm";

function toLocalInput(date?: Date | null) {
  if (!date) return "";
  const d = new Date(date);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

export function PostForm({ post, microsites }: { post?: Post; microsites: Microsite[] }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(savePostAction, {});
  const [cover, setCover] = useState<string[]>(post?.coverImage ? [post.coverImage] : []);

  return (
    <form action={formAction}>
      <FormShell title={post ? "Sunting Tulisan" : "Tulisan Baru"} subtitle="BLOG — KABAR & UPDATE" error={state.error}>
        {post && <input type="hidden" name="id" value={post.id} />}
        <input type="hidden" name="coverImage" value={cover[0] ?? ""} />

        <Field label="Judul">
          <Input name="title" required defaultValue={post?.title} placeholder="Open Call: Residensi Grafis Minggiran 2027" />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Slug (opsional)">
            <Input name="slug" defaultValue={post?.slug} placeholder="open-call-residensi-2027" />
          </Field>
          <Field label="Tanggal terbit">
            <Input name="publishedAt" type="datetime-local" defaultValue={toLocalInput(post?.publishedAt)} />
          </Field>
          <Field label="Kategori">
            <Select name="category" defaultValue={post?.category ?? "Umum"}>
              <option>Umum</option>
              <option>Kabar Program</option>
              <option>Kabar Event</option>
            </Select>
          </Field>
          <Field label="Terhubung ke microsite (opsional)" hint="Tulisan akan menampilkan kartu tautan menuju microsite terkait.">
            <Select name="micrositeId" defaultValue={post?.micrositeId ?? ""}>
              <option value="">— Tidak terhubung (informasi umum) —</option>
              {microsites.map((m) => (
                <option key={m.id} value={m.id}>
                  [{m.kind === "EVENT" ? "Event" : "Program"}] {m.title}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <Field label="Ringkasan (excerpt)">
          <Textarea name="excerpt" rows={2} defaultValue={post?.excerpt ?? ""} placeholder="Satu-dua kalimat pembuka untuk kartu dan SEO…" />
        </Field>

        <ImageUploader value={cover} onChange={setCover} label="Gambar sampul" multiple={false} />

        <Field label="Isi tulisan" hint="Paragraf dipisah baris kosong. '- ' membuat daftar, **teks** menebalkan.">
          <Textarea name="content" rows={12} defaultValue={post?.content ?? ""} />
        </Field>

        <Checkbox name="published" label="Terbitkan" defaultChecked={post?.published ?? true} description="Jika tidak dicentang, tulisan tersimpan sebagai draf." />

        <Submit pending={pending} />
      </FormShell>
    </form>
  );
}
