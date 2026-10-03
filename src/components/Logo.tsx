import { Link } from "react-router-dom";

type LogoVariant = "dark" | "light" | "purple";

interface LogoMarkProps {
  /** dark = fundo preto (padrão) · light = fundo creme · purple = fundo roxo */
  variant?: LogoVariant;
  /** tamanho base da fonte — o ponto e espaçamentos escalam em `em` */
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl";
  /** classe extra no wrapper do mark */
  className?: string;
}

const TONES: Record<LogoVariant, { text: string; dot: string }> = {
  dark: { text: "text-cream", dot: "bg-accent" },
  light: { text: "text-ink", dot: "bg-ink" },
  purple: { text: "text-cream", dot: "bg-cream" },
};

const SIZE_CLASSES: Record<NonNullable<LogoMarkProps["size"]>, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
  "7xl": "text-7xl",
  "8xl": "text-8xl",
  "9xl": "text-9xl",
};

/**
 * Marca visual pura do logo "zin.k" — sem link, sem "company".
 * Usa DM Sans (font-sans) bold geométrico, minúsculo.
 * Ponto: círculo roxo vivo, ~38% da altura da fonte, centrado na altura-x,
 * com espaço respirável dos dois lados (não toca no n nem no k).
 */
export function LogoMark({
  variant = "dark",
  size = "xl",
  className = "",
}: LogoMarkProps) {
  const tone = TONES[variant];

  return (
    <span
      className={`inline-flex items-center font-sans font-black lowercase tracking-[-0.02em] ${SIZE_CLASSES[size]} ${className}`}
      aria-hidden="true"
    >
      zin
      <span
        className={`ml-[0.18em] mr-[0.18em] inline-block h-[0.38em] w-[0.38em] -translate-y-[0.1em] rounded-full ${tone.dot}`}
      />
      k
    </span>
  );
}

interface LogoProps {
  className?: string;
  variant?: LogoVariant;
  /** esconde "company" — usado na navbar */
  compact?: boolean;
  /** renderiza o mark num tamanho específico (padrão: xl) */
  size?: LogoMarkProps["size"];
  /** substitui o Link por outro elemento (ex: h1 no Hero) — mantém a11y */
  as?: React.ElementType;
  /** props extras passadas ao elemento raiz (Link ou as) */
  rootProps?: Record<string, unknown>;
}

/**
 * Logo completo com link para home + tagline "company" opcional.
 * Envolve LogoMark num Link (ou elemento customizado via `as`).
 */
export function Logo({
  className = "",
  variant = "dark",
  compact = false,
  size = "xl",
  as: Root = Link,
  rootProps = {},
}: LogoProps) {
  const tone = TONES[variant];

  return (
    <Root
      {...(Root === Link ? { to: "/" } : {})}
      aria-label="zin.k — página inicial"
      className={`group inline-flex flex-col gap-[0.3em] leading-none ${tone.text} ${className}`}
      {...rootProps}
    >
      <LogoMark variant={variant} size={size} />
      {!compact && (
        <span className="font-sans font-light lowercase tracking-[0.3em] text-[0.4em]">
          company
        </span>
      )}
    </Root>
  );
}