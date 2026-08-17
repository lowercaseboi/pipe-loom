import { ButtonLink } from "./Button";
import { AnswerCard } from "./AnswerCard";
import { Reveal } from "./Reveal";

const mentions = [
  { hit: true, text: "Route and fare details — described" },
  { hit: true, text: "Ticketing app — described" },
  { hit: false, text: "Accessibility and last-mile info — missing" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ink pb-28 pt-16">
      <div className="pointer-events-none absolute inset-x-[-10%] top-[-15%] h-[620px] aurora" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-ink-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-ink-line) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(closest-side at 50% 30%, black, transparent)",
        }}
      />
      <div className="container-page relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink-line bg-ink-raised/70 px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-dim">
            <i className="size-1.5 rounded-full bg-detected" />
            Project intelligence
          </span>
          <h1 className="mb-5 text-[clamp(2.3rem,4.4vw,3.9rem)] leading-[1.06]">
            AI systems already describe your project.{" "}
            <span className="text-signal">Refract shows you how.</span>
          </h1>
          <p className="mb-8 max-w-[46ch] text-[1.08rem] text-ink-dim">
            When someone asks an AI assistant about a transit system, a research group, an open-source
            tool, or a student project, it answers from whatever public record it has. Refract runs
            those questions for you, shows what the answers get right, what they miss, and what to
            document so the record improves.
          </p>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href="#demo">Run it on a project ↓</ButtonLink>
            <ButtonLink href="#how-it-works" variant="ghostInk">
              See the workflow
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <AnswerCard
            label="An AI assistant · illustrative example"
            query="what is the Kochi Water Metro and how does it work?"
          >
            <p className="text-[1rem]">
              "It's a ferry network in Kochi using electric boats across island terminals, with a
              common ticketing app shared with other city transport."
            </p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {mentions.map((m) => (
                <li key={m.text} className="flex items-center gap-2.5 text-[0.95rem]">
                  <span
                    className={`inline-flex size-5.5 shrink-0 items-center justify-center rounded-full text-[0.75rem] ${
                      m.hit ? "bg-detected/20 text-detected" : "bg-miss/20 text-miss"
                    }`}
                  >
                    {m.hit ? "✓" : "✗"}
                  </span>
                  {m.text}
                </li>
              ))}
            </ul>
          </AnswerCard>
        </Reveal>
      </div>
    </section>
  );
}
