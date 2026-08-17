import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-ink-line bg-ink py-14">
      <div className="container-page flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-[46ch]">
          <div className="mb-2.5 flex items-center gap-2.5 font-display font-semibold">
            <Logo size={22} />
            Refract
          </div>
          <p className="text-[0.88rem] text-ink-dim">
            A prototype for generative engine optimization — built as a final-year engineering project
            for small businesses, freelancers, and independent professionals.
          </p>
        </div>
        <p className="font-mono text-[0.76rem] text-ink-dim opacity-80">
          The live demo above calls a real AI model. Nothing you type is stored.
        </p>
      </div>
    </footer>
  );
}
