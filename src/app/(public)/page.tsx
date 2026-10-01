import { Comparativo } from "@/components/landing/Comparativo";
import { Depoimentos } from "@/components/landing/Depoimentos";
import { Diferenciais } from "@/components/landing/Diferenciais";
import { Faixa } from "@/components/landing/Faixa";
import { Footer } from "@/components/landing/Footer";
import { Galeria } from "@/components/landing/Galeria";
import { Hero } from "@/components/landing/Hero";
import { Processo } from "@/components/landing/Processo";
import { Sobre } from "@/components/landing/Sobre";
import { StickyCta } from "@/components/landing/StickyCta";
import { Logo } from "@/components/Logo";
import { portfolio } from "@/content/portfolio";

// Instabio da Quintino: logo centralizada, sem cabeçalho. As seções alternam fundo claro e
// escuro ("xadrez"). Ao incluir ou mover uma seção, mantenha a alternância aqui — e lembre que
// cada componente é desenhado para o tom em que está (textos claros nas faixas escuras).
export default function LandingPage() {
  return (
    <>
      <main>
        <Faixa>
          {/* Sem cabeçalho: só a logo, centralizada e contínua com o corpo (formato instabio) */}
          <div className="flex justify-center pt-8 md:pt-12">
            <Logo className="h-11 md:h-14" priority />
          </div>
          <Hero />
        </Faixa>
        <Faixa escuro>
          <Sobre />
        </Faixa>
        <Faixa>
          <Comparativo />
        </Faixa>
        <Faixa escuro>
          <Processo />
        </Faixa>
        <Faixa>
          <Diferenciais />
        </Faixa>
        <Faixa escuro>
          <Galeria casos={portfolio} />
        </Faixa>
        <Faixa>
          <Depoimentos />
        </Faixa>
      </main>
      <Faixa>
        <Footer />
      </Faixa>
      <StickyCta targetId="cta-principal" />
    </>
  );
}
