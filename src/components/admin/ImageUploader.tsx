"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, MoveLeft, MoveRight, Trash2 } from "lucide-react";

/**
 * Uploader multi-gambar untuk admin.
 * Upload ke /api/admin/upload — saat production tersimpan di Vercel Blob,
 * saat dev lokal tersimpan di public/uploads. Hasil: array URL.
 */
export function ImageUploader({
  value,
  onChange,
  label = "Gambar",
  multiple = true,
}: {
  value: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  multiple?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(0);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);
    const list = Array.from(files).slice(0, multiple ? 10 : 1);
    setUploading(list.length);
    const uploaded: string[] = [];
    for (const file of list) {
      try {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Gagal mengunggah.");
        uploaded.push(data.url);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Gagal mengunggah.");
      }
      setUploading((n) => n - 1);
    }
    if (uploaded.length > 0) {
      onChange(multiple ? [...value, ...uploaded] : uploaded.slice(-1));
    }
    if (inputRef.current) inputRef.current.value = "";
  }

  function move(from: number, dir: -1 | 1) {
    const next = [...value];
    const to = from + dir;
    if (to < 0 || to >= next.length) return;
    [next[from], next[to]] = [next[to], next[from]];
    onChange(next);
  }

  return (
    <div>
      <span className="mb-1.5 block font-mono text-[11px] tracking-widest text-ink-soft">
        {label.toUpperCase()} {multiple && `(${value.length})`}
      </span>
      <div className="flex flex-wrap gap-3">
        {value.map((url, i) => (
          <div key={`${url}-${i}`} className="group relative h-24 w-24 overflow-hidden border-2 border-ink bg-paper-deep">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="h-full w-full object-cover" />
            {i === 0 && (
              <span className="absolute left-0 top-0 bg-riso-yellow px-1.5 py-0.5 font-mono text-[8px] font-bold tracking-wider">
                UTAMA
              </span>
            )}
            <div className="absolute inset-0 flex items-center justify-center gap-1 bg-ink/70 opacity-0 transition-opacity group-hover:opacity-100">
              {multiple && (
                <>
                  <button type="button" aria-label="Geser kiri" onClick={() => move(i, -1)} className="grid h-7 w-7 place-items-center border border-paper/50 text-paper hover:bg-paper hover:text-ink">
                    <MoveLeft className="h-3.5 w-3.5" />
                  </button>
                  <button type="button" aria-label="Geser kanan" onClick={() => move(i, 1)} className="grid h-7 w-7 place-items-center border border-paper/50 text-paper hover:bg-paper hover:text-ink">
                    <MoveRight className="h-3.5 w-3.5" />
                  </button>
                </>
              )}
              <button
                type="button"
                aria-label="Hapus gambar"
                onClick={() => onChange(value.filter((_, j) => j !== i))}
                className="grid h-7 w-7 place-items-center border border-riso-pink bg-riso-pink text-paper hover:bg-ink"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading > 0}
          className="grid h-24 w-24 place-items-center border-2 border-dashed border-ink/40 text-ink-soft transition-colors hover:border-ink hover:bg-riso-yellow/30 disabled:opacity-50"
        >
          {uploading > 0 ? (
            <span className="flex flex-col items-center gap-1 font-mono text-[9px]">
              <Loader2 className="h-5 w-5 animate-spin" /> {uploading} FILE…
            </span>
          ) : (
            <span className="flex flex-col items-center gap-1 font-mono text-[9px] tracking-wider">
              <ImagePlus className="h-5 w-5" /> TAMBAH
            </span>
          )}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
      {error && <p className="mt-2 font-mono text-xs text-riso-pink">{error}</p>}
      {multiple && <p className="mt-1.5 font-mono text-[10px] text-ink-soft">Gambar pertama = foto utama/cover.</p>}
    </div>
  );
}
