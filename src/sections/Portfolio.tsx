import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import {
  CATEGORY_LABELS,
  projects,
  type ProjectCategory,
} from "../data/projects";
import { Section } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { staggerContainer, staggerItem } from "../lib/animations/variants";

type Filter = "todos" | ProjectCategory;

export function Portfolio() {
  const [filter, setFilter] = useState<Filter>("todos");

  const counts = useMemo(() => {
    const map = new Map<ProjectCategory, number>();
    for (const project of projects) {
      map.set(project.category, (map.get(project.category) ?? 0) + 1);
    }
    return map;
  }, []);

  const filters: { value: Filter; label: string; count: number }[] = [
    { value: "todos", label: "todos", count: projects.length },
    ...(Object.keys(CATEGORY_LABELS) as ProjectCategory[]).map((category) => ({
      value: category,
      label: CATEGORY_LABELS[category],
      count: counts.get(category) ?? 0,
    })),
  ];

  const filtered =
    filter === "todos"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <Section
      id="portfolio"
      eyebrow="portfólio"
      title="trabalho que a gente assina."
      description="uma seleção de projetos que saíram do briefing e foram pro ar. clique em qualquer um pra ver problema, solução e stack."
    >
      <Reveal>
        <div
          className="relative flex flex-wrap items-center gap-2"
          role="group"
          aria-label="filtrar projetos por categoria"
        >
          {/* Indicador animado do filtro ativo (apenas visual, sem texto duplicado) */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={filter}
              layoutId="filter-indicator"
              className="absolute rounded-full border-accent bg-accent/15 transition-colors"
              style={{ pointerEvents: "none" }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </AnimatePresence>

          {filters.map(({ value, label, count }) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              aria-pressed={filter === value}
              className="relative rounded-full border px-4 py-1.5 text-sm font-medium transition-colors z-10
                border-white/10 bg-white/[0.03] text-cream/60 hover:border-white/25 hover:text-cream"
            >
              {label}
              <span className="ml-2 text-xs text-cream/40">{count}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.ul
            key={filter}
            className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {filtered.map((project) => (
              <motion.li
                key={project.slug}
                variants={staggerItem}
                layout
              >
                <Link
                  to={`/projetos/${project.slug}`}
                  className="group block h-full overflow-hidden rounded-3xl border border-white/10 bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={project.cover}
                      alt={project.coverAlt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                    <span className="absolute left-4 top-4 rounded-3xl bg-ink/70 px-3 py-1 text-xs font-medium text-cream/85 backdrop-blur-sm">
                      {CATEGORY_LABELS[project.category]}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-4 p-5">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-cream transition-colors group-hover:text-white">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-sm/6 text-cream/55">
                        {project.tagline}
                      </p>
                    </div>
                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-cream/50 transition-colors duration-300 group-hover:border-accent/60 group-hover:text-accent-text">
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </Reveal>
    </Section>
  );
}