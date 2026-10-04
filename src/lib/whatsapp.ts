import { SITE } from "../data/site";

const WA_BASE = "https://wa.me/";

/** Codifica texto para query string do wa.me */
function encodeText(text: string): string {
  return encodeURIComponent(text);
}

/** Constrói URL wa.me com número oficial e texto opcional */
export function buildWhatsAppUrl(text?: string): string {
  const url = `${WA_BASE}${SITE.whatsappNumber}`;
  if (!text) return url;
  return `${url}?text=${encodeText(text)}`;
}

/** Mensagens contextuais — todas em minúsculas, sem emojis, voz da marca */
export const WA_MESSAGES = {
  /** Padrão: hero, navbar, FAB, fallback */
  default: () => SITE.whatsappDefaultMessage,

  /** Serviço: passar o título do serviço (ex.: "sites institucionais") */
  service: (serviceTitle: string) =>
    `oi, zin.k! quero um orçamento de ${serviceTitle.toLowerCase()}.`,

  /** Projeto: passar o título do projeto (ex.: "dra. aline lopes") */
  project: (projectTitle: string) =>
    `oi, zin.k! vi o projeto ${projectTitle.toLowerCase()} no site de vocês e quero algo parecido.`,

  /** Formulário: monta a partir dos campos validados (com trim) */
  form: (data: { nome: string; email: string; mensagem: string }) => {
    const nome = data.nome.trim();
    const email = data.email.trim();
    const mensagem = data.mensagem.trim();
    return `oi, zin.k! vim pelo site.\n\nnome: ${nome}\ne-mail: ${email}\n\nmensagem:\n${mensagem}`;
  },
} as const;