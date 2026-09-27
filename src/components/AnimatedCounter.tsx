import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { counterVariants } from "../lib/animations/variants";

interface AnimatedCounterProps {
  value: string;
  label: string;
  className?: string;
  duration?: number;
  delay?: number;
}

/**
 * Componente de contador animado que conta de 0 até o valor final
 * quando entra no viewport. Suporta números com sufixos (ex: "24+", "98", "4 sem").
 */
export function AnimatedCounter({
  value,
  label,
  className = "",
  duration = 2,
  delay = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (!isInView) return;

    // Extrai o número do valor (ex: "24+" -> 24, "98" -> 98, "4 sem" -> 4)
    const numericValue = parseFloat(value.replace(/[^\d.]/g, ""));
    const suffix = value.replace(/[\d.]/g, "");

    if (isNaN(numericValue)) {
      setDisplayValue(value);
      return;
    }

    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // Easing easeOutCubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(numericValue * easedProgress);
      setDisplayValue(`${currentValue}${suffix}`);

      if (progress >= 1) {
        clearInterval(timer);
        setDisplayValue(value); // Garante o valor exato no final
      }
    }, 16); // ~60fps

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <motion.div
      ref={ref}
      variants={counterVariants}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`rounded-2xl border border-white/10 bg-surface p-6 ${className}`}
    >
      <dd className="font-display text-4xl font-bold text-cream tabular-nums">
        {displayValue}
      </dd>
      <dt className="mt-2 text-sm text-cream/50">{label}</dt>
    </motion.div>
  );
}