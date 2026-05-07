import { MOCK_APP } from "@/lib/constants";

const fmtBRL = (value: number): string =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function AppVendedor() {
  return (
    <figure
      role="img"
      aria-label={`Mockup: Tela do app vendedor mostrando pedido fechado para ${MOCK_APP.client} no valor de ${fmtBRL(MOCK_APP.total)}.`}
      className="bg-pruma-white border border-pruma-gray-soft rounded-pruma-lg shadow-pruma-md overflow-hidden w-full max-w-[380px] mx-auto"
    >
      {/* Header */}
      <header className="flex items-start justify-between gap-3 px-5 py-4 border-b border-pruma-gray-soft">
        <div className="min-w-0">
          <h4 className="font-serif text-base font-semibold text-pruma-navy leading-tight truncate">
            {MOCK_APP.client}
          </h4>
          <p className="font-sans text-xs text-pruma-gray-text mt-1">{MOCK_APP.meta}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-pruma-sm bg-pruma-cyan-pale px-2 py-1 font-mono text-[10px] font-normal uppercase tracking-eyebrow text-pruma-navy-deep flex-shrink-0">
          <span className="w-2 h-2 rounded-full bg-pruma-cyan" aria-hidden="true" />
          {MOCK_APP.status}
        </span>
      </header>

      {/* Item list */}
      <ul className="divide-y divide-pruma-gray-soft">
        {MOCK_APP.items.map((item) => (
          <li key={item.name} className="flex items-center justify-between px-5 py-3">
            <div className="min-w-0 pr-3">
              <p className="font-sans text-sm font-medium text-pruma-navy truncate">{item.name}</p>
              <p className="font-sans text-xs text-pruma-gray-text mt-0.5">
                {item.qty} × {fmtBRL(item.unit)}
              </p>
            </div>
            <span className="font-sans text-sm font-semibold text-pruma-navy flex-shrink-0">
              {fmtBRL(item.subtotal)}
            </span>
          </li>
        ))}
        <li className="flex items-center justify-between px-5 py-3">
          <p className="font-sans text-xs italic text-pruma-gray-text">
            {MOCK_APP.adjustment.label}
          </p>
          <span className="font-sans text-xs italic text-pruma-gray-text">
            {fmtBRL(MOCK_APP.adjustment.value)}
          </span>
        </li>
      </ul>

      {/* Discount + total */}
      <div className="px-5 py-4 bg-pruma-off-white border-t border-pruma-gray-soft">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[13px] text-pruma-gray-text">Subtotal</span>
          <span className="font-sans text-[13px] text-pruma-gray-text">{fmtBRL(MOCK_APP.subtotal)}</span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="font-sans text-[13px] text-pruma-gray-text">
            Desconto comercial ({MOCK_APP.discountPercent}%)
          </span>
          <span className="font-sans text-[13px] text-pruma-cyan">– {fmtBRL(MOCK_APP.discountValue)}</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="font-sans text-sm font-medium text-pruma-navy">Total</span>
          <span className="font-serif text-[22px] font-semibold text-pruma-navy leading-none tracking-tight">
            {fmtBRL(MOCK_APP.total)}
          </span>
        </div>
      </div>

      {/* Action bar (decorative) */}
      <div className="px-5 py-4 border-t border-pruma-gray-soft">
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          className="inline-flex items-center justify-center w-full gap-2 font-sans text-sm font-medium min-h-[44px] px-6 py-3.5 rounded-pruma-sm bg-pruma-navy text-white shadow-pruma-sm pointer-events-none"
        >
          {MOCK_APP.cta}
        </button>
      </div>
    </figure>
  );
}
