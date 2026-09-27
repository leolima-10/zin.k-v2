import { useEffect, useState } from "react";

/**
 * Wrapper SSR-safe para prefers-reduced-motion.
 * No servidor retorna false; no cliente lê a media query.
 */
export function useReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setReduce(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return reduce;
}