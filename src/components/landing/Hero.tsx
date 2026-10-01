import { Check } from "lucide-react";
import { garantias, hero, videoHero } from "@/content/landing";
import { Texto } from "../Texto";
import { CtaButton } from "./CtaButton";
import { VideoCard } from "./VideoCard";

/** Hero dividido: texto + ação única (formato bio) de um lado, player de vídeo do outro. */
export function Hero() {
  // A largura do player acompanha o formato do vídeo: horizontal é largo, reels (9:16) é estreito.
  const formato = hero.videoFormato;
  const horizontal = formato === "horizontal";
  const larguraPlayer = { horizontal: "max-w-[640px] lg:max-w-none", vertical: "max-w-[420px] lg:max-w-none", reels: "max-w-[320px] lg:max-w-[360px]" }[formato];
  return (
    <section
      aria-labelledby="hero-titulo"
      className={`grid gap-10 pb-16 pt-10 md:pt-14 lg:items-center lg:pb-24 ${
        horizontal ? "lg:grid-cols-2 lg:gap-12" : "lg:grid-cols-[1.08fr_0.92fr] lg:gap-16"
      }`}
    >
      <div className="surgir">
        <h1
          id="hero-titulo"
          className="font-serif text-[2.5rem] font-medium leading-[1.06] tracking-[-0.02em] sm:text-5xl lg:text-[3.5rem]"
        >
          {hero.titulo}
        </h1>
        <p className="mt-5 max-w-xl text-[1.0625rem] leading-7 text-muted">
          <Texto>{hero.subtitulo}</Texto>
        </p>

        <div className="mt-8 sm:max-w-md">
          <CtaButton id="cta-principal" />
        </div>

        <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          {garantias.map((g) => (
            <li key={g} className="flex items-center gap-1.5">
              <Check aria-hidden className="size-4 text-teal" strokeWidth={2} />
              {g}
            </li>
          ))}
        </ul>
      </div>

      <div className={`surgir mx-auto w-full [animation-delay:120ms] ${larguraPlayer}`}>
        <VideoCard
          src={hero.videoSrc}
          poster={hero.posterSrc}
          titulo={videoHero.titulo}
          legenda={videoHero.legenda}
          formato={formato}
          temSom={hero.videoTemSom}
        />
      </div>
    </section>
  );
}
