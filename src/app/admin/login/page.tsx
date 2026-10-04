"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/lib/actions/auth";
import { Loader2, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(loginAction, {});

  return (
    <div className="grid min-h-screen place-items-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="border-2 border-paper/20 bg-paper p-8 riso-shadow" style={{ ["--shadow-color" as string]: "#FF4D6D" }}>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center bg-ink font-display text-xl text-paper">S</span>
            <div>
              <h1 className="font-display text-xl uppercase">Masuk Admin</h1>
              <p className="font-mono text-[10px] tracking-[0.25em] text-ink-soft">STUDIO GRAFIS MINGGIRAN</p>
            </div>
          </div>

          <form action={formAction} className="mt-7 space-y-4">
            <label className="block">
              <span className="mb-1.5 block font-mono text-[11px] tracking-widest text-ink-soft">EMAIL</span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="admin@studiografisminggiran.id"
                className="w-full border-2 border-ink bg-paper px-3.5 py-2.5 text-sm outline-none placeholder:text-ink/30 focus:bg-riso-yellow/30"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block font-mono text-[11px] tracking-widest text-ink-soft">KATA SANDI</span>
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••••"
                className="w-full border-2 border-ink bg-paper px-3.5 py-2.5 text-sm outline-none placeholder:text-ink/30 focus:bg-riso-yellow/30"
              />
            </label>
            {state.error && (
              <p className="border-2 border-riso-pink bg-riso-pink/10 px-3 py-2 font-mono text-xs text-riso-pink">
                {state.error}
              </p>
            )}
            <button
              type="submit"
              disabled={pending}
              className="flex w-full items-center justify-center gap-2 border-2 border-ink bg-ink px-5 py-3 font-display text-sm uppercase tracking-wide text-paper transition-transform enabled:hover:-translate-y-0.5 disabled:opacity-60"
            >
              {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
              {pending ? "Memeriksa…" : "Masuk"}
            </button>
          </form>
        </div>
        <p className="mt-5 text-center font-mono text-[10px] tracking-widest text-paper/40">
          AKSES TERBATAS UNTUK PENGELOLA STUDIO
        </p>
      </div>
    </div>
  );
}
