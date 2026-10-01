"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import { portfolioSecao } from "@/content/landing";
import type { CasoPortfolio } from "@/content/portfolio";
import { Texto } from "../Texto";
import { SectionHeading } from "./SectionHeading";

/** Portfólio (faixa escura) em grade; cada caso abre em tela cheia (<dialog>) com navegação. */
export function Galeria({ casos }: { casos: CasoPortfolio[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [aberto, setAberto] = useState<number | null>(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (aberto !== null && !d.open) d.showModal();
    if (aberto === null && d.open) d.close();
  }, [aberto]);

  const mover = (dir: 1 | -1) => setAberto((i) => (i === null ? i : (i + dir + casos.length) % casos.length));

  const caso = aberto !== null ? casos[aberto] : null;
  const seta =
    "flex size-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10";

  return (
    <section id="portfolio" aria-labelledby="portfolio-titulo" className="scroll-mt-6 py-14 md:py-20">
      <SectionHeading id="portfolio-titulo" titulo={portfolioSecao.titulo} texto={portfolioSecao.subtitulo} claro />

      <ul className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0">
        {casos.map((c, i) => (
          <li key={i} className="w-[72%] shrink-0 snap-start sm:w-[45%] md:w-auto">
            <button
              type="button"
              onClick={() => setAberto(i)}
              className="group block w-full text-left"
              aria-label={`Ampliar: ${c.titulo} — ${c.tipoPeca}`}
            >
              <span className="relative block aspect-[4/5] overflow-hidden rounded-xl bg-[#0b0c10] ring-1 ring-white/10">
                <Image
                  src={c.imagemDepois}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 340px, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                />
                <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-viewport/60 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Maximize2 aria-hidden className="size-4" strokeWidth={1.75} />
                </span>
              </span>
              <span className="mt-3 block text-[0.9375rem] font-medium text-white">
                <Texto>{c.titulo}</Texto>
              </span>
              <span className="block text-sm text-white/60">
                <Texto>{c.tipoPeca}</Texto>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setAberto(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") mover(1);
          if (e.key === "ArrowLeft") mover(-1);
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) setAberto(null); // clique no fundo
        }}
        aria-label="Caso do portfólio"
        className="m-auto max-h-none max-w-none bg-transparent p-0 text-white backdrop:bg-viewport/90"
      >
        {caso && aberto !== null && (
          <div className="flex w-[min(92vw,560px)] flex-col">
            <div className="mb-3 flex items-center justify-between text-sm text-white/75">
              <span>
                {aberto + 1} / {casos.length}
              </span>
              <button type="button" onClick={() => setAberto(null)} className={seta} aria-label="Fechar">
                <X aria-hidden className="size-4" />
              </button>
            </div>
            <div className="relative aspect-[4/5] max-h-[72vh] w-full overflow-hidden rounded-xl bg-[#0b0c10]">
              <Image src={caso.imagemDepois} alt={`${caso.titulo} — ${caso.tipoPeca}`} fill sizes="560px" className="object-contain" />
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-serif text-xl">
                  <Texto>{caso.titulo}</Texto>
                </p>
                <p className="text-sm text-white/70">
                  <Texto>{caso.tipoPeca}</Texto>
                </p>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => mover(-1)} className={seta} aria-label="Caso anterior">
                  <ArrowLeft aria-hidden className="size-4" />
                </button>
                <button type="button" onClick={() => mover(1)} className={seta} aria-label="Próximo caso">
                  <ArrowRight aria-hidden className="size-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
