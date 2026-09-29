# Quintino Hub — Especificação para desenvolvimento

> Documento de instrução para a ferramenta/equipe de desenvolvimento.
> Versão 1.0 · 28/09/2026 · Idioma da interface: português (Brasil).

## 0. Como usar este documento

- Construa **por fases**. Implemente **apenas a Fase 1**, valide os critérios de aceite e só então siga para a Fase 2. **Não implemente nada da Fase 3.**
- Onde houver `{{PENDENTE: ...}}`, use o texto do marcador como placeholder visível e **não invente números**.
- Toda regra de negócio roda **no servidor**. O cliente (navegador) nunca calcula pontuação nem decide fila.
- Em caso de dúvida não coberta aqui, escolha a opção mais simples e registre a decisão em `DECISIONS.md`.

---

## 1. Contexto

**Quintino Dental Design** é um serviço de design de próteses dentárias em ExoCad (CAD) para dentistas e laboratórios. O produto tem 3 partes:

1. **Landing page** estilo link-in-bio (tráfego vem do Instagram), mobile-first.
2. **Formulário** de solicitação que qualifica o lead.
3. **CRM** privado onde o dono recebe, pontua, filtra e acompanha os leads num funil.

Público: **B2B** — dentistas e laboratórios. Não há opção de paciente.

---

## 2. Stack obrigatória

| Camada | Tecnologia |
| --- | --- |
| App (páginas + API) | Next.js 14+ (App Router), TypeScript estrito |
| Estilo | Tailwind CSS com os tokens da seção 3 |
| Banco / Auth / Storage | Supabase (PostgreSQL, Auth por e-mail+senha, RLS ativado) |
| Anti-spam | Google reCAPTCHA v3 (verificação no servidor) |
| E-mail transacional | Resend |
| Validação | Zod (compartilhado entre formulário e API) |
| Formulário | React Hook Form |
| Hospedagem | Vercel |
| Ícones | lucide-react (ícones de linha) |

Variáveis de ambiente (`.env.example` obrigatório):

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=
RESEND_API_KEY=
EMAIL_FROM=            # {{PENDENTE: e-mail remetente}}
OWNER_EMAIL=           # e-mail que recebe alertas
IP_HASH_SALT=
NEXT_PUBLIC_WHATSAPP_NUMBER=  # {{PENDENTE: número comercial}}
```

---

## 3. Identidade visual (design tokens)

### Cores

| Token | HEX | Uso |
| --- | --- | --- |
| `navy` | `#17233D` | Títulos, logotipo, botões primários, sidebar do CRM, overlay do hero (70%) |
| `blue` | `#314C77` | Links, ícones, estados ativos, gráficos |
| `teal` | `#305050` | Subtítulos, card "A Solução", selo "Qualificado" |
| `pattern` | `#E3E6EB` | Textura de fundo (padrão de dentes), divisórias |
| `white` | `#FFFFFF` | Fundo principal |
| `black` | `#000000` | Fundo do modo escuro (logo em versão branca) |

Estados das filas no CRM: Qualificado = `teal`; Revisar = âmbar neutro (`#B7791F`); Descartado = cinza (`#6B7280`); Nutrir = `blue`.

### Tipografia (via `next/font/google`)

- Títulos: **Open Sans 700** (equivalente ao "QUINTINO" do logo).
- Subtítulos/rótulos: **Montserrat 300** (equivalente ao "Dental Design").
- Texto corrido: **Open Sans 400**.
- `{{PENDENTE: confirmar fontes originais do manual}}` — manter como variáveis CSS para troca fácil.

### Elementos

- Logotipo: `public/brand/logo.svg` e `logo-white.svg` — `{{PENDENTE: arquivos SVG}}`; usar placeholder com o texto "QUINTINO / Dental Design" até lá.
- Padrão de dentes em diagonal, cinza `pattern`, baixa opacidade, como fundo de seções alternadas.
- Rodapé com assinatura "Gustavo D." (imagem, placeholder até receber o arquivo).
- Cantos arredondados 12px, sombras suaves, visual limpo e técnico. **Não usar emojis na interface**: usar ícones lucide.
- Acessibilidade: contraste AA, foco visível, `alt` em imagens, formulário navegável por teclado.

---

## 4. Rotas

