# Decisões de implementação

Registro das escolhas feitas onde a especificação (`quintino-hub-spec.md`) não era explícita, e das mudanças pedidas depois dela.

## Escopo atual (29/09/2026): só a instabio / landing page

O cliente decidiu ficar, por enquanto, só com a instabio. **Formulário, API de leads, pontuação, e-mails, banco (Neon) e CRM foram removidos do código** — a pedido do dono, sem cópia guardada. Voltar a tê-los exigiria refazer (a spec continua descrevendo tudo).

- **Ação única:** botão **"Falar no WhatsApp"** (hero e botão fixo no rodapé do celular). Abre `https://wa.me/<NEXT_PUBLIC_WHATSAPP_NUMBER>?text=…` em nova aba, com a mensagem pré-preenchida "Olá! Vim pelo Instagram e gostaria de solicitar uma consulta sobre design de próteses em ExoCad." (editável em `src/content/landing.ts`).
- **Número do WhatsApp:** `{{PENDENTE: número comercial}}`. Sem a variável, o `wa.me` abre o WhatsApp para a pessoa escolher o contato — o botão continua funcionando, mas sem destino certo. Preencher antes de publicar.
- **Removidos junto:** página `/privacidade` (existia para o aceite LGPD do formulário; sem coleta de dados, ficou sem uso), páginas `/solicitar` e `/obrigado`, rota `/api/leads`, `/crm/*`, `proxy.ts`, migrations e scripts, testes e as dependências `pg`, `resend`, `zod`, `react-hook-form`, `@hookform/resolvers`, `server-only`, `@electric-sql/pglite` e `vitest`.
- **Variáveis de ambiente:** só `NEXT_PUBLIC_WHATSAPP_NUMBER`.

## Stack
- **Next.js 16** (App Router; a spec pede 14+), **Tailwind CSS v4** (tokens em `@theme` em `src/app/globals.css`), **lucide-react** (ícones de linha; sem ícones de marca — `MessageCircle` representa o WhatsApp).
- Página estática: sem banco, sem API, sem segredos.

## Design (versão aprovada pelo dono)

Histórico: quatro versões anteriores foram substituídas a pedido do dono (painéis numerados; editorial largo; perfil do Instagram em coluna estreita; instabio com botões de link). Referência usada: dramariliamartins.com.br (logo no topo, bloco dividido texto | mídia, galeria com lightbox), adaptada — não copiada — para ExoCad.

- **Sem cabeçalho:** só a logo centralizada, contínua com o corpo (formato instabio, para não virar landing page com menu).
- **Estrutura:** logo → hero dividido (título, subtítulo, botão do WhatsApp, garantias | player de vídeo vertical) → comparativo "Você enfrenta isso?" × "A Solução:" (faixa escura de largura total) → "Como funciona" → diferenciais → portfólio com lightbox → rodapé "Made with Devolex". No celular, uma coluna.
- **Fontes:** Source Serif 4 (títulos) + Inter (texto e interface), no lugar de Open Sans + Montserrat da spec.
- **Tom escuro "visor do ExoCad"** (`--color-viewport` #16161E, amostrado do fundo dos renders do portfólio) nos blocos do comparativo, dos passos, do vídeo e das miniaturas.
- **Player de vídeo (`VideoCard`):** 4:5; com `hero.videoSrc`, vídeo em loop mudo com botões de reproduzir/pausar e som; sem vídeo, capa com o desenho técnico da coroa (`CrownArt`) e o marcador `{{PENDENTE: vídeo}}`. Respeita `prefers-reduced-motion`.
- **Como funciona:** quatro "janelas de visor" (Passo 1–4) com ilustração própria de cada etapa ou vídeo curto (`comoFunciona.passos[i].videoSrc`).
- **Comparativo:** cada problema (riscado) ao lado da solução correspondente; no desktop, um render real do portfólio ao fundo, bem sutil.
- **Diferenciais:** "ficha do serviço" no formato de painel de propriedades.
- **Botão principal:** sólido navy, cantos de 8 px, ícone + texto centralizado (utilitário `btn-primary`), escolhido pelo dono entre três opções.
- **Portfólio:** 3 imagens reais do cliente (`public/*.jpg`). Títulos descrevem o que aparece em cada imagem — **revisar com o cliente**. No celular, fileira deslizável; no desktop, 3 colunas; cada caso abre em `<dialog>` com contador, setas e Esc.
- **Logo:** `public/logo_sem_fundo_escura.png` recortada para `public/brand/logo.png`. Ícone do site (`src/app/icon.png`, `apple-icon.png`) gerado a partir do símbolo (coluna de dentes). Não há versão branca da logo.
- **Rodapé:** apenas "Made with Devolex" (link para https://devolex.com.br).
- **Marcadores `{{PENDENTE}}`:** visíveis com estilo discreto (componente `Texto`).
- **Textos novos (não estavam na spec):** apoio do processo, legenda do vídeo, garantias sob o botão (retiradas da spec) e a mensagem do WhatsApp. Editáveis em `src/content/landing.ts`.
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
