import Image from "next/image";
import { ArrowRight, Check, X } from "lucide-react";
import { problemas, solucao } from "@/content/landing";
import { portfolio } from "@/content/portfolio";
import { Texto } from "../Texto";

/** "Designs rápidos (X horas)" → título "Designs rápidos" + detalhe "X horas". */
function separar(texto: string) {
  const m = texto.match(/^(.*?)\s*\((.*)\)$/);
  return m ? { titulo: m[1], detalhe: m[2] } : { titulo: texto, detalhe: "" };
}

/**
 * Faixa no tom do visor do ExoCad: cada problema ao lado da solução correspondente.
 * Ao fundo (desktop), um render real do portfólio, bem sutil.
 */
export function Comparativo() {
  const pares = problemas.itens.map((p, i) => ({ problema: p, solucao: separar(solucao.itens[i] ?? "") }));
  const render = portfolio[1]?.imagemDepois;

  return (
    <section aria-labelledby="comparativo-titulo" className="sobre-escuro relative isolate overflow-hidden bg-viewport text-white">
      {render && (
        <div aria-hidden className="absolute inset-y-0 right-0 -z-10 hidden w-[42%] lg:block">
          <Image src={render} alt="" fill sizes="42vw" className="object-cover object-top opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-viewport via-viewport/80 to-viewport/20" />
        </div>
      )}

      <div className="mx-auto max-w-[1120px] px-5 py-14 sm:px-8 md:py-20">
        <div className="grid max-w-3xl gap-1 md:grid-cols-[1fr_2.5rem_1fr] md:items-end md:gap-8">
          <h2 id="comparativo-titulo" className="font-serif text-[1.625rem] font-medium leading-tight text-white/50 md:text-[1.875rem]">
            {problemas.titulo}
          </h2>
          <span aria-hidden className="hidden md:block" />
          <h2 className="font-serif text-[1.625rem] font-medium leading-tight text-white md:text-[1.875rem]">{solucao.titulo}</h2>
        </div>

        <ul className="mt-8 max-w-3xl divide-y divide-white/10 border-y border-white/10">
          {pares.map(({ problema, solucao: s }) => (
            <li key={problema.titulo} className="grid gap-3 py-5 md:grid-cols-[1fr_2.5rem_1fr] md:items-center md:gap-8">
              <div className="flex items-start gap-3">
                <X aria-hidden className="mt-1 size-4 shrink-0 text-white/40" strokeWidth={2} />
                <div>
                  <h3 className="text-[0.9375rem] font-semibold text-white/55 line-through decoration-white/30">{problema.titulo}</h3>
                  <p className="mt-0.5 text-sm leading-6 text-white/45">{problema.descricao}.</p>
                </div>
              </div>

              <ArrowRight aria-hidden className="hidden size-4 justify-self-center text-white/40 md:block" strokeWidth={1.75} />

              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-viewport">
                  <Check aria-hidden className="size-3" strokeWidth={3} />
                </span>
                <div>
                  <p className="text-[1.0625rem] font-semibold text-white">{s.titulo}</p>
                  {s.detalhe && (
                    <p className="mt-0.5 text-sm leading-6 text-white/65">
                      <Texto>{s.detalhe}</Texto>
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
