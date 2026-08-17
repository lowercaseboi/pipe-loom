import type { ReactNode } from "react";

export function AnswerCard({
  tone = "ink",
  label,
  query,
  children,
  footer,
}: {
  tone?: "ink" | "paper";
  label: string;
  query?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const paper = tone === "paper";
  return (
    <div
      className={`rounded-2xl border p-7 ${
        paper
          ? "border-paper-line bg-background/0 bg-paper-raised/40 text-paper-foreground"
          : "border-ink-line bg-ink-raised text-ink-foreground shadow-[var(--shadow-lift)]"
      }`}
    >
      <div className="mb-4 flex items-center gap-2">
        <span className="flex gap-1.5">
          <i className="size-2 rounded-full bg-miss/70" />
          <i className="size-2 rounded-full bg-signal/70" />
          <i className="size-2 rounded-full bg-detected/70" />
        </span>
        <p
          className={`font-mono text-[0.68rem] uppercase tracking-[0.1em] ${
            paper ? "text-paper-dim" : "text-ink-dim"
          }`}
        >
          {label}
        </p>
      </div>
      {query ? (
        <p
          className={`mb-4 break-words font-mono text-[0.95rem] ${
            paper ? "text-detected-deep" : "text-detected"
          }`}
        >
          › {query}
        </p>
      ) : null}
      {children}
      {footer ? <div className="mt-5">{footer}</div> : null}
    </div>
  );
}

export function Badge({ tone, children }: { tone: "hit" | "miss"; children: ReactNode }) {
  return (
    <span
      className={`inline-block break-words rounded-full px-3.5 py-1.5 font-mono text-[0.8rem] ${
        tone === "hit" ? "bg-detected/15 text-detected" : "bg-miss/15 text-miss"
      }`}
    >
      {children}
    </span>
  );
}
