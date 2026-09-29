# 🛡️ Anti-AI Design System & Guidelines
> **Objetivo:** Garantir que todas as aplicações desenvolvidas tenham um acabamento de software profissional, refinado e humano, eliminando vícios visuais, genéricos e clichês típicos de protótipos gerados por Inteligência Artificial.

---

## 1. O Manifesto Anti-IA

Aplicações geradas por IA costumam parecer genéricas porque aplicam as mesmas receitas prontas: luzes *neon*, gradientes violeta/ciano, frases de efeito vazias e layouts espaçados sem densidade real de informação.

### ❌ O que É "Cara de IA":
- Gradientes de fundo roxo/azul/rosa neon com desfoque excessivo (`backdrop-blur` e `blur-3xl`).
- Cartões flutuantes com bordas brilhantes coloridas em fundo escuro.
- Textos genéricos: *"Revolucione seu fluxo"*, *"Eleve sua experiência"*, *"Desbloqueie o poder de..."*.
- Ícones dentro de quadradinhos coloridos (`bg-indigo-100 text-indigo-600 rounded-lg p-3`).
- Layouts vazios, sem suporte para tabelas densas, atalhos de teclado, estados de erro ou listas reais.

### ✅ O que É "Software Profissional":
- **Contraste e Nitidez:** Bordas finas de 1px (`border-zinc-200` ou `border-zinc-800`), sombras sutis e superfícies bem definidas.
- **Densidade Funcional:** Informação na medida certa, sem desperdício de espaço na tela.
- **Copywriting Direto:** Textos curtos, objetivos, que explicam *o que o botão faz* ou *qual é o dado apresentado*.
- **Cores Intencionais:** Cores neutras dominantes e cores de destaque (accent) usadas apenas para ações primárias e status real (sucesso, aviso, erro).

---

## 2. Paleta de Cores e Superfícies

### A Regra Neutra (90/10)
90% da sua aplicação deve ser composta por tons neutros rigorosamente escolhidos. Os 10% restantes são reservados para cores de ação e status.

#### ☀️ Light Mode (Tons de Areia / Cinza Mineral)
- **Fundo da Página:** `#FBFBFB` ou `#F4F4F5` (Evite o branco absoluto `#FFFFFF` no fundo principal).
- **Superfícies / Cards:** `#FFFFFF` com bordas sutis (`#E4E4E7`).
- **Texto Principal:** `#18181B` (Cinza quase preto, nunca `#000000` puro).
- **Texto Secundário:** `#71717A`.
- **Bordas:** `#E4E4E7` (1px sólido).

#### 🌙 Dark Mode (Tons de Grafite / Slate)
- **Fundo da Página:** `#09090B` ou `#0F0F11` (Evite preto puro `#000000`, exceto em painéis OLED específicos).
- **Superfícies / Cards:** `#18181B` com bordas em `#27272A`.
- **Texto Principal:** `#FAFAFA`.
- **Texto Secundário:** `#A1A1AA`.
- **Bordas:** `#27272A` ou `#3F3F46`.

### 🚫 Proibições de Cores
1. **Jamais use** o gradiente `purple-600` para `indigo-600` para `cyan-400` em botões ou títulos.
2. **Jamais use** brilhos radiais gigantes (`bg-purple-500/20 blur-3xl`) no fundo da página.
3. Use cores vivas (Verde, Esmeralda, Coral, Azul Cobalto) como **blocos sólidos ou acentos pontuais**, nunca como gradientes de luz neon.

---

## 3. Copywriting & Linguagem (Anti-ChatGPT)

O tom de voz do software deve ser **humano, utilitário e direto ao ponto**.

### Vocabulário Banido vs. Substituto Profissional

| ❌ Texto Gerado por IA | ✅ Texto de Software Profissional |
| :--- | :--- |
| "Eleve a sua produtividade ao próximo nível" | "Gerencie suas tarefas em um só lugar" |
| "Transforme sua gestão com inteligência" | "Projetos e finanças da sua empresa" |
| "Desbloqueie insights valiosos" | "Relatório de vendas mensais" |
| "Seamless", "Seamlessly" | "Integrado" ou nem mencione a palavra |
| "Mastering", "Empower", "Revolutionary" | Descreva o recurso real (ex: "Exportar em PDF") |
| "Delve into the details" | "Ver detalhes" |

