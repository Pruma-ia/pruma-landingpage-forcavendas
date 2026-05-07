# Prompt — LP Pruma | App de Força de Vendas B2B

> **Como usar este prompt:** abra uma sessão nova no Claude Code dentro de um diretório vazio. Cole este documento inteiro como primeira mensagem. O Claude Code vai criar o projeto Next.js completo, ativar a skill `ui-ux-pro-max`, gerar todos os componentes e deixar a LP rodando localmente.

---

## 0. ATIVAÇÃO DE SKILL OBRIGATÓRIA

Antes de escrever qualquer linha de código, ative a skill **`ui-ux-pro-max`** do nextlevelbuilder. Se ela não estiver instalada neste projeto, instale com:

```bash
npx skills add https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
```

E execute uma busca de design system com a query exata:

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "B2B enterprise SaaS editorial serif premium consulting" --design-system --stack nextjs -f markdown
```

Use as recomendações da skill como referência adicional, mas as decisões de paleta, tipografia e estrutura abaixo são **mandatórias e prevalecem sobre qualquer recomendação automática conflitante**.

---

## 1. CONTEXTO ESTRATÉGICO (não pule esta seção)

A **Pruma Consultoria** é uma consultoria brasileira de gestão financeira e operacional para PMEs e empresas de médio porte. Ela desenvolveu um **aplicativo web de Força de Vendas B2B** que **já está em produção com clientes pagantes** — indústrias e distribuidoras.

Esta LP **NÃO é um site de SaaS genérico**. Ela é o que chamamos de **"LP de tese com bias enterprise"**:

- Capta leads de **mid-market** (empresas faturando R$50M–R$300M) que vêm de tráfego frio (LinkedIn, indicação)
- Funciona simultaneamente como **carta de credibilidade** para abrir conversas em contas-alvo enterprise (R$1Bi+)
- Tem **dois CTAs visíveis**: um caminho rápido ("Quero conhecer o app") e um caminho consultivo ("Falar com um consultor")

### Diagnóstico de mercado (essencial pra calibrar o tom)

Concorrentes brasileiros mapeados:

| Player | Posicionamento | Volume |
|--------|----------------|--------|
| **Mercos** (ex-Meus Pedidos) | Líder consolidado, 15 anos | 56k usuários, R$90Bi/ano transacionados |
| **Zydon** | Desafiante moderno, IA Zoe, e-commerce B2B | R$1Bi processado em 2024 |
| **GeoSales / WebMais / Uplaces / Pedido Pago / Flexy** | Especialistas de nicho | PME a média empresa |

**O que TODOS os concorrentes fazem (commodity — NÃO faça igual):**
- Headline tipo "Venda mais com nosso app de força de vendas"
- Promessa de "automatizar pedidos" / "substituir o WhatsApp"
- Visual: azul saturado, mockup de celular óbvio, ícones genéricos, gradientes coloridos
- Fundo light com elementos visuais infantis ou genéricos de SaaS

**O gap que a Pruma vai preencher:**
- Comunicação direta com **C-level** (Diretor Comercial, CFO, Sócio) e não só com vendedor de campo
- Posicionamento de **consultoria que tem tecnologia**, não de SaaS startup
- Visual **editorial premium**, estilo McKinsey/Stripe — não "mais um SaaS B2B brasileiro azul"
- Tom de **conselheiro sênior** com promessa de **transformação operacional**, não de "produtividade"

---

## 2. PERSONA — quem está lendo esta LP

A LP atende **dois leitores em proporção 50/50**, alternados em seções específicas:

### Leitor A — DECISOR (Diretor Comercial / CFO / Sócio)
- Empresa de R$50M a R$1Bi+, indústria ou distribuição
- Dores: descobrir tarde quando perde cliente, sem visibilidade do pipeline em tempo real, política comercial inconsistente, dados que não batem entre vendedor/financeiro/conselho
- O que valoriza: previsibilidade, governança, redução de risco, ROI, consultoria séria por trás
- Tempo de leitura: 30-45 segundos antes de decidir clicar ou sair
- Vocabulário: "operação comercial", "carteira", "pipeline", "margem", "governança", "previsibilidade"

### Leitor B — USUÁRIO (Vendedor externo / Gestor de campo)
- Influencia a decisão, mas não decide
- Dores: planilha que trava, WhatsApp bagunçado, demora pra fechar pedido, não saber se cliente tem crédito
- O que valoriza: app que funciona offline, rapidez, mobilidade, simplicidade
- Vocabulário: "pedido", "rota", "visita", "catálogo", "comissão", "meta"

**Regra de ouro do copy:**
> Toda vez que escrever um benefício, pergunte: *"isso resolve a dor do gerente que reporta pro conselho OU a dor do vendedor que está no carro?"*. Use a primeira versão na maioria das seções. Use a segunda apenas na seção dedicada ao usuário (seção 5 do briefing).

---

## 3. ARQUÉTIPO DE MARCA — Sábio 60% + Mago 40%

### Sábio (dominante — 60%)
- Voz: **conselheiro sênior** que entende do problema antes do produto
- Tipo de afirmação: provocativa, baseada em insight, com dados
- Referências: McKinsey, Bain, Gartner, HBR, Stripe (quando vende a complexos)
- Exemplos de frases que **soam Sábio**: "Operações comerciais B2B falham por falta de governança, não de software" / "O dado mais valioso da sua operação não é o pedido, é o que ainda não virou pedido"

### Mago (acento — 40%)
- Voz: **transformador** que mostra o "antes/depois"
- Tipo de afirmação: aspiracional, baseada em mudança visível
- Referências: Linear, Stripe, Notion, Vercel
- Exemplos de frases que **soam Mago**: "Sua operação inteira em uma tela só" / "O vendedor sai do carro com o pedido fechado"

### O que NÃO fazer (anti-padrões)
- ❌ "Venda mais", "vender é a alma do negócio", "potencialize seus resultados" (genérico)
- ❌ "Plataforma all-in-one" (commodity)
- ❌ "Substitua o WhatsApp" (cansado, todo mundo já faz)
- ❌ Emoji, exclamações, "uau", "fácil", "simples assim", "rápido"
- ❌ Tom de startup hyped — a Pruma é uma consultoria séria

---

## 4. DESIGN SYSTEM (mandatório)

### 4.1 Paleta — Pruma IA (regra 65/25/10)

```css
--azul-marinho: #0D1B4B;    /* PRIMÁRIA — texto principal, CTAs sólidos, headers, ícones (65%) */
--azul-medio:   #162460;    /* Fundos secundários ocasionais, hover de cards */
--azul-profundo:#1E3080;    /* Sub-headers, links, gradações, dividers escuros */
--ciano-eletrico:#00AEEF;   /* ACENTO — setas CTA, números grandes, hover, ícones-chave (25%) */
--ciano-claro:  #5CCFF5;    /* Highlights sutis, badges, estados ativos */
--ciano-palido: #E0F6FE;    /* Fundos de seções alternadas */
--branco:       #FFFFFF;    /* Fundo dominante */
--off-white:    #FAFAFA;    /* Fundos sutilmente diferenciados */
--cinza-suave:  #F4F6F9;    /* Bordas muito sutis, separadores */
--cinza-texto:  #5B6B85;    /* Texto secundário, legendas */
```

**Regra de uso:** Azul Marinho 65% (mas como TINTA, não como fundo) + Ciano Elétrico 25% (acentos cirúrgicos) + Neutros 10%. **Esta é uma LP LIGHT** — fundo dominante é branco/off-white. Azul marinho aparece em **texto, headers, CTAs e ícones**.

**Único elemento "dark" admissível:** o botão CTA primário (fundo azul marinho `#0D1B4B`, texto branco). Footer também pode ser dark se necessário.

