import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BRAND_NAME, FOOTER, CTA_PRIMARY } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-pruma-navy py-section-y-mobile lg:py-section-y-desktop">
      <Container as="div">
        {/* 4-column grid: brand + 3 link columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand column */}
          <div>
            <span className="font-serif font-semibold text-xl text-white tracking-tight">
              {BRAND_NAME}
            </span>
            <p className="font-sans text-sm text-white/70 mt-2 leading-relaxed">
              {FOOTER.tagline}
            </p>
            <div className="mt-6">
              <Button
                variant="ghost"
                href="#contato"
                className="border-white text-white hover:bg-white/10 hover:border-white"
              >
                {CTA_PRIMARY}
              </Button>
            </div>
          </div>

          {/* 3 link columns */}
          {FOOTER.columns.map((col) => (
            <div key={col.heading}>
              <p className="font-mono text-xs uppercase tracking-eyebrow text-pruma-cyan mb-4">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-3 list-none">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-white/80 hover:text-white transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pruma-cyan focus-visible:ring-offset-2 rounded-pruma-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright baseline */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="font-sans text-xs text-white/50">{FOOTER.copyright}</p>
          <Link
            href="#"
            className="font-sans text-xs text-white/40 hover:text-white/70 transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pruma-cyan rounded-pruma-sm"
          >
            {/* TODO: link real para política de privacidade */}
            Política de privacidade
          </Link>
        </div>
      </Container>
    </footer>
  );
}
