// lib/constants.ts
// Strings canônicas da LP Pruma — editar aqui para atualizar todo o site

/** Título da página e meta Open Graph */
export const SITE_TITLE =
  "Pruma | App Web de Força de Vendas B2B para Indústrias e Distribuidoras";

/** Meta description (~150 chars) */
export const SITE_DESCRIPTION =
  "Governe sua operação comercial B2B com visibilidade total — do vendedor em campo ao conselho. App web para indústrias e distribuidoras.";

// ─── CTAs ─────────────────────────────────────────────────────────────────
/** CTA principal: aparece em Navbar, Hero e CTA Final (mínimo 3 ocorrências) */
export const CTA_PRIMARY = "Falar com um consultor";

/** CTA secundário: botão ghost no Hero */
export const CTA_SECONDARY = "Conhecer o app";

/** CTA do formulário CTA Final */
export const CTA_FORM = "Agendar conversa com consultor";

// ─── Estados do formulário ─────────────────────────────────────────────────
/** Texto de instrução do formulário vazio */
export const FORM_EMPTY_STATE =
  "Preencha os campos abaixo para conversar com um consultor.";

/** Mensagem de sucesso após envio do formulário */
export const FORM_SUCCESS =
  "Recebemos. Em breve um consultor da Pruma entra em contato.";

// ─── Navegação ────────────────────────────────────────────────────────────────

/** Wordmark da marca exibido no Navbar e Footer */
export const BRAND_NAME = "PRUMA";

/** Links âncora do Navbar (4 itens, ordem fixa). hrefs apontam para ids de seções da LP. */
export const NAV_LINKS = [
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Para quem", href: "#para-quem" },
  { label: "Contato", href: "#contato" },
] as const;

// ─── Hero (SECT-02) ──────────────────────────────────────────────────────────

/** Copy da seção Hero — D-07, D-08, D-09. Editar aqui troca em todo o site. */
export const HERO = {
  eyebrow: "— APP WEB DE FORÇA DE VENDAS B2B",
  headlineLine1: "Operações comerciais B2B",
  headlineLine2: "que precisam parar de improvisar.",
  subheadline:
    "Pruma instala o sistema de governança comercial — do vendedor em campo ao conselho.",
  microcopy:
    "SEM CONTRATO DE FIDELIDADE · IMPLANTAÇÃO EM 30 DIAS · DADO REAL DE OPERAÇÃO",
} as const;

// ─── Diagnóstico (SECT-03) ────────────────────────────────────────────────────

/** Copy da seção Diagnóstico — D-10, D-11. Títulos dos cards são LOCKED por requisito. */
export const DIAGNOSTICO = {
  eyebrow: "— DIAGNÓSTICO",
  headline: "O que está quebrado raramente é o app.",
  subheadline:
    "Três sintomas que aparecem antes de qualquer reunião de resultado.",
  cards: [
    {
      title: "Visibilidade tardia",
      body: "Você só descobre o desvio no fechamento do mês — quando a margem já vazou.",
      icon: "EyeOff" as const,
      tone: "navy" as const,
    },
    {
      title: "Política comercial fragmentada",
      body: "Cada vendedor aplica a tabela como entende. O desconto vira negociação, não regra.",
      icon: "GitBranch" as const,
      tone: "navy" as const,
    },
    {
      title: "Fechamento na planilha",
      body: "O CRM diz uma coisa, a planilha diz outra, o ERP diz uma terceira. Decidir vira arqueologia.",
      icon: "FileSpreadsheet" as const,
      tone: "cyan" as const,
    },
  ],
} as const;

// ─── Tese Pruma (SECT-04) ─────────────────────────────────────────────────────

/** Copy da Tese Pruma — D-13 (headline LOCKED), D-14 (parágrafo). */
export const TESE = {
  eyebrow: "— TESE PRUMA",
  headline: "Força de vendas não é um app.",
  body: "É um sistema de governança comercial. O app é a superfície — o que decide o resultado é a regra que está abaixo: política de preço, segmentação, ciclo de visita, leitura do território. A Pruma instala esse sistema, e o app passa a executá-lo. Não é mais produtividade isolada — é decisão repetível, do vendedor ao conselho.",
} as const;

