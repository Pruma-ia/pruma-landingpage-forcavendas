import { MOCK_PAINEL } from "@/lib/constants";

const colorMap: Record<"cyan" | "navy-deep" | "gray-soft", string> = {
  cyan: "bg-pruma-cyan",
  "navy-deep": "bg-pruma-navy-deep",
  "gray-soft": "bg-pruma-gray-soft",
};

export function AbcChart() {
  const { title, subtitle, bars } = MOCK_PAINEL.abc;
  return (
    <div className="rounded-pruma-md border border-pruma-gray-soft p-5 h-full flex flex-col">
      <h4 className="font-serif text-base font-semibold text-pruma-navy">{title}</h4>
      <p className="font-sans text-xs text-pruma-gray-text mt-1">{subtitle}</p>

      <div className="relative mt-5 flex-1 min-h-[160px]">
        <div
          className="absolute left-0 right-0 top-1/2 border-t border-dashed border-pruma-gray-soft"
          aria-hidden="true"
        />
        <div className="relative flex items-end justify-between h-full gap-1">
          {bars.map((bar) => (
            <div key={bar.tier} className="flex-1 flex flex-col items-center justify-end h-full">
              <div
                className={`w-full rounded-t-sm ${colorMap[bar.color]}`}
                style={{ height: `${bar.height}%` }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-2">
        {bars.map((bar) => (
          <span key={bar.tier} className="flex-1 text-center font-sans text-[11px] text-pruma-gray-text">
            {bar.tier}
          </span>
        ))}
      </div>
    </div>
  );
}