### 4.2 Tipografia (estilo editorial McKinsey/Stripe)

```
Headlines:        Fraunces (Google Fonts), peso 500-600, com tracking ligeiramente apertado
Subheadlines:     Fraunces, peso 400, tamanho menor
Body:             Inter (Google Fonts), peso 400 / 500
Microcopy/labels: JetBrains Mono (Google Fonts), peso 400, uppercase com tracking 0.08em
Números grandes:  Fraunces, peso 600, cor ciano elétrico
```

Importação no `app/layout.tsx`:
```tsx
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
```

**Hierarquia tipográfica:**
- H1 hero: Fraunces 64-72px desktop, 40-48px mobile, line-height 1.05, peso 500
- H2 seção: Fraunces 44-52px, line-height 1.1, peso 500
- H3 cards: Fraunces 22-26px, line-height 1.25, peso 600
- Body: Inter 16-18px, line-height 1.6, peso 400
- Eyebrow (label acima do título): JetBrains Mono 12px UPPERCASE, tracking 0.12em, cor ciano elétrico

### 4.3 Estética geral

- **Sombras**: extremamente sutis. Padrão: `box-shadow: 0 1px 3px rgba(13, 27, 75, 0.06)`. Para cards elevados: `box-shadow: 0 8px 32px rgba(13, 27, 75, 0.08)`. Nunca use sombras dramáticas.
- **Bordas**: 1px sólida cor `#E0F6FE` (ciano pálido) ou `#F4F6F9` (cinza suave). Border-radius 8-12px (sóbrio, não friendly).
- **Linhas de detalhe**: separadores horizontais finos em ciano elétrico `#00AEEF` com 1px de altura e 32-48px de largura, alinhados à esquerda — estilo editorial. Use antes de eyebrows.
- **Espaçamento**: generoso. Seções com `py-24` (96px) ou `py-32` (128px). Containers com `max-w-6xl` (1152px). Respiração é parte do produto.
- **Microanimações**:
  - Scroll-triggered fade-up de 24px com `framer-motion` (delay escalonado em listas)
  - Hover de cards: elevação sutil (translate-y -2px) + border muda para `#5CCFF5`
  - Hover de botões: shift de 2px + leve glow ciano
  - Counter animado nos números de prova social (de 0 ao valor final em 1.5s)
