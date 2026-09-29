export interface CasoPortfolio {
  titulo: string;
  tipoPeca: string;
  imagemAntes?: string;
  imagemDepois: string;
}

// Imagens enviadas pelo cliente (public/). Títulos descrevem o que aparece em cada imagem — revisar com o cliente.
export const portfolio: CasoPortfolio[] = [
  {
    titulo: "Prótese total superior e inferior",
    tipoPeca: "Próteses totais",
    imagemDepois: "/481797407_17868732960318882_8557749323982727542_n.jpg",
  },
  {
    titulo: "Reabilitação superior e inferior sobre implantes",
    tipoPeca: "Implantologia",
    imagemDepois: "/581414413_17900669376318882_4006019950942613685_n.jpg",
  },
  {
    titulo: "Estrutura e prótese inferior sobre implantes",
    tipoPeca: "Implantologia",
    imagemDepois: "/590415188_17902003170318882_3242059746919718527_n.jpg",
  },
];
