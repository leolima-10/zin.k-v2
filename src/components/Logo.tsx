import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      to="/"
      aria-label="zin.k — página inicial"
      className={`group inline-flex items-baseline font-display text-xl font-bold tracking-tight text-cream ${className}`}
    >
      zin
      <span
        aria-hidden="true"
        className="text-accent transition-transform duration-300 group-hover:-translate-y-0.5"
      >
        .
      </span>
      k
    </Link>
  );
}