- **Sem**: gradientes coloridos, ilustrações infantis, mascotes, emoji, noise grain pesado, mockups de celular óbvios

### 4.4 Componentes-chave

**Botão primário:**
```
Fundo #0D1B4B, texto branco, 14px peso 500
Padding 14px 24px, border-radius 8px
Hover: fundo #162460, translate-y -1px, shadow ciano sutil
```

**Botão ghost (secundário):**
```
Fundo transparente, borda 1px #0D1B4B, texto #0D1B4B
Padding 14px 24px, border-radius 8px
Hover: fundo #E0F6FE
```

**Card padrão:**
```
Fundo branco, borda 1px #F4F6F9, border-radius 12px
Padding 32px, sombra sutil
Hover: borda #5CCFF5, translate-y -2px
```

**Eyebrow (label categoria):**
```
Linha horizontal 32px de #00AEEF
+ texto em JetBrains Mono 12px UPPERCASE
Cor #1E3080, tracking 0.12em
```

---

## 5. STACK TÉCNICO

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Estilização**: Tailwind CSS 3.4+ com CSS variables customizadas (paleta acima)
- **Animações**: Framer Motion 11+
- **Ícones**: lucide-react (use ícones de **traço fino**, peso 1.5px)
- **Componentes**: shadcn/ui apenas se necessário (Button, Card). Customizar para a paleta Pruma.
- **Fontes**: next/font/google (Fraunces, Inter, JetBrains Mono)
- **SEO**: metadata API do Next 14, Open Graph com imagem placeholder, title bem otimizado
- **Performance**: imagens com `next/image`, lazy loading em mockups pesados, score Lighthouse 90+

---

## 6. ESTRUTURA DE SEÇÕES (esta é a alma da LP)

A ordem é deliberada. Cada seção tem leitor primário, fundo, e copy sugerido. **Use o copy abaixo como ponto de partida — ajuste ortografia e fluência, mas mantenha a estrutura argumentativa e o tom**.

### Seção 1 — Navbar
- Sticky com `backdrop-blur-md` quando scroll > 8px
- Logo: texto "PRUMA" em Fraunces 600 cor `#0D1B4B` + tagline pequena ao lado: "Consultoria de Gestão"
- Links âncora (Inter 14px peso 500): Solução · Como funciona · Para quem · Pruma
- Botão CTA primário: "Falar com um consultor"

