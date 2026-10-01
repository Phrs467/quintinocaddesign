import { comoFunciona } from "@/content/landing";
import { CrownArt, type CrownStage } from "../CrownArt";
import { Texto } from "../Texto";
import { LoopVideo } from "./LoopVideo";
import { SectionHeading } from "./SectionHeading";

const ESTAGIOS: CrownStage[] = ["envio", "desenho", "aprovacao", "producao"];

/**
 * "Como funciona" (faixa escura): quatro janelas de visor, uma por passo, com a ilustração
 * em traço branco — ou um vídeo curto, se `videoSrc` estiver preenchido.
 */
export function Processo() {
  const passos = comoFunciona.passos;
  return (
    <section id="processo" aria-labelledby="processo-titulo" className="scroll-mt-6 py-14 md:py-20">
      <SectionHeading
        id="processo-titulo"
        titulo={comoFunciona.titulo}
        texto="Do envio do caso ao arquivo pronto para a sua máquina, em quatro passos."
        claro
      />

      <ol className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {passos.map((passo, i) => (
          <li key={passo.titulo} className="overflow-hidden rounded-xl border border-white/10 bg-viewport-raised">
            {/* visor */}
            <div className="grid-cad-dark relative flex aspect-[4/3] items-center justify-center border-b border-white/10 bg-[#0f0f15]">
              {passo.videoSrc ? (
                <LoopVideo src={passo.videoSrc} label={passo.titulo} className="absolute inset-0 size-full object-cover" />
              ) : (
                <CrownArt stage={ESTAGIOS[i]} className="h-[74%] text-white/85" />
              )}
              <span className="absolute left-2.5 top-2.5 rounded-md bg-viewport-raised/90 px-2 py-0.5 text-[0.6875rem] font-medium text-white/80 ring-1 ring-white/10">
                Passo {i + 1}
              </span>
              <span aria-hidden className="absolute right-2.5 top-2.5 text-[0.6875rem] text-white/35">
                {i + 1}/{passos.length}
              </span>
            </div>
            <div className="p-3.5 md:p-4">
              <h3 className="font-serif text-lg font-medium leading-snug text-white">{passo.titulo}</h3>
              <p className="mt-1 text-[0.8125rem] leading-5 text-white/65">
                <Texto>{passo.descricao}</Texto>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
