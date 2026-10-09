import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Clock3, Star } from "lucide-react";
import { Section } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { MotionCard } from "../components/MotionCard";
import { WhatsAppLink } from "../components/WhatsAppLink";
import { WA_MESSAGES } from "../lib/whatsapp";
import {
  PRICING_CATEGORIES,
  PRICING_NOTE,
  PRICING_SERVICES,
  PRICING_UPDATED_LABEL,
  formatPricingPrice,
  type PricingCategoryId,
  type PricingService,
} from "../data/pricing";
import {
  staggerContainer,
  staggerItem,
  defaultEase,
  durations,
} from "../lib/animations/variants";

function PricingCard({ service }: { service: PricingService }) {
  const timelineLabel =
    service.unit === "mensal" || service.timeline.toLowerCase().includes("escopo")
      ? "Prazo"
      : "Prazo médio";

  return (
    <motion.li variants={staggerItem} className="h-full">
      <MotionCard
        className={`relative flex h-full flex-col ${
          service.popular
            ? "!border-accent shadow-[0_0_0_1px_rgba(68,0,214,0.18),0_24px_48px_-24px_rgba(68,0,214,0.65)]"
            : ""
        }`}
      >
        {service.popular && (
          <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full border border-accent bg-surface px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-text">
            <Star size={12} fill="currentColor" aria-hidden="true" />
            Mais procurado
          </span>
        )}

        <h3 className="font-display text-lg font-semibold leading-snug text-cream">
          {service.name}
        </h3>

        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/45">
          a partir de
        </p>
        <p className="mt-1 flex flex-wrap items-baseline gap-x-2">
          <span className="font-display text-4xl font-bold tracking-tight text-cream">
            {formatPricingPrice(service.priceFrom)}
          </span>
          <span className="text-sm font-medium text-cream/50">
            {service.unit === "mensal" ? "/mês" : "único"}
          </span>
        </p>

        <p className="mt-3 text-sm/6 text-cream/65">{service.description}</p>

        <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-cream/80">
              <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-accent-text" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <p className="mt-5 flex items-center gap-2 text-xs text-cream/50">
            <Clock3 size={16} aria-hidden="true" className="shrink-0" />
            <span>
              {timelineLabel}:{" "}
              <span className="font-medium text-cream/80">{service.timeline}</span>
            </span>
          </p>

          <WhatsAppLink
            message={WA_MESSAGES.service(service.name)}
            srContext={`Solicitar proposta para ${service.name} no WhatsApp`}
            className="btn-primary mt-5 w-full"
          >
            Solicitar proposta
            <ArrowRight size={16} aria-hidden="true" />
          </WhatsAppLink>
        </div>
      </MotionCard>
    </motion.li>
  );
}

export function Pricing() {
  const categories = useMemo(
    () =>
      PRICING_CATEGORIES.filter((category) =>
        PRICING_SERVICES.some((service) => service.category === category.id),
      ).sort((a, b) => a.order - b.order),
    [],
  );

  const [activeCategory, setActiveCategory] = useState<PricingCategoryId>(
    categories[0]?.id ?? "sites",
  );
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const visibleServices = useMemo(
    () =>
      PRICING_SERVICES.filter((service) => service.category === activeCategory).sort(
        (a, b) => a.order - b.order,
      ),
    [activeCategory],
  );

  function handleTabsKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (categories.length === 0) return;

    const currentIndex = categories.findIndex(
      (category) => category.id === activeCategory,
    );
    let nextIndex = -1;

    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % categories.length;
    if (event.key === "ArrowLeft")
      nextIndex = (currentIndex - 1 + categories.length) % categories.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = categories.length - 1;

    if (nextIndex >= 0) {
      event.preventDefault();
      setActiveCategory(categories[nextIndex].id);
      tabRefs.current[nextIndex]?.focus();
    }
  }

  if (categories.length === 0) return null;

  return (
    <Section
      id="precos"
      eyebrow="preços"
      title="tabela de preço."
      description="Investimento transparente para cada etapa do seu projeto digital. Escolha uma categoria e veja o que está incluso em cada serviço."
    >
      <Reveal>
        <div className="-mx-5 overflow-x-auto px-5 [scrollbar-width:none] [-ms-overflow-style:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
          <div
            role="tablist"
            aria-label="Categorias de serviços"
            onKeyDown={handleTabsKeyDown}
            className="inline-flex min-w-full items-center gap-2 rounded-2xl border border-white/10 bg-surface p-1.5 sm:min-w-0"
          >
            {categories.map((category, index) => {
              const active = category.id === activeCategory;

              return (
                <button
                  key={category.id}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`precos-tab-${category.id}`}
                  aria-selected={active}
                  aria-controls={`precos-panel-${category.id}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setActiveCategory(category.id)}
                  className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                    active
                      ? "border border-accent/50 bg-accent/15 text-cream"
                      : "border border-white/10 bg-white/[0.03] text-cream/60 hover:border-white/25 hover:text-cream"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      <Reveal>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeCategory}
            role="tabpanel"
            id={`precos-panel-${activeCategory}`}
            aria-labelledby={`precos-tab-${activeCategory}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: durations.normal, ease: defaultEase }}
            className="mt-8"
          >
            <motion.ul
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {visibleServices.map((service) => (
                <PricingCard key={service.id} service={service} />
              ))}
            </motion.ul>
          </motion.div>
        </AnimatePresence>
      </Reveal>

      <Reveal>
        <div className="mt-12 flex flex-col items-center gap-2 border-t border-white/10 pt-6 text-center">
          <p className="text-sm font-medium text-cream/80">{PRICING_NOTE}</p>
          <p className="text-xs text-cream/50">{PRICING_UPDATED_LABEL}</p>
        </div>
      </Reveal>
    </Section>
  );
}
