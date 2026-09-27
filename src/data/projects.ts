// ──────────────────────────────────────────────────────────────────────
// COMO ADICIONAR UM NOVO PROJETO AO PORTFÓLIO
//
// 1. salve o preview do projeto como raw-images/<slug>.png (ou .jpg)
//    e rode `npm run images` — isso gera o webp otimizado em
//    public/images/projects/<slug>.webp (lazy loading já configurado).
// 2. copie um dos objetos abaixo, cole no topo da lista e preencha
//    os campos. pronto: o grid do portfólio, o filtro por categoria
//    e a página de detalhe /projetos/<slug> se atualizam sozinhos.
// 3. `url` é opcional — quando existir, a página de detalhe mostra o
//    botão "ver projeto online".
//
// quando o catálogo crescer, dá pra migrar pra um CMS (sanity,
// contentful…) mantendo a interface `Project` abaixo como contrato —
// basta que a fonte de dados retorne objetos neste formato.
// ──────────────────────────────────────────────────────────────────────

export type ProjectCategory =
  | "institucional"
  | "e-commerce"
  | "landing-page"
  | "sistema-web";

export interface Project {
  /** usado na URL da página de detalhe: /projetos/<slug> */
  slug: string;
  title: string;
  client: string;
  year: number;
  category: ProjectCategory;
  /** uma linha que resume o projeto (aparece no card do portfólio) */
  tagline: string;
  /** preview — gerado por `npm run images` a partir de raw-images/<slug>.png */
  cover: string;
  /** descrição da imagem para leitores de tela */
  coverAlt: string;
  /** endereço do site publicado (opcional) */
  url?: string;
  /** contexto do projeto — página de detalhe */
  problem: string;
  solution: string;
  stack: string[];
  /** resultados e destaques — página de detalhe */
  highlights: string[];
}

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  institucional: "institucional",
  "e-commerce": "e-commerce",
  "landing-page": "landing page",
  "sistema-web": "sistema web",
};

export const projects: Project[] = [
  {
    slug: "nordal",
    title: "nordal arquitetura",
    client: "nordal arquitetura",
    year: 2026,
    category: "institucional",
    tagline: "site institucional que traduz o rigor do brutalismo em experiência digital",
    cover: "/images/projects/nordal.webp",
    coverAlt:
      "fachada de concreto brutalista com sombras geométricas e luz violeta ao entardecer",
    problem:
      "um escritório com portfólio forte escondido atrás de um site lento, desatualizado e impossível de navegar no celular. os projetos mais importantes nem apareciam na primeira tela.",
    solution:
      "reconstrução do zero: identidade escura e tipografia forte, galeria de projetos com lazy loading e navegação fluida. o site virou extensão do trabalho do escritório.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    highlights: [
      "nota 99 no pageSpeed insights (mobile)",
      "+62% de tempo médio de sessão",
      "carrega em menos de 1 segundo em 4g",
    ],
  },
  {
    slug: "alvorada",
    title: "alvorada coffee",
    client: "alvorada cafés especiais",
    year: 2026,
    category: "e-commerce",
    tagline: "e-commerce de cafés especiais com assinatura mensal e checkout em uma página",
    cover: "/images/projects/alvorada.webp",
    coverAlt:
      "grãos de café torrado sobre ardósia preta com fumaça suave e luz âmbar",
    problem:
      "a marca vendia só em marketplace: comissão alta, nenhum dado próprio do cliente e zero relacionamento pós-venda. o clube de assinatura existia só no papel.",
    solution:
      "loja própria com checkout em uma página, assinatura recorrente com gestão de frequência, automação de frete e e-mails transacionais que parecem a marca.",
    stack: ["Next.js", "Stripe", "Tailwind CSS", "Sanity CMS"],
    highlights: [
      "+38% de margem líquida por pedido",
      "2.400 assinantes ativos no clube",
      "taxa de conversão de 3,2%",
    ],
  },
  {
    slug: "pulse",
    title: "pulse fitness",
    client: "pulse academias",
    year: 2025,
    category: "landing-page",
    tagline: "landing page de captação que multiplicou as aulas experimentais agendadas",
    cover: "/images/projects/pulse.webp",
    coverAlt:
      "silhueta de atleta correndo com rastros de luz e contorno neon violeta sobre fundo escuro",
    problem:
      "as campanhas pagas mandavam tráfego para a home antiga e genérica — conversão de 0,4% e custo por lead subindo todo mês.",
    solution:
      "landing page com uma única ação (agendar aula experimental), prova social acima da dobra, formulário curto e testes A/B de headline rodando desde o primeiro dia.",
    stack: ["React", "Tailwind CSS", "Vercel", "GA4"],
    highlights: [
      "conversão de 0,4% para 5,1%",
      "custo por lead 57% menor",
      "nota máxima no pageSpeed mobile",
    ],
  },
  {
    slug: "conecta",
    title: "conecta crm",
    client: "conecta soluções",
    year: 2025,
    category: "sistema-web",
    tagline: "plataforma de gestão para clínicas — agenda, pipeline e lembretes automáticos",
    cover: "/images/projects/conecta.webp",
    coverAlt:
      "painéis translúcidos flutuantes com gráficos violetas luminosos sobre fundo escuro",
    problem:
      "a operação vivia em planilhas soltas, agenda no papel e clientes esquecidos sem retorno. cada atendente tinha um método próprio — e nenhum deles escalava.",
    solution:
      "sistema web sob medida com agenda unificada, pipeline de atendimento, lembretes automáticos por whatsapp e relatórios de ocupação em tempo real.",
    stack: ["React", "Node.js", "PostgreSQL", "WebSockets"],
    highlights: [
      "12 clínicas no primeiro trimestre",
      "redução de 70% em no-show com lembretes",
      "suporte centralizado em uma única ferramenta",
    ],
  },
  {
    slug: "vetra",
    title: "vetra & associados",
    client: "vetra advocacia",
    year: 2025,
    category: "institucional",
    tagline: "presença digital sóbria e confiável para um escritório de advocacia corporativa",
    cover: "/images/projects/vetra.webp",
    coverAlt:
      "livros de direito empilhados ao lado de coluna de mármore com iluminação lateral dramática",
    problem:
      "o site anterior parecia um blog de 2011: sem versão mobile, conteúdo solto e nenhuma hierarquia de áreas de atuação. clientes chegavam confusos.",
    solution:
      "identidade editorial escura, áreas de atuação claras logo na home e conteúdo jurídico estruturado para SEO local — com foco em consultas de alto valor.",
    stack: ["Next.js", "MDX", "Tailwind CSS"],
    highlights: [
      "+210% em leads orgânicos em 6 meses",
      "primeira posição no google na busca da região",
      "mobile-first de ponta a ponta",
    ],
  },
  {
    slug: "lume",
    title: "lume cosmetics",
    client: "lume beleza natural",
    year: 2026,
    category: "e-commerce",
    tagline: "loja de cosméticos naturais com vitrine digital premium e avaliação de clientes",
    cover: "/images/projects/lume.webp",
    coverAlt:
      "frascos de cosméticos pretos com reflexos violeta e brilho suave sobre fundo preto",
    problem:
      "a marca crescia no instagram, mas o site não traduzia o posicionamento premium — e o checkout em três etapas assustava quem vinha do celular.",
    solution:
      "vitrine digital com storytelling por produto, avaliações verificadas, checkout otimizado e integração direta com a logística da marca.",
    stack: ["Next.js", "Shopify headless", "Tailwind CSS"],
    highlights: [
      "ticket médio 24% maior",
      "investimento pago de volta em 45 dias",
      "4,9 de média nas avaliações",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
