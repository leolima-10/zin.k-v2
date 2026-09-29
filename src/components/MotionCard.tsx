import { motion } from "framer-motion";
import { cardHover, cardImageHover, iconHover, iconHoverFullRotate } from "../lib/animations/variants";
import type { ReactNode } from "react";

interface MotionCardProps {
  children: ReactNode;
  className?: string;
  tone?: "dark" | "onLight";
}

/**
 * Card com micro-interações de hover:
 * - Container: lift + shadow
 * - Imagem: scale 1.04
 * - Ícone: rotate 6deg + scale 1.1
 */
export function MotionCard({
  children,
  className = "",
  tone = "dark",
}: MotionCardProps) {
  const base = "group h-full rounded-2xl border p-6 transition-all duration-300";
  const darkStyles = "border-white/10 bg-surface-2";
  const onLightStyles = "border-ink bg-ink text-cream";

  return (
    <motion.article
      whileHover={cardHover}
      className={`${base} ${tone === "onLight" ? onLightStyles : darkStyles} ${className}`}
    >
      {children}
    </motion.article>
  );
}

/**
 * Wrapper para imagem dentro do card com hover scale
 */
export function MotionCardImage({
  children,
  className = "",
}: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={cardImageHover}
      className={`transition-transform duration-500 ${className}`}
    >
      {children}
    </motion.div>
  );
}

/**
 * Wrapper para ícone dentro do card com hover rotate
 */
interface MotionCardIconProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "fullRotate";
}

export function MotionCardIcon({
  children,
  className = "",
  variant = "default",
}: MotionCardIconProps) {
  const hoverVariant = variant === "fullRotate" ? iconHoverFullRotate : iconHover;

  return (
    <motion.span
      whileHover={hoverVariant}
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-accent-text transition-colors ${className}`}
    >
      {children}
    </motion.span>
  );
}