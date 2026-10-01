import { ArrowRight, Check, X } from "lucide-react";
import { problemas, solucao } from "@/content/landing";
import { Texto } from "../Texto";

/** "Designs rápidos (X horas)" → título "Designs rápidos" + detalhe "X horas". */
function separar(texto: string) {
  const m = texto.match(/^(.*?)\s*\((.*)\)$/);
  return m ? { titulo: m[1], detalhe: m[2] } : { titulo: texto, detalhe: "" };
}

/** Comparativo (faixa clara): cada problema, riscado, ao lado da solução correspondente. */
export function Comparativo() {
  const pares = problemas.itens.map((p, i) => ({ problema: p, solucao: separar(solucao.itens[i] ?? "") }));

  return (
    <section aria-labelledby="comparativo-titulo" className="py-14 md:py-20">
      <div className="grid gap-1 md:grid-cols-[1fr_2.5rem_1fr] md:items-end md:gap-8">
        <h2 id="comparativo-titulo" className="font-serif text-[1.625rem] font-medium leading-tight text-muted md:text-[1.875rem]">
          {problemas.titulo}
        </h2>
        <span aria-hidden className="hidden md:block" />
        <h2 className="font-serif text-[1.625rem] font-medium leading-tight md:text-[1.875rem]">{solucao.titulo}</h2>
      </div>

      <ul className="mt-8 divide-y divide-line border-y border-line">
        {pares.map(({ problema, solucao: s }) => (
          <li key={problema.titulo} className="grid gap-3 py-5 md:grid-cols-[1fr_2.5rem_1fr] md:items-center md:gap-8">
            <div className="flex items-start gap-3">
              <X aria-hidden className="mt-1 size-4 shrink-0 text-muted/70" strokeWidth={2} />
              <div>
                <h3 className="font-sans text-[0.9375rem] font-semibold text-muted line-through decoration-line-strong">
                  {problema.titulo}
                </h3>
                <p className="mt-0.5 text-sm leading-6 text-muted">{problema.descricao}.</p>
              </div>
            </div>

            <ArrowRight aria-hidden className="hidden size-4 justify-self-center text-line-strong md:block" strokeWidth={1.75} />

            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-navy text-white">
                <Check aria-hidden className="size-3" strokeWidth={3} />
              </span>
              <div>
                <p className="text-[1.0625rem] font-semibold text-navy">{s.titulo}</p>
                {s.detalhe && (
                  <p className="mt-0.5 text-sm leading-6 text-muted">
                    <Texto>{s.detalhe}</Texto>
                  </p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
