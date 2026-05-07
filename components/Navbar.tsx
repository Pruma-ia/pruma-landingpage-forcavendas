"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BRAND_NAME, NAV_LINKS, CTA_PRIMARY } from "@/lib/constants";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  // Scroll observer — flip scrolled at scrollY > 8 (D-03)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock while drawer open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes drawer
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={[
        "sticky top-0 z-40 w-full",
        "transition-[background-color,box-shadow,border-color,backdrop-filter] duration-200 ease-out",
        scrolled
          ? "bg-white/72 backdrop-blur-md shadow-pruma-md border-b border-pruma-gray-soft"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      <Container as="div" className="flex items-center justify-between h-14 md:h-16">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif font-semibold text-lg md:text-xl text-pruma-navy tracking-tight min-w-[80px]"
        >
          {BRAND_NAME}
        </Link>

        {/* Desktop nav links — hidden on mobile */}
        <nav
          className="hidden md:flex items-center gap-x-8"
          aria-label="Navegação principal"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-sm font-medium text-pruma-navy transition-colors duration-150 ease-out hover:text-pruma-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pruma-cyan focus-visible:ring-offset-2 rounded-pruma-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-2">
          <Button variant="primary" href="#contato">
            {CTA_PRIMARY}
          </Button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-pruma-sm text-pruma-navy active:bg-pruma-cyan-pale transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pruma-cyan focus-visible:ring-offset-2"
            aria-label="Abrir menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Menu className="w-6 h-6" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </Container>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            className="fixed inset-0 z-50 bg-white md:hidden"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{
              duration: reducedMotion ? 0.01 : 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Container as="div" className="flex items-center justify-between h-14">
              <span className="font-serif font-semibold text-lg text-pruma-navy tracking-tight">
                {BRAND_NAME}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center w-11 h-11 rounded-pruma-sm text-pruma-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pruma-cyan focus-visible:ring-offset-2"
                aria-label="Fechar menu"
                autoFocus
              >
                <X className="w-6 h-6" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </Container>
            <nav className="flex flex-col" aria-label="Navegação mobile">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-sans text-lg font-medium text-pruma-navy py-4 px-6 border-b border-pruma-gray-soft min-h-[44px]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="px-6 py-8">
              <Button
                variant="primary"
                href="#contato"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                {CTA_PRIMARY}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
