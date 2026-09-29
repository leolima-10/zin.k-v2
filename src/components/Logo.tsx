import { Link } from "react-router-dom";

type LogoVariant = "dark" | "light" | "purple";

interface LogoProps {
  className?: string;
  /** dark = fundo preto (padrão) · light = fundo creme · purple = fundo roxo */
  variant?: LogoVariant;
  /** esconde "company" — usado na navbar */
  compact?: boolean;
}

const TONES: Record<LogoVariant, { text: string; dot: string }> = {
  dark: { text: "text-cream", dot: "bg-accent" },
  light: { text: "text-ink", dot: "bg-ink" },
  purple: { text: "text-cream", dot: "bg-cream" },
};

export function Logo({
  className = "",
  variant = "dark",
  compact = false,
}: LogoProps) {
  const tone = TONES[variant];

  return (
    <Link
      to="/"
      aria-label="zin.k — página inicial"
      className={`group inline-flex flex-col gap-[0.3em] leading-none ${tone.text} ${className}`}
    >
      <span className="inline-flex items-center font-display text-xl font-black lowercase tracking-[-0.02em]">
        zin
        <span
          aria-hidden="true"
          className={`ml-[0.3em] mr-[0.06em] inline-block h-[0.38em] w-[0.38em] -translate-y-[0.1em] rounded-full transition-transform duration-300 group-hover:-translate-y-[0.2em] ${tone.dot}`}
        />
        k
      </span>
      {!compact && (
        <span className="font-sans font-light lowercase tracking-[0.3em] text-[0.4em]">
          company
        </span>
      )}
    </Link>
  );
}