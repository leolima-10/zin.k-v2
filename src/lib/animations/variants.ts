import type { Variants } from "framer-motion";

/**
 * Easing padrão do projeto (já usado no Reveal)
 */
export const defaultEase = [0.21, 0.47, 0.32, 0.98] as const;

/**
 * Durações padrão
 */
export const durations = {
  fast: 0.2,
  normal: 0.35,
  slow: 0.55,
  slower: 0.7,
} as const;

/**
 * Variantes de entrada/saída para páginas (transições de rota)
 */
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const pageTransition = {
  type: "tween" as const,
  ease: defaultEase,
  duration: durations.slower,
};

/**
 * Variantes de fade + slide up (usado no Reveal)
 */
export const fadeUpVariants: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

export const fadeUpTransition = {
  duration: durations.slower,
  ease: defaultEase,
};

/**
 * Variantes de fade simples
 */
export const fadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fadeTransition = {
  duration: durations.normal,
  ease: defaultEase,
};

/**
 * Variantes de scale (para modais, tooltips, etc)
 */
export const scaleVariants: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export const scaleTransition = {
  duration: durations.fast,
  ease: defaultEase,
};

/**
 * Container com stagger para filhos
 */
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

/**
 * Item do stagger
 */
export const staggerItem: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

/**
 * Variantes para botões (hover/tap)
 */
export const buttonHover = { scale: 1.02 };
export const buttonTap = { scale: 0.98 };

/**
 * Variantes para cards (hover)
 */
export const cardHover = {
  y: -8,
  transition: { duration: durations.normal, ease: defaultEase },
};

/**
 * Variantes para imagens dentro de cards (hover)
 */
export const cardImageHover = {
  scale: 1.04,
  transition: { duration: 0.5, ease: defaultEase },
};

/**
 * Variantes para ícones (hover)
 */
export const iconHover = {
  rotate: 6,
  scale: 1.1,
  transition: { duration: durations.normal, ease: defaultEase },
};

/**
 * Variantes para ícones com rotação completa 360° (hover)
 */
export const iconHoverFullRotate = {
  rotate: 360,
  scale: 1.15,
  transition: { duration: 0.6, ease: defaultEase },
};

/**
 * Variantes para links de navegação (underline animado)
 */
export const navLinkHover = { y: -2 };

/**
 * Variantes para input focus
 */
export const inputFocus = {
  boxShadow: "0 0 0 3px rgba(68, 0, 214, 0.2)",
  transition: { duration: durations.fast },
};

/**
 * Variantes para reveal de imagem (máscara)
 */
export const imageRevealVariants: Variants = {
  initial: { clipPath: "inset(0 100% 0 0)" },
  animate: { clipPath: "inset(0 0% 0 0)" },
};

export const imageRevealTransition = {
  duration: 0.8,
  ease: defaultEase,
};

/**
 * Variantes para contadores animados
 */
export const counterVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
};

/**
 * Variantes para linha de processo (SVG path draw)
 */
export const lineDrawVariants: Variants = {
  initial: { pathLength: 0 },
  animate: { pathLength: 1 },
};

export const lineDrawTransition = {
  duration: 1.2,
  ease: defaultEase,
};

/**
 * Variantes para partículas flutuantes
 */
export const floatVariants: Variants = {
  animate: {
    y: [0, -20, 0],
    x: [0, 10, 0],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

/**
 * Variantes para gradientes animados no Hero
 */
export const gradientOrbVariants: Variants = {
  animate: {
    scale: [1, 1.15, 1],
    rotate: [0, 180, 360],
    transition: {
      duration: 25,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

/**
 * Variantes para indicador "scroll down"
 */
export const scrollIndicatorVariants: Variants = {
  animate: {
    y: [0, 8, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};