import { Factory, Truck, ArrowUpRight, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { PARA_QUEM } from "@/lib/constants";

const iconMap: Record<"Factory" | "Truck" | "ArrowUpRight", LucideIcon> = {
  Factory,
  Truck,
  ArrowUpRight,
};

export function ParaQuem() {
  return (
    <section
      id="para-quem"
      aria-labelledby="para-quem-heading"
      className="bg-pruma-white py-section-y-mobile lg:py-section-y-desktop"
    >
      <Container as="div">
        <Eyebrow tone="light">{PARA_QUEM.eyebrow}</Eyebrow>

        <h2
          id="para-quem-heading"
          className="font-serif text-4xl lg:text-[52px] font-medium text-pruma-navy leading-[1.10] tracking-tight max-w-[20ch]"
        >
          {PARA_QUEM.headline}
        </h2>

        <p className="font-sans text-base lg:text-lg font-normal text-pruma-gray-text leading-[1.6] mt-4 max-w-[60ch]">
          {PARA_QUEM.subheadline}
        </p>

        <ul className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 mt-12 lg:mt-16 list-none">
          {PARA_QUEM.profiles.map((profile) => {
            const Icon = iconMap[profile.iconName];
            return (
              <Card key={profile.title} as="li" interactive>
                {/* Icon badge */}
                <div className="inline-flex items-center justify-center rounded-pruma-sm bg-pruma-cyan-pale p-2">
                  <Icon
                    className="w-6 h-6 text-pruma-navy-deep"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>

                {/* Profile label */}
                <p className="font-mono text-xs uppercase tracking-eyebrow text-pruma-navy-deep mt-4">
                  {profile.segment}
                </p>

                {/* Title */}
                <h3 className="font-serif text-2xl font-semibold text-pruma-navy mt-2 leading-tight">
                  {profile.title}
                </h3>

                {/* Anchor: revenue + team size */}
                <p className="font-sans text-xs font-medium text-pruma-navy-deep mt-3">
                  {profile.anchor}
                </p>

                {/* Divider */}
                <div className="border-t border-pruma-gray-soft mt-4 mb-4" />

                {/* Description */}
                <p className="font-sans text-base text-pruma-gray-text leading-[1.55]">
                  {profile.description}
                </p>
              </Card>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
