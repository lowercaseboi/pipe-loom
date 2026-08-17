import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { AnswerCard } from "./AnswerCard";
import { Button } from "./Button";
import { askAi } from "@/lib/ask-ai.functions";

const EXAMPLES = ["Duolingo", "Notion", "Blue Bottle Coffee"];
const STATUSES = ["Connecting to the model…", "Asking the question…", "Reading the response…"];

type State =
  | { kind: "idle" }
  | { kind: "loading"; brand: string }
  | { kind: "result"; brand: string; answer: string; lowVisibility: boolean }
  | { kind: "error"; brand: string; message: string };

export function LiveDemo() {
  const ask = useServerFn(askAi);
  const [value, setValue] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });
  const [statusIdx, setStatusIdx] = useState(0);
  const requestId = useRef(0);

  useEffect(() => {
    if (state.kind !== "loading") return;
    const id = setInterval(() => setStatusIdx((i) => (i + 1) % STATUSES.length), 900);
    return () => clearInterval(id);
  }, [state.kind]);

  const busy = state.kind === "loading";

  async function handleAsk(raw: string) {
    const brand = raw.trim();
    if (!brand || busy) return;
    const id = ++requestId.current;
    setStatusIdx(0);
    setState({ kind: "loading", brand });
    try {
      const res = await ask({ data: { brand } });
      if (id !== requestId.current) return;
      setState({ kind: "result", brand, answer: res.answer, lowVisibility: res.lowVisibility });
    } catch (err) {
      if (id !== requestId.current) return;
      setState({
        kind: "error",
        brand,
        message:
          err instanceof Error && err.message
            ? err.message
            : "Couldn't reach the model just now. Try again.",
      });
    }
  }

  return (
    <section id="demo" className="bg-paper py-24 text-paper-foreground">
      <div className="container-page">
        <Reveal>
          <div className="mb-14 max-w-[680px]">
            <Eyebrow tone="paper">Live demo — real AI, right now</Eyebrow>
            <h2 className="text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.15]">
              Ask the AI about a brand. Any brand.
            </h2>
            <p className="mt-3.5 text-[1.02rem] text-paper-dim">
              Type a business, product, or your own brand name. Refract asks an AI assistant the way a
              customer actually would, live, and shows you exactly what comes back.
            </p>
          </div>
        </Reveal>

        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.05fr]">
          <Reveal>
            <form
              className="mb-4 flex flex-wrap gap-2.5"
              onSubmit={(e) => {
                e.preventDefault();
                void handleAsk(value);
              }}
              noValidate
            >
              <label htmlFor="brandInput" className="sr-only">
                Brand or business name
              </label>
              <input
                id="brandInput"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                maxLength={60}
                autoComplete="off"
                placeholder="Type a brand or business name…"
                className="min-w-0 flex-1 basis-[220px] rounded-xl border border-paper-line bg-paper-raised/50 px-4 py-3.5 text-[1rem] text-paper-foreground placeholder:text-paper-dim"
              />
              <Button type="submit" disabled={busy}>
                {busy ? "Asking…" : "Ask the AI"}
              </Button>
            </form>

            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-[0.75rem] text-paper-dim">or try:</span>
              {EXAMPLES.map((brand) => (
                <button
                  key={brand}
                  type="button"
                  disabled={busy}
                  onClick={() => {
                    setValue(brand);
                    void handleAsk(brand);
                  }}
                  className="rounded-full border border-paper-line px-3.5 py-1.5 font-mono text-[0.82rem] text-paper-foreground transition-colors hover:border-paper-foreground disabled:opacity-50"
                >
                  {brand}
                </button>
              ))}
            </div>

            <p className="mt-5 max-w-[52ch] text-[0.86rem] text-paper-dim">
              This demo asks one AI model directly, live. The full Refract platform checks multiple
              providers side by side, tracks changes weekly, and benchmarks you against the
              competitors you name.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div aria-live="polite">
              {state.kind === "idle" ? (
                <AnswerCard tone="paper" label="An AI assistant · waiting">
                  <p className="text-paper-dim">
                    Type a brand above and press "Ask the AI" — the real response will appear here.
                  </p>
                </AnswerCard>
              ) : null}

              {state.kind === "loading" ? (
                <AnswerCard
                  tone="paper"
                  label="An AI assistant · asking now"
                  query={`what is ${state.brand} and what do they offer?`}
                >
                  <p className="text-paper-dim">{STATUSES[statusIdx]}</p>
                </AnswerCard>
              ) : null}

              {state.kind === "result" ? (
                <AnswerCard
                  tone="paper"
                  label="An AI assistant · live response"
                  query={`what is ${state.brand} and what do they offer?`}
                  footer={
                    <span
                      className={`inline-block rounded-full px-3.5 py-1.5 font-mono text-[0.8rem] ${
                        state.lowVisibility
                          ? "bg-miss/15 text-miss-deep"
                          : "bg-detected/15 text-detected-deep"
                      }`}
                    >
                      {state.lowVisibility
                        ? "⚠ Low AI visibility — little specific information found"
                        : "✓ AI recognizes this brand"}
                    </span>
                  }
                >
                  <p className="whitespace-pre-wrap text-[1rem]">{state.answer}</p>
                </AnswerCard>
              ) : null}

              {state.kind === "error" ? (
                <AnswerCard
                  tone="paper"
                  label="An AI assistant · something went wrong"
                  query={`what is ${state.brand} and what do they offer?`}
                >
                  <p className="text-miss-deep">{state.message}</p>
                </AnswerCard>
              ) : null}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
