import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { pageVariants, gradientOrbVariants } from "../lib/animations/variants";
import { WhatsAppLink } from "../components/WhatsAppLink";
import { WhatsAppIcon } from "../components/WhatsAppIcon";
import { buildWhatsAppUrl, WA_MESSAGES } from "../lib/whatsapp";

/**
 * Partículas flutuantes extras para a página 404
 */
function NotFoundParticles({ reduce }: { reduce: boolean }) {
  if (reduce) return null;

  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 15,
    duration: 12 + Math.random() * 18,
  }));

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)" }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-accent/20"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          initial={false}
          animate={{
            y: [0, -150, 0],
            x: [0, 50, -30, 0],
            opacity: [0, 0.3, 0.5, 0.3, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

export function NotFound() {
  useEffect(() => {
    document.title = "página não encontrada — zin.k";
    return () => {
      document.title = "zin.k — sites e soluções digitais sob medida";
    };
  }, []);

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <section className="flex min-h-[80vh] flex-col items-center justify-center px-5 py-32 text-center relative overflow-hidden">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <motion.div
            className="absolute -top-40 right-[-12%] h-[520px] w-[520px] rounded-full bg-accent/10 blur-[140px]"
            variants={gradientOrbVariants}
          />
          <motion.div
            className="absolute bottom-[-25%] left-[-15%] h-[460px] w-[460px] rounded-full bg-accent/5 blur-[160px]"
            variants={gradientOrbVariants}
          />
        </div>

        {/* Floating particles */}
        <NotFoundParticles reduce={false} />

        {/* Animated 404 number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 100, damping: 12 }}
          className="relative z-10"
        >
          <motion.span
            className="font-display text-[clamp(6rem,20vw,14rem)] font-bold text-cream/10 tracking-tight"
            animate={{ rotate: [0, -2, 2, -2, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            404
          </motion.span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-display text-sm font-medium text-accent-text relative z-10 -mt-8"
        >
          página não encontrada
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-2 font-display text-4xl font-bold text-cream sm:text-5xl relative z-10"
        >
          essa página não existe<span className="text-accent-text">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 max-w-md text-base/7 text-cream/55 relative z-10"
        >
          o link pode estar quebrado ou a página saiu do ar. mas a home tá a um
          clique daqui.
        </motion.p>

        <WhatsAppLink
          message={WA_MESSAGES.default()}
          srContext="falar no whatsapp"
          className="mt-4 inline-flex items-center gap-2 text-sm text-cream/50 hover:text-cream transition-colors"
        >
          <WhatsAppIcon size={16} aria-hidden="true" />
          ou fale conosco no whatsapp
        </WhatsAppLink>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative z-10"
        >
          <motion.a
            href="/"
            whileHover={{ scale: 1.02, boxShadow: "0 0 32px rgba(68, 0, 214, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary mt-8 inline-flex"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            voltar pra home
          </motion.a>
        </motion.div>

        {/* Subtle hint animation */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5, delay: 1.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="mt-12 text-xs text-cream/30 relative z-10"
        >
          💡 dica: confira o portfólio pra ver o que a gente faz
        </motion.p>
      </section>
    </motion.div>
  );
}