### Seção 2 — Hero (LEITOR: DECISOR) [fundo BRANCO]

**Eyebrow:** `— APP WEB DE FORÇA DE VENDAS B2B`

**Headline (Fraunces 72px):**
> *A maioria das equipes de vendas B2B opera no escuro.*
> *A sua não precisa.*

**Subheadline (Inter 20px, max-width 640px):**
> Aplicativo web, painel do gestor e método de implantação para indústrias e distribuidoras que querem visibilidade total da operação comercial — do vendedor em campo ao conselho de administração.

**Dois CTAs lado a lado:**
- Primário: "Falar com um consultor" → âncora #contato
- Secundário (ghost): "Conhecer o app" → âncora #produto

**Lado direito:** mockup do dashboard do gestor (componente HTML/CSS real, ver Seção 7 deste briefing). Não use imagem PNG fake.

**Microcopy abaixo dos CTAs (Mono 12px):**
> `IMPLANTAÇÃO EM 30 DIAS · INTEGRA COM QUALQUER ERP · OPERANDO EM INDÚSTRIAS E DISTRIBUIDORAS BRASILEIRAS`

### Seção 3 — Diagnóstico (LEITOR: DECISOR) [fundo CIANO PÁLIDO `#E0F6FE`]

**Eyebrow:** `— O DIAGNÓSTICO`

**Headline:**
> *Por que sua operação comercial perde dinheiro mesmo crescendo?*

**Subheadline:**
> A maioria dos times comerciais B2B no Brasil opera com três pontos cegos estruturais. Eles não aparecem no DRE, mas erodem margem todo mês.

**Três cards lado a lado** (grid 3 colunas em desktop, stack mobile):

**Card 1 — Visibilidade tardia**
> *Você descobre que perdeu o cliente quando ele já parou de comprar.*
> Sem dado de frequência, ticket médio e mix em tempo real, o gestor reage em vez de antecipar. A reativação custa 5x mais que a retenção.

**Card 2 — Política comercial fragmentada**
> *Desconto vira negociação individual, não regra de negócio.*
> Cada vendedor cria sua tabela mental. A margem cai onde ninguém vê e o financeiro descobre 30 dias depois — quando já não dá pra reverter.

**Card 3 — Fechamento dependente de planilha**
> *O número que você apresenta na reunião não bate com o do vendedor.*
> Pipeline em planilha que ninguém atualiza no mesmo dia transforma a reunião comercial em arqueologia, não em gestão.

### Seção 4 — Tese Pruma (LEITOR: DECISOR) [fundo BRANCO, layout EDITORIAL]

**Eyebrow:** `— A TESE`

**Headline grande (centralizada, Fraunces 56px):**
> *Força de vendas não é um app.*
> *É um sistema de gestão.*

**Parágrafo editorial (max-width 720px, centralizado, Inter 19px line-height 1.7):**
> Aplicativos vendem como produto. Nós entregamos como método.
>
> A Pruma é uma consultoria de gestão que estruturou um aplicativo web de força de vendas porque entendemos, na prática, o que falta nas operações comerciais B2B brasileiras: **governança**.
>
> Não basta digitalizar pedidos. É preciso desenhar a política comercial, definir a régua de relacionamento por carteira, instrumentar o gestor com indicadores que ele de fato usa — e treinar o time pra operar dentro disso. O app é a ponta. O sistema é o todo.

### Seção 5 — Como funciona no campo (LEITOR: USUÁRIO) [fundo OFF-WHITE `#FAFAFA`]

**Eyebrow:** `— NA RUA, COM O VENDEDOR`

**Headline:**
> *O vendedor sai do carro com o pedido fechado.*

**Subheadline:**
> Sem decorar tabela. Sem ligar pro escritório. Sem perder venda por internet ruim.

**Layout em 2 colunas:**

**Coluna esquerda — texto + lista**
4 itens com ícone à esquerda (lucide: `MapPin`, `BookOpen`, `Wifi`, `CheckCircle2`):

