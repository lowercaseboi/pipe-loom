import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

const items = [
  {
    tag: "[ before ]",
    text: "Search engines handed people a list of links. You made your own case.",
  },
  {
    tag: "[ now ]",
    text: "AI assistants hand people an answer. You're either part of it, or you're invisible.",
  },
  {
    tag: "[ the gap ]",
    text: "Almost nobody is watching what these answers actually say. That's what Refract is for.",
  },
];

export function Context() {
  return (
    <section id="context" className="bg-paper py-24 text-paper-foreground">
      <div className="container-page">
        <Reveal>
          <div className="mb-14 max-w-[640px]">
            <Eyebrow tone="paper">The shift</Eyebrow>
            <h2 className="text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.15]">
              Search didn't disappear. It got an opinion.
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.tag} delay={i * 90}>
              <div className="h-full border-t-2 border-paper-foreground pt-5">
                <p className="mb-3 font-mono text-[0.75rem] uppercase tracking-[0.08em] text-tag-paper">
                  {item.tag}
                </p>
                <p className="text-[1.02rem]">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
