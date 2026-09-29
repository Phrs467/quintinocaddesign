// Todos os textos da landing page. Edite aqui.
// Marcadores {{PENDENTE: ...}} são exibidos como estão até o conteúdo chegar.

export const site = {
  nome: "Quintino Dental Design",
  descricao:
    "Design de próteses dentárias em ExoCad para dentistas e laboratórios. Arquivos prontos para impressora 3D ou fresadora.",
};

/** Texto do botão principal (abre o WhatsApp). */
export const cta = "Falar no WhatsApp";

/** Mensagem que já abre preenchida no WhatsApp. */
export const mensagemWhatsapp =
  "Olá! Vim pelo Instagram e gostaria de solicitar uma consulta sobre design de próteses em ExoCad.";

export const hero = {
  titulo: "Designs de Prótese em ExoCad que Aceleram sua Produção",
  subtitulo:
    "Reduz tempo de projeto em {{PENDENTE: X}}%, aumenta precisão e escalabilidade para seu laboratório ou consultório",
  /** Vídeo em loop de 5–10 s (mp4). null até receber o arquivo. */
  videoSrc: null as string | null, // {{PENDENTE: vídeo}}
  /** Imagem estática usada como poster e fallback. null até receber o arquivo. */
  posterSrc: null as string | null, // {{PENDENTE: imagem do hero}}
};

export const problemas = {
  titulo: "Você enfrenta isso?",
  itens: [
    { titulo: "Projetos lentos", descricao: "Demora semanas para um simples design" },
    { titulo: "Falta de precisão", descricao: "Erros no projeto = retrabalho custoso" },
    { titulo: "Custos altos", descricao: "Prototipagem física cara e demorada" },
  ],
} as const;

export const solucao = {
  titulo: "A Solução:",
  itens: [
    "Designs rápidos ({{PENDENTE: X}} horas)",
    "Precisão total (ExoCad profissional)",
    "Pronto para fabricação (impressora 3D ou fresadora)",
  ],
};

export const comoFunciona = {
  titulo: "Como funciona",
  passos: [
    { titulo: "Você envia", descricao: "Imagem do dente, especificações técnicas, material", videoSrc: null as string | null },
    { titulo: "Eu desenho", descricao: "Design preciso em ExoCad ({{PENDENTE: X}} dias úteis)", videoSrc: null as string | null },
    { titulo: "Você aprova", descricao: "Revisões rápidas, iterações", videoSrc: null as string | null },
    { titulo: "Pronto para produzir", descricao: "Arquivo finalizado para sua máquina", videoSrc: null as string | null },
  ],
};

export const diferenciais = {
  titulo: "Diferenciais",
  itens: [
    { titulo: "Especialista em ExoCad", texto: "Domínio total da ferramenta" },
    { titulo: "Entrega rápida", texto: "Sem esperas, cumprimento de prazos" },
    { titulo: "Exatidão", texto: "Designs prontos na primeira vez" },
    {
      titulo: "Custo-benefício",
      texto: "Mais barato que in-house + mais rápido que concorrência",
    },
    { titulo: "Suporte próximo", texto: "Disponível para dúvidas técnicas" },
    { titulo: "Revisões inclusas", texto: "Sem custos adicionais surpresa" },
  ],
} as const;

export const portfolioSecao = {
  titulo: "Portfólio",
  subtitulo: "Alguns casos desenhados em ExoCad.",
};

/** Garantias exibidas sob o botão do hero (textos da spec). */
export const garantias = ["ExoCad profissional", "Revisões inclusas", "Pronto para impressora 3D ou fresadora"];

/** Legenda do player de vídeo do hero. */
export const videoHero = {
  titulo: "Processo de design em ExoCad",
  legenda: "{{PENDENTE: vídeo}}",
};
