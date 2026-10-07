import { depoimentos } from "@/content/landing";
import { AudioDepoimento } from "./AudioDepoimento";
import { SectionHeading } from "./SectionHeading";

/** Depoimentos em áudio. Não aparece enquanto a lista estiver vazia. */
// Colunas no desktop conforme a quantidade, para não sobrar coluna vazia.
const COLUNAS: Record<number, string> = { 1: "md:max-w-md", 2: "md:grid-cols-2 md:max-w-3xl" };

export function Depoimentos() {
  const n = depoimentos.itens.length;
  if (n === 0) return null;
  return (
    <section id="depoimentos" aria-labelledby="depoimentos-titulo" className="scroll-mt-6 py-14 md:py-20">
      <SectionHeading id="depoimentos-titulo" titulo={depoimentos.titulo} texto={depoimentos.subtitulo} />
      <ul className={`mt-8 grid gap-4 ${COLUNAS[n] ?? "md:grid-cols-3"}`}>
        {depoimentos.itens.map((d, i) => (
          <li key={i}>
            <AudioDepoimento src={d.audioSrc} nome={d.nome} papel={d.papel} transcricao={d.transcricao} />
          </li>
        ))}
      </ul>
    </section>
  );
}