| Rota | Acesso | Fase |
| --- | --- | --- |
| `/` | Pública — landing page | 1 |
| `/solicitar` | Pública — formulário (também abre como seção/modal a partir do CTA) | 1 |
| `/obrigado` | Pública — confirmação | 1 |
| `/privacidade` | Pública — política LGPD `{{PENDENTE: texto}}` | 1 |
| `POST /api/leads` | Pública — recebe o formulário | 1 |
| `/crm/login` | Pública | 2 |
| `/crm` | Autenticada — lista de leads | 2 |
| `/crm/leads/[id]` | Autenticada — ficha do lead | 2 |
| `/crm/funil` | Autenticada — Kanban | 2 |
| `/crm/nutrir` | Autenticada — lista de nutrição | 2 |
| `/crm/numeros` | Autenticada — indicadores | 2 |
| `/crm/configuracoes` | Autenticada — pesos, limites, mensagens-modelo | 2 |

---

## 5. Landing page (Fase 1)

Mobile-first, carregamento rápido (LCP < 2,5 s em 4G), uma coluna no celular. O CTA **"Solicite uma Consulta Grátis"** fica fixo no rodapé da tela ao rolar (mobile) e leva ao formulário.

### 5.1 Hero
- Headline (h1): **"Designs de Prótese em ExoCad que Aceleram sua Produção"**
- Subheadline: **"Reduz tempo de projeto em {{PENDENTE: X}}%, aumenta precisão e escalabilidade para seu laboratório ou consultório"**
- Botão: **"Solicite uma Consulta Grátis"**
- Fundo: vídeo em loop, mudo, `playsinline`, 5–10 s (`{{PENDENTE: vídeo}}`), com overlay `navy` a 70%. Fallback: imagem estática (`poster`) e respeitar `prefers-reduced-motion` (mostrar só a imagem).

### 5.2 "Você enfrenta isso?"
Três cards (empilhados no mobile, 3 colunas no desktop):

| Ícone lucide | Título | Descrição |
| --- | --- | --- |
| `Hourglass` | Projetos lentos | Demora semanas para um simples design |
| `CircleX` | Falta de precisão | Erros no projeto = retrabalho custoso |
| `BadgeDollarSign` | Custos altos | Prototipagem física cara e demorada |

### 5.3 "A Solução:"
Card único, fundo `teal`, texto branco, com ícone `Check` em cada linha:
- Designs rápidos ({{PENDENTE: X}} horas)
- Precisão total (ExoCad profissional)
- Pronto para fabricação (impressora 3D ou fresadora)

### 5.4 "Como funciona"
Quatro passos numerados (linha do tempo vertical no mobile, horizontal no desktop):
1. **Você envia** — Imagem do dente, especificações técnicas, material
2. **Eu desenho** — Design preciso em ExoCad ({{PENDENTE: X}} dias úteis)
3. **Você aprova** — Revisões rápidas, iterações
4. **Pronto para produzir** — Arquivo finalizado para sua máquina

### 5.5 Diferenciais
Grade de 6 cards (2 colunas mobile, 3 desktop):

| Ícone lucide | Título | Texto |
| --- | --- | --- |
| `Lightbulb` | Especialista em ExoCad | Domínio total da ferramenta |
| `Zap` | Entrega rápida | Sem esperas, cumprimento de prazos |
| `Target` | Exatidão | Designs prontos na primeira vez |
| `Wallet` | Custo-benefício | Mais barato que in-house + mais rápido que concorrência |
| `MessageCircle` | Suporte próximo | Disponível para dúvidas técnicas |
| `RefreshCw` | Revisões inclusas | Sem custos adicionais surpresa |

### 5.6 Portfólio (`id="portfolio"`)
Carrossel com swipe no mobile. Dados vindos de `src/content/portfolio.ts` (array de `{ titulo, tipoPeca, imagemAntes?, imagemDepois }`). Usar 3 placeholders até receber os casos.

### 5.7 Links rápidos e rodapé
Botões: WhatsApp (`https://wa.me/{NEXT_PUBLIC_WHATSAPP_NUMBER}`), Instagram, e-mail. Rodapé: assinatura, link para `/privacidade`, © ano.

Todos os textos da landing ficam em `src/content/landing.ts` (fácil edição; o editor visual é Fase 3).

---

## 6. Formulário (Fase 1)

Formato em etapas (3 blocos), barra de progresso, uma pergunta por tela no mobile. Todos os campos obrigatórios salvo indicação. Os **valores** (`value`) abaixo são os que vão para a API e o banco.

### Bloco 1 — Identificação básica
| Campo | name | Validação |
| --- | --- | --- |
| Nome completo | `nome` | 3–120 caracteres |
| E-mail | `email` | e-mail válido |
| WhatsApp/Telefone | `telefone` | telefone BR com DDD (10–11 dígitos); normalizar para E.164 `+55…` |

