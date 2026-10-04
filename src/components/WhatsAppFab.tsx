import { buildWhatsAppUrl, WA_MESSAGES } from "../lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { WhatsAppLink } from "./WhatsAppLink";

/**
 * Botão flutuante (FAB) do WhatsApp — fixo no canto inferior direito.
 * Círculo 56×56 px em repouso que vira pílula no hover/foco.
 * Sem hooks, sem estado, sem contexto. Entrada via CSS keyframe.
 * Respeita prefers-reduced-motion via @media no index.css.
 */
export function WhatsAppFab() {
  return (
    <WhatsAppLink
      message={WA_MESSAGES.default()}
      srContext="falar no whatsapp"
      data-testid="whatsapp-fab"
      className={`
        group fixed bottom-6 right-6 z-40
        inline-flex h-14 min-w-14 items-center justify-center gap-2
        rounded-full bg-accent px-4 text-cream
        ring-2 ring-cream
        shadow-[0_8px_32px_rgba(68,0,214,0.35)]
        transition-all duration-300 ease-out
        hover:bg-accent/90 hover:px-6 hover:min-w-[auto]
        active:scale-95
        animate-fab-in
      `}
    >
      <WhatsAppIcon size={24} className="shrink-0" />
      <span className="whitespace-nowrap opacity-0 max-w-0 transition-all duration-200 group-hover:opacity-100 group-hover:max-w-[140px] group-focus-visible:opacity-100 group-focus-visible:max-w-[140px] font-sans text-sm font-medium">
        Falar no WhatsApp
      </span>
    </WhatsAppLink>
  );
}