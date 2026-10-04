"use client";

import { useActionState, useState } from "react";
import type { Product } from "@/db/schema";
import { saveProductAction, type FormState } from "@/lib/actions/content";
import { parseJsonArray } from "@/lib/utils";
import { Field, Input, Textarea, Select, Checkbox, FormShell } from "./fields";
import { ImageUploader } from "./ImageUploader";
import { Submit } from "./ArtworkForm";

export function ProductForm({ product }: { product?: Product }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(saveProductAction, {});
  const [images, setImages] = useState<string[]>(product ? parseJsonArray(product.images) : []);

  return (
    <form action={formAction}>
      <FormShell title={product ? "Sunting Produk" : "Produk Baru"} subtitle="ARTSHOP & MERCHANDISE" error={state.error}>
        {product && <input type="hidden" name="id" value={product.id} />}
        <input type="hidden" name="imagesJson" value={JSON.stringify(images)} />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nama produk">
            <Input name="name" required defaultValue={product?.name} placeholder="Kaos Cukil “Gunung & Matahari”" />
          </Field>
          <Field label="Slug (opsional)">
            <Input name="slug" defaultValue={product?.slug} placeholder="kaos-cukil-gunung-matahari" />
          </Field>
          <Field label="Harga (IDR)">
            <Input name="price" type="number" required min={0} defaultValue={product?.price ?? 150000} />
          </Field>
          <Field label="Harga coret (opsional)" hint="Harga sebelum diskon, tampil dicoret.">
            <Input name="comparePrice" type="number" min={0} defaultValue={product?.comparePrice ?? ""} />
          </Field>
          <Field label="Stok">
            <Input name="stock" type="number" required min={0} defaultValue={product?.stock ?? 0} />
          </Field>
          <Field label="Kategori">
            <Select name="category" defaultValue={product?.category ?? "Merchandise"}>
              <option>Art Print</option>
              <option>Apparel</option>
              <option>Zine</option>
              <option>Merchandise</option>
            </Select>
          </Field>
        </div>

        <ImageUploader value={images} onChange={setImages} label="Foto produk (WAJIB ≥1, bisa banyak)" />

        <Field label="Deskripsi produk">
          <Textarea name="description" rows={5} defaultValue={product?.description ?? ""} />
        </Field>

        <div className="grid gap-3 sm:grid-cols-2">
          <Checkbox name="isFeatured" label="Unggulkan" defaultChecked={product?.isFeatured} description="Tampil di section Artshop halaman utama." />
          <Checkbox name="isAvailable" label="Dijual" defaultChecked={product?.isAvailable ?? true} description="Nonaktifkan untuk menyembunyikan dari etalase." />
        </div>

        <Submit pending={pending} />
      </FormShell>
    </form>
  );
}
