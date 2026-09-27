import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { buttonHover, buttonTap } from "../lib/animations/variants";
import type { ReactNode } from "react";

interface MotionButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}

/**
 * Botão com micro-interações ricas:
 * - whileHover: scale 1.02
 * - whileTap: scale 0.98
 * - Ripple effect no click
 */
export function MotionButton({
  children,
  variant = "primary",
  className = "",
  whileHover = buttonHover,
  whileTap = buttonTap,
  ...props
}: MotionButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-sm font-semibold transition-colors duration-300";

  const variants = {
    primary: "bg-accent text-white hover:bg-accent/85 hover:shadow-[0_0_32px_rgba(139,92,246,0.4)]",
    secondary: "border border-white/15 bg-white/[0.03] text-cream hover:border-accent/60 hover:text-white",
    ghost: "text-cream/60 hover:text-cream hover:bg-white/5",
  };

  return (
    <motion.button
      whileHover={whileHover}
      whileTap={whileTap}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}