import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-titulo`}
      className={`scroll-mt-20 py-20 sm:py-28 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="mb-3 flex items-center gap-3 font-display text-sm font-medium text-accent-text">
            <span className="h-px w-8 bg-accent-text/70" aria-hidden="true" />
            {eyebrow}
          </p>
          <h2
            id={`${id}-titulo`}
            className="font-display text-3xl font-bold text-cream sm:text-4xl"
          >
            {title}
          </h2>
          {description && (
            <p className="mt-4 max-w-2xl text-base/7 text-cream/60">
              {description}
            </p>
          )}
        </Reveal>
        <div className="mt-10 sm:mt-14">{children}</div>
      </div>
    </section>
  );
}
