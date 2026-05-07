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
      className="bg-pruma-white border border-pruma-gray-soft rounded-pruma-lg shadow-pruma-md p-6 w-full min-w-[760px]"
    >
      {/* Band 1 — Header */}
      <header className="flex items-center justify-between border-b border-pruma-gray-soft pb-4 mb-6">
        <div className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-pruma-cyan" aria-hidden="true" />
          <span className="font-sans text-[13px] font-medium text-pruma-navy">{MOCK_PAINEL.brand}</span>
        </div>
        <div className="flex items-center gap-2">
          {MOCK_PAINEL.filters.map((filter) => (
            <span
              key={filter}
              className="inline-flex items-center gap-2 rounded-pruma-sm border border-pruma-gray-soft px-3 py-1.5 font-mono text-xs font-normal uppercase tracking-eyebrow text-pruma-gray-text"
            >
              {filter}
              <ChevronDown className="w-3 h-3" strokeWidth={1.5} aria-hidden="true" />
            </span>
          ))}
        </div>
      </header>

      {/* Band 2 — KPI row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {MOCK_PAINEL.kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-pruma-white border border-pruma-gray-soft rounded-pruma-md p-4 shadow-pruma-sm"
          >
            <p className="font-mono text-[11px] font-normal uppercase tracking-eyebrow text-pruma-gray-text">
              {kpi.label}
            </p>
            <p className="font-serif text-[28px] font-semibold text-pruma-navy leading-none mt-3 tracking-tight">
              {kpi.value}
            </p>
            <p className={`font-sans text-xs font-medium mt-3 ${deltaToneClass[kpi.deltaTone]}`}>
              {kpi.delta}
            </p>
          </div>
        ))}
      </div>

      {/* Band 3 — ABC + Map */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="col-span-7">
          <AbcChart />
        </div>
        <div className="col-span-5">
          <BrazilMap />
        </div>
      </div>

      {/* Band 4 — Risk table */}
      <div className="rounded-pruma-md border border-pruma-gray-soft overflow-hidden">
        <div className="flex items-center justify-between bg-pruma-off-white border-b border-pruma-gray-soft px-5 py-3">
          <p className="font-serif text-base font-semibold text-pruma-navy">{MOCK_PAINEL.risk.title}</p>
          <span className="font-sans text-xs text-pruma-gray-text">{MOCK_PAINEL.risk.summary}</span>
        </div>
        <ul>
          {MOCK_PAINEL.risk.rows.map((row, idx) => (
            <li
              key={row.client}
              className={`grid grid-cols-12 items-center px-5 py-3 ${
                idx < MOCK_PAINEL.risk.rows.length - 1 ? "border-b border-pruma-gray-soft" : ""
              }`}
            >
              <div className="col-span-4">
                <p className="font-sans text-[13px] font-medium text-pruma-navy">{row.client}</p>
                <p className="font-sans text-[11px] text-pruma-gray-text mt-0.5">{row.city}</p>
              </div>
              <div className="col-span-3">
                <span
                  className={`inline-block rounded-pruma-sm px-2 py-0.5 font-mono text-xs font-normal uppercase tracking-eyebrow ${statusPillClass[row.status]}`}
                >
                  {row.status}
                </span>
              </div>
              <span className="col-span-3 font-sans text-[13px] text-pruma-gray-text text-right">
                {row.days}
              </span>
              <span className="col-span-2 font-serif text-sm font-semibold text-pruma-navy text-right">
                {row.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}
