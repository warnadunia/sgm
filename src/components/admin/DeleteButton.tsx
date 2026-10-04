"use client";

import { useState, useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";

export function DeleteButton({
  label = "Hapus",
  confirmText = "Yakin hapus? Tindakan ini tidak bisa dibatalkan.",
  onDelete,
}: {
  label?: string;
  confirmText?: string;
  onDelete: () => Promise<void>;
}) {
  const [pending, start] = useTransition();
  const [armed, setArmed] = useState(false);

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!armed) {
          setArmed(true);
          setTimeout(() => setArmed(false), 3500);
          return;
        }
        if (window.confirm(confirmText)) start(async () => onDelete());
        setArmed(false);
      }}
      className={`inline-flex items-center gap-1.5 border-2 px-3 py-1.5 font-mono text-[11px] tracking-wider transition-colors ${
        armed ? "border-riso-pink bg-riso-pink text-paper" : "border-ink/30 text-ink-soft hover:border-riso-pink hover:text-riso-pink"
      } disabled:opacity-50`}
    >
      {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
      {armed ? "KLIK LAGI UNTUK KONFIRMASI" : label.toUpperCase()}
    </button>
  );
}
