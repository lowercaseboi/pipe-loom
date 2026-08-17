import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

const steps = [
  {
    title: "Connect your brand",
    text: "Tell Refract who you are, what you offer, and who else is in the running.",
  },
  {
    title: "We ask the same questions your customers do",
    text: "Across multiple AI systems, not just one.",
  },
  {
    title: "See exactly where you stand",
    text: "Every mention, every omission, compared side-by-side with competitors.",
  },
  {
    title: "Get a fix for every gap",
    text: "Prioritized, specific actions — not a generic checklist.",
  },
  {
    title: "Watch it move",
    text: "Rerun automatically and track whether visibility is actually improving.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-ink py-24">
      <div className="container-page">
        <Reveal>
          <div className="mb-14 max-w-[640px]">
            <Eyebrow>How Refract works</Eyebrow>
            <h2 className="text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.15]">
              From blind spot to evidence, in five steps.
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
