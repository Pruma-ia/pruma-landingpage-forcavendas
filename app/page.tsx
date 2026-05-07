import { Hero } from "@/components/Hero";
import { Diagnostico } from "@/components/Diagnostico";
import { Tese } from "@/components/Tese";

export default function Home() {
  return (
    <main className="min-h-screen bg-pruma-white">
      <Hero />
      <Diagnostico />
      <Tese />
    </main>
  );
}
