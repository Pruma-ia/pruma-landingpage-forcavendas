import { ChevronDown } from "lucide-react";
import { MOCK_PAINEL } from "@/lib/constants";
import { AbcChart } from "@/components/mockups/_AbcChart";
import { BrazilMap } from "@/components/mockups/_BrazilMap";

const deltaToneClass: Record<"cyan" | "navy" | "red", string> = {
  cyan: "text-[#0077AA]",
  navy: "text-pruma-navy",
  red: "text-[#9B1C1C]",
};

const statusPillClass: Record<"Crítico" | "Atenção", string> = {
  Crítico: "bg-pruma-red/10 text-[#9B1C1C]",
  Atenção: "bg-pruma-cyan-pale text-pruma-navy-deep",
};

export function PainelDashboard() {
  return (
    <figure
      role="img"
      aria-label="Mockup: Painel do gestor com KPIs de pedidos, ticket médio, distribuição territorial e clientes em risco."
      className="bg-pruma-white border border-pruma-gray-soft rounded-pruma-lg shadow-pruma-md p-4 w-full"
    >
      {/* Band 1 — Header */}
      <header className="flex items-center justify-between border-b border-pruma-gray-soft pb-3 mb-4">
        <div className="inline-flex items-center gap-1.5 min-w-0">
          <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-pruma-cyan" aria-hidden="true" />
          <span className="font-sans text-[12px] font-medium text-pruma-navy truncate">
            {MOCK_PAINEL.brand}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {MOCK_PAINEL.filters.slice(0, 2).map((filter) => (
            <span
              key={filter}
              className="inline-flex items-center gap-1 rounded-pruma-sm border border-pruma-gray-soft px-2 py-1 font-mono text-[10px] font-normal uppercase tracking-eyebrow text-pruma-gray-text"
            >
              {filter}
              <ChevronDown className="w-2.5 h-2.5" strokeWidth={1.5} aria-hidden="true" />
            </span>
          ))}
        </div>
      </header>

      {/* Band 2 — KPI: 2×2 */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {MOCK_PAINEL.kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-pruma-white border border-pruma-gray-soft rounded-pruma-md p-3 shadow-pruma-sm"
          >
            <p className="font-mono text-[9px] font-normal uppercase tracking-eyebrow text-pruma-gray-text leading-tight">
              {kpi.label}
            </p>
            <p className="font-serif text-[24px] font-semibold text-pruma-navy leading-none mt-2 tracking-tight">
              {kpi.value}
            </p>
            <p className={`font-sans text-[10px] font-medium mt-1.5 leading-tight ${deltaToneClass[kpi.deltaTone]}`}>
              {kpi.delta}
            </p>
          </div>
        ))}
      </div>

      {/* Band 3 — ABC e Map empilhados */}
      <div className="flex flex-col gap-3 mb-4">
        <AbcChart />
        <BrazilMap />
      </div>

      {/* Band 4 — Risk table */}
      <div className="rounded-pruma-md border border-pruma-gray-soft overflow-hidden">
        <div className="flex items-center justify-between bg-pruma-off-white border-b border-pruma-gray-soft px-3 py-2">
          <p className="font-serif text-[13px] font-semibold text-pruma-navy">{MOCK_PAINEL.risk.title}</p>
          <span className="font-sans text-[11px] text-pruma-gray-text shrink-0 ml-2">{MOCK_PAINEL.risk.summary}</span>
        </div>
        <ul>
          {MOCK_PAINEL.risk.rows.map((row, idx) => (
            <li
              key={row.client}
              className={`flex items-center justify-between gap-2 px-3 py-2 ${
                idx < MOCK_PAINEL.risk.rows.length - 1 ? "border-b border-pruma-gray-soft" : ""
              }`}
            >
              <div className="min-w-0 flex-1">
                <p className="font-sans text-[12px] font-medium text-pruma-navy truncate">{row.client}</p>
                <p className="font-sans text-[10px] text-pruma-gray-text mt-0.5">{row.city}</p>
              </div>
              <span
                className={`shrink-0 inline-block rounded-pruma-sm px-1.5 py-0.5 font-mono text-[10px] font-normal uppercase tracking-eyebrow ${statusPillClass[row.status]}`}
              >
                {row.status}
              </span>
              <span className="shrink-0 font-serif text-[12px] font-semibold text-pruma-navy">
                {row.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}
