import { MOCK_PAINEL } from "@/lib/constants";

// Low-poly Brazil silhouette path approximating the country outline within
// a 240×280 viewBox. Coordinate space matches the cx/cy in MOCK_PAINEL.map.points.
const BRAZIL_PATH =
  "M 152 56 L 178 50 L 200 60 L 222 78 L 230 102 L 232 130 L 226 152 L 218 168 L 210 184 L 196 196 L 178 208 L 168 222 L 158 240 L 144 252 L 130 244 L 122 226 L 118 204 L 112 186 L 100 170 L 92 150 L 96 128 L 108 108 L 122 90 L 138 72 Z";

export function BrazilMap() {
  const { title, points } = MOCK_PAINEL.map;
  return (
    <div className="rounded-pruma-md border border-pruma-gray-soft p-5 h-full flex flex-col">
      <h4 className="font-serif text-base font-semibold text-pruma-navy">{title}</h4>

      <div className="relative mt-3 flex-1 flex items-center justify-center">
        <svg
          viewBox="0 0 240 280"
          className="w-full h-auto max-h-[220px]"
          role="img"
          aria-labelledby="brazil-map-title"
        >
          <title id="brazil-map-title">Mapa do Brasil — distribuição territorial de clientes</title>
          <path d={BRAZIL_PATH} fill="#F4F6F9" stroke="#5B6B85" strokeWidth={0.5} />
          {points.map((p) => (
            <g key={p.city}>
              <circle cx={p.cx} cy={p.cy} r={p.r + 4} fill="rgba(0,174,239,0.18)" />
              <circle
                cx={p.cx}
                cy={p.cy}
                r={p.r}
                fill="#00AEEF"
                stroke="rgba(13,27,75,0.15)"
                strokeWidth={1}
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