// ─── MOCK-01: AppVendedor ─────────────────────────────────────────────────────

/** Dados normativos do mockup AppVendedor — D-15, D-16. */
export const MOCK_APP = {
  client: "Auto Center São Paulo Ltda",
  meta: "Pedido #4821 · Hoje, 14:32",
  status: "ONLINE",
  cta: "Fechar pedido",
  items: [
    { name: "Filtro de óleo Mann W712/95",         qty: 24, unit: 38.9,  subtotal: 933.6 },
    { name: "Pastilha de freio Bosch BB1825",      qty: 18, unit: 142.0, subtotal: 2556.0 },
    { name: "Amortecedor Cofap dianteiro",         qty: 12, unit: 389.0, subtotal: 4668.0 },
    { name: "Correia dentada Gates 5PK1230",       qty: 30, unit: 78.5,  subtotal: 2355.0 },
    { name: "Vela de ignição NGK iridium",         qty: 60, unit: 49.9,  subtotal: 2994.0 },
    { name: "Bateria Moura M60GD 60Ah",            qty: 6,  unit: 489.0, subtotal: 2934.0 },
    { name: "Disco de freio Fremax BD5212",        qty: 8,  unit: 215.0, subtotal: 1720.0 },
    { name: "Lâmpada H7 Philips X-tremeVision",   qty: 24, unit: 35.82, subtotal: 859.68 },
  ],
  adjustment: { label: "Ajuste política comercial", value: -29.67 },
  subtotal: 19020.28,
  discountPercent: 3,
  discountValue: 570.61,
  total: 18420.0,
} as const;

// ─── MOCK-02: PainelDashboard ─────────────────────────────────────────────────

/** Dados normativos do mockup PainelDashboard — D-18..D-22. */
export const MOCK_PAINEL = {
  brand: "Pruma · Painel do Gestor",
  filters: ["MAIO 2026", "BRASIL", "TODOS VENDEDORES"],
  kpis: [
    { label: "PEDIDOS HOJE",    value: "184",       delta: "▲ 12% vs ontem",       deltaTone: "cyan"  as const },
    { label: "TICKET MÉDIO",    value: "R$ 14.820", delta: "▲ 4,3% vs maio",       deltaTone: "cyan"  as const },
    { label: "CLIENTES ATIVOS", value: "1.247",     delta: "▬ estável",            deltaTone: "navy"  as const },
    { label: "META DO MÊS",     value: "73%",       delta: "▼ -6 dias para virar", deltaTone: "red"   as const },
  ],
  abc: {
    title: "Curva ABC — clientes por receita",
    subtitle: "~20% dos clientes geram ~80% da receita",
    bars: [
      { tier: "A1", height: 96, color: "cyan"      as const },
      { tier: "A2", height: 88, color: "cyan"      as const },
      { tier: "A3", height: 78, color: "cyan"      as const },
      { tier: "B1", height: 68, color: "navy-deep" as const },
      { tier: "B2", height: 54, color: "navy-deep" as const },
      { tier: "B3", height: 42, color: "navy-deep" as const },
      { tier: "B4", height: 32, color: "gray-soft" as const },
      { tier: "C1", height: 22, color: "gray-soft" as const },
      { tier: "C2", height: 14, color: "gray-soft" as const },
      { tier: "C3", height: 9,  color: "gray-soft" as const },
      { tier: "C4", height: 6,  color: "gray-soft" as const },
      { tier: "C5", height: 4,  color: "gray-soft" as const },
    ],
  },
  map: {
    title: "Distribuição territorial",
    points: [
      { city: "São Paulo",      cx: 172, cy: 174, r: 9 },
      { city: "Belo Horizonte", cx: 185, cy: 158, r: 7 },
      { city: "Rio de Janeiro", cx: 195, cy: 175, r: 7 },
      { city: "Curitiba",       cx: 158, cy: 195, r: 6 },
      { city: "Porto Alegre",   cx: 148, cy: 230, r: 6 },
      { city: "Recife",         cx: 220, cy: 110, r: 5 },
      { city: "Salvador",       cx: 212, cy: 130, r: 5 },
      { city: "Goiânia",        cx: 165, cy: 142, r: 4 },
    ],
  },
  risk: {
    title: "Clientes em risco",
    summary: "3 de 47 monitorados",
    rows: [
      {
        client: "Distribuidora Alvorada Peças Ltda",
        city: "Campinas, SP",
        status: "Crítico" as const,
        days: "47 dias",
        value: "R$ 84.300",
      },
      {
        client: "Comercial Vértice Auto MG",
        city: "Contagem, MG",
        status: "Atenção" as const,
        days: "28 dias",
        value: "R$ 36.180",
      },
      {
        client: "Implementos Sul Distribuição",
        city: "Caxias do Sul, RS",
        status: "Crítico" as const,
        days: "51 dias",
        value: "R$ 112.640",
      },
    ],
  },
} as const;

