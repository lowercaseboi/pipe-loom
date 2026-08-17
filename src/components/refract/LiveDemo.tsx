import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { AnswerCard } from "./AnswerCard";
import { Button } from "./Button";
import { askAi } from "@/lib/ask-ai.functions";

const EXAMPLES = ["Kochi Water Metro", "Digital India BHASHINI", "OpenStreetMap India"];
const STATUSES = ["Connecting to the model…", "Asking the question…", "Reading the answer…"];

type State =
  | { kind: "idle" }
  | { kind: "loading"; project: string }
  | { kind: "result"; project: string; answer: string; thinContext: boolean }
  | { kind: "error"; project: string; message: string };

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
    const project = raw.trim();
    if (!project || busy) return;
    const id = ++requestId.current;
    setStatusIdx(0);
    setState({ kind: "loading", project });
    try {
      const res = await ask({ data: { project } });
      if (id !== requestId.current) return;
      setState({ kind: "result", project, answer: res.answer, thinContext: res.thinContext });
    } catch (err) {
      if (id !== requestId.current) return;
      setState({
        kind: "error",
        project,
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
            <Eyebrow tone="paper">Live demo — one real query</Eyebrow>
            <h2 className="text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.15]">
              Ask an AI system about a project.
            </h2>
            <p className="mt-3.5 text-[1.02rem] text-paper-dim">
              Name a project — a public service, a research programme, an open-source tool, your own
              college or community work. Refract asks the question the way someone researching it
              would, live, and shows the answer unedited.
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
              <label htmlFor="projectInput" className="sr-only">
                Project name
              </label>
              <input
                id="projectInput"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                maxLength={80}
                autoComplete="off"
                placeholder="Name a project…"
                className="min-w-0 flex-1 basis-[220px] rounded-xl border border-paper-line bg-paper-raised/50 px-4 py-3.5 text-[1rem] text-paper-foreground placeholder:text-paper-dim"
              />
              <Button type="submit" disabled={busy}>
                {busy ? "Asking…" : "Ask the AI"}
              </Button>
            </form>

            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-[0.75rem] text-paper-dim">illustrative examples:</span>
              {EXAMPLES.map((project) => (
                <button
                  key={project}
                  type="button"
                  disabled={busy}
                  onClick={() => {
                    setValue(project);
                    void handleAsk(project);
                  }}
                  className="rounded-full border border-paper-line px-3.5 py-1.5 font-mono text-[0.82rem] text-paper-foreground transition-colors hover:border-paper-foreground disabled:opacity-50"
                >
                  {project}
                </button>
              ))}
            </div>

            <p className="mt-5 max-w-[52ch] text-[0.86rem] text-paper-dim">
              This demo runs a single question against one model. The full workflow asks a defined
              question set across several systems, records the answers, and compares them on rerun.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div aria-live="polite">
              {state.kind === "idle" ? (
                <AnswerCard tone="paper" label="An AI assistant · waiting">
                  <p className="text-paper-dim">
                    Name a project above and press "Ask the AI" — the unedited answer appears here.
                  </p>
                </AnswerCard>
              ) : null}

              {state.kind === "loading" ? (
                <AnswerCard
                  tone="paper"
                  label="An AI assistant · asking now"
                  query={`what is the ${state.project} project and who is it for?`}
                >
                  <p className="text-paper-dim">{STATUSES[statusIdx]}</p>
                </AnswerCard>
              ) : null}

              {state.kind === "result" ? (
                <AnswerCard
                  tone="paper"
                  label="An AI assistant · live answer"
                  query={`what is the ${state.project} project and who is it for?`}
                  footer={
                    <span
                      className={`inline-block rounded-full px-3.5 py-1.5 font-mono text-[0.8rem] ${
                        state.thinContext
                          ? "bg-miss/15 text-miss-deep"
                          : "bg-detected/15 text-detected-deep"
                      }`}
                    >
                      {state.thinContext
                        ? "⚠ Thin public context — little specific information on record"
                        : "✓ The model has specific context for this project"}
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
                  query={`what is the ${state.project} project and who is it for?`}
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
