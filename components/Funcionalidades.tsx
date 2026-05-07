import {
  Smartphone,
  Sliders,
  TrendingUp,
  AlertTriangle,
  BarChart2,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { PainelDashboard } from "@/components/mockups/PainelDashboard";
import { FUNCIONALIDADES } from "@/lib/constants";

const iconMap: Record<
  "Smartphone" | "Sliders" | "TrendingUp" | "AlertTriangle" | "BarChart2",
  LucideIcon
> = { Smartphone, Sliders, TrendingUp, AlertTriangle, BarChart2 };

const heroFeature = FUNCIONALIDADES.features[0];
const smallFeatures = FUNCIONALIDADES.features.filter((f) => !f.isHero);

export function Funcionalidades() {
  return (
    <section
      id="funcionalidades"
      aria-labelledby="funcionalidades-heading"
      className="bg-pruma-cyan-pale py-section-y-mobile lg:py-section-y-desktop"
    >
      <Container as="div">
        <Eyebrow tone="light">{FUNCIONALIDADES.eyebrow}</Eyebrow>

        <h2
          id="funcionalidades-heading"
          className="font-serif text-4xl lg:text-[52px] font-medium text-pruma-navy leading-[1.10] tracking-tight max-w-[20ch]"
        >
          {FUNCIONALIDADES.headline}
        </h2>

        <p className="font-sans text-base lg:text-lg text-pruma-gray-text leading-[1.6] mt-4 max-w-[60ch]">
          {FUNCIONALIDADES.subheadline}
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-12 lg:mt-16 list-none">
          {/* Hero card — full-width, embeds scaled PainelDashboard */}
          <Card
            as="li"
            interactive={false}
            className="lg:col-span-3 overflow-hidden p-0 relative"
          >
            {/* Mockup window — scale 0.72 per UI-SPEC bento hero card */}
            <div className="overflow-hidden" style={{ height: "320px" }}>
              <div style={{ transform: "scale(0.72)", transformOrigin: "top center" }}>
                <PainelDashboard />
              </div>
            </div>

            {/* Bottom overlay — subtle fade from transparent to pruma-cyan-pale */}
            <div
              className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, transparent, #E0F6FE)",
              }}
              aria-hidden="true"
            />

            {/* Hero label — bottom-left inside card, above the overlay */}
            <div className="relative z-10 px-8 pb-6 -mt-8">
              <p className="font-serif text-xl font-semibold text-pruma-navy leading-tight">
                {heroFeature.title}
              </p>
            </div>
          </Card>

          {/* 5 smaller cards */}
          {smallFeatures.map((feature) => {
            const iconName = feature.iconName as keyof typeof iconMap;
            const Icon = iconMap[iconName];
            return (
              <Card key={feature.title} as="li" interactive className="p-6">
                {Icon && (
                  <Icon
                    className="w-5 h-5 text-pruma-navy-deep"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                )}
                <h3 className="font-serif text-xl font-semibold text-pruma-navy mt-3 leading-tight">
                  {feature.title}
                </h3>
                <p className="font-sans text-base text-pruma-gray-text leading-[1.55] mt-2">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
