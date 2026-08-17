import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full border border-transparent px-6 py-3 text-[0.92rem] font-semibold no-underline transition-[transform,opacity,border-color,background-color] duration-200 hover:-translate-y-px active:translate-y-0 disabled:pointer-events-none disabled:opacity-55",
  {
    variants: {
      variant: {
        primary: "bg-signal text-signal-foreground shadow-[var(--shadow-signal)] hover:opacity-92",
        ghostInk: "border-ink-line text-ink-foreground hover:border-signal hover:bg-ink-raised",
        ghostPaper:
          "border-paper-line text-paper-foreground hover:border-paper-foreground hover:bg-paper-raised",
      },
      size: {
        md: "",
        sm: "px-4 py-2 text-[0.82rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Variants = VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & Variants) {
  return <button className={buttonVariants({ variant, size, className })} {...props} />;
}

export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & Variants) {
  return <a className={buttonVariants({ variant, size, className })} {...props} />;
}
