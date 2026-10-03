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
    slug: "dra-aline-lopes",
    title: "dra. aline lopes",
    client: "dra. aline lopes — dermatologia",
    year: 2026,
    category: "institucional",
    tagline: "site institucional para dermatologia e medicina estética, com foco no agendamento.",
    cover: "/images/projects/dra-aline-lopes.webp",
    coverAlt: "captura de tela da página inicial do site dra. aline lopes",
    url: "https://site-aline.marcelo-palumbof.workers.dev/",
    problem:
      "uma dermatologista de lauro de freitas (ba) que une clínica, estética e medicina integrativa precisava de um site que transmitisse naturalidade e critério médico, com visual sofisticado e sem exageros.",
    solution:
      "one-page institucional com filosofia de atendimento, tratamentos, tecnologias, depoimentos, faq e passo a passo da consulta, conduzindo ao agendamento por whatsapp e instagram.",
    stack: ["HTML", "CSS", "JavaScript"],
    highlights: [
      "comunicação centrada em naturalidade e critério clínico, sem promessas de resultado",
      "tratamentos e tecnologias em seções próprias, com carrossel horizontal",
      "faq e etapas da consulta para tirar dúvidas antes do primeiro contato",
      "meta tags com seo local (lauro de freitas e salvador)",
    ],
  },
  {
    slug: "giovanna-flamiano",
    title: "giovanna flamiano",
    client: "giovanna flamiano advocacia",
    year: 2026,
    category: "institucional",
    tagline: "advocacia previdenciária com atendimento presencial em salvador e remoto no brasil todo.",
    cover: "/images/projects/giovanna-flamiano.webp",
    coverAlt: "captura de tela da página inicial do site giovanna flamiano",
    url: "https://giovannaflamiano.marcelo-palumbof.workers.dev/",
    problem:
      "uma advogada que atua exclusivamente com direito previdenciário precisava explicar o inss de forma clara e humana, para segurados de qualquer lugar do país.",
    solution:
      "one-page com especialidades numeradas (aposentadorias, revisões, bpc/loas, benefícios por incapacidade, salário-maternidade), números do escritório, atendimento remoto em 3 passos e chamadas diretas para whatsapp e telefone.",
    stack: ["HTML", "CSS", "JavaScript"],
    highlights: [
      "linguagem acessível para quem não conhece as regras do inss",
      "atendimento remoto explicado em 3 passos",
      "cta para whatsapp e telefone em pontos estratégicos da página",
      "rodapé com aviso de publicidade (provimento 205/2021 da oab)",
    ],
  },
  {
    slug: "novo-conceito",
    title: "novo conceito",
    client: "novo conceito academia de beleza",
    year: 2026,
    category: "institucional",
    tagline: "academia de beleza com vídeos da estrutura e matrícula direto pelo whatsapp.",
    cover: "/images/projects/novo-conceito.webp",
    coverAlt: "captura de tela da página inicial do site novo conceito",
    url: "https://escolanovoconceito.marcelo-palumbof.workers.dev/",
    problem:
      "uma escola de beleza de lauro de freitas (ba), do grupo ajg, queria mostrar que o aluno treina em estações de trabalho reais e converter visitas em matrículas.",
    solution:
      "one-page com galeria da estrutura, formações (barbearia, cabeleireiro, estética e massoterapia, gestão de salão), vídeos de bastidores e depoimento da direção, com botão de whatsapp e mensagem pré-preenchida.",
    stack: ["HTML", "CSS", "JavaScript"],
    highlights: [
      "vídeos reais da escola e depoimento da direção dentro da página",
      "copy focada em profissão, não só em curso",
      "cta de whatsapp com mensagem pré-preenchida",
      "contatos, endereço e redes no fechamento da página",
    ],
  },
  {
    slug: "nixus-marketing",
    title: "agência nixus",
    client: "agência nixus",
    year: 2026,
    category: "landing-page",
    tagline: "agência de marketing digital com captação de leads por formulário e whatsapp.",
    cover: "/images/projects/nixus-marketing.webp",
    coverAlt: "captura de tela da página inicial do site agência nixus",
    url: "https://nixusmarketing.lovable.app/",
    problem:
      "uma agência de marketing de salvador precisava apresentar método, serviços, equipe e parceiros em uma página que transformasse visita em contato qualificado.",
    solution:
      "página única com formulário que qualifica o lead pela faixa de faturamento, método em 4 etapas (diagnóstico, estratégia, execução e otimização), serviços, equipe, parceiros e módulos de plano, com cta de whatsapp pré-preenchido.",
    stack: ["React", "TypeScript", "Tailwind CSS"],
    highlights: [
      "formulário com faixa de faturamento mensal para qualificar o lead",
      "método em 4 etapas apresentado de forma visual",
      "módulos de plano (essencial, performance e premium) e seção de parceiros",
      "cta de whatsapp com mensagem pré-preenchida",
    ],
  },
  {
    slug: "convite-brenda",
    title: "convite de 15 anos",
    client: "brenda",
    year: 2026,
    category: "landing-page",
    tagline: "convite digital de debutante com tema de realeza e confirmação de presença.",
    cover: "/images/projects/convite-brenda.webp",
    coverAlt: "captura de tela da página inicial do site convite de 15 anos",
    url: "https://convitebrenda.lovable.app/",
    problem:
      "uma festa de 15 anos pedia um convite que fosse parte da experiência e reunisse data, local, traje e confirmação de presença em um só lugar.",
    solution:
      "landing page temática com carta de convocação, mensagem da aniversariante, ideias de presente, traje, vídeo e fotos do espaço, link do google maps e confirmação de presença por formulário, além de painel restrito para a aniversariante.",
    stack: ["React", "TypeScript", "Tailwind CSS"],
    highlights: [
      "narrativa temática (castelos, coroas e realeza) do início ao fim",
      "confirmação de presença em um clique, sem login",
      "link direto para o google maps com ponto de referência",
      "painel restrito para a aniversariante",
    ],
  },
  {
    slug: "menustart",
    title: "menustart",
    client: "menustart",
    year: 2026,
    category: "sistema-web",
    tagline: "cardápio digital com carrinho, pedido por whatsapp e painel para cadastrar produtos.",
    cover: "/images/projects/menustart.webp",
    coverAlt: "captura de tela da página inicial do site menustart",
    url: "https://menustart.lovable.app/",
    problem:
      "pequenos restaurantes e deliveries precisam de um cardápio fácil de manter e de um caminho curto entre escolher o prato e fechar o pedido.",
    solution:
      "cardápio digital com categorias, carrinho e envio do pedido via whatsapp, mais um painel administrativo para cadastrar produtos sem depender de desenvolvedor.",
    stack: ["React", "TypeScript", "Tailwind CSS"],
    highlights: [
      "status de funcionamento e tempo estimado de entrega no topo",
      "filtro por categorias",
      "carrinho e pedido pelo whatsapp",
      "painel administrativo para cadastrar produtos",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}