1. **Roteiro de visita** — Lista de clientes do dia organizada por região, com histórico de compra e oportunidade de mix.
2. **Catálogo com tabela do cliente** — Preço, prazo e desconto já configurados pelo gestor. Vendedor não precisa decorar nem inventar.
3. **Funciona offline** — Tirou pedido sem sinal? Ele sincroniza sozinho quando voltar. Zero retrabalho, zero pedido perdido.
4. **Fechamento na hora** — Pedido entra direto no ERP. Cliente recebe confirmação. Comissão calculada automática.

**Coluna direita — mockup vivo do app**
Tela do app web mobile-friendly mostrando:
- Cliente atual: "Auto Center São Paulo Ltda"
- Lista de produtos com preços já segmentados por tabela
- Carrinho com 8 itens, total R$ 18.420,00
- Botão grande "Fechar pedido"
- Status: 🟢 Online sincronizado

### Seção 6 — Painel do gestor (LEITOR: DECISOR) [fundo BRANCO]

**Eyebrow:** `— NO ESCRITÓRIO, COM O GESTOR`

**Headline:**
> *Sua operação inteira em uma tela só.*

**Subheadline:**
> O painel do gestor mostra, em tempo real, onde está o dinheiro: quem está vendendo, quem parou, qual margem está sendo erodida e qual cliente vai cair se você não agir esta semana.

**Mockup grande do dashboard centralizado** (componente HTML/CSS, ver Seção 7), com 4 callouts numerados ao redor (estilo "tour guiado"):

1. **Curva ABC ao vivo** — Top 20% da carteira que gera 80% da receita
2. **Clientes em risco** — Quem reduziu frequência ou ticket nas últimas 4 semanas
3. **Margem por vendedor** — Onde o desconto está fugindo da política
4. **Pipeline em tempo real** — Pedidos em rascunho, em aprovação e faturados — sincronizados do campo

### Seção 7 — Funcionalidades (LEITOR: MISTO) [fundo CIANO PÁLIDO `#E0F6FE`]

**Eyebrow:** `— TUDO O QUE A OPERAÇÃO PRECISA`

**Headline:**
> *Um sistema completo, não um conjunto de telas.*

**Bento grid leve** (6 funcionalidades, layout asymmetric: 2 grandes em cima, 4 médias embaixo, ou 3+3):

1. **Cadastro e segmentação** — Carteira por curva ABC, frequência de compra, mix de produtos e potencial.
2. **Pedidos online e offline** — Aplicativo que funciona com ou sem sinal e sincroniza quando volta.
3. **Política comercial estruturada** — Tabelas de preço, prazo e desconto por canal, região ou perfil de cliente.
4. **Painel do gestor em tempo real** — KPIs, ranking de vendedor, mapa de carteira, alertas automáticos.
5. **Integração com qualquer ERP** — Sincronização nativa com sistemas como TOTVS, Senior, Sankhya, Bling, Tiny e personalizadas.
6. **Implantação consultiva** — Equipe Pruma redesenha o processo, configura o sistema e treina a equipe em até 30 dias.

### Seção 8 — Para quem é (LEITOR: DECISOR) [fundo BRANCO]

**Eyebrow:** `— PARA QUEM É`

**Headline:**
> *Operações comerciais B2B que precisam parar de improvisar.*

**Três perfis de empresa** em cards (não de pessoa):

**Card 1 — Indústria de bens intermediários**
> Faturamento R$50M–R$1Bi+. Vende para distribuidoras, atacadistas ou grandes contas. Tem equipe própria de vendedores externos ou rede de representantes comerciais.

**Card 2 — Distribuidora B2B**
> Carteira ativa entre 200 e 5.000 clientes (oficinas, autopeças, materiais de construção, alimentos, embalagens, químicos, EPIs, suprimentos). Vendedores em rota fixa e mix amplo de SKUs.

**Card 3 — Empresa em transição digital**
> Já cresceu o suficiente para que planilha e WhatsApp não escalem mais. Já tentou um SaaS pronto e não engajou. Precisa de método antes de ferramenta.

### Seção 9 — Diferencial Pruma (LEITOR: DECISOR) [fundo AZUL MARINHO `#0D1B4B` COM TEXTO BRANCO]

