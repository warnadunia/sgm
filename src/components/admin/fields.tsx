"use client";

import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[11px] tracking-widest text-ink-soft">{label.toUpperCase()}</span>
      {children}
      {hint && <span className="mt-1 block font-mono text-[10px] text-ink-soft/70">{hint}</span>}
    </label>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full border-2 border-ink bg-paper px-3.5 py-2.5 text-sm outline-none placeholder:text-ink/30 focus:bg-riso-yellow/20 ${props.className ?? ""}`}
    />
  );
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full border-2 border-ink bg-paper px-3.5 py-2.5 text-sm leading-relaxed outline-none placeholder:text-ink/30 focus:bg-riso-yellow/20 ${props.className ?? ""}`}
    />
  );
}

export function Select({ children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full border-2 border-ink bg-paper px-3.5 py-2.5 text-sm outline-none focus:bg-riso-yellow/20 ${props.className ?? ""}`}
    >
      {children}
    </select>
  );
}

export function Checkbox({
  name,
  label,
  defaultChecked,
  description,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
  description?: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 border-2 border-ink bg-paper p-3.5 transition-colors has-checked:bg-riso-yellow/40">
      <input name={name} type="checkbox" defaultChecked={defaultChecked} value="true" className="mt-0.5 h-4 w-4 accent-black" />
      <span>
        <span className="block font-display text-xs uppercase tracking-wide">{label}</span>
        {description && <span className="mt-0.5 block text-xs text-ink-soft">{description}</span>}
      </span>
    </label>
  );
}

export function FormShell({
  title,
  subtitle,
  children,
  error,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  error?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-2xl uppercase">{title}</h1>
      {subtitle && <p className="mt-1 font-mono text-[11px] tracking-widest text-ink-soft">{subtitle}</p>}
      {error && (
        <p className="mt-4 border-2 border-riso-pink bg-riso-pink/10 px-4 py-3 font-mono text-xs text-riso-pink">{error}</p>
      )}
      <div className="mt-6 space-y-5 border-2 border-ink bg-paper p-6 riso-shadow-sm">{children}</div>
    </div>
  );
}
