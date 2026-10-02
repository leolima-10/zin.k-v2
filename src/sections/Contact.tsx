import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Instagram,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { SITE } from "../data/site";
import { MotionButton } from "../components/MotionButton";

const CHANNELS = [
  {
    icon: MessageCircle,
    title: "whatsapp",
    detail: SITE.whatsappLabel,
    href: SITE.whatsappUrl,
    external: true,
  },
  {
    icon: Mail,
    title: "e-mail",
    detail: SITE.email,
    href: `mailto:${SITE.email}?subject=quero%20um%20site%20com%20a%20zin.k`,
    external: false,
  },
  {
    icon: Instagram,
    title: "instagram",
    detail: SITE.instagramHandle,
    href: SITE.instagramUrl,
    external: true,
  },
];

const INPUT_CLASS =
  "w-full rounded-xl border border-cream/15 bg-ink px-4 py-3 text-sm text-cream placeholder:text-cream/30 transition-colors focus:border-accent focus:outline-none";

const inputVariants = {
  initial: { boxShadow: "0 0 0 0 transparent" },
  focus: { boxShadow: "0 0 0 3px rgba(68, 0, 214, 0.3)" },
};

interface ContactFormState {
  nome: string;
  email: string;
  mensagem: string;
}

export function Contact() {
  const [form, setForm] = useState<ContactFormState>({
    nome: "",
    email: "",
    mensagem: "",
  });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleCopyEmail(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    navigator.clipboard.writeText(SITE.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      // fallback: open mailto
      window.location.href = `mailto:${SITE.email}?subject=quero%20um%20site%20com%20a%20zin.k`;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = `contato via site — ${form.nome}`;
    const body = `nome: ${form.nome}\ne-mail: ${form.email}\n\nmensagem:\n${form.mensagem}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <Section
      id="contato"
      eyebrow="contato"
      title="vamos construir algo grande?"
      description="conta pra gente o que sua empresa precisa. respondemos em até 1 dia útil com os próximos passos — sem compromisso."
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
        <Reveal>
          <ul className="space-y-4">
            {CHANNELS.map(({ icon: Icon, title, detail, href, external }) => (
              <li key={title}>
                <motion.a
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  whileHover={{ x: 4, borderColor: "#4400d6" }}
                  className="group flex items-center gap-4 rounded-2xl border border-cream/10 bg-surface p-5 transition-colors hover:border-accent/40"
                >
                  <motion.span
                    whileHover={{ scale: 1.1, rotate: 6 }}
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-cream"
                  >
                    <Icon size={20} aria-hidden="true" />
                  </motion.span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-display text-base font-semibold text-cream">
                      {title}
                    </span>
                    <span className="block text-sm text-cream/70 truncate">
                      {detail}
                    </span>
                  </span>
                  {title === "e-mail" && (
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label={copied ? "e-mail copiado" : "copiar e-mail"}
                      className="ml-2 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cream/10 text-cream/60 transition-colors hover:border-accent/50 hover:text-accent-text hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-accent/50"
                    >
                      {copied ? (
                        <Check size={18} aria-hidden="true" className="text-accent-text" />
                      ) : (
                        <Copy size={18} aria-hidden="true" />
                      )}
                    </button>
                  )}
                  <ArrowUpRight
                    size={18}
                    aria-hidden="true"
                    className="ml-auto shrink-0 text-cream/40 transition-colors group-hover:text-accent-text"
                  />
                </motion.a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm/6 text-cream/45">
            prefere formulário? tá aqui do lado. se estiver com pressa, o
            whatsapp é o canal mais rápido.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/10 bg-surface p-6 sm:p-8"
            aria-label="formulário de contato"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="nome"
                  className="mb-2 block text-sm font-medium text-cream/80"
                >
                  seu nome
                </label>
                <motion.input
                  id="nome"
                  name="nome"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.nome}
                  onChange={handleChange}
                  placeholder="maria silva"
                  className={INPUT_CLASS}
                  variants={inputVariants}
                  whileFocus="focus"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-cream/80"
                >
                  seu e-mail
                </label>
                <motion.input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="maria@suaempresa.com.br"
                  className={INPUT_CLASS}
                  variants={inputVariants}
                  whileFocus="focus"
                />
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="mensagem"
                className="mb-2 block text-sm font-medium text-cream/80"
              >
                sobre o projeto
              </label>
              <motion.textarea
                id="mensagem"
                name="mensagem"
                required
                rows={5}
                value={form.mensagem}
                onChange={handleChange}
                placeholder="o que você precisa? site novo, loja, sistema… quanto mais contexto, melhor a resposta."
                className={`${INPUT_CLASS} resize-y`}
                variants={inputVariants}
                whileFocus="focus"
              />
            </div>

            <MotionButton type="submit" variant="primary" className="mt-6 w-full sm:w-auto">
              enviar mensagem
              <Send size={16} aria-hidden="true" />
            </MotionButton>

            {sent && (
              <p
                role="status"
                className="mt-4 text-sm/6 text-accent-text"
              >
                seu app de e-mail deve ter aberto com a mensagem pronta. se
                não abriu, manda direto pra {SITE.email}.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
