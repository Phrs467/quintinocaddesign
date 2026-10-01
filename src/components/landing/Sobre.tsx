import Image from "next/image";
import { sobre } from "@/content/landing";

/** "Quem sou eu" (faixa escura): foto com recorte inclinado encostada na base e texto ao lado. */
export function Sobre() {
  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="scroll-mt-6">
      <div className="grid gap-8 pt-14 md:grid-cols-[0.85fr_1.15fr] md:items-end md:gap-14 md:pt-16">
        <div className="order-2 mx-auto w-full max-w-[340px] self-end md:order-1 md:max-w-none">
          <Image
            src={sobre.foto}
            alt={sobre.fotoAlt}
            width={1100}
            height={1138}
            sizes="(min-width: 768px) 420px, 340px"
            className="block h-auto w-full"
          />
        </div>
        <div className="order-1 md:order-2 md:pb-16">
          <h2
            id="sobre-titulo"
            className="font-serif text-[1.75rem] font-medium leading-[1.15] tracking-[-0.015em] text-white md:text-[2.125rem]"
          >
            {sobre.titulo}
          </h2>
          <div className="mt-5 space-y-4 text-[1.0625rem] leading-8 text-white/80">
            {sobre.paragrafos.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