### Regras de Microcopy
- **Botões:** Devem conter verbos no infinitivo ou ações diretas.
  - *Ruim:* "Comece sua jornada agora"
  - *Bom:* "Criar conta", "Salvar alterações", "Exportar CSV"
- **Mensagens de Erro:** Explique o erro e dê a solução.
  - *Ruim:* "Ops! Algo deu errado no nosso sistema revolucionário."
  - *Bom:* "Não foi possível salvar o arquivo. Verifique sua conexão e tente novamente."

---

## 4. Componentes e Estrutura de UI

### Botões (Buttons)
- **Primary:** Cor de marca sólida (ex: `#18181B` no light mode ou `#FAFAFA` no dark mode), texto em alto contraste, cantos levemente arredondados (`rounded-md` ou `rounded-lg`).
- **Secondary:** Fundo transparente com borda de 1px ou fundo neutro suave (`bg-zinc-100` / `bg-zinc-800`).
- **Feedback:** Estado de `:hover` com mudança de opacidade suave (`hover:opacity-90`) ou escurecimento/clareamento sutil, sem animações extravagantes.

### Cards e Contêineres
- **Bordas Finas:** Substitua sombras gigantes de IA por bordas limpas de 1px: `border border-zinc-200 dark:border-zinc-800`.
- **Sombras:** Se usar sombra, prefira `shadow-sm` ou uma sombra interna muito discreta.
- **Espaçamento Interno:** Padding consistente (`p-4` para componentes menores, `p-6` para seções principais).

### Tabelas e Dados
Aplicações profissionais vivem de dados estruturados.
- Linhas com divisórias sutis de 1px.
- Cabeçalhos em caixa alta leve ou texto em caixa baixa com opacidade reduzida (`text-xs font-medium text-zinc-500 uppercase tracking-wider`).
- Suporte a tags de status minimalistas (ex: bolinha verde de 6px + texto "Ativo").

### Atalhos de Teclado & Micro-detalhes
Softwares reais (SaaS de nível produtivo) oferecem detalhes de usabilidade:
- Indicadores de atalho de teclado: badges `<kbd>⌘K</kbd>` ou `<kbd>Esc</kbd>`.
- Tooltips discretos em ícones sem texto.
- Indicador de estado de salvamento ("Salvo rascunho há 2 min").

---

## 5. Tipografia

- **Fontes do Sistema ou Sans-serif Neutras:**
  - Primárias recomendadas: `Inter`, `Geist`, `Plus Jakarta Sans`, `SF Pro Display` (ou pilha nativa do sistema `system-ui`).
  - Para código/dados numéricos: `JetBrains Mono`, `Geist Mono` ou `Fira Code`.
- **Hierarquia Escalar:**
  - **H1 (Títulos principais):** `text-2xl` a `text-3xl`, peso `font-semibold` ou `font-bold`, `tracking-tight`. (Evite títulos gigantes de 72px em dashboards).
  - **Body (Corpo):** `text-sm` (14px) para aplicações densas / dashboards, `text-base` (16px) para páginas de leitura.
  - **Labels / Captions:** `text-xs` (12px) `font-medium`.

---

## 6. Checklist de Validação Anti-IA (Antes de dar Deploy)

Antes de considerar a interface pronta, valide os seguintes pontos:

- [ ] **A paleta de cores tem mais de 3 cores chamativas ao mesmo tempo?** Se sim, reduza.
- [ ] **Existe algum efeito de brilho radial (`blur-3xl`) sem utilidade na tela?** Se sim, remova.
- [ ] **O texto principal parece propaganda de marketing ou instrução de software?** Substitua jargões por linguagem direta.
- [ ] **Os botões e ícones possuem estados de hover e focus acessíveis?**
- [ ] **Há densidade de informação apropriada para a tela sem espaços brancos vazios desproporcionais?**
- [ ] **As bordas de 1px definem claramente a divisão dos componentes?**
- [ ] **A fonte é legível e o contraste de texto atende aos padrões de acessibilidade (WCAG)?**