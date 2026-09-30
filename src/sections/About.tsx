import { LayoutGrid, PenTool, TrendingUp } from "lucide-react";
import { Section } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { MotionCard, MotionCardIcon } from "../components/MotionCard";
import { AnimatedCounter } from "../components/AnimatedCounter";

const PILLARS = [
  {
    icon: LayoutGrid,
    title: "sem template",
    desc: "cada projeto nasce do zero, do briefing à entrega. nada de tema comprado ajustado na marra.",
  },
  {
    icon: PenTool,
    title: "design e código na mesma mesa",
    desc: "quem desenha é quem desenvolve. o que você aprova no figma é exatamente o que sobe pro ar.",
  },
  {
    icon: TrendingUp,
    title: "resultado, não enfeite",
    desc: "site bonito que não converte é papel de parede. performance, seo e acessibilidade vêm de fábrica.",
  },
];

const STATS = [
  { value: "24+", label: "projetos entregues" },
  { value: "98", label: "média de performance no pagespeed" },
  { value: "4 sem", label: "do briefing ao site no ar" },
];

export function About() {
  return (
    <Section
      id="quem-somos"
      eyebrow="quem somos"
      title="a gente não vende site. constrói ativo digital."
      description="a zin.k é uma startup de tecnologia que desenha e desenvolve sites e soluções digitais para empresas de todos os tamanhos — do primeiro site ao sistema que organiza a operação inteira."
    >
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {PILLARS.map(({ icon: Icon, title, desc }, i) => (
          <li key={title}>
            <Reveal delay={i * 0.08} className="h-full">
              <MotionCard>
                <MotionCardIcon tone="dark">
                  <Icon size={20} aria-hidden="true" />
                </MotionCardIcon>
                <h3 className="mt-5 font-display text-lg font-semibold text-cream">
                  {title}
                </h3>
                <p className="mt-2 text-sm/6 text-cream/70">{desc}</p>
              </MotionCard>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal delay={0.15}>
        <dl className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {STATS.map(({ value, label }, i) => (
            <AnimatedCounter key={label} value={value} label={label} delay={i * 0.1} />
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
