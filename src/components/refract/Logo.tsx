export function Logo({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M14 4 L22.5 19.5 L5.5 19.5 Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <line x1="0.5" y1="13" x2="9" y2="13" stroke="currentColor" strokeWidth="1.6" />
      <line
        x1="17.5"
        y1="14.5"
        x2="26.5"
        y2="9.5"
        stroke="var(--color-signal)"
        strokeWidth="1.6"
      />
      <line
        x1="17.5"
        y1="14.5"
        x2="26.5"
        y2="19.5"
        stroke="var(--color-detected)"
        strokeWidth="1.6"
      />
    </svg>
  );
}
