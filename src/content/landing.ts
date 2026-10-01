// Todos os textos da landing page. Edite aqui.
// Marcadores {{PENDENTE: ...}} são exibidos como estão até o conteúdo chegar.

export const site = {
  nome: "Quintino Dental Design",
  descricao:
    "Design de próteses dentárias em ExoCad para dentistas e laboratórios. Arquivos prontos para impressora 3D ou fresadora.",
};

/** Texto do botão principal (abre o WhatsApp). */
export const cta = "Falar no WhatsApp";

export const whatsapp = {
  /**
   * Número comercial: só dígitos, com 55 (Brasil) e DDD. Ex.: "5511912345678".
   * {{PENDENTE: número comercial}} — vazio, o link abre o WhatsApp para a pessoa escolher o contato.
   */
  numero: "5562993836170",
  /** Mensagem que já abre preenchida na conversa. */
  mensagem: "Olá! Vim pelo Instagram e gostaria de mais informações.",
};

export const hero = {
  titulo: "Designs de Prótese em ExoCad que Aceleram sua Produção",
  subtitulo:
    "Reduz tempo de projeto em {{PENDENTE: X}}%, aumenta precisão e escalabilidade para seu laboratório ou consultório",
  /** Vídeo em loop (mp4, H.264), sem som. Gerado a partir de "Video Project.mp4": mesmo enquadramento vertical, só comprimido. */
  videoSrc: "/hero/processo.mp4" as string | null,
  /** Imagem de capa: aparece enquanto o vídeo carrega e para quem pede redução de movimento. */
  posterSrc: "/hero/processo.jpg" as string | null,
  /** "reels" (9:16), "vertical" (4:5) ou "horizontal" (16:9) — deve acompanhar a proporção do vídeo. */
  videoFormato: "reels" as "reels" | "vertical" | "horizontal",
  /** true só se o vídeo tiver faixa de áudio (mostra o botão de som). */
  videoTemSom: false,
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
    { titulo: "Você envia", descricao: "Os arquivos STL ou PLY, especificações técnicas e material", videoSrc: null as string | null },
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

/** Legenda do player de vídeo do hero (`legenda` só aparece enquanto não há vídeo). */
export const videoHero = {
  titulo: "Processo de design em ExoCad",
  legenda: "{{PENDENTE: vídeo}}",
};

export const sobre = {
  titulo: "Quem sou eu",
  foto: "/sobre/retrato.webp",
  fotoAlt: "Retrato do responsável pela Quintino Dental Design",
  paragrafos: [
    "Minha trajetória na odontologia digital começou aos 14 anos, quando tive meu primeiro contato com CAD/CAM. Desde então, transformei a curiosidade em profissão e venho me dedicando diariamente ao desenvolvimento técnico e à busca por excelência.",
    "Atualmente, aos 21 anos, continuo focado em entregar previsibilidade, estética e precisão em cada projeto, sempre acompanhando a evolução da odontologia digital.",
  ],
};

export interface Depoimento {
  nome: string;
  /** Clínica, laboratório ou cargo. */
  papel: string;
  /** Arquivo de áudio em public/ (prefira .mp3 ou .m4a; .ogg do WhatsApp não toca em todo iPhone). null = pendente. */
  audioSrc: string | null;
  /** Transcrição opcional do áudio (aparece em "Ler transcrição"). */
  transcricao?: string;
}

/** Depoimentos em áudio. Com a lista vazia, a seção não aparece. */
export const depoimentos = {
  titulo: "Depoimentos",
  subtitulo: "Ouça quem já trabalha com a Quintino.",
  itens: [
    { nome: "{{PENDENTE: nome}}", papel: "{{PENDENTE: clínica ou laboratório}}", audioSrc: null },
    { nome: "{{PENDENTE: nome}}", papel: "{{PENDENTE: clínica ou laboratório}}", audioSrc: null },
    { nome: "{{PENDENTE: nome}}", papel: "{{PENDENTE: clínica ou laboratório}}", audioSrc: null },
  ] as Depoimento[],
};
