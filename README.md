<<<<<<< HEAD
# zin.k-site
Portifolio ZIN.K
=======
# zin.k — site institucional

site e portfólio da zin.k, startup de sites e soluções digitais.
react + vite + typescript + tailwind css v4 + framer motion, dark mode como tema único.

## rodando localmente

```bash
npm install
npm run dev        # http://localhost:5173
```

outros scripts:

```bash
npm run build      # build de produção (dist/)
npm run preview    # serve o build localmente
npm run images     # otimiza screenshots de projetos (ver abaixo)
node scripts/ui-check.mjs   # verificação headless da UI (precisa do dev server rodando)
```

## estrutura

```
src/
├── data/
│   ├── projects.ts    ← ★ catálogo do portfólio (edite aqui)
│   └── site.ts        ← contatos: whatsapp, e-mail, redes
├── components/        # navbar, footer, section, reveal, logo…
├── sections/          # hero, about, services, portfolio, process, contact
├── pages/             # home, project page (/projetos/:slug), 404
├── App.tsx            # rotas
└── index.css          # paleta, fontes e utilitários da marca
public/
└── images/projects/   # previews otimizados (.webp)
raw-images/            # screenshots originais (não commita; .gitignored)
scripts/
├── optimize-images.mjs  # converte raw-images/ → public/images/projects/*.webp
└── ui-check.mjs         # smoke test headless da UI (playwright + chrome)
```

## ★ como adicionar um novo projeto ao portfólio

1. **salve o preview** (screenshot do site) como `raw-images/<slug>.png`
   (aceita .jpg/.jpeg/.webp também) e rode:

   ```bash
   npm run images
   ```

   isso gera `public/images/projects/<slug>.webp` (largura máx. 1024px, qualidade 82).

2. **abra `src/data/projects.ts`**, copie um objeto existente e cole no topo
   da lista `projects`:

   ```ts
   {
     slug: "acme",                    // usado na URL: /projetos/acme
     title: "acme logística",
     client: "acme logística",
     year: 2026,
     category: "sistema-web",         // institucional | e-commerce | landing-page | sistema-web
     tagline: "uma linha que resume o projeto (aparece no card)",
     cover: "/images/projects/acme.webp",
     coverAlt: "descrição da imagem para leitores de tela",
     url: "https://acme.com.br",      // opcional — botão "ver projeto online"
     problem: "o contexto e a dor do cliente…",
     solution: "o que a zin.k construiu…",
     stack: ["React", "Node.js"],
     highlights: ["resultado 1", "resultado 2"],
   }
   ```

   pronto. o grid do portfólio, o filtro por categoria (com contadores
   automáticos) e a página de detalhe `/projetos/acme` se atualizam sozinhos.
   nenhuma categoria nova aparece no filtro? ela precisa existir em
   `ProjectCategory` e `CATEGORY_LABELS` (mesmo arquivo).

> **migração futura para CMS:** a interface `Project` de `src/data/projects.ts`
> é o contrato. quando o catálogo crescer, basta que a fonte de dados
> (sanity, contentful…) retorne objetos nesse formato — nenhum componente
> precisa mudar.

## personalização rápida

- **cores/efeitos:** variáveis em `@theme` no `src/index.css`
- **contatos/canais:** `src/data/site.ts` (whatsapp, e-mail, instagram, linkedin)
- **meta tags/SEO:** `index.html` — troque `og:image` por uma URL absoluta
  (ex.: `https://seudominio.com.br/images/og.jpg`) ao publicar
- **favicon:** `public/favicon.svg`

## deploy

**vercel:** importe o repositório — o preset vite é detectado automaticamente.
o `vercel.json` já cuida do rewrite de SPA (rotas como `/projetos/:slug`).

**netlify:** build `npm run build`, publish directory `dist/`.
o `public/_redirects` (`/* /index.html 200`) já cobre o roteamento de SPA.
>>>>>>> 406ea5a (primeiro commit)
