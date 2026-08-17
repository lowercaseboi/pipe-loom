import { Eye, BarChart3, Target, Lightbulb, FileText, TrendingUp } from "lucide-react";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

const features = [
  {
    icon: Eye,
    title: "Read the answers in full",
    text: "Every response an AI system gives about the project, kept as-is so it can be reviewed rather than summarised away.",
  },
  {
    icon: BarChart3,
    title: "Compare across systems",
    text: "Where models agree, where they contradict each other, and where only one of them knows something.",
  },
  {
    icon: Target,
    title: "Locate missing context",
    text: "The parts of the project no answer covers — scope, current status, who it's for, how to take part.",
  },
  {
    icon: Lightbulb,
    title: "See what each gap rests on",
    text: "Every finding points back to the exact wording in the answer that produced it.",
  },
  {
    icon: FileText,
    title: "Turn findings into documentation",
    text: "Each gap becomes a concrete edit to a README, project page, or public description.",
  },
  {
    icon: TrendingUp,
    title: "Track change over reruns",
    text: "Run the same question set again and see what shifted after the record was updated.",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-ink py-24">
      <div className="container-page">
        <Reveal>
          <div className="mb-14 max-w-[640px]">
            <Eyebrow>What Refract does</Eyebrow>
            <h2 className="text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.15]">
              Enough detail to act on, not a score out of ten.
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
