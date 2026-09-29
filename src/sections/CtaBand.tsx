import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/** faixa curta roxa, inspirada no cartão "Vamos criar juntos?" do guia de marca */
export function CtaBand() {
  return (
    <section className="bg-accent px-5 py-16 text-center sm:px-8 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-display text-3xl font-black text-cream sm:text-4xl">
          Vamos criar juntos?
        </h2>
        <Link
          to="/#contato"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-cream px-8 py-3.5 font-sans text-sm font-bold text-ink transition-transform duration-300 hover:-translate-y-0.5"
        >
          Peça seu orçamento
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}