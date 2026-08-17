import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

const steps = [
  {
    title: "Start a project",
    text: "A municipal service, a lab's research programme, an open-source library, a college project — anything with a public record.",
  },
  {
    title: "Define what you're investigating",
    text: "The questions that matter: what it does, who it serves, how it works, what state it's in.",
  },
  {
    title: "Ask across AI systems",
    text: "The same realistic questions are put to multiple models, so you see agreement and disagreement.",
  },
  {
    title: "Inspect the answers",
    text: "Read what came back line by line, and mark what is accurate, outdated, vague, or absent.",
  },
  {
    title: "Document the fixes",
    text: "Each gap maps to something concrete to publish or correct — a README section, a docs page, a public FAQ.",
  },
  {
    title: "Rerun and compare",
    text: "Run the same questions later and see whether the answers actually changed.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-ink py-24">
      <div className="container-page">
        <Reveal>
          <div className="mb-14 max-w-[640px]">
            <Eyebrow>The workflow</Eyebrow>
            <h2 className="text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.15]">
              From an open question to a documented change.
            </h2>
          </div>
        </Reveal>

        <div className="relative max-w-[820px]">
          <div className="absolute bottom-6 left-[27px] top-6 w-px bg-ink-line" />
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 70}>
              <div className="group relative grid grid-cols-[56px_1fr] gap-6 py-3">
                <span className="relative z-10 flex h-10 w-14 items-center justify-center rounded-lg border border-ink-line bg-ink font-mono text-[0.85rem] text-signal transition-colors group-hover:border-signal">
                  [{String(i + 1).padStart(2, "0")}]
                </span>
                <div className="rounded-xl border border-transparent px-4 py-2 transition-colors group-hover:border-ink-line group-hover:bg-ink-raised/60">
                  <h3 className="mb-1 text-[1.12rem]">{step.title}</h3>
                  <p className="text-[0.98rem] text-ink-dim">{step.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
