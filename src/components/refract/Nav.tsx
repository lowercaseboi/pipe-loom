import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { ButtonLink } from "./Button";

const links = [
  { href: "#context", label: "The shift" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#demo", label: "Live demo" },
  { href: "#features", label: "Product" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-ink-line bg-ink/85 backdrop-blur-xl" : "border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Primary" className="container-page flex h-[72px] items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 font-display text-[1.1rem] font-semibold">
          <Logo />
          Refract
        </a>
        <ul className="hidden items-center gap-1 rounded-full border border-ink-line bg-ink-raised/60 px-2 py-1.5 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-4 py-1.5 text-[0.88rem] text-ink-dim transition-colors hover:bg-ink-raised hover:text-ink-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <ButtonLink href="#demo" size="sm">
          Try it live
        </ButtonLink>
      </nav>
    </header>
  );
}
