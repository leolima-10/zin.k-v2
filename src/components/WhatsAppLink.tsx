import type { AnchorHTMLAttributes, ReactNode } from "react";
import { buildWhatsAppUrl } from "../lib/whatsapp";

interface WhatsAppLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Texto da mensagem para o wa.me (opcional) */
  message?: string;
  /** Contexto para o sr-only "(abre em nova aba)" — ex.: "falar no whatsapp" */
  srContext?: string;
  children?: ReactNode;
}

/**
 * Link <a> para wa.me com target="_blank", rel="noopener noreferrer",
 * e sr-only "(abre em nova aba)" no fim.
 * O nome acessível contém o texto visível (WCAG 2.5.3).
 */
export function WhatsAppLink({
  message,
  srContext,
  children,
  className = "",
  ...props
}: WhatsAppLinkProps) {
  const href = buildWhatsAppUrl(message);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
    >
      {children}
      {srContext && (
        <span className="sr-only">
          {srContext} (abre em nova aba)
        </span>
      )}
    </a>
  );
}