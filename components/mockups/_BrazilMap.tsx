"use client";

import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { MOCK_PAINEL } from "@/lib/constants";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const CITY_COORDS: Record<string, [number, number]> = {
  "São Paulo":      [-46.63, -23.55],
  "Belo Horizonte": [-43.94, -19.92],
  "Rio de Janeiro": [-43.18, -22.91],
  "Curitiba":       [-49.27, -25.43],
  "Porto Alegre":   [-51.23, -30.03],
  "Recife":         [-34.88, -8.05],
  "Salvador":       [-38.51, -12.97],
  "Goiânia":        [-49.26, -16.68],
};

export function BrazilMap() {
  const { title, points } = MOCK_PAINEL.map;
  return (
    <div className="rounded-pruma-md border border-pruma-gray-soft p-5 h-full flex flex-col">
      <p className="font-serif text-base font-semibold text-pruma-navy">{title}</p>

      <div className="mt-3 flex-1 flex items-center justify-center">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ center: [-52, -15], scale: 680 }}
          style={{ width: "100%", height: "auto" }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }: { geographies: any[] }) =>
              geographies
                .filter((geo) => geo.id === "076")
                .map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#F4F6F9"
                    stroke="#5B6B85"
                    strokeWidth={0.5}
                    style={{ default: { outline: "none" }, hover: { outline: "none" }, pressed: { outline: "none" } }}
                  />
                ))
            }
          </Geographies>

          {points.map((p) => {
            const coords = CITY_COORDS[p.city];
            if (!coords) return null;
            return (
              <Marker key={p.city} coordinates={coords}>
                <circle r={p.r + 4} fill="rgba(0,174,239,0.18)" />
                <circle r={p.r} fill="#00AEEF" stroke="rgba(13,27,75,0.15)" strokeWidth={1} />
              </Marker>
            );
          })}
        </ComposableMap>
      </div>
    </div>
  );
}
