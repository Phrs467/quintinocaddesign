import { diferenciais } from "@/content/landing";
import { SectionHeading } from "./SectionHeading";

/** Diferenciais como uma ficha técnica (painel de propriedades): nome e valor em linhas. */
export function Diferenciais() {
  return (
    <section aria-labelledby="diferenciais-titulo" className="border-t border-line py-14 md:py-20">
      <SectionHeading id="diferenciais-titulo" titulo={diferenciais.titulo} />
      <div className="mt-8 overflow-hidden rounded-xl border border-line bg-surface">
        <div className="flex items-center justify-between border-b border-line bg-sunken/60 px-4 py-2.5 text-xs font-medium text-muted">
          <span>Ficha do serviço</span>
          <span>ExoCad</span>
        </div>
        <dl className="grid md:grid-cols-2">
          {diferenciais.itens.map((item, i) => (
            <div
              key={item.titulo}
              className={`grid grid-cols-[9.5rem_1fr] gap-4 border-line px-4 py-3.5 text-sm sm:grid-cols-[11rem_1fr] ${
                i > 0 ? "border-t" : ""
              } ${i === 1 ? "md:border-t-0" : ""} md:[&:nth-child(odd)]:border-r`}
            >
              <dt className="font-semibold text-navy">{item.titulo}</dt>
              <dd className="leading-6 text-muted">{item.texto}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
