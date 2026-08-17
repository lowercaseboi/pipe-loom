import type { ReactNode } from "react";

export function Eyebrow({ children, tone = "ink" }: { children: ReactNode; tone?: "ink" | "paper" }) {
  return (
    <p
      className={`mb-4 font-mono text-[0.72rem] uppercase tracking-[0.14em] ${
        tone === "paper" ? "text-tag-paper" : "text-signal"
      }`}
    >
      {children}
    </p>
  );
}
