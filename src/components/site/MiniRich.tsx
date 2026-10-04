import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Render konten teks admin: paragraf dipisah baris kosong,
 * baris diawali "- " menjadi daftar, "**teks**" menjadi tebal.
 */
export function MiniRich({ text, className }: { text?: string | null; className?: string }) {
  if (!text) return null;
  const paragraphs = text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  return (
    <div className={cn("space-y-4 leading-relaxed", className)}>
      {paragraphs.map((p, i) => {
        if (p.startsWith("- ")) {
          const items = p.split("\n").filter((l) => l.trim().startsWith("- "));
          return (
            <ul key={i} className="space-y-2">
              {items.map((item, j) => (
                <li key={j} className="flex gap-3">
                  <span className="mt-[0.55em] h-2 w-2 shrink-0 bg-current opacity-70" />
                  <span>{inline(item.replace(/^-\s*/, ""))}</span>
                </li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{inline(p)}</p>;
      })}
    </div>
  );
}

function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}