> ⚠️ **Esta é a ÚNICA seção dark da LP**. Funciona como "ato 3" — concentra a autoridade Sábio com peso visual máximo. Texto em branco, eyebrow e acentos em ciano elétrico.

**Eyebrow (cor ciano elétrico `#00AEEF`):** `— POR QUE PRUMA`

**Headline (texto branco):**
> *Não somos uma empresa de software.*
> *Somos uma consultoria que entrega software como parte do método.*

**Três pilares horizontais (texto branco com ícone ciano elétrico):**

1. **Consultoria embutida** — Cada implantação começa com um diagnóstico operacional. O app é configurado pra sua realidade, não pra realidade média do mercado.
2. **Método antes da ferramenta** — Redesenhamos política comercial, régua de carteira e ritual de gestão antes de ligar o app. Sem isso, ferramenta vira planilha cara.
3. **Time sênior em campo** — Nossa equipe atende a implantação inteira. Sem terceirização, sem onboarding remoto. Reuniões com o decisor, não com SDR.

### Seção 10 — Prova social (LEITOR: AMBOS) [fundo BRANCO]

> 🟡 **PLACEHOLDER** — esta seção precisa dos dados reais que o usuário vai fornecer depois. Use os números abaixo como estrutura visual; deixe comentários no código indicando os campos a substituir.

**Eyebrow:** `— OPERANDO EM PRODUÇÃO`

**Layout em 3 partes:**

**Parte A — Logos** (faixa horizontal centralizada, escala de cinza):
- 5-6 logos de clientes em escala de cinza (placeholder: SVG genéricos com nomes "Cliente A", "Cliente B" etc.)
- Texto acima: "Empresas que já operam força de vendas com a Pruma"

**Parte B — Números grandes** (3 colunas, números em Fraunces 64px cor ciano elétrico):
- `[XX]+` empresas implantadas
- `R$ [XXX]M` em pedidos transacionados/ano
- `[XX]%` de redução média no tempo de fechamento de pedido
- (Adicione comentário `<!-- TODO: substituir por números reais -->`)

**Parte C — Depoimento em destaque** (card largo com aspas grandes Fraunces 600):
> *"Antes da Pruma, a gente reagia. Hoje, a gente antecipa. O painel mostra o cliente caindo antes dele cair de fato — e isso virou nossa vantagem comercial."*
>
> **[Nome] [Sobrenome]** — Diretor Comercial, [Empresa]
>
> (Adicione comentário `<!-- TODO: substituir por depoimento real -->`)

### Seção 11 — CTA Final (LEITOR: AMBOS) [fundo CIANO PÁLIDO `#E0F6FE`]

**Eyebrow:** `— PRÓXIMO PASSO`

**Headline grande:**
> *Vamos olhar a sua operação comercial juntos.*

**Subheadline:**
> Em uma conversa de 30 minutos, mostramos como o app e o método se aplicam ao seu cenário específico — e onde estão os pontos de ganho que você ainda não está capturando.

**Formulário** (card branco, sombra sutil, max-width 560px):
- Campos: Nome completo · Empresa · Cargo · E-mail corporativo · WhatsApp · Faturamento anual aproximado (select: até R$50M / R$50M-R$300M / R$300M-R$1Bi / R$1Bi+) · Segmento (select: Indústria / Distribuidora / Atacado / Outro)
- Botão primário: **"Agendar conversa com consultor"**
- Microcopy abaixo: `Resposta em até 1 dia útil · Sem compromisso · Conversa direta com consultor sênior`
- Estado de sucesso: card verde-petróleo simples com check + mensagem "Recebemos. Em breve um consultor da Pruma entra em contato."

### Seção 12 — Footer [fundo AZUL MARINHO `#0D1B4B`]

- Logo Pruma branco + tagline "Consultoria de Gestão"
- Coluna 1 — Solução: links para âncoras
- Coluna 2 — Empresa: Sobre · Cases · Contato
- Coluna 3 — Legal: Política de Privacidade · Termos de Uso
- Linha base: `© 2026 Pruma Consultoria. Todos os direitos reservados.`

---

## 7. MOCKUPS DO APP — DETALHAMENTO TÉCNICO

