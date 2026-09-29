import { Link } from "react-router-dom";

interface ContactButtonProps {
  label?: string;
  className?: string;
}

/** CTA pill da zin.k — violeta de marca com glow no hover */
export function ContactButton({
  label = "fale com a gente",
  className = "",
}: ContactButtonProps) {
  return (
    <Link
      to="/#contato"
      className={`inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 font-display text-xs font-medium tracking-widest text-white transition-all duration-300 hover:bg-accent/85 hover:shadow-[0_0_32px_rgba(68,0,214,0.4)] active:scale-[0.98] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base ${className}`}
    >
      {label}
    </Link>
  );
}
