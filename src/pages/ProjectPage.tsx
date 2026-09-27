import { useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { CATEGORY_LABELS, getProject } from "../data/projects";
import { Reveal } from "../components/Reveal";
import { NotFound } from "./NotFound";
import { pageVariants, imageRevealVariants, imageRevealTransition, staggerContainer, staggerItem } from "../lib/animations/variants";

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProject(slug) : undefined;
  const coverRef = useRef<HTMLImageElement>(null);
  const coverInView = useInView(coverRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!project) return;
    document.title = `${project.title} — projeto zin.k`;
    return () => {
      document.title = "zin.k — sites e soluções digitais sob medida";
    };
  }, [project]);

  if (!project) {
    return <NotFound />;
  }

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <article className="pb-24">
        <div className="mx-auto w-full max-w-6xl px-5 pt-28 sm:px-8">
          <Reveal>
            <motion.a
              href="/#portfolio"
              whileHover={{ x: -4 }}
              className="group inline-flex items-center gap-2 text-sm font-medium text-cream/50 transition-colors hover:text-cream"
            >
              <ArrowLeft
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-x-0.5"
              />
              todos os projetos
            </motion.a>
          </Reveal>

          <Reveal delay={0.05}>
            <header className="mt-8">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-cream/50">
                <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-medium text-accent-text">
                  {CATEGORY_LABELS[project.category]}
                </span>
                <span>{project.client}</span>
                <span aria-hidden="true">·</span>
                <span>{project.year}</span>
              </p>
              <h1 className="mt-4 font-display text-4xl font-bold text-cream sm:text-5xl">
                {project.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg/8 text-cream/60">
                {project.tagline}
              </p>
            </header>
          </Reveal>

          <Reveal delay={0.1}>
            <figure className="mt-10 overflow-hidden rounded-2xl border border-white/10 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface-2 to-surface animate-pulse" aria-hidden="true" />
              <motion.img
                ref={coverRef}
                src={project.cover}
                alt={project.coverAlt}
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
                decoding="async"
                initial="initial"
                animate={coverInView ? "animate" : "initial"}
                variants={imageRevealVariants}
                transition={imageRevealTransition}
                style={{ opacity: coverInView ? 1 : 0 }}
              />
            </figure>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="space-y-10 lg:col-span-2">
              <Reveal>
                <section aria-labelledby="problema-titulo">
                  <h2
                    id="problema-titulo"
                    className="font-display text-xl font-semibold text-cream"
                  >
                    o problema
                  </h2>
                  <p className="mt-3 text-base/8 text-cream/60">
                    {project.problem}
                  </p>
                </section>
              </Reveal>

              <Reveal>
                <section aria-labelledby="solucao-titulo">
                  <h2
                    id="solucao-titulo"
                    className="font-display text-xl font-semibold text-cream"
                  >
                    a solução
                  </h2>
                  <p className="mt-3 text-base/8 text-cream/60">
                    {project.solution}
                  </p>
                </section>
              </Reveal>

              <Reveal>
                <section aria-labelledby="resultados-titulo">
                  <h2
                    id="resultados-titulo"
                    className="font-display text-xl font-semibold text-cream"
                  >
                    resultados
                  </h2>
                  <motion.ul className="mt-3 space-y-3" variants={staggerContainer} initial="initial" animate="animate">
                    {project.highlights.map((highlight) => (
                      <motion.li
                        key={highlight}
                        variants={staggerItem}
                        whileHover={{ x: 8, color: "#a78bfa" }}
                        className="flex items-start gap-3 text-base/8 text-cream/60"
                      >
                        <CheckCircle2
                          size={18}
                          aria-hidden="true"
                          className="mt-1 shrink-0 text-accent-text"
                        />
                        {highlight}
                      </motion.li>
                    ))}
                  </motion.ul>
                </section>
              </Reveal>
            </div>

            <aside className="space-y-6">
              <Reveal delay={0.05}>
                <div className="rounded-2xl border border-white/10 bg-surface p-6">
                  <h2 className="font-display text-sm font-semibold text-cream/80">
                    stack
                  </h2>
                  <motion.ul className="mt-4 flex flex-wrap gap-2" variants={staggerContainer} initial="initial" animate="animate">
                    {project.stack.map((tech) => (
                      <motion.li
                        key={tech}
                        variants={staggerItem}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-cream/70"
                        whileHover={{ scale: 1.05, borderColor: "#8b5cf6", color: "#a78bfa" }}
                        transition={{ duration: 0.2 }}
                      >
                        {tech}
                      </motion.li>
                    ))}
                  </motion.ul>
                  <dl className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-cream/45">cliente</dt>
                      <dd className="text-right text-cream/80">
                        {project.client}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-cream/45">ano</dt>
                      <dd className="text-cream/80">{project.year}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-cream/45">categoria</dt>
                      <dd className="text-cream/80">
                        {CATEGORY_LABELS[project.category]}
                      </dd>
                    </div>
                  </dl>
                  {project.url && (
                    <motion.a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02, boxShadow: "0 0 24px rgba(139, 92, 246, 0.2)" }}
                      className="btn-secondary mt-6 w-full"
                    >
                      ver projeto online
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </motion.a>
                  )}
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <motion.div
                  whileHover={{ scale: 1.02, boxShadow: "0 0 32px rgba(139, 92, 246, 0.3)", borderColor: "#8b5cf6" }}
                  className="rounded-2xl border border-accent/30 bg-accent/10 p-6 transition-all duration-300"
                >
                  <h2 className="font-display text-lg font-semibold text-cream">
                    quer um assim?
                  </h2>
                  <p className="mt-2 text-sm/6 text-cream/60">
                    a gente cria uma solução sob medida pro seu negócio — do
                    briefing ao ar.
                  </p>
                  <Link to="/#contato" className="btn-primary mt-4 w-full">
                    Fale com a gente
                  </Link>
                </motion.div>
              </Reveal>
            </aside>
          </div>
        </div>
      </article>
    </motion.div>
  );
}