> **Crítico:** os mockups precisam ser **componentes HTML/CSS reais** (não imagens PNG). Eles são o coração visual da LP. Use dados industriais plausíveis (não "Lorem ipsum", não "Produto X").

### Mockup A — App do vendedor (Hero secundário e Seção 5)

Tela mobile estilizada (max 380px largura, border-radius 16px, sombra elevada) mostrando:

```
┌─────────────────────────────────────┐
│  ← Pedido em andamento     ⚙        │
├─────────────────────────────────────┤
│  CLIENTE                            │
│  Auto Center São Paulo Ltda         │
│  Tabela: Distribuidor SP · 30 ddl   │
├─────────────────────────────────────┤
│  CARRINHO (8 itens)                 │
│                                     │
│  Filtro de óleo Mann W712/52        │
│  12 un  ·  R$ 38,90  ·  R$ 466,80   │
│                                     │
│  Lubrificante Motor 20W50 · 1L      │
│  24 un  ·  R$ 24,50  ·  R$ 588,00   │
│                                     │
│  Pastilha de freio dianteira XJ     │
│  6 un   ·  R$ 145,00 ·  R$ 870,00   │
│                                     │
│  + 5 itens                          │
├─────────────────────────────────────┤
│  Subtotal              R$ 18.420,00 │
│  Desconto política (3%)  R$ 552,60- │
│  Total                 R$ 17.867,40 │
├─────────────────────────────────────┤
│  🟢 Sincronizado · Online           │
│                                     │
│  [    FECHAR PEDIDO    ]            │
└─────────────────────────────────────┘
```

### Mockup B — Painel do gestor (Hero principal e Seção 6)

Dashboard widescreen (estilo Stripe Dashboard) mostrando:

**Cabeçalho:**
- Título: "Painel comercial · Outubro 2026"
- Filtros: Período · Equipe · Região (chips)

**Linha 1 — KPIs principais (4 cards):**
- Faturamento mês: R$ 14,8M (+12,4% vs. mês anterior, seta ciano)
- Ticket médio: R$ 8.430 (+3,1%)
- Pedidos: 1.756 (+8,7%)
- Margem média: 28,4% (-0,8%, seta vermelha discreta)

**Linha 2 — Curva ABC e Mapa de carteira:**
- Card esquerdo: gráfico de barras horizontais mostrando "Top 20 clientes" com nome e % do faturamento
- Card direito: mapa do Brasil com pontos ciano em SP/MG/RJ/RS (vendedores em rota)

**Linha 3 — Tabela "Clientes em risco":**
| Cliente | Última compra | Frequência | Ticket médio | Status |
|---|---|---|---|---|
| Distribuidora Andrade ME | 47 dias atrás | -38% | R$ 4.200 | 🔴 Crítico |
| Auto Peças Norte Ltda | 23 dias atrás | -18% | R$ 7.800 | 🟡 Atenção |
| Mecânica Premium SA | 15 dias atrás | -12% | R$ 12.400 | 🟡 Atenção |
| ... | ... | ... | ... | ... |

**Linha 4 — Pipeline em tempo real:**
Barra horizontal segmentada: Rascunho 14 · Em aprovação 38 · Aprovados 62 · Faturados 1642

**Use cores da paleta:**
- Eixos e labels em `#5B6B85`
- Barras de gráfico em gradação azul marinho → ciano elétrico
- Pontos do mapa em ciano elétrico com glow leve
- Status crítico: vermelho `#DC2626` (apenas onde necessário, fora da paleta principal)

---

## 8. ESTRUTURA DE ARQUIVOS

```
/app
  layout.tsx           ← fontes, metadata, viewport
  page.tsx             ← compõe todas as seções
  globals.css          ← variáveis CSS da paleta + reset
/components
  Navbar.tsx
  Hero.tsx
  Diagnostico.tsx
  Tese.tsx
  ComoFunciona.tsx     ← seção do usuário/vendedor
  PainelGestor.tsx     ← seção do decisor
  Funcionalidades.tsx
  ParaQuem.tsx
  Diferencial.tsx
  ProvaSocial.tsx
  CTAFinal.tsx
  Footer.tsx
  /mockups
    AppVendedor.tsx    ← componente do mockup A
    PainelDashboard.tsx ← componente do mockup B
  /ui
    Button.tsx
    Card.tsx
    Eyebrow.tsx
    Container.tsx
/lib
  constants.ts         ← copy centralizado de cada seção (facilita edição)
tailwind.config.ts     ← cores, fontes, animações customizadas
README.md              ← instruções de execução
```

