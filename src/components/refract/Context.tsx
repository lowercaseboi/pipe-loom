import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

const items = [
  {
    tag: "[ before ]",
    text: "Someone researching a project read the docs, the site, the repo, and made up their own mind.",
  },
  {
    tag: "[ now ]",
    text: "They ask an AI system and get one summary, assembled from whatever it happens to know.",
  },
  {
    tag: "[ the gap ]",
    text: "Nobody checks whether that summary is accurate, current, or complete. Refract makes it checkable.",
  },
];

export function Context() {
  return (
    <section id="context" className="bg-paper py-24 text-paper-foreground">
      <div className="container-page">
        <Reveal>
          <div className="mb-14 max-w-[640px]">
            <Eyebrow tone="paper">Why this matters</Eyebrow>
            <h2 className="text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.15]">
              A project's public record is now read by machines first.
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
