import { Comparativo } from "@/components/landing/Comparativo";
import { Diferenciais } from "@/components/landing/Diferenciais";
import { Footer } from "@/components/landing/Footer";
import { Galeria } from "@/components/landing/Galeria";
import { Hero } from "@/components/landing/Hero";
import { Processo } from "@/components/landing/Processo";
import { StickyCta } from "@/components/landing/StickyCta";
import { Logo } from "@/components/Logo";
import { portfolio } from "@/content/portfolio";

const container = "mx-auto max-w-[1120px] px-5 sm:px-8";

// Instabio da Quintino: logo centralizada, sem cabeçalho. No celular, uma coluna (bio → vídeo → seções);
// no desktop, hero dividido (texto + botão | vídeo) e seções abaixo. O comparativo ocupa a largura toda.
export default function LandingPage() {
  return (
    <>
      <main>
        <div className={container}>
          {/* Sem cabeçalho: só a logo, centralizada e contínua com o corpo (formato instabio) */}
          <div className="flex justify-center pt-8 md:pt-12">
            <Logo className="h-11 md:h-14" priority />
          </div>
          <Hero />
        </div>
        <Comparativo />
        <div className={container}>
          <Processo />
          <Diferenciais />
          <Galeria casos={portfolio} />
        </div>
      </main>
      <div className={container}>
        <Footer />
      </div>
      <StickyCta targetId="cta-principal" />
    </>
  );
}
