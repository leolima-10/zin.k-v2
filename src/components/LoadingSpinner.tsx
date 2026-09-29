import { motion, useReducedMotion } from "framer-motion";

/**
 * Loading spinner animado com múltiplos círculos
 */
export function LoadingSpinner({
  size = 48,
  color = "#4400d6",
  thickness = 3,
  className = "",
}: {
  size?: number;
  color?: string;
  thickness?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div
        className={`${className} flex items-center justify-center`}
        style={{ width: size, height: size }}
        role="status"
        aria-label="Carregando"
      >
        <div className="animate-spin rounded-full border-2 border-current border-t-transparent" style={{ width: size, height: size, borderColor: color }} />
      </div>
    );
  }

  return (
    <div
      className={`${className} flex items-center justify-center relative`}
      style={{ width: size, height: size }}
      role="status"
      aria-label="Carregando"
    >
      {/* Círculo de fundo */}
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - thickness}
          fill="none"
          stroke="currentColor"
          strokeWidth={thickness}
          strokeOpacity={0.15}
          style={{ color }}
        />
      </svg>

      {/* Círculo animado */}
      <motion.svg
        width={size}
        height={size}
        className="absolute transform -rotate-90"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - thickness}
          fill="none"
          stroke="currentColor"
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={size * 0.6}
          strokeDashoffset={size * 0.2}
          style={{ color }}
        />
      </motion.svg>

      {/* Pulsing dot no centro */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{ scale: [0.8, 1, 0.8], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="rounded-full"
          style={{
            width: size * 0.25,
            height: size * 0.25,
            backgroundColor: color,
            boxShadow: `0 0 ${size * 0.1} ${color}`,
          }}
        />
      </motion.div>
    </div>
  );
}

/**
 * Loading overlay fullscreen
 */
export function LoadingOverlay({ message = "Carregando..." }: { message?: string }) {
  const reduce = useReducedMotion();

  const initialVariants = reduce ? { opacity: 1 } : { opacity: 0 };
  const exitVariants = reduce ? { opacity: 1 } : { opacity: 0 };
  const initialText = reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 };

  return (
    <motion.div
      initial={initialVariants}
      animate={{ opacity: 1 }}
      exit={exitVariants}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink/95 backdrop-blur-sm"
      role="alert"
      aria-live="polite"
    >
      <LoadingSpinner size={64} />
      <motion.p
        initial={initialText}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 text-sm font-medium text-cream/70"
      >
        {message}
      </motion.p>
    </motion.div>
  );
}

/**
 * Botão em estado de loading
 */
export function ButtonLoading({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <LoadingSpinner
      size={sizes[size]}
      color="#fff"
      thickness={2}
      className={className}
    />
  );
}