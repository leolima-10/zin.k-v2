import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface MagnetProps {
  children: ReactNode;
  className?: string;
  /** distância (px) do cursor até a borda do elemento que ativa o efeito */
  padding?: number;
  /** divisor do deslocamento do cursor (quanto maior, menor o movimento) */
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
}

/**
 * efeito magnético: o elemento acompanha o cursor quando ele está
 * próximo (padding) e volta suavemente ao centro quando se afasta.
 */
export function Magnet({
  children,
  className,
  padding = 100,
  strength = 2,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
}: MagnetProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    let active = false;

    const onMouseMove = (event: MouseEvent) => {
      const rect = outer.getBoundingClientRect();
      const withinX =
        event.clientX >= rect.left - padding &&
        event.clientX <= rect.right + padding;
      const withinY =
        event.clientY >= rect.top - padding &&
        event.clientY <= rect.bottom + padding;

      if (withinX && withinY) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        if (!active) {
          inner.style.transition = activeTransition;
          active = true;
        }
        inner.style.transform = `translate3d(${(event.clientX - centerX) / strength}px, ${(event.clientY - centerY) / strength}px, 0)`;
      } else if (active) {
        inner.style.transition = inactiveTransition;
        inner.style.transform = "translate3d(0px, 0px, 0)";
        active = false;
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [reduce, padding, strength, activeTransition, inactiveTransition]);

  return (
    <div ref={outerRef} className={className}>
      <div ref={innerRef} style={{ willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
}