---

## 9. CRITÉRIOS DE ACEITAÇÃO (QA visual obrigatório)

Antes de considerar a tarefa concluída, valide:

- [ ] LP roda com `npm run dev` sem warnings
- [ ] Lighthouse desktop: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 100
- [ ] Responsivo perfeito em 375px, 768px, 1024px e 1440px
- [ ] Todas as fontes (Fraunces, Inter, JetBrains Mono) carregadas via next/font
- [ ] Paleta exatamente como especificado — nenhum azul "chutado"
- [ ] **Headlines em Fraunces** (serifa) — não em sans-serif
- [ ] Eyebrows com linha horizontal ciano elétrico + texto Mono UPPERCASE
- [ ] Mockups (App e Painel) são componentes HTML/CSS reais, com dados industriais plausíveis
- [ ] Apenas Seção 9 (Diferencial Pruma) e Footer têm fundo dark — todo o resto é light
- [ ] CTA primário "Falar com um consultor" aparece em pelo menos 3 pontos da LP (Hero, Navbar, CTA Final)
- [ ] Microanimações de scroll funcionando com Framer Motion + IntersectionObserver
- [ ] Formulário tem estado de sucesso visual (sem backend real — apenas state)
- [ ] Comentários `<!-- TODO -->` marcando cada placeholder de prova social
- [ ] Metadata SEO: title "Pruma | App Web de Força de Vendas B2B para Indústrias e Distribuidoras", description com 150 chars

---

## 10. INSTRUÇÕES FINAIS DE EXECUÇÃO

1. **Inicializar projeto:** `npx create-next-app@latest pruma-lp --typescript --tailwind --app --no-src-dir`
2. **Instalar dependências:** `npm install framer-motion lucide-react clsx tailwind-merge`
3. **Configurar Tailwind:** adicionar paleta da Pruma como cores customizadas em `tailwind.config.ts`
4. **Configurar fontes** em `app/layout.tsx` via `next/font/google`
5. **Construir seção por seção**, começando pela Navbar e Hero. Renderize e revise visualmente após cada seção (use `npm run dev` em background).
6. **Mockups por último** — eles são os componentes mais complexos. Faça versão simplificada primeiro, depois refine.
7. **Ative a skill `ui-ux-pro-max` em pontos críticos** — especialmente quando estiver definindo espaçamentos do bento grid, hierarquia tipográfica e animações.
8. **Revise o copy final** lendo em voz alta — se soar como "mais um SaaS", refaça. Lembre: tom Sábio + Mago, não startup.
9. **Entregue** o projeto rodando + um README curto com instruções de como editar copy (em `/lib/constants.ts`) e onde estão os placeholders de prova social.

---

## 11. O QUE ESTA LP **NÃO PODE** SER

Antes de finalizar, leia esta lista. Se a LP entregue se enquadrar em qualquer item abaixo, refaça:

- ❌ Mais um SaaS B2B brasileiro azul saturado com mockup de celular óbvio
- ❌ Headlines do tipo "Venda mais", "Plataforma all-in-one", "Automatize seus pedidos"
- ❌ Visual de startup com gradientes coloridos, ilustrações infantis ou emojis
- ❌ Seções que misturam o leitor (vendedor + decisor no mesmo card)
- ❌ Mockup que parece imagem stock ou placeholder genérico
- ❌ Tipografia sans-serif em todas as headlines (perde o ar editorial)
- ❌ Copy genérico que poderia estar em qualquer LP de qualquer concorrente

**A pergunta-teste:** se eu pegar essa LP, trocar o logo da Pruma pelo logo do Mercos, e ela ainda fizer sentido — algo está errado. Ela tem que ser **inegavelmente Pruma**: consultoria séria + tecnologia transformadora + autoridade editorial.

---

**Bom trabalho. Construa com cuidado.**
