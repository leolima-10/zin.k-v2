import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Instagram,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { SITE } from "../data/site";
import { MotionButton } from "../components/MotionButton";
import { buildWhatsAppUrl, WA_MESSAGES } from "../lib/whatsapp";
import { WhatsAppIcon } from "../components/WhatsAppIcon";
import { WhatsAppLink } from "../components/WhatsAppLink";

const CHANNELS = [
  {
    title: "whatsapp",
    detail: SITE.whatsappLabel,
    message: WA_MESSAGES.default(),
  },
  {
    title: "e-mail",
    detail: SITE.email,
  },
  {
    title: "instagram",
    detail: SITE.instagramHandle,
    href: SITE.instagramUrl,
  },
] as const;

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

interface FormErrors {
  nome?: string;
  email?: string;
  mensagem?: string;
}

export function Contact() {
  const [form, setForm] = useState<ContactFormState>({
    nome: "",
    email: "",
    mensagem: "",
  });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const fieldRefs = useRef<{
    nome: HTMLInputElement | null;
    email: HTMLInputElement | null;
    mensagem: HTMLTextAreaElement | null;
  }>({ nome: null, email: null, mensagem: null });

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleCopyEmail(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    navigator.clipboard.writeText(SITE.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      // fallback: mostra o e-mail em texto selecionável
      alert(`Copie manualmente: ${SITE.email}`);
    });
  }

  function validateForm(): boolean {
    const newErrors: FormErrors = {};
    if (!form.nome.trim()) newErrors.nome = "nome é obrigatório";
    if (!form.email.trim()) newErrors.email = "e-mail é obrigatório";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "e-mail inválido";
    if (!form.mensagem.trim()) newErrors.mensagem = "mensagem é obrigatória";

    // Validação de tamanho da URL final (≤ 1900 caracteres após encode)
    if (form.mensagem.trim()) {
      const testMessage = WA_MESSAGES.form(form);
      const testUrl = buildWhatsAppUrl(testMessage);
      if (testUrl.length > 1900) {
        newErrors.mensagem = "mensagem longa demais pro whatsapp; resuma um pouco";
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      // Foca o primeiro campo com erro no próximo tick
      setTimeout(() => {
        if (newErrors.nome) fieldRefs.current.nome?.focus();
        else if (newErrors.email) fieldRefs.current.email?.focus();
        else if (newErrors.mensagem) fieldRefs.current.mensagem?.focus();
      }, 0);
      return false;
    }
    return true;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateForm()) return;

    const messageText = WA_MESSAGES.form(form);
    const url = buildWhatsAppUrl(messageText);

    // Abre no próprio evento de submit, sem await/setTimeout
    window.open(url, "_blank", "noopener,noreferrer");
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
            {CHANNELS.map(({ title, detail, href, message }) => (
              <li key={title}>
                {title === "whatsapp" && (
                  <WhatsAppLink
                    message={message}
                    srContext="whatsapp"
                    className="group flex items-center gap-4 rounded-2xl border border-cream/10 bg-surface p-5 transition-colors hover:border-accent/40"
                  >
                    <motion.span
                      whileHover={{ scale: 1.1, rotate: 6 }}
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-cream"
                    >
                      <WhatsAppIcon size={20} aria-hidden="true" />
                    </motion.span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-display text-base font-semibold text-cream">
                        {title}
                      </span>
                      <span className="block text-sm text-cream/70 truncate">
                        {detail}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={18}
                      aria-hidden="true"
                      className="ml-auto shrink-0 text-cream/40 transition-colors group-hover:text-accent-text"
                    />
                  </WhatsAppLink>
                )}
                {title === "e-mail" && (
                  <motion.a
                    href={`mailto:${SITE.email}`}
                    whileHover={{ x: 4, borderColor: "#4400d6" }}
                    className="group flex items-center gap-4 rounded-2xl border border-cream/10 bg-surface p-5 transition-colors hover:border-accent/40"
                  >
                    <motion.span
                      whileHover={{ scale: 1.1, rotate: 6 }}
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-cream"
                    >
                      <Mail size={20} aria-hidden="true" />
                    </motion.span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-display text-base font-semibold text-cream">
                        {title}
                      </span>
                      <span className="block text-sm text-cream/70 truncate">
                        {detail}
                      </span>
                    </span>
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
                    <ArrowUpRight
                      size={18}
                      aria-hidden="true"
                      className="ml-auto shrink-0 text-cream/40 transition-colors group-hover:text-accent-text"
                    />
                  </motion.a>
                )}
                {title === "instagram" && (
                  <motion.a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4, borderColor: "#4400d6" }}
                    className="group flex items-center gap-4 rounded-2xl border border-cream/10 bg-surface p-5 transition-colors hover:border-accent/40"
                  >
                    <motion.span
                      whileHover={{ scale: 1.1, rotate: 6 }}
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-cream"
                    >
                      <Instagram size={20} aria-hidden="true" />
                    </motion.span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-display text-base font-semibold text-cream">
                        {title}
                      </span>
                      <span className="block text-sm text-cream/70 truncate">
                        {detail}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={18}
                      aria-hidden="true"
                      className="ml-auto shrink-0 text-cream/40 transition-colors group-hover:text-accent-text"
                    />
                  </motion.a>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm/6 text-cream/45">
            prefere formulário? tá aqui do lado. se estiver com pressa, o
            whatsapp é o canal mais rápido — abre com a mensagem pronta, só falta tocar em enviar.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            noValidate
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
                  ref={(el) => { fieldRefs.current.nome = el; }}
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
                  aria-invalid={!!errors.nome}
                  aria-describedby={errors.nome ? "nome-error" : undefined}
                />
                {errors.nome && (
                  <p id="nome-error" role="alert" className="mt-1.5 text-sm text-accent-text">
                    {errors.nome}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-cream/80"
                >
                  seu e-mail
                </label>
                <motion.input
                  ref={(el) => { fieldRefs.current.email = el; }}
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
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" role="alert" className="mt-1.5 text-sm text-accent-text">
                    {errors.email}
                  </p>
                )}
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
                ref={(el) => { fieldRefs.current.mensagem = el; }}
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
                aria-invalid={!!errors.mensagem}
                aria-describedby={errors.mensagem ? "mensagem-error" : undefined}
                maxLength={800}
              />
              {errors.mensagem && (
                <p id="mensagem-error" role="alert" className="mt-1.5 text-sm text-accent-text">
                  {errors.mensagem}
                </p>
              )}
            </div>

            <MotionButton type="submit" variant="primary" className="mt-6 w-full sm:w-auto">
              Enviar pelo WhatsApp
              <WhatsAppIcon size={16} aria-hidden="true" />
            </MotionButton>

            <p className="mt-3 text-xs text-cream/45">
              ao enviar, abrimos o whatsapp com a mensagem pronta; é só tocar em enviar.
            </p>

            {sent && (
              <div className="mt-4 space-y-2" role="status">
                <p className="text-sm/6 text-accent-text">
                  abrimos o whatsapp com sua mensagem pronta. se não abriu,{" "}
                  <WhatsAppLink
                    message={WA_MESSAGES.form(form)}
                    srContext="tentar novamente"
                    className="underline hover:text-cream"
                  >
                    clique aqui para tentar novamente
                  </WhatsAppLink>
                </p>
                <p className="text-xs text-cream/45">
                  (o e-mail {SITE.email} continua funcionando como alternativa)
                </p>
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </Section>
  );
}