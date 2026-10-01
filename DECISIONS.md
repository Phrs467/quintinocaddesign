# Decisões de implementação

Registro das escolhas feitas onde a especificação (`quintino-hub-spec.md`) não era explícita, e das mudanças pedidas depois dela.

## Escopo atual (29/09/2026): só a instabio / landing page

O cliente decidiu ficar, por enquanto, só com a instabio. **Formulário, API de leads, pontuação, e-mails, banco (Neon) e CRM foram removidos do código** — a pedido do dono, sem cópia guardada. Voltar a tê-los exigiria refazer (a spec continua descrevendo tudo).

- **Ação única:** botão **"Falar no WhatsApp"** (hero e botão fixo no rodapé do celular). Abre `https://wa.me/<número>?text=…` em nova aba, com a mensagem pré-preenchida "Olá! Vim pelo Instagram e gostaria de solicitar uma consulta sobre design de próteses em ExoCad." (editável em `src/content/landing.ts`).
- **Número do WhatsApp:** fica em `src/content/landing.ts` (`whatsapp.numero`), junto com a mensagem — não em variável de ambiente. O número não é segredo (aparece no link do botão para qualquer visitante), então a `.env` não protegia nada; no arquivo de conteúdo fica num lugar só, versionado, igual em todo ambiente e sem configuração na Vercel. `{{PENDENTE: número comercial}}`: vazio, o `wa.me` abre o WhatsApp para a pessoa escolher o contato — preencher antes de publicar.
- **Removidos junto:** página `/privacidade` (existia para o aceite LGPD do formulário; sem coleta de dados, ficou sem uso), páginas `/solicitar` e `/obrigado`, rota `/api/leads`, `/crm/*`, `proxy.ts`, migrations e scripts, testes e as dependências `pg`, `resend`, `zod`, `react-hook-form`, `@hookform/resolvers`, `server-only`, `@electric-sql/pglite` e `vitest`.
- **Variáveis de ambiente:** nenhuma (`.env.example` removido).

## Stack
- **Next.js 16** (App Router; a spec pede 14+), **Tailwind CSS v4** (tokens em `@theme` em `src/app/globals.css`), **lucide-react** (ícones de linha; sem ícones de marca — `MessageCircle` representa o WhatsApp).
- Página estática: sem banco, sem API, sem segredos.

## Design (versão aprovada pelo dono)

Histórico: quatro versões anteriores foram substituídas a pedido do dono (painéis numerados; editorial largo; perfil do Instagram em coluna estreita; instabio com botões de link). Referência usada: dramariliamartins.com.br (logo no topo, bloco dividido texto | mídia, galeria com lightbox), adaptada — não copiada — para ExoCad.

