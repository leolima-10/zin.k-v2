import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Hook para detectar preferência de tema do sistema
 */
export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (stored) {
      setTheme(stored);
    } else {
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme, mounted]);

  return { theme, toggleTheme, mounted };
}

/**
 * Wrapper para transição suave de tema
 * Usa AnimatePresence para animar a mudança de cor de fundo
 */
interface ThemeTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function ThemeTransition({ children, className = "" }: ThemeTransitionProps) {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={theme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Hook para aplicar transições de tema apenas quando necessário
 */
export function useThemeTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = () => {
    setIsTransitioning(true);
    document.body.classList.add("disable-transitions");
    // Permitir que o browser pinte antes de remover
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.classList.remove("disable-transitions");
        setIsTransitioning(false);
      });
    });
  };

  return { isTransitioning, startTransition };
}