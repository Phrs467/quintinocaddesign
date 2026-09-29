# Quintino Hub

Instabio / landing page da Quintino Dental Design (design de próteses em ExoCad). A única ação da página é o botão **"Falar no WhatsApp"**, que abre a conversa com uma mensagem pré-preenchida. O número e a mensagem ficam em `src/content/landing.ts` (objeto `whatsapp`).

Especificação original: [`quintino-hub-spec.md`](quintino-hub-spec.md) (formulário e CRM foram retirados — ver [`DECISIONS.md`](DECISIONS.md)).

## Rodar localmente

Requisito: Node 20.9+.

```bash
npm install
npm run dev                  # http://localhost:3000
```

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run typecheck` | Checagem de tipos |
| `npm run lint` | ESLint |
| `npm run build` | Build de produção |

## Deploy (Vercel)

1. Preencha `whatsapp.numero` em `src/content/landing.ts` (só dígitos, com 55 e DDD) e faça commit.
2. Importe o repositório na Vercel (framework Next.js detectado automaticamente) e faça o deploy. Não há variáveis de ambiente, banco de dados nem chaves.

## Onde editar o conteúdo

- Textos da página, texto do botão, número e mensagem do WhatsApp: `src/content/landing.ts`
- Casos do portfólio: `src/content/portfolio.ts` (imagens em `public/`)
- Vídeo do hero e dos passos: `hero.videoSrc` e `comoFunciona.passos[i].videoSrc` em `src/content/landing.ts`
- Logo: `public/brand/logo.png` (recortada de `public/logo_sem_fundo_escura.png`)
