import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Section } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { MotionCard } from "../components/MotionCard";
import { lineDrawVariants, lineDrawTransition } from "../lib/animations/variants";

const STEPS = [
  {
    number: "01",
    title: "briefing",
    desc: "a gente mergulha no seu negócio: objetivos, público, referências e o que já não está funcionando. sem briefing, sem proposta.",
  },
  {
    number: "02",
    title: "design",
    desc: "layout no figma, iterado com você até a aprovação. você vê o site inteiro antes de qualquer linha de código existir.",
  },
  {
    number: "03",
    title: "desenvolvimento",
    desc: "código limpo, rápido e responsivo, testado nos dispositivos que seus clientes realmente usam.",
  },
  {
    number: "04",
    title: "entrega & suporte",
    desc: "publicação, acompanhamento pós-lançamento e suporte contínuo. a gente não some depois do deploy.",
  },
];

/**
 * Linha SVG que conecta os 4 steps do processo.
 * Anima o pathLength baseado no scroll da seção.
 */
function ProcessLine() {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-200px" });

  // Path que conecta os 4 cards (vertical no mobile, horizontal no desktop)
  // Usamos coordenadas relativas que funcionam com o grid
  const pathD = "M 50 0 L 50 100"; // Linha vertical simples

  return (
    <motion.svg
      ref={ref}
      className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 h-full w-1 pointer-events-none"
      aria-hidden="true"
      variants={lineDrawVariants}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      transition={lineDrawTransition}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <motion.path
        d={pathD}
        stroke="url(#process-gradient)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        style={{ pathLength: isInView ? 1 : 0 }}
      />
      <defs>
        <linearGradient id="process-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}

/**
 * Versão mobile: linha horizontal entre cards
 */
function ProcessLineMobile() {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-200px" });

  return (
    <motion.svg
      ref={ref}
      className="lg:hidden absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 w-full pointer-events-none"
      aria-hidden="true"
      variants={lineDrawVariants}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      transition={lineDrawTransition}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M 0 50 L 100 50"
        stroke="url(#process-gradient-mobile)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        style={{ pathLength: isInView ? 1 : 0 }}
      />
      <defs>
        <linearGradient id="process-gradient-mobile" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}

export function Process() {
  return (
    <div className="bg-surface">
      <Section
        id="processo"
        eyebrow="como trabalhamos"
        title="do briefing ao ar em quatro etapas."
        description="processo enxuto, comunização direta e zero surpresa no meio do caminho. você acompanha cada etapa."
      >
        <div className="relative">
          {/* Linha conectando os steps (desktop) */}
          <ProcessLine />
          {/* Linha conectando os steps (mobile) */}
          <ProcessLineMobile />

          <ol className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 relative z-10">
            {STEPS.map(({ number, title, desc }, i) => (
              <li key={number} className="relative">
                <Reveal delay={i * 0.08} className="h-full">
                  <MotionCard>
                    <p className="font-display text-4xl font-bold text-accent">
                      {number}
                    </p>
                    <h3 className="mt-4 font-display text-lg font-semibold text-cream">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm/6 text-cream/55">{desc}</p>
                  </MotionCard>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Section>
    </div>
  );
}