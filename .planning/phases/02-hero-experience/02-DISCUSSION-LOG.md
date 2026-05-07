# Phase 2: Hero Experience - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-06
**Phase:** 2-Hero Experience
**Areas discussed:** Dados dos mockups, Copy das seções, Mockup no Hero, Navbar mobile

---

## Dados dos Mockups

### MOCK-02 KPIs
| Option | Description | Selected |
|--------|-------------|----------|
| Você decide | Métricas verossímeis para distribuidora B2B mid-market | ✓ |
| Definir agora | Usuário passa os 4 KPIs e valores específicos | |

**User's choice:** Claude decide — métricas + valores realistas para distribuidora R$50M–300M  
**Notes:** Nenhum valor específico fornecido; executor tem liberdade criativa dentro de parâmetros realistas

### MOCK-02 Clientes em Risco
| Option | Description | Selected |
|--------|-------------|----------|
| Você decide | Nomes ficcionais B2B brasileiros com status Crítico/Atenção | ✓ |
| Definir agora | Usuário passa os 3 clientes | |

**User's choice:** Claude decide  
**Notes:** 3 linhas, status Crítico/Atenção, dias sem pedido, valor em risco

### MOCK-01 Itens do Carrinho
| Option | Description | Selected |
|--------|-------------|----------|
| Você decide | Produtos de distribuidora somando R$18.420,00 | ✓ |
| Definir agora | Usuário passa a lista | |

**User's choice:** Claude decide — 8 itens fictícios de auto-parts/distribuição

### MOCK-02 Mapa
| Option | Description | Selected |
|--------|-------------|----------|
| Principais capitais industriais | SP, BH, Curitiba, Porto Alegre, Recife + 2–3 mais | ✓ |
| Só SP + interior | Foco regional | |
| Você decide | Livre escolha | |

**User's choice:** Principais capitais industriais  
**Notes:** Pontos ciano, tamanho proporcional ao volume

---

## Copy das Seções

### Hero Headline
| Option | Description | Selected |
|--------|-------------|----------|
| Claude deriva | Com base no brief, core value, tom McKinsey | ✓ |
| Tenho o texto | Usuário passa a headline exata | |
| Usar core value direto | "Operações comerciais B2B que precisam parar de improvisar." | |

**User's choice:** Claude deriva  
**Notes:** 2 linhas, Fraunces 72px, navy, Sábio 60% + Mago 40%

### Tese Parágrafo
| Option | Description | Selected |
|--------|-------------|----------|
| Claude escreve | Tom Sábio+Mago, afirmação provocativa sobre governança | ✓ |
| Tenho o texto | Usuário passa o parágrafo | |

**User's choice:** Claude escreve  
**Notes:** Inter 19px, max-width 720px, centrado, sem palavras banidas

### Diagnóstico Cards
| Option | Description | Selected |
|--------|-------------|----------|
| Sim, 1–2 linhas por card | Ponto cego específico, tom consultor | ✓ |
| Só título + ícone | Cards minimalistas | |

**User's choice:** Cards com título + descrição 1–2 linhas  
**Notes:** Tom cirúrgico — consultor que já viu esse problema antes

---

## Mockup no Hero

### Tipo de Mockup
| Option | Description | Selected |
|--------|-------------|----------|
| PainelDashboard completo | MOCK-02 real renderizado inline no Hero | ✓ |
| Versão simplificada | Stub só com KPIs para o Hero | |

**User's choice:** PainelDashboard completo  
**Notes:** Hero e MOCK-02 implementados na mesma wave

### Container do Mockup
| Option | Description | Selected |
|--------|-------------|----------|
| Painel flutuante | rounded-pruma-lg, shadow-pruma-md, estilo Stripe/Linear | ✓ |
| Browser frame | Barra cinza com 3 bolinhas | |
| Sem frame | Dashboard direto | |

**User's choice:** Painel flutuante — rounded-pruma-lg, shadow-pruma-md

### Layout Mobile
| Option | Description | Selected |
|--------|-------------|----------|
| Abaixo do texto | Mockup empilha sob headline+CTAs | ✓ |
| Ocultar no mobile | Hero mobile só texto + CTAs | |

**User's choice:** Abaixo do texto — mockup visível no mobile

---

## Navbar Mobile

### Comportamento Mobile
| Option | Description | Selected |
|--------|-------------|----------|
| Hamburger + drawer | Menu icon abre overlay com links + CTA | ✓ |
| Links ocultos, só CTA | Mobile mostra logo + CTA apenas | |
| Scroll horizontal | Links em overflow-x scroll | |

**User's choice:** Hamburger + drawer  
**Notes:** lucide Menu icon, X para fechar, overlay com links + CTA

### Links de Navegação
| Option | Description | Selected |
|--------|-------------|----------|
| Você decide | "Como funciona · Funcionalidades · Para quem · Contato" | ✓ |
| Só CTA, sem links | LP de conversão pura | |
| Definir os links | Usuário passa os labels | |

**User's choice:** Claude decide — 4 âncoras para seções Phase 3

---

## Claude's Discretion

- Nav link labels exatos
- Hero headline (2 linhas, deriva do brief)
- Hero subheadline e microcopy Mono
- Descrições dos 3 cards Diagnóstico
- Parágrafo Tese Pruma
- Produtos MOCK-01 (8 itens, preços individuais)
- KPI values MOCK-02
- "Clientes em risco" company names e valores
- Coordenadas exatas dos pontos no mapa
- Ícones lucide por seção/card

## Deferred Ideas

None — discussão se manteve dentro do escopo da Phase 2.
