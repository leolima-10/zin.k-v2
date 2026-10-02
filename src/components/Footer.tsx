import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { SITE } from "../data/site";
import { iconHover } from "../lib/animations/variants";

const FOOTER_LINKS = [
  { label: "quem somos", hash: "#quem-somos" },
  { label: "serviços", hash: "#servicos" },
  { label: "portfólio", hash: "#portfolio" },
  { label: "processo", hash: "#processo" },
  { label: "contato", hash: "#contato" },
];

const SOCIAL_LINKS = [
  {
    label: "instagram",
    href: SITE.instagramUrl,
    icon: Instagram,
    handle: SITE.instagramHandle,
  },
  { label: "linkedin", href: SITE.linkedinUrl, icon: Linkedin },
  { label: "e-mail", href: `mailto:${SITE.email}`, icon: Mail },
];

export function Footer() {
  return (
    <footer className="border-t border-cream/10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-12 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm/6 text-cream/50">
            sites e soluções digitais sob medida para empresas. feitos em{" "}
            {SITE.location.toLowerCase()}.
          </p>
        </div>

        <nav aria-label="links rápidos">
          <h2 className="font-display text-sm font-semibold text-cream">
            navegação
          </h2>
          <ul className="mt-4 space-y-3">
            {FOOTER_LINKS.map((link) => (
              <li key={link.hash}>
                <Link
                  to={`/${link.hash}`}
                  className="relative text-sm text-cream/50 transition-colors hover:text-cream after:absolute after:bottom-[-2px] after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-semibold text-cream">
            redes
          </h2>
          <ul className="mt-4 flex gap-3">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon, handle }) => (
              <li key={label}>
                <motion.a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={
                    label === "instagram"
                      ? `Instagram da zin.k (${SITE.instagramHandle})`
                      : label
                  }
                  whileHover={iconHover}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-cream/10 text-cream/60 transition-colors hover:border-accent/50 hover:text-accent-text"
                >
                  <Icon size={18} aria-hidden="true" />
                </motion.a>
                {label === "instagram" && handle && (
                  <span className="sr-only">{handle}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/5">
        <p className="mx-auto w-full max-w-6xl px-5 py-6 text-xs text-cream/40 sm:px-8">
          © {new Date().getFullYear()} zin.k — todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
