import { cn } from "@/lib/utils";

export function Marquee({ items, dark = false, slow = false }: { items: string[]; dark?: boolean; slow?: boolean }) {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div
      className={cn(
        "overflow-hidden border-y-2 py-3 select-none",
        dark ? "border-paper/20 bg-ink text-paper" : "border-ink bg-riso-yellow text-ink"
      )}
      aria-hidden
    >
      <div className={cn("flex w-max whitespace-nowrap", slow ? "animate-marquee-slow" : "animate-marquee")}>
        {row.map((item, i) => (
          <span key={i} className="flex items-center font-display text-sm tracking-[0.15em] uppercase">
            <span className="px-5">{item}</span>
            <span className={cn("text-lg", dark ? "text-riso-pink" : "text-riso-pink")}>✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}