// ─── Como Funciona (SECT-05) ──────────────────────────────────────────────────

/** Copy da seção Como Funciona — Claude defines per D-04, SECT-05 spec. Usuário/campo perspective. */
export const COMO_FUNCIONA = {
  eyebrow: "— COMO FUNCIONA",
  headline: "Quatro passos. Do território ao painel.",
  subheadline: "Um vendedor visita um cliente. A operação inteira sente.",
  steps: [
    {
      title: "Rota planejada",
      description:
        "O vendedor abre o dia com a lista de visitas priorizada pela curva ABC. Sem improviso de roteiro.",
      icon: "MapPin" as const,
    },
    {
      title: "Pedido no campo",
      description:
        "Abre o cliente, vê histórico de compras e saldo de crédito. Lança o pedido com a tabela de preço correta aplicada automaticamente.",
      icon: "ShoppingCart" as const,
    },
    {
      title: "Política aplicada",
      description:
        "Desconto dentro do limite configurado. Exceções pedem aprovação antes de ir para o ERP — não depois.",
      icon: "ShieldCheck" as const,
    },
    {
      title: "Fechamento com visibilidade",
      description:
        "O gestor vê o pedido consolidado em tempo real. Não espera o retorno do vendedor para saber o que aconteceu.",
      icon: "BarChart3" as const,
    },
  ],
} as const;

// ─── Painel do Gestor (SECT-06) ───────────────────────────────────────────────

/** Copy da seção Painel do Gestor — D-17, D-19. 4 callouts provocativos, tom conselheiro sênior. */
export const PAINEL_GESTOR = {
  eyebrow: "— PAINEL DO GESTOR",
  headline: "O painel não é um relatório. É uma decisão.",
  subheadline: "Visibilidade de operação para quem precisa agir, não apenas ver.",
  callouts: [
    {
      number: "01",
      text: "Veja quem vai cancelar antes de cancelar.",
    },
    {
      number: "02",
      text: "Desconto dado errado custa mais do que cliente perdido.",
    },
    {
      number: "03",
      text: "20% dos clientes explicam 80% da receita. Você sabe quais são os seus?",
    },
    {
      number: "04",
      text: "Pipeline não fecha no relatório. Fecha na visita certa, no dia certo.",
    },
  ],
} as const;

// ─── Funcionalidades (SECT-07) ────────────────────────────────────────────────

/** Copy da seção Funcionalidades — D-01 through D-04. Bento grid: 1 hero + 5 cards. */
export const FUNCIONALIDADES = {
  eyebrow: "— FUNCIONALIDADES",
  headline: "Seis instrumentos. Um sistema.",
  subheadline:
    "Cada funcionalidade resolve uma parte do problema. Juntas, fecham o ciclo da operação comercial.",
  features: [
    {
      isHero: true,
      title: "Painel do Gestor em tempo real",
      description: "",
      iconName: "",
    },
    {
      isHero: false,
      title: "App do vendedor em campo",
      description:
        "Pedido, histórico e tabela de preço na palma da mão — sem papel, sem planilha.",
      iconName: "Smartphone" as const,
    },
    {
      isHero: false,
      title: "Política comercial unificada",
      description:
        "Um único conjunto de regras. Cada vendedor aplica o desconto certo, sem exceção.",
      iconName: "Sliders" as const,
    },
    {
      isHero: false,
      title: "Curva ABC e priorização",
      description:
        "Foco nos clientes que fazem a receita. Não nos que ocupam a agenda.",
      iconName: "TrendingUp" as const,
    },
    {
      isHero: false,
      title: "Gestão de clientes em risco",
      description:
        "Churn silencioso identificado antes do cancelamento. Ação antes do estrago.",
      iconName: "AlertTriangle" as const,
    },
    {
      isHero: false,
      title: "Relatórios e visibilidade",
      description:
        "Da operação ao conselho — o mesmo número, sem reconstituição manual.",
      iconName: "BarChart2" as const,
    },
  ],
} as const;