- **Sem cabeçalho:** só a logo centralizada, contínua com o corpo (formato instabio, para não virar landing page com menu).
- **Estrutura e padrão "xadrez" (01/10/2026, pedido do dono):** as seções alternam fundo claro e escuro, sem duas iguais seguidas: hero (claro) → "Quem sou eu" (escuro) → comparativo "Você enfrenta isso?" × "A Solução:" (claro) → "Como funciona" (escuro) → diferenciais (claro) → portfólio (escuro) → depoimentos (claro) → rodapé "Made with Devolex". O tom é aplicado em `src/app/(public)/page.tsx` pelo componente `Faixa` (`escuro` ou não); cada seção é desenhada para o tom em que está. Ao incluir ou mover uma seção, mantenha a alternância e ajuste as cores do componente. No celular, uma coluna.
- **Fontes:** Source Serif 4 (títulos) + Inter (texto e interface), no lugar de Open Sans + Montserrat da spec.
- **Tom escuro "visor do ExoCad"** (`--color-viewport` #16161E, amostrado do fundo dos renders do portfólio) nos blocos do comparativo, dos passos, do vídeo e das miniaturas.
- **Vídeo do hero (01/10/2026):** o cliente enviou `public/Video Project.mp4` (55 MB, 1080×1920, 30 s, faixa de áudio em silêncio). Publicado como `public/hero/processo.mp4`: **mesmo enquadramento vertical do original** (decisão do dono — a imagem está girada 90°, com a logo de lado, como num Reels; uma versão desvirada para a horizontal foi testada e descartada), reduzido para 720×1280, H.264, sem áudio, 1,5 MB, com capa `public/hero/processo.jpg`. O original fica fora do git (`.gitignore`). O player (`VideoCard`) aceita `formato` `reels` (9:16, usado aqui), `vertical` (4:5) ou `horizontal` (16:9) e `temSom` (botão de som só quando há áudio); com vídeo, nada cobre a imagem além do botão de pausar, e a legenda fica abaixo da moldura. Inicia sozinho e mudo, em loop, exceto com `prefers-reduced-motion`. O player guarda se foi o usuário quem pausou: se o navegador pausar por conta própria (aba em segundo plano), retoma ao voltar, com limite de tentativas. Sem vídeo, mostra a capa com o desenho técnico da coroa.
- **Como funciona:** quatro "janelas de visor" (Passo 1–4) com ilustração própria de cada etapa ou vídeo curto (`comoFunciona.passos[i].videoSrc`).
- **Comparativo:** faixa clara; cada problema (riscado, em cinza) ao lado da solução correspondente (navy, com check).
- **Diferenciais:** "ficha do serviço" no formato de painel de propriedades.
- **Botão principal:** sólido navy, cantos de 8 px, ícone + texto centralizado (utilitário `btn-primary`), escolhido pelo dono entre três opções.
- **Portfólio:** 3 imagens reais do cliente (`public/*.jpg`). Títulos descrevem o que aparece em cada imagem — **revisar com o cliente**. No celular, fileira deslizável; no desktop, 3 colunas; cada caso abre em `<dialog>` com contador, setas e Esc.
- **Logo:** `public/logo_sem_fundo_escura.png` recortada para `public/brand/logo.png`. Ícone do site (`src/app/icon.png`, `apple-icon.png`) gerado a partir do símbolo (coluna de dentes). Não há versão branca da logo.
- **Rodapé:** apenas "Made with Devolex" (link para https://devolex.com.br).
- **Marcadores `{{PENDENTE}}`:** visíveis com estilo discreto (componente `Texto`).
- **Textos novos (não estavam na spec):** apoio do processo, legenda do vídeo, garantias sob o botão (retiradas da spec) e a mensagem do WhatsApp. Editáveis em `src/content/landing.ts`.
- **Quem sou eu (01/10/2026):** logo abaixo do hero, antes do comparativo (pedido do dono), em faixa escura, com a foto encostada na base. Foto do responsável (PNG com recorte inclinado e fundo transparente, otimizado para `public/sobre/retrato.webp`, 67 KB) e o texto fornecido pelo cliente, sem alterações. A seção não cita nome, porque a assinatura "Gustavo D." foi retirada antes a pedido do dono.
- **Depoimentos em áudio (01/10/2026):** estrutura pronta, conteúdo pendente. Cada depoimento é um cartão no formato de mensagem de voz (reproduzir/pausar, barras que preenchem conforme toca e servem para avançar, tempo decorrido/total), com nome, clínica/laboratório e transcrição opcional ("Ler transcrição"). Só um áudio toca por vez. Itens em `depoimentos.itens` (`src/content/landing.ts`); com `audioSrc: null` o cartão fica desativado com o marcador de pendência, e com a lista vazia a seção some. Formato recomendado: **.mp3 ou .m4a** — o .ogg/opus exportado do WhatsApp não toca em todo iPhone. A duração é lida direto do elemento `<audio>` (o evento de metadados pode disparar antes de o React assumir a página).
- **Passo 1 de "Como funciona" (01/10/2026):** texto trocado, a pedido do cliente, para "Os arquivos STL ou PLY, especificações técnicas e material" (antes "Imagem do dente, …" da spec).
- **Removido a pedido do dono:** assinatura "Gustavo D.", links rápidos (WhatsApp/Instagram/e-mail/portfólio), bloco final "Tem um caso para projetar?".

### Desvios da especificação pedidos pelo dono
- **Formulário (seção 6), API (7), pontuação (8), banco (9), e-mails (10) e CRM (11):** retirados; o contato é pelo WhatsApp.
- **Hero (5.1):** vídeo em player ao lado do texto, em vez de fundo com overlay navy 70%; CTA "Falar no WhatsApp" em vez de "Solicite uma Consulta Grátis".
- **Card "A Solução" (5.3):** metade escura do comparativo.
- **Ícones dos cards (5.2 e 5.5):** substituídos por marcadores (×/✓) e tipografia.
- **Portfólio (5.6):** grade com lightbox em vez de carrossel.
- **Links rápidos e rodapé (5.7):** removidos; rodapé só com "Made with Devolex".
- **Padrão de dentes e fontes (seção 3):** grade milimetrada nos blocos escuros; Source Serif 4 + Inter.
- **`/privacidade` (seção 4):** removida junto com o formulário.
