import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Label kecil mono dengan kotak aksen — ciri khas sistem visual SGM. */
export function SectionTag({ children, color = "#FF4D6D", className }: { children: ReactNode; color?: string; className?: string }) {
  return (
    <p className={cn("inline-flex items-center gap-2 font-mono text-[11px] font-medium tracking-[0.25em] uppercase", className)}>
      <span className="inline-block h-3 w-3 border-2 border-ink" style={{ backgroundColor: color }} />
      {children}
    </p>
  );
}

export function SectionHeading({
  children,
  className,
  outline = false,
}: {
  children: ReactNode;
  className?: string;
  outline?: boolean;
}) {
  return (
    <h2
      className={cn(
        "font-display text-4xl leading-[0.95] tracking-tight uppercase sm:text-5xl md:text-6xl",
        outline && "text-outline",
        className
      )}
    >
      {children}
    </h2>
  );
}