// ─── Para Quem (SECT-08) ──────────────────────────────────────────────────────

/** Copy da seção Para Quem — Claude defines per SECT-08 spec. 3 perfis com âncoras de receita. */
export const PARA_QUEM = {
  eyebrow: "— PARA QUEM",
  headline: "Operações que decidem em escala, não em planilha.",
  subheadline:
    "Pruma é para empresas que já passaram do improviso e precisam de governança comercial de verdade.",
  profiles: [
    {
      segment: "INDÚSTRIA",
      iconName: "Factory" as const,
      title: "Fabricante com canal de distribuição",
      anchor: "R$ 30M–300M / ano · 10–80 vendedores",
      description:
        "Sua força de vendas terceirizada ou própria precisa aplicar a política da fábrica em campo — preço, desconto, mix. Hoje o controle chega tarde, se chega.",
    },
    {
      segment: "DISTRIBUIDORA",
      iconName: "Truck" as const,
      title: "Distribuidora com carteira regional",
      anchor: "R$ 20M–150M / ano · 8–50 vendedores",
      description:
        "Você compra do fabricante, vende para o varejo, e vive no meio. Margem apertada, carteira grande, e cada vendedor com uma planilha diferente.",
    },
    {
      segment: "EMPRESA EM TRANSIÇÃO",
      iconName: "ArrowUpRight" as const,
      title: "Empresa crescendo além da planilha",
      anchor: "R$ 15M–80M / ano · 5–30 vendedores",
      description:
        "O processo atual funcionou até os R$ 10M. Agora ele é o gargalo. Você precisa de sistema antes de precisar de mais vendedores.",
    },
  ],
} as const;

// ─── Diferencial Pruma (SECT-09) ──────────────────────────────────────────────

/** Copy da seção Diferencial Pruma — dark section. 3 pilares: método, tecnologia, implantação. */
export const DIFERENCIAL = {
  eyebrow: "— DIFERENCIAL PRUMA",
  headline: "Não é app. É método com tecnologia.",
  subheadline:
    "Consultoria que instala o processo, tecnologia que executa. Nessa ordem.",
  pillars: [
    {
      number: "01",
      iconName: "Compass" as const,
      title: "Método antes de tecnologia",
      description:
        "A Pruma não vende software. Instala o processo comercial primeiro — preço, segmentação, ciclo de visita. O app executa o que está definido.",
    },
    {
      number: "02",
      iconName: "Monitor" as const,
      title: "Tecnologia que respeita o dado",
      description:
        "Integração com seu ERP. Nenhuma planilha paralela. Um número que o vendedor, o gestor e o conselho leem da mesma fonte.",
    },
    {
      number: "03",
      iconName: "CheckSquare" as const,
      title: "Implantação sem projeto de TI",
      description:
        "Trinta dias para o primeiro vendedor operar. Sem meses de consultoria, sem customização interminável.",
    },
  ],
} as const;

// ─── Prova Social (SECT-10) ───────────────────────────────────────────────────

