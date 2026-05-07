import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DIFERENCIAL } from "@/lib/constants";

export function Diferencial() {
  return (
    <section
      id="diferencial"
      aria-labelledby="diferencial-heading"
      className="bg-pruma-navy py-section-y-mobile lg:py-section-y-desktop"
    >
      <Container as="div">
        <div className="text-center max-w-[60ch] mx-auto">
          <div className="flex justify-center">
            <Eyebrow tone="dark">{DIFERENCIAL.eyebrow}</Eyebrow>
          </div>
          <h2
            id="diferencial-heading"
            className="font-serif text-4xl lg:text-[52px] font-medium text-white leading-[1.10] tracking-tight max-w-[20ch] mx-auto mt-4"
          >
            {DIFERENCIAL.headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 mt-12 lg:mt-20">
          {DIFERENCIAL.pillars.map((pillar) => (
            <div key={pillar.title} className="text-left">
              <span className="font-mono text-xs uppercase tracking-eyebrow text-pruma-cyan">
                {pillar.number}
              </span>
              <h3 className="font-serif text-2xl font-semibold text-white mt-3 leading-tight">
                {pillar.title}
              </h3>
              <p className="font-sans text-base text-white/70 leading-[1.6] mt-3">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
