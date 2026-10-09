import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { WhatsAppLink } from "./WhatsAppLink";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { buildWhatsAppUrl, WA_MESSAGES } from "../lib/whatsapp";

const NAV_LINKS = [
  { label: "Serviços", hash: "#servicos" },
  { label: "Preços", hash: "#precos" },
  { label: "Portfólio", hash: "#portfolio" },
  { label: "Processo", hash: "#processo" },
  { label: "Contato", hash: "#contato" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    document.body.dataset.mobileMenuOpen = open ? "true" : "false";
    return () => {
      document.body.style.overflow = "";
      document.body.dataset.mobileMenuOpen = "false";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-ink/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8"
        aria-label="navegação principal"
      >
        <Logo compact />

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.hash}
              to={`/${link.hash}`}
              className="relative text-sm font-medium text-cream/60 transition-colors hover:text-cream after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
          <WhatsAppLink
            message={WA_MESSAGES.default()}
            srContext="falar no whatsapp"
            className="btn-primary flex items-center gap-2"
          >
            <WhatsAppIcon size={16} aria-hidden="true" />
            Falar no WhatsApp
          </WhatsAppLink>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-cream/80 transition-colors hover:bg-white/5 hover:text-cream md:hidden"
          aria-expanded={open}
          aria-label={open ? "fechar menu" : "abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-b border-white/10 bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 pb-6 pt-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.hash}
                  to={`/${link.hash}`}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 font-display text-lg font-semibold text-cream/80 transition-colors hover:bg-white/5 hover:text-cream"
                >
                  {link.label}
                </Link>
              ))}
              <WhatsAppLink
                message={WA_MESSAGES.default()}
                srContext="falar no whatsapp"
                onClick={() => setOpen(false)}
                className="btn-primary mt-3 flex items-center justify-center gap-2"
              >
                <WhatsAppIcon size={16} aria-hidden="true" />
                Falar no WhatsApp
              </WhatsAppLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}