### Bloco 2 — Perfil e necessidade
**Você é:** (`tipo_cliente`, escolha única)
- `dentista` — Dentista (consultório/clínica)
- `laboratorio` — Laboratório de próteses
- `laboratorio_misto` — Laboratório misto
- `outro` — Outro: ___ → exige `tipo_cliente_outro` (3–120 caracteres)

**Quantos casos de prótese/design você produz por mês?** (`volume_mensal`)
- `1_5` — 1-5 casos · `6_15` — 6-15 casos · `16_30` — 16-30 casos · `30_mais` — 30+ casos · `nao_produz` — Ainda não produz (futuro)

**Sua equipe tem experiência com softwares de design 3D?** (`experiencia_3d`)
- `exocad_similar` — Sim, usamos ExoCad/similar
- `outro_software` — Sim, usamos outro software
- `analogica` — Não, nossa equipe é 100% analógica
- `parcial` — Parcialmente (alguns usam)

**Qual é sua principal dor AGORA?** (`principal_dor`)
- `agilidade` — Agilidade nos projetos
- `qualidade` — Qualidade dos designs
- `custos` — Reduzir custos de produção
- `terceirizar` — Não temos CAD, precisamos terceirizar
- `outras` — Outras: ___ → exige `principal_dor_outras` (3–300 caracteres)

**Em quais tipos de peças você mais precisa de design?** (`pecas`, múltipla escolha, mínimo 1)
- `proteses_totais` · `proteses_parciais` · `coroas` · `implantologia` · `placas_bruxismo` · `multiplas` (Múltiplas/várias)

### Bloco 3 — Próximo passo
**O que você quer agora?** (`proximo_passo`)
- `consulta` — Quero uma consulta/orçamento
- `portfolio` — Quero ver portfólio de casos
- `saber_mais` — Quero saber mais (sem compromisso)

**Melhor forma de contato** (`canal_contato`): `whatsapp` · `email` · `ligacao`

**Aceite LGPD** (`aceite_lgpd`, checkbox obrigatório): "Li e aceito a Política de Privacidade" (link para `/privacidade`).

### Campos ocultos
- `website` — honeypot (input escondido via CSS, `tabIndex={-1}`, `autoComplete="off"`).
- `form_started_at` — timestamp de quando o formulário foi aberto.
- `recaptcha_token` — gerado no envio.
- `utm_source`, `utm_medium`, `utm_campaign` — lidos da URL, se houver.

### Após o envio
- `proximo_passo = portfolio` → redireciona para `/#portfolio` com toast de sucesso.
- Demais → `/obrigado` com a mensagem: "Recebemos sua solicitação! Retornaremos por {canal} em até {{PENDENTE: prazo de retorno}}."

---

## 7. API `POST /api/leads` (Fase 1)

Etapas, **nesta ordem**:

1. **Honeypot**: se `website` preenchido → responder `200 { ok: true }` **sem gravar**.
2. **reCAPTCHA v3**: verificar token no servidor; `score < 0.5` ou falha → `400 { error: "verificacao" }`, sem gravar.
3. **Validação Zod** → `422` com erros por campo.
4. **Rate limit**: mais de 3 envios em 24h pelo mesmo `ip_hash` **ou** mesmo `telefone` → `429 { error: "limite" }`. (Contar na tabela `leads`.)
5. **Sinais de suspeita** (`suspeito = true`, mas grava):
   - `now - form_started_at < 10 s`;
   - `tipo_cliente_outro` ou `principal_dor_outras` contém `http`, `https` ou `www.`.
6. **Pontuação, fila, nutrição e etiqueta** (seção 8) via função pura `scoreLead(input, settings, context)`.
7. **Gravar** o lead + evento `criado` em `lead_events`.
8. **E-mails** (Resend): confirmação ao lead sempre; alerta ao `OWNER_EMAIL` quando `fila = qualificado`. Falha de e-mail **não** impede a gravação (logar o erro).
9. Responder `201 { ok: true, redirect: "/obrigado" | "/#portfolio" }`.

`ip_hash = sha256(ip + IP_HASH_SALT)`. Nunca gravar o IP puro.

---

## 8. Regras de negócio (função `scoreLead`)

Implementar em `src/lib/scoring.ts` como **função pura**, com testes unitários. Os pesos vêm de `settings` (valores padrão abaixo).

### 8.1 Pontos
| Critério | Resposta | Pontos padrão |
| --- | --- | --- |
| `tipo_cliente` | `laboratorio`, `laboratorio_misto` | 20 |
| | `dentista` | 15 |
| | `outro` | 0 |
| `volume_mensal` | `30_mais` | 25 |
| | `16_30` | 20 |
| | `6_15` | 15 |
| | `1_5` | 5 |
| | `nao_produz` | −10 |
| `experiencia_3d` | `analogica` | 15 |
| | `exocad_similar`, `parcial` | 10 |
| | `outro_software` | 5 |
| `principal_dor` | `terceirizar` | 15 |
| | `agilidade`, `qualidade` | 10 |
| | `custos` | 5 |
| | `outras` | 0 |
| `pecas` | contém `multiplas` **ou** 2+ itens | 10 |
| | exatamente 1 item (≠ `multiplas`) | 5 |
| `proximo_passo` | `consulta` | 20 |
| | `portfolio` | 10 |
| | `saber_mais` | 0 |
| Penalidade | e-mail **ou** telefone igual ao de um lead existente com `fila = descartado` | −20 |
| Penalidade | lead marcado "irrelevante" pelo dono no CRM (Fase 2; recalcula) | −25 |

`score = clamp(soma, 0, 100)`. Gravar `score_detalhe` (jsonb) com os pontos de cada critério.

### 8.2 Fila
1. `score >= 60` → `qualificado`; `30 <= score < 60` → `revisar`; `score < 30` → `descartado`.
2. Se o resultado for `qualificado` **e** (`tipo_cliente = outro` **ou** `principal_dor = outras` **ou** `suspeito = true`) → rebaixar para `revisar`.
3. Limites 60/30 vêm de `settings`.

### 8.3 Nutrição
`nutrir = (volume_mensal = nao_produz) OR (proximo_passo = saber_mais)`.
Leads com `nutrir = true` e `fila ≠ descartado` aparecem em `/crm/nutrir` e **não** no Kanban.

### 8.4 Etiqueta de pitch (`etiqueta_pitch`)
| `experiencia_3d` | etiqueta | rótulo exibido | abordagem sugerida (exibir na ficha) |
| --- | --- | --- | --- |
| `analogica` | `terceirizacao_completa` | Terceirização completa | Foco em resultado e fluxo: "você envia o escaneamento, recebe o arquivo pronto". |
| `parcial` | `transicao_digital` | Transição digital | Apoio enquanto a equipe aprende; casos complexos terceirizados. |
| `exocad_similar` | `reforco_capacidade` | Reforço de capacidade | Linguagem técnica; absorver picos de demanda e liberar a equipe. |
| `outro_software` | `compatibilidade` | Compatibilidade | Confirmar formatos de arquivo e fluxo de troca. |

Também exibir na ficha um "argumento de abertura" pela dor: `agilidade` → prazo de entrega; `qualidade` → precisão/ExoCad; `custos` → custo-benefício; `terceirizar` → processo completo "Como funciona"; `outras` → texto livre do lead.

### 8.5 Casos de teste obrigatórios
| Entrada | Esperado |
| --- | --- |
| laboratorio, 6_15, analogica, terceirizar, [multiplas], consulta | score 95, qualificado, terceirizacao_completa, nutrir false |
| dentista, 1_5, exocad_similar, agilidade, [coroas], portfolio | 15+5+10+10+5+10 = 55, revisar |
| outro, 30_mais, analogica, terceirizar, [coroas, implantologia], consulta | 0+25+15+15+10+20 = 85 → rebaixado para revisar |
| dentista, nao_produz, parcial, outras, [coroas], saber_mais | 15−10+10+0+5+0 = 20, descartado, nutrir true (mas não aparece em Nutrir por estar descartado) |
| laboratorio, 30_mais, analogica, terceirizar, [multiplas], consulta | soma 105 → score 100 |
| qualquer lead qualificado com `suspeito = true` | revisar |
| mesmo telefone de lead descartado anterior | −20 aplicado |

---

## 9. Banco de dados (Supabase)

Criar via migrations SQL em `supabase/migrations/`.

```sql
create type tipo_cliente as enum ('dentista','laboratorio','laboratorio_misto','outro');
create type volume_mensal as enum ('1_5','6_15','16_30','30_mais','nao_produz');
create type experiencia_3d as enum ('exocad_similar','outro_software','analogica','parcial');
create type principal_dor as enum ('agilidade','qualidade','custos','terceirizar','outras');
create type proximo_passo as enum ('consulta','portfolio','saber_mais');
create type canal_contato as enum ('whatsapp','email','ligacao');
create type fila_lead as enum ('qualificado','revisar','descartado');
create type etiqueta_pitch as enum ('terceirizacao_completa','transicao_digital','reforco_capacidade','compatibilidade');
create type etapa_funil as enum ('novo','em_contato','orcamento_enviado','em_producao','entregue','recorrente','perdido');
create type motivo_perda as enum ('preco','prazo','sem_retorno','fora_escopo','outro');

create table leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nome text not null,
  email text not null,
  telefone text not null,                 -- E.164
  tipo_cliente tipo_cliente not null,
  tipo_cliente_outro text,
  volume_mensal volume_mensal not null,
  experiencia_3d experiencia_3d not null,
  principal_dor principal_dor not null,
  principal_dor_outras text,
  pecas text[] not null check (array_length(pecas,1) >= 1),
  proximo_passo proximo_passo not null,
  canal_contato canal_contato not null,
  aceite_lgpd_em timestamptz not null,
  score int not null check (score between 0 and 100),
  score_detalhe jsonb not null,
  fila fila_lead not null,
  nutrir boolean not null default false,
  etiqueta_pitch etiqueta_pitch not null,
  suspeito boolean not null default false,
  irrelevante boolean not null default false,
  etapa_funil etapa_funil not null default 'novo',
  motivo_perda motivo_perda,
  utm_source text, utm_medium text, utm_campaign text,
  ip_hash text,
  user_agent text,
  ultimo_contato_em timestamptz
);
create index on leads (fila);
create index on leads (created_at desc);
create index on leads (telefone);
create index on leads (email);

create table lead_events (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references leads(id) on delete cascade,
  created_at timestamptz not null default now(),
  tipo text not null,          -- criado | fila | etapa | nota | contato | score
  dados jsonb not null default '{}',
  autor uuid references auth.users(id)
);

create table message_templates (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  canal canal_contato not null,
  texto text not null          -- variáveis: {nome}, {pecas}, {etiqueta}
);

create table settings (
  id int primary key default 1 check (id = 1),
  pesos jsonb not null,        -- tabela 8.1
  limites jsonb not null default '{"qualificado":60,"revisar":30}'
);
```

**RLS:** ativar em todas as tabelas. Nenhuma política para `anon` (a API grava com `service_role` no servidor). Usuários autenticados: `select/update` em `leads`, `select/insert` em `lead_events`, CRUD em `message_templates` e `settings`.

Seed: uma linha em `settings` com os pesos padrão; 3 mensagens-modelo (primeiro contato, envio de orçamento, cobrança de retorno).

---

## 10. E-mails (Fase 1)

- **Confirmação ao lead** — assunto: "Recebemos sua solicitação — Quintino Dental Design". Corpo com nome, resumo das peças, canal escolhido e prazo de retorno. Layout simples com cores da marca.
- **Alerta ao dono** (só `qualificado`) — assunto: "Novo lead qualificado: {nome} ({score})". Corpo: tipo, volume, dor, peças, etiqueta de pitch, canal, link para a ficha no CRM (Fase 2) e link `wa.me` direto.

---

## 11. CRM (Fase 2)

Layout: sidebar `navy` com logo branco; conteúdo em fundo branco. Responsivo (usável no celular).

### 11.1 Login
Supabase Auth, e-mail e senha. Sem cadastro público; o usuário é criado pelo painel do Supabase.

### 11.2 Lista de leads (`/crm`)
- Abas: **Qualificado** (padrão) · Revisar · Descartado · Todos.
- Tabela/cards: nome, tipo, volume, dor, score (badge colorido), etiqueta, etapa, data, ícone de suspeito.
- Filtros combináveis: fila, tipo de cliente, volume mensal, experiência 3D, principal dor, peças, próximo passo, canal de contato, período (data inicial/final), suspeito.
- Busca por nome, e-mail ou telefone. Ordenação por data ou score. Paginação de 25.
- Exportar CSV com os filtros aplicados.

### 11.3 Ficha do lead (`/crm/leads/[id]`)
- Todas as respostas, score com detalhamento por critério (`score_detalhe`), etiqueta de pitch + abordagem sugerida + argumento de abertura.
- Botão de contato conforme `canal_contato`: WhatsApp (`wa.me` com mensagem-modelo preenchida), `mailto:` ou `tel:`. Clicar registra evento `contato` e atualiza `ultimo_contato_em`.
- Mudar fila manualmente; marcar/desmarcar "irrelevante" (recalcula score com −25 e registra evento).
- Mudar etapa do funil; `perdido` exige `motivo_perda` (modal).
- Notas internas (evento `nota`) e linha do tempo com todos os eventos.

