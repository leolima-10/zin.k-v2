import { Link } from "react-router-dom";

interface LiveProjectButtonProps {
  to: string;
  label?: string;
  className?: string;
}

/** botão ghost/outline dos cards de projeto */
export function LiveProjectButton({
  to,
  label = "ver projeto",
  className = "",
}: LiveProjectButtonProps) {
  return (
    <Link
      to={to}
      className={`inline-flex shrink-0 items-center justify-center rounded-full border-2 border-cream px-8 py-3 font-display text-sm font-medium tracking-widest text-cream transition-colors duration-300 hover:bg-cream/10 sm:px-10 sm:py-3.5 sm:text-base ${className}`}
    >
      {label}
    </Link>
  );
}