/** Copy da seção Prova Social — placeholder data, TODO para substituição com dados reais do cliente. */
export const PROVA_SOCIAL = {
  eyebrow: "— PROVA SOCIAL",
  headline: "Operações reais. Resultados que cabem em uma linha.",
  subheadline:
    "Números de operações que deixaram de improvisar.",
  metrics: [
    {
      value: 847,
      prefix: "",
      suffix: "",
      label: "EMPRESAS ATENDIDAS",
    },
    {
      value: 94,
      prefix: "",
      suffix: "%",
      label: "ADOÇÃO EM 30 DIAS",
    },
    {
      value: 3,
      prefix: "",
      suffix: "H",
      label: "ECONOMIZADAS/VENDEDOR/SEMANA",
    },
  ],
  depoimento: {
    quote:
      "Antes do Pruma, a reunião mensal era uma sessão de arqueologia de planilha. Hoje o conselho entra na sala com os números do dia.",
    author: "Ricardo Mendes",
    role: "Diretor Comercial",
    company: "Distribuidora Regional do setor automotivo",
  },
  logos: [
    { id: "logo-1", alt: "Logo placeholder — substituir" },
    { id: "logo-2", alt: "Logo placeholder — substituir" },
    { id: "logo-3", alt: "Logo placeholder — substituir" },
  ],
} as const;

// ─── CTA Final (SECT-11) ──────────────────────────────────────────────────────

/** Copy da seção CTA Final — formulário com 8 campos (6 text/email/tel/textarea + 2 selects). */
export const CTA_FINAL = {
  eyebrow: "— FALE COM UM CONSULTOR",
  headline: "Ver Pruma rodando na sua operação.",
  subheadline:
    "Preencha os campos abaixo. Nossa equipe analisa o perfil e entra em contato em até 1 dia útil.",
  microcopy: "SEM COMPROMISSO · RESPOSTA EM 1 DIA ÚTIL",
  fields: {
    nome: {
      label: "Nome",
      placeholder: "João Silva",
    },
    email: {
      label: "E-mail corporativo",
      placeholder: "joao@empresa.com.br",
    },
    telefone: {
      label: "Telefone",
      placeholder: "(11) 99999-9999",
    },
    empresa: {
      label: "Empresa",
      placeholder: "Distribuidora Exemplo Ltda",
    },
    cargo: {
      label: "Cargo",
      placeholder: "Diretor Comercial",
    },
    desafio: {
      label: "Desafio atual",
      placeholder: "Descreva o principal desafio da sua operação comercial",
    },
    vendedores: {
      label: "Quantos vendedores em campo?",
      options: [
        { value: "1-5",  label: "1 a 5"      },
        { value: "6-15", label: "6 a 15"     },
        { value: "16-30",label: "16 a 30"    },
        { value: "30+",  label: "Mais de 30" },
      ],
    },
    segmento: {
      label: "Segmento",
      options: [
        { value: "industria",     label: "Indústria"     },
        { value: "distribuidora", label: "Distribuidora" },
        { value: "atacado",       label: "Atacado"       },
        { value: "outro",         label: "Outro"         },
      ],
    },
  },
  successHeadline: "Recebemos seu contato.",
  successSubtext: "Nossa equipe entra em contato em até 1 dia útil.",
  successMicrocopy: "SEM SPAM · SEM COMPROMISSO",
} as const;

// ─── Footer (SECT-12) ─────────────────────────────────────────────────────────

/** Copy do Footer — fundo azul marinho, 3 colunas de links, tagline, copyright. */
export const FOOTER = {
  tagline: "Governança comercial para B2B",
  columns: [
    {
      heading: "PRODUTO",
      links: [
        { label: "Como funciona",      href: "#como-funciona"   },
        { label: "Funcionalidades",    href: "#funcionalidades" },
        { label: "Para quem",          href: "#para-quem"       },
        { label: "Falar com consultor",href: "#contato"         },
      ],
    },
    {
      heading: "EMPRESA",
      links: [
        { label: "Sobre a Pruma", href: "#" },
        { label: "Metodologia",   href: "#" },
        { label: "Blog",          href: "#" },
      ],
    },
    {
      heading: "CONTATO",
      links: [
        { label: "kelly.lima@w1business.com.br", href: "mailto:kelly.lima@w1business.com.br" },
        { label: "LinkedIn",                     href: "#"                                   },
        { label: "WhatsApp",                     href: "#"                                   },
      ],
    },
  ],
  copyright: "© 2026 Pruma Consultoria. Todos os direitos reservados.",
} as const;
