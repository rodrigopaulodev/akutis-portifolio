# Design: Dark theme da landing page alinhado ao app Akutis

**Data:** 2026-06-11
**Status:** Aprovado

## Objetivo

Restilizar a landing page para adotar a identidade visual do app mobile Akutis (tela de login): tema escuro azul-marinho/preto, acentos em azul `#2563eb`, logo branco e efeitos de brilho. Conteúdo e seções permanecem os mesmos.

## Decisões (validadas com o usuário)

1. **Dark theme completo** — página inteira escura, sem toggle de tema claro.
2. **Fundo recriado com CSS** — gradientes, glows e dot patterns; sem imagem de fundo.
3. **Logo branco** — asset fornecido em `src/imports/logo-white.png`.
4. **Mesmo conteúdo** — apenas restyle; sem slogan novo nem mudanças de texto.

## Paleta

| Token | Valor | Uso |
|---|---|---|
| `--background` | `#070b14` | Fundo base (quase preto azulado) |
| gradiente de fundo | `#070b14` → `#0d1526` | Profundidade nas seções |
| `--card` | `#111827` | Cards e superfícies |
| borda de card | `rgba(59,130,246,0.15)` | Bordas sutis azuladas |
| `--primary` | `#2563eb` | Botões e acentos (igual ao app) |
| `--foreground` | branco | Texto principal |
| `--muted-foreground` | `#94a3b8` | Texto secundário |

## Efeitos visuais (CSS puro)

- Glow radial azul sutil atrás do logo no hero (eco do brilho do app)
- Dot grid azul com baixa opacidade nos cantos das seções
- Linhas diagonais de gradiente sutis no fundo do hero (eco das texturas de barbearia)
- Cards de features: hover acende borda azul + glow

## Arquivos alterados

1. `src/styles/theme.css` — nova paleta no `:root` (abordagem de tokens; componentes shadcn herdam automaticamente)
2. `src/app/App.tsx` — troca para `logo-white.png`, classes de glow/textura, contraste de cards e CTA
3. `index.html` — `<meta name="theme-color">` escuro

## Abordagem escolhida

Redefinir tokens em `:root` (não usar a classe `.dark` nem hardcodar cores no componente). Motivo: mínimo de código alterado, consistência automática nos componentes shadcn, paleta única fácil de manter.

## Verificação

- `pnpm build` compila sem erros
- Screenshot via dev server confere: fundo escuro, logo branco legível, contraste adequado nos textos e cards, botões azuis consistentes com o app
