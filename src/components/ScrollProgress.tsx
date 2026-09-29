import { motion } from "framer-motion";
import { useScrollProgress } from "../hooks/useScrollProgress";

/**
 * Barra de progresso de scroll fina no topo da página.
 * Fica fixa no topo, atrás do navbar.
 */
export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 9999,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <motion.div
        style={{
          height: "100%",
          background: "linear-gradient(90deg, #4400d6, #9166dc)",
          transformOrigin: "left center",
        }}
        animate={{ scaleX: progress }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </motion.div>
  );
}