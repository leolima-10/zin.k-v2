# BRAND-SPEC — zin.k V1.0 (aplicado ao repo zin.k-v2)

## Paleta (tokens em src/index.css, dentro de @theme)
- --color-ink: #121212 (preto da marca — era #0a0a0b)
- --color-surface: #171717 (era #141416)
- --color-surface-2: #1f1f1f (era #1c1c1f)
- --color-cream: #fff9e5 (creme da marca — era #f5f5f5)
- --color-fog: #d3d3d3 (cinza da marca — token novo)
- --color-accent: #4400d6 (roxo elétrico — era #8b5cf6)
- --color-accent-text: #9166dc (tom claro do roxo, 4,58:1 sobre #121212 — era #a78bfa; NUNCA usar #4400d6 puro como cor de texto/ícone informativo sobre fundo escuro, contraste real é 1,98:1)

## Tipografia (troca de pacotes @fontsource-variable)
- Display/logo: Unbounded (peso 900) — troca @fontsource-variable/space-grotesk
- Texto/UI: DM Sans — troca @fontsource-variable/inter
- Código/labels: JetBrains Mono — novo (não existia)
- Mantém a variável --font-display / --font-sans já usadas no Tailwind; adiciona --font-mono

## Logo
- "zin" + círculo (ponto) + "k" em Unbounded 900 minúsculo, "company" em DM Sans 300 abaixo com tracking largo.
- Variantes: dark (texto creme, ponto roxo) · light (texto preto, ponto preto) · purple (texto creme, ponto creme).
- Navbar usa a versão compact (sem "company"); Footer usa a versão completa (com "company").

## Favicon / ícone
- Quadrado #121212 com círculo #4400D6 central (~40% do lado), cantos arredondados (~23%).

## Roxo antigo → novo (varredura de código)
- #8b5cf6 → #4400d6 (usos decorativos: fundos, ícones sólidos, glows)
- #a78bfa → #9166dc (usos como texto/número/highlight claro — mesma razão do token accent-text)
- rgba(139, 92, 246, / rgba(139,92,246, → rgba(68, 0, 214, (sombras/glows)
- 4 lugares usam `text-accent` puro (Logo.tsx, Hero.tsx, Process.tsx, NotFound.tsx) — Logo.tsx é reescrito na Fase 2; os outros 3 trocam para `text-accent-text` (o tom claro), porque #4400d6 como texto reprova contraste.

## Seções
- Hero: escura, com pattern novo.
- Sobre, Portfólio, Processo: continuam escuras (bg-surface).
- Serviços: vira seção CREME (bg-cream, texto ink), cards escuros por cima.
- Nasce uma faixa roxa curta "Vamos criar juntos?" perto do rodapé (novo, pequeno).
- Contato (formulário): continua escura, só troca as cores de destaque.

## Fora de escopo nesta tarefa
- Não adicionar "apps" como serviço novo.
- Não mexer em componentes não usados (ContactButton, LiveProjectButton, Skeleton, LoadingSpinner, AnimatedText, Magnet, FadeIn, Marquee).
- Não trocar e-mail/whatsapp/instagram em src/data/site.ts.