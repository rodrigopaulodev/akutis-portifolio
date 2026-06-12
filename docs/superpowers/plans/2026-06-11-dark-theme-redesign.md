# Dark Theme Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restilizar a landing page para o dark theme do app Akutis (azul-marinho/preto + azul #2563eb), conforme spec `docs/superpowers/specs/2026-06-11-dark-theme-redesign-design.md`.

**Architecture:** Redefinir os tokens shadcn em `:root` de `src/styles/theme.css` (componentes herdam automaticamente), adicionar classes utilitárias de efeito (glow, dot grid, linhas diagonais) no mesmo arquivo, e ajustar `src/app/App.tsx` para usar o logo branco e os efeitos. Sem testes automatizados no projeto; verificação é `pnpm build` + screenshot no dev server.

**Tech Stack:** React 18, Vite 6, Tailwind CSS 4 (tokens via CSS variables), Motion.

---

### Task 1: Paleta dark nos tokens do theme.css

**Files:**
- Modify: `src/styles/theme.css` (bloco `:root`, linhas 3–42)

- [ ] **Step 1: Substituir os valores do `:root`**

Substituir o bloco `:root { ... }` inteiro por:

```css
:root {
  --font-size: 16px;
  --background: #070b14;
  --foreground: #f8fafc;
  --card: #111827;
  --card-foreground: #f8fafc;
  --popover: #111827;
  --popover-foreground: #f8fafc;
  --primary: #2563eb;
  --primary-foreground: #ffffff;
  --secondary: #1e293b;
  --secondary-foreground: #e2e8f0;
  --muted: #0d1526;
  --muted-foreground: #94a3b8;
  --accent: #1e293b;
  --accent-foreground: #f8fafc;
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
  --border: rgba(59, 130, 246, 0.15);
  --input: transparent;
  --input-background: #111827;
  --switch-background: #334155;
  --font-weight-medium: 500;
  --font-weight-normal: 400;
  --ring: #2563eb;
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --radius: 0.625rem;
  --sidebar: #0d1526;
  --sidebar-foreground: #f8fafc;
  --sidebar-primary: #2563eb;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #1e293b;
  --sidebar-accent-foreground: #f8fafc;
  --sidebar-border: rgba(59, 130, 246, 0.15);
  --sidebar-ring: #2563eb;
}
```

- [ ] **Step 2: Adicionar classes utilitárias de efeito ao final de theme.css**

```css
/* Efeitos visuais do dark theme (eco da identidade do app) */
.hero-glow {
  background: radial-gradient(
    ellipse 60% 50% at 50% 35%,
    rgba(37, 99, 235, 0.18),
    transparent 70%
  );
}

.dot-grid {
  background-image: radial-gradient(rgba(59, 130, 246, 0.22) 1px, transparent 1px);
  background-size: 22px 22px;
  -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
}

.diagonal-lines {
  background: repeating-linear-gradient(
    135deg,
    transparent 0 48px,
    rgba(59, 130, 246, 0.05) 48px 49px
  );
}
```

- [ ] **Step 3: Verificar build**

Run: `npx pnpm build`
Expected: `✓ built` sem erros

- [ ] **Step 4: Commit**

```bash
git add src/styles/theme.css
git commit -m "feat: paleta dark e utilitarios de efeito no theme"
```

### Task 2: App.tsx — logo branco e efeitos no hero

**Files:**
- Modify: `src/app/App.tsx`

- [ ] **Step 1: Trocar o import do logo (linha 4)**

```tsx
import logoAkutis from "../imports/logo-white.png";
```

(O nome da variável `logoAkutis` permanece; hero e footer já a usam.)

- [ ] **Step 2: Container raiz com camadas decorativas**

Substituir a linha 40:

```tsx
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
```

por:

```tsx
    <div className="relative min-h-screen bg-background overflow-x-clip">
      {/* Camadas decorativas de fundo */}
      <div className="pointer-events-none absolute inset-0 diagonal-lines" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] hero-glow" aria-hidden="true" />
      <div className="pointer-events-none absolute top-12 right-0 w-72 h-72 dot-grid" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-72 h-72 dot-grid" aria-hidden="true" />
```

(Manter o fechamento `</div>` existente no fim do componente.)

- [ ] **Step 3: Botão secundário do hero (linha ~69)**

Substituir:

```tsx
            <button className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-8 py-4 rounded-lg transition-colors">
```

por:

```tsx
            <button className="border border-border bg-card/60 hover:bg-secondary text-secondary-foreground px-8 py-4 rounded-lg transition-colors">
```

- [ ] **Step 4: Verificar no dev server**

Run: dev server já em execução (porta 5173); screenshot via preview
Expected: fundo escuro, logo branco visível, glow azul atrás do logo

- [ ] **Step 5: Commit**

```bash
git add src/app/App.tsx
git commit -m "feat: logo branco e efeitos de fundo no hero"
```

### Task 3: App.tsx — cards, benefícios e footer no dark theme

**Files:**
- Modify: `src/app/App.tsx`

- [ ] **Step 1: Cards de features com hover glow (linha ~99)**

Substituir:

```tsx
              className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow"
```

por:

```tsx
              className="bg-card rounded-xl p-6 border border-border hover:border-[#2563eb]/50 hover:shadow-[0_0_28px_rgba(37,99,235,0.18)] transition-all"
```

- [ ] **Step 2: Itens de benefícios sobre seção muted (linha ~183)**

Substituir:

```tsx
              className="flex items-start gap-3 bg-background p-4 rounded-lg"
```

por:

```tsx
              className="flex items-start gap-3 bg-card border border-border p-4 rounded-lg"
```

- [ ] **Step 3: Garantir que as seções fiquem acima das camadas decorativas**

Cada `<section>` e o `<footer>` recebem `relative` no início da className (as camadas decorativas são `absolute`; conteúdo precisa de stacking context). Exemplo no hero (linha 42):

```tsx
      <section className="relative container mx-auto px-4 py-16 md:py-24">
```

Aplicar o mesmo prefixo `relative ` nas seções das linhas 77, 112, 161, 193 e no footer da linha 220.

- [ ] **Step 4: Verificar no dev server**

Run: screenshot via preview (página inteira, rolando até o footer)
Expected: cards escuros com borda azulada, benefícios legíveis, CTA azul mantido, footer com logo branco

- [ ] **Step 5: Commit**

```bash
git add src/app/App.tsx
git commit -m "feat: cards, beneficios e footer no dark theme"
```

### Task 4: index.html — theme-color e verificação final

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Adicionar meta theme-color no `<head>`**

Após a linha do viewport:

```html
    <meta name="theme-color" content="#070b14" />
```

- [ ] **Step 2: Build final**

Run: `npx pnpm build`
Expected: `✓ built` sem erros

- [ ] **Step 3: Verificação visual completa**

Screenshot do topo e do fim da página no dev server. Checar contra a spec:
- Fundo `#070b14` com gradientes
- Logo branco no hero e footer
- Glow radial atrás do logo
- Dot grids sutis nos cantos
- Botões primários azuis `#2563eb`
- Texto secundário `#94a3b8` legível

- [ ] **Step 4: Commit e push**

```bash
git add index.html
git commit -m "feat: theme-color escuro no index.html"
git push
```
