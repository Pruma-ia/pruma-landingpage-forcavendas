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
  status: "🟢 ONLINE",
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
  discountValue: 569.61,
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
