import { Eye, BarChart3, Target, Lightbulb, Send, TrendingUp } from "lucide-react";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

const features = [
  {
    icon: Eye,
    title: "See every mention",
    text: "What AI assistants actually say about you, pulled from the same questions your customers are asking.",
  },
  {
    icon: BarChart3,
    title: "Know where you rank",
    text: "Compared against the competitors you name — not a generic market list.",
  },
  {
    icon: Target,
    title: "Find the gap before customers do",
    text: "Where your offering, message, or content doesn't match what people are asking for.",
  },
  {
    icon: Lightbulb,
    title: "Get told what to fix, and why",
    text: "Every recommendation comes with the evidence it's based on.",
  },
  {
    icon: Send,
    title: "Push it out",
    text: "Turn a fix into content, ready for the channels you already use.",
  },
  {
    icon: TrendingUp,
    title: "Watch the trend",
    text: "Rerun automatically and see whether visibility is actually moving.",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-ink py-24">
      <div className="container-page">
        <Reveal>
          <div className="mb-14 max-w-[640px]">
            <Eyebrow>What you get</Eyebrow>
            <h2 className="text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.15]">
              Everything you need to see, and fix, your AI visibility.
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 60}>
              <div className="h-full rounded-2xl border border-ink-line bg-ink-raised p-7 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-signal/40">
                <f.icon className="mb-5 size-6 text-signal" strokeWidth={1.6} />
                <h3 className="mb-2 text-[1.06rem]">{f.title}</h3>
                <p className="text-[0.94rem] text-ink-dim">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
