import { cn } from "@/lib/utils";

export function LiveBadge({ className, label = "SEDANG BERLANGSUNG" }: { className?: string; label?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border-2 border-ink bg-riso-pink px-3 py-1.5 font-mono text-[11px] font-semibold tracking-[0.2em] text-paper sticker riso-shadow-sm",
        className
      )}
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-paper" />
      </span>
      {label}
    </span>
  );
}
