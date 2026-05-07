import { Hero } from "@/components/Hero";
import { Diagnostico } from "@/components/Diagnostico";
import { Tese } from "@/components/Tese";
import { ComoFunciona } from "@/components/ComoFunciona";
import { PainelGestor } from "@/components/PainelGestor";
import { Funcionalidades } from "@/components/Funcionalidades";
import { ParaQuem } from "@/components/ParaQuem";
import { Diferencial } from "@/components/Diferencial";
import { CTAFinal } from "@/components/CTAFinal";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-pruma-white">
      <Hero />
      <Diagnostico />
      <Tese />
      <ComoFunciona />
      <PainelGestor />
      <Funcionalidades />
      <ParaQuem />
      <Diferencial />
      <CTAFinal />
      <Footer />
    </main>
  );
}