### 11.4 Funil (`/crm/funil`)
Kanban com as colunas de `etapa_funil`. Mostra leads com `fila ≠ descartado` e `nutrir = false`. Arrastar e soltar muda a etapa (mesmas regras da ficha). Transições livres, exceto que `perdido` exige motivo.

### 11.5 Nutrir (`/crm/nutrir`)
Lista dos leads com `nutrir = true` e `fila ≠ descartado`, com botão para "Mover para o funil" (define `nutrir = false`).

### 11.6 Lembretes
Na lista e no topo do CRM: badge com a contagem de leads `qualificado`, etapa `novo`, criados há mais de 24h e sem `ultimo_contato_em`. (Sem notificação push na Fase 2.)

### 11.7 Números (`/crm/numeros`)
Período selecionável. Cartões: leads recebidos, % por fila, % suspeitos, taxa de conversão (entregue ÷ total não descartado). Gráficos simples: leads por semana; distribuição por tipo de cliente, dor e peças; motivos de perda.

### 11.8 Configurações (`/crm/configuracoes`)
Editar pesos da tabela 8.1 e limites das filas (com botão "restaurar padrão"); CRUD de mensagens-modelo. Alterar pesos **não** recalcula leads antigos, a menos que se clique em "Recalcular todos" (com confirmação).

---

## 12. Fora do escopo (não implementar)

- **Fase 3:** triagem por IA, WhatsApp Business API, editor visual da landing page, relatórios avançados.
- Pagamentos, área do lead, upload de arquivos STL, app nativo, múltiplos idiomas, múltiplos papéis de usuário.

---

## 13. Critérios de aceite

### Fase 1
- [ ] Landing page completa conforme seção 5, Lighthouse mobile ≥ 90 em Performance e Acessibilidade.
- [ ] Formulário com os 3 blocos, validação por campo, campos condicionais "Outro/Outras" e aceite LGPD.
- [ ] Honeypot, reCAPTCHA, rate limit e sinais de suspeita funcionando conforme seção 7.
- [ ] `scoreLead` com todos os casos da seção 8.5 passando em testes automatizados.
- [ ] Lead gravado com score, fila, nutrição, etiqueta e evento `criado`.
- [ ] E-mail de confirmação ao lead e alerta ao dono (só qualificados).
- [ ] Redirecionamento correto após envio (`/obrigado` ou `/#portfolio`).
- [ ] Nenhum segredo no código do cliente; RLS ativo; IP apenas como hash.

### Fase 2
- [ ] Login funcional; rotas `/crm/*` inacessíveis sem sessão.
- [ ] Lista com abas, filtros, busca, ordenação, paginação e exportação CSV.
- [ ] Ficha com detalhamento de score, etiqueta, contato pelo canal escolhido, notas e linha do tempo.
- [ ] Kanban com arrastar e soltar; `perdido` exige motivo; toda mudança gera evento.
- [ ] Lista Nutrir e lembrete de 24h.
- [ ] Página de números e configurações de pesos/limites/mensagens.

---

## 14. Estrutura sugerida de pastas

```
src/
  app/
    (public)/page.tsx            # landing
    (public)/solicitar/page.tsx
    (public)/obrigado/page.tsx
    (public)/privacidade/page.tsx
    api/leads/route.ts
    crm/...                      # Fase 2
  components/landing/...
  components/form/...
  components/crm/...
  content/landing.ts
  content/portfolio.ts
  lib/scoring.ts                 # + scoring.test.ts
  lib/schemas.ts                 # Zod
  lib/supabase/{server,client}.ts
  lib/email.ts
supabase/migrations/
DECISIONS.md
.env.example
README.md                        # como rodar local e fazer deploy
```

---

## 15. Pendências de conteúdo (usar placeholders)

- `{{PENDENTE: X}}` — % de redução de tempo (subheadline)
- `{{PENDENTE: X}}` — horas (card "A Solução")
- `{{PENDENTE: X}}` — dias úteis (passo 2)
- Prazo de retorno ao lead
- Logotipo SVG, assinatura, fontes originais
- Vídeo/imagem do hero
- Casos do portfólio
- Domínio, e-mail remetente, número de WhatsApp
- Texto da política de privacidade
