import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight } from "lucide-react";
import { gradientOrbVariants, scrollIndicatorVariants } from "../lib/animations/variants";

/**
 * Partículas CSS flutuantes no fundo do Hero.
 * Leve, sem canvas, respeita prefers-reduced-motion.
 */
function HeroParticles({ reduce }: { reduce: boolean }) {
  if (reduce) return null;

  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 20,
    duration: 15 + Math.random() * 15,
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
          className="absolute rounded-full bg-accent/30"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          initial={false}
          animate={{
            y: [0, -100, 0],
            x: [0, 30, 0],
            opacity: [0, 0.4, 0.6, 0.4, 0],
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

export function Hero() {
  const reduce = useReducedMotion() ?? false;
  const { scrollY } = useScroll();

  // Parallax para os orbs de gradiente - useTransform returns MotionValue
  const orb1Y = useTransform(scrollY, [0, 800], [0, -100]);
  const orb1Rotate = useTransform(scrollY, [0, 800], [0, 45]);
  const orb2Y = useTransform(scrollY, [0, 800], [0, 80]);
  const orb2Rotate = useTransform(scrollY, [0, 800], [0, -30]);

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Background com gradientes animados + partículas + grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Orb 1 - animado + parallax */}
        <motion.div
          className="absolute -top-40 right-[-12%] h-[520px] w-[520px] rounded-full bg-accent/20 blur-[140px]"
          style={{ y: orb1Y, rotate: orb1Rotate }}
          variants={gradientOrbVariants}
        />

        {/* Orb 2 - animado + parallax */}
        <motion.div
          className="absolute bottom-[-25%] left-[-15%] h-[460px] w-[460px] rounded-full bg-accent/10 blur-[160px]"
          style={{ y: orb2Y, rotate: orb2Rotate }}
          variants={gradientOrbVariants}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />

        {/* Partículas flutuantes */}
        <HeroParticles reduce={reduce} />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-32 sm:px-8">
        {/* Badge "aceitando novos projetos" */}
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium tracking-wide text-cream/70"
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          aceitando novos projetos
        </motion.p>

        {/* Título principal com stagger por palavra */}
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            staggerChildren: 0.04,
            delayChildren: 0.1,
          }}
          className="mt-8 font-display text-[clamp(3.5rem,11vw,7.5rem)] font-bold leading-[0.95] tracking-tight text-cream"
        >
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            zin
          </motion.span>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-accent">
            .
          </motion.span>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            k
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 block max-w-3xl font-display text-xl font-medium leading-snug text-cream/75 sm:text-2xl"
            style={{ transitionDelay: "0.3s" }}
          >
            sites e soluções digitais sob medida para empresas que levam a
            sério presença digital.
          </motion.span>
        </motion.h1>

        {/* Descrição */}
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-6 max-w-xl text-base/7 text-cream/55"
        >
          a zin.k desenha, constrói e mantém sites que carregam rápido,
          posicionam sua marca e viram negócio. sem template, sem enrolação —
          só resultado.
        </motion.p>

        {/* Botões */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link to="/#contato" className="btn-primary">
            Fale com a gente
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link to="/#portfolio" className="btn-secondary">
            Ver projetos
            <ArrowDown size={16} aria-hidden="true" />
          </Link>
        </motion.div>

        {/* Indicador de scroll */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/40"
          variants={scrollIndicatorVariants}
          aria-hidden="true"
        >
          <p className="text-xs font-medium tracking-widest uppercase">role para explorar</p>
          <ArrowDown size={24} />
        </motion.div>
      </div>
    </section>
  );
}