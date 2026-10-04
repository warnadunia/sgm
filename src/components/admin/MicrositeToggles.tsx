"use client";

import { useTransition } from "react";
import type { Microsite } from "@/db/schema";
import { toggleHeadlineAction, toggleLiveAction } from "@/lib/actions/microsite";
import { cn } from "@/lib/utils";
import { Loader2, Star, Radio } from "lucide-react";

export function MicrositeToggles({ microsites }: { microsites: Microsite[] }) {
  const [pending, start] = useTransition();

  return (
    <div className="mt-4 divide-y-2 divide-ink/10 border-2 border-ink">
      {microsites.map((m) => (
        <div key={m.id} className="flex flex-wrap items-center gap-3 bg-paper px-4 py-3">
          <span className="h-2.5 w-2.5 shrink-0" style={{ backgroundColor: m.themeColor }} />
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-sm uppercase">{m.title}</p>
            <p className="font-mono text-[10px] tracking-widest text-ink-soft">
              {m.kind} · /{m.kind === "EVENT" ? "event" : "program"}/{m.slug} · {m.status}
            </p>
          </div>
          <Toggle
            active={m.isHeadline}
            disabled={pending}
            label="HEADLINE"
            icon={<Star className="h-3.5 w-3.5" />}
            onClick={() => start(async () => toggleHeadlineAction(m.id, !m.isHeadline))}
          />
          {m.kind === "EVENT" && (
            <Toggle
              active={m.isLiveNow}
              disabled={pending}
              label="LIVE"
              icon={<Radio className="h-3.5 w-3.5" />}
              activeClass="bg-riso-pink text-paper border-riso-pink"
              onClick={() => start(async () => toggleLiveAction(m.id, !m.isLiveNow))}
            />
          )}
        </div>
      ))}
      {pending && (
        <div className="flex items-center gap-2 bg-paper px-4 py-2 font-mono text-[10px] tracking-widest text-ink-soft">
          <Loader2 className="h-3 w-3 animate-spin" /> MENYIMPAN…
        </div>
      )}
    </div>
  );
}

function Toggle({
  active,
  onClick,
  label,
  icon,
  disabled,
  activeClass = "bg-ink text-paper",
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
  disabled?: boolean;
  activeClass?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center gap-1.5 border-2 px-3 py-1.5 font-mono text-[10px] font-semibold tracking-[0.15em] transition-colors disabled:opacity-50",
        active ? activeClass : "border-ink/30 text-ink-soft hover:border-ink"
      )}
    >
      {icon}
      {label}: {active ? "ON" : "OFF"}
    </button>
  );
}
