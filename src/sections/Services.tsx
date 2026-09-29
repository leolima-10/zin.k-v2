import {
  Gauge,
  Globe,
  LayoutDashboard,
  MousePointerClick,
  ShoppingCart,
  Wrench,
} from "lucide-react";
import { Section } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { MotionCard, MotionCardIcon } from "../components/MotionCard";

const SERVICES = [
  {
    icon: Globe,
    title: "sites institucionais",
    desc: "presença digital sólida e rápida — a cara da sua empresa em qualquer dispositivo.",
  },
  {
    icon: ShoppingCart,
    title: "e-commerce",
    desc: "lojas sob medida com checkout otimizado, integrações de pagamento e frete, prontas pra escalar.",
  },
  {
    icon: MousePointerClick,
    title: "landing pages",
    desc: "páginas de conversão para campanhas, lançamentos e captação de leads — feitas pra mensurar.",
  },
  {
    icon: LayoutDashboard,
    title: "sistemas web",
    desc: "dashboards, portais, CRM e ferramentas internas que organizam sua operação e acabam com a planilha.",
  },
  {
    icon: Wrench,
    title: "manutenção & evolução",
    desc: "seu site sempre atual, seguro e rápido — sem você precisar pensar nisso.",
  },
  {
    icon: Gauge,
    title: "seo & performance",
    desc: "otimização técnica para o google adorar seu site e o usuário não desistir dele.",
  },
];

export function Services() {
  return (
    <div className="bg-cream text-ink">
      <Section
        id="servicos"
        eyebrow="o que oferecemos"
        title="do site ao sistema. tudo sob medida."
        description="a gente entra no seu problema e sai com a solução — seja uma landing page de campanha ou a plataforma que a sua equipe usa todo dia."
        className="[&_p]:text-ink/70 [&_h2]:text-ink [&_.text-accent-text]:text-ink"
      >
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, desc }, i) => (
            <li key={title}>
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <MotionCard tone="onLight">
                  <MotionCardIcon variant="fullRotate">
                    <Icon size={20} aria-hidden="true" />
                  </MotionCardIcon>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm/6 text-ink/60">{desc}</p>
                </MotionCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
