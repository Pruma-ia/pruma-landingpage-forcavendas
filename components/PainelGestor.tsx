import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PainelDashboard } from "@/components/mockups/PainelDashboard";
import { PAINEL_GESTOR } from "@/lib/constants";

export function PainelGestor() {
  const leftCallouts = PAINEL_GESTOR.callouts.slice(0, 2);
  const rightCallouts = PAINEL_GESTOR.callouts.slice(2, 4);

  return (
    <section
      id="painel-gestor"
      aria-labelledby="painel-gestor-heading"
      className="bg-pruma-white py-section-y-mobile lg:py-section-y-desktop"
    >
      <Container as="div">
        <div className="text-center max-w-[60ch] mx-auto">
          <div className="flex justify-center">
            <Eyebrow tone="light">{PAINEL_GESTOR.eyebrow}</Eyebrow>
          </div>
          <h2
            id="painel-gestor-heading"
            className="font-serif text-4xl lg:text-[52px] font-medium text-pruma-navy leading-[1.10] tracking-tight"
          >
            {PAINEL_GESTOR.headline}
          </h2>
          <p className="font-sans text-base lg:text-lg text-pruma-gray-text leading-[1.6] mt-4">
            {PAINEL_GESTOR.subheadline}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-8 lg:gap-12 items-center mt-12 lg:mt-20">
          {/* Left callouts — 01 e 02 */}
          <div className="flex flex-col gap-10 order-2 lg:order-1">
            {leftCallouts.map((callout) => (
              <div key={callout.number} className="flex flex-col gap-2 lg:text-right">
                <span className="font-serif text-3xl font-medium text-pruma-navy leading-none">
                  {callout.number}
                </span>
                <p className="font-sans text-sm text-pruma-gray-text leading-[1.5] max-w-[28ch] lg:ml-auto">
                  {callout.text}
                </p>
              </div>
            ))}
          </div>

          {/* Center mockup — primeiro no mobile */}
          <div className="order-1 lg:order-2 overflow-x-auto -mx-6 px-6 lg:mx-0 lg:px-0">
            <PainelDashboard />
          </div>

          {/* Right callouts — 03 e 04 */}
          <div className="flex flex-col gap-10 order-3">
            {rightCallouts.map((callout) => (
              <div key={callout.number} className="flex flex-col gap-2">
                <span className="font-serif text-3xl font-medium text-pruma-navy leading-none">
                  {callout.number}
                </span>
                <p className="font-sans text-sm text-pruma-gray-text leading-[1.5] max-w-[28ch]">
                  {callout.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
