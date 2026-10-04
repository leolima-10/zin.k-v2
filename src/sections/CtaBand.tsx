import { ArrowRight } from "lucide-react";
import { WhatsAppLink } from "../components/WhatsAppLink";
import { WhatsAppIcon } from "../components/WhatsAppIcon";
import { buildWhatsAppUrl, WA_MESSAGES } from "../lib/whatsapp";

/** faixa curta roxa, inspirada no cartão "Vamos criar juntos?" do guia de marca */
export function CtaBand() {
  return (
    <section className="bg-accent px-5 py-16 text-center sm:px-8 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-display text-3xl font-black text-cream sm:text-4xl">
          Vamos criar juntos?
        </h2>
        <WhatsAppLink
          message={WA_MESSAGES.default()}
          srContext="peça seu orçamento"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-cream px-8 py-3.5 font-sans text-sm font-bold text-ink transition-transform duration-300 hover:-translate-y-0.5"
        >
          <WhatsAppIcon size={16} aria-hidden="true" />
          Peça seu orçamento
        </WhatsAppLink>
      </div>
    </section>
  );
}