/**
 * tabela de preços da zin.k — conteúdo portado de valores-zink.vercel.app.
 * mantenha valores, prazos, features e ordem sincronizados com a fonte oficial.
 */
export type PricingCategoryId = "sites" | "sistemas" | "ia" | "suporte";

export interface PricingCategory {
  id: PricingCategoryId;
  label: string;
  order: number;
}

export interface PricingService {
  id: string;
  category: PricingCategoryId;
  name: string;
  priceFrom: number;
  unit: "unico" | "mensal";
  description: string;
  features: string[];
  timeline: string;
  popular?: boolean;
  order: number;
}

export const PRICING_CATEGORIES: PricingCategory[] = [
  { id: "sites", label: "Sites", order: 1 },
  { id: "sistemas", label: "Sistemas e Apps", order: 2 },
  { id: "ia", label: "Inteligência Artificial", order: 3 },
  { id: "suporte", label: "Suporte Mensal", order: 4 },
];

export const PRICING_SERVICES: PricingService[] = [
  {
    id: "landing-page",
    category: "sites",
    name: "Landing Page",
    priceFrom: 2500,
    unit: "unico",
    description:
      "Página única de alta conversão para validar uma oferta, captar leads ou lançar um produto.",
    features: [
      "Design responsivo sob medida",
      "Copy orientada à conversão",
      "Formulários e botão de WhatsApp",
      "SEO técnico básico (meta tags, sitemap)",
      "Google Analytics e Pixel de anúncios",
      "Publicação e configuração de domínio",
    ],
    timeline: "7 a 10 dias",
    order: 1,
  },
  {
    id: "site-institucional",
    category: "sites",
    name: "Site Institucional",
    priceFrom: 4500,
    unit: "unico",
    description:
      "Site completo para apresentar sua empresa, serviços e resultados com credibilidade.",
    features: [
      "Design exclusivo alinhado à sua marca",
      "Até 8 páginas otimizadas",
      "Painel para atualizar conteúdo (CMS)",
      "SEO técnico e dados estruturados",
      "Integração com WhatsApp e formulários",
      "Treinamento rápido da equipe",
    ],
    timeline: "15 a 25 dias",
    popular: true,
    order: 2,
  },
  {
    id: "ecommerce",
    category: "sites",
    name: "E-commerce",
    priceFrom: 6000,
    unit: "unico",
    description:
      "Loja virtual completa com catálogo, pagamentos, frete e gestão de pedidos.",
    features: [
      "Catálogo com produtos e variações",
      "Carrinho e checkout otimizados",
      "Pagamentos via Pix, cartão e boleto",
      "Cálculo de frete e prazos",
      "Painel de pedidos e estoque",
      "Integração com WhatsApp e ERP",
    ],
    timeline: "30 a 50 dias",
    order: 3,
  },
  {
    id: "portal-blog",
    category: "sites",
    name: "Portal / Blog de conteúdo",
    priceFrom: 4000,
    unit: "unico",
    description:
      "Plataforma de conteúdo com categorias, busca interna e área de assinantes.",
    features: [
      "Editor de conteúdo com CMS",
      "Categorias, tags e busca interna",
      "Layouts de listagem e de artigo",
      "SEO técnico e performance",
      "Compartilhamento em redes sociais",
      "Captura de e-mails / newsletter",
    ],
    timeline: "15 a 25 dias",
    order: 4,
  },
  {
    id: "saas-mvp",
    category: "sistemas",
    name: "Sistema web / SaaS sob medida (MVP)",
    priceFrom: 10000,
    unit: "unico",
    description:
      "Do zero ao produto no ar: discovery, protótipo, desenvolvimento e primeiros usuários.",
    features: [
      "Discovery e definição de escopo",
      "Protótipo navegável antes do código",
      "Sistema multiusuário com perfis de acesso",
      "Painel administrativo completo",
      "Integrações com pagamentos e e-mail",
      "Implantação, monitoramento e treinamento",
    ],
    timeline: "45 a 90 dias",
    order: 1,
  },
  {
    id: "app-mobile",
    category: "sistemas",
    name: "Aplicativo mobile (iOS/Android)",
    priceFrom: 15000,
    unit: "unico",
    description:
      "App para iOS e Android publicado nas lojas, com painel de gestão incluso.",
    features: [
      "Um só código para iOS e Android",
      "Publicação na App Store e Google Play",
      "Login, notificações push e modo offline",
      "Painel administrativo para gestão",
      "Integrações (pagamentos, mapas, IA)",
      "Testes, submissão nas lojas e suporte inicial",
    ],
    timeline: "60 a 120 dias",
    order: 2,
  },
  {
    id: "ferramentas-internas",
    category: "sistemas",
    name: "Ferramentas internas (dashboards e automações)",
    priceFrom: 4000,
    unit: "unico",
    description:
      "Painéis e automações que eliminam planilhas manuais e agilizam o dia a dia do time.",
    features: [
      "Dashboard com indicadores em tempo real",
      "Automação de rotinas repetitivas",
      "Integração com planilhas, CRM e ERP",
      "Controle de acesso por perfil",
      "Relatórios exportáveis (PDF/Excel)",
      "Treinamento do time e documentação",
    ],
    timeline: "20 a 40 dias",
    popular: true,
    order: 3,
  },
  {
    id: "chatbot-ia",
    category: "ia",
    name: "Agente / Chatbot com IA",
    priceFrom: 3000,
    unit: "unico",
    description:
      "Atendimento inteligente no site e no WhatsApp, treinado com o conteúdo da sua empresa.",
    features: [
      "Chat no site e/ou no WhatsApp",
      "Treinado com seus documentos e FAQs",
      "Transbordo para atendimento humano",
      "Captação de contatos e histórico",
      "Painel de conversas e métricas",
      "Ajustes de tom de voz e respostas",
    ],
    timeline: "15 a 30 dias",
    popular: true,
    order: 1,
  },
  {
    id: "automacoes-ia",
    category: "ia",
    name: "Automações e integrações com IA",
    priceFrom: 2000,
    unit: "unico",
    description:
      "Fluxos que conectam suas ferramentas e usam IA para triagem, resumos e extração de dados.",
    features: [
      "Mapeamento de processos a automatizar",
      "Integração entre CRM, ERP, e-mail e planilhas",
      "Resumos, triagem e extração com IA",
      "Alertas e relatórios automáticos",
      "Monitoramento e tratamento de falhas",
      "Documentação do fluxo entregue",
    ],
    timeline: "10 a 20 dias",
    order: 2,
  },
  {
    id: "consultoria-ia",
    category: "ia",
    name: "Consultoria e implantação de IA",
    priceFrom: 2000,
    unit: "unico",
    description:
      "Diagnóstico das oportunidades de IA no seu negócio e plano de implantação priorizado.",
    features: [
      "Workshop com a liderança",
      "Mapa de casos de uso com ROI estimado",
      "Seleção de ferramentas e fornecedores",
      "Plano de implantação em etapas",
      "Políticas de uso responsável e segurança",
      "Acompanhamento das primeiras entregas",
    ],
    timeline: "sob escopo",
    order: 3,
  },
  {
    id: "suporte-mensal",
    category: "suporte",
    name: "Suporte e evolução mensal",
    priceFrom: 500,
    unit: "mensal",
    description:
      "Cuidado contínuo com o site ou sistema já no ar, com horas garantidas todo mês.",
    features: [
      "Monitoramento e correção de bugs",
      "Atualizações de segurança",
      "Pequenas melhorias e ajustes de conteúdo",
      "Horas de desenvolvimento todo mês",
      "Relatório mensal de atividades",
      "Atendimento prioritário no WhatsApp",
    ],
    timeline: "contínuo",
    order: 1,
  },
];

export const PRICING_NOTE =
  "Valores base. Cada projeto recebe proposta personalizada.";
export const PRICING_UPDATED_LABEL = "Valores atualizados em 09/10/2026";

export function formatPricingPrice(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
