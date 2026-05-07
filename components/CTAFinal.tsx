"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { CTA_FINAL, CTA_FORM } from "@/lib/constants";

type FormState = "idle" | "success";

const inputClass =
  "font-sans text-sm text-pruma-navy bg-white border border-pruma-gray-soft rounded-pruma-sm px-4 py-3 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-pruma-cyan focus:ring-offset-2 focus:border-pruma-cyan transition-colors duration-150 w-full";

export function CTAFinal() {
  const [formState, setFormState] = useState<FormState>("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // No backend per D-16 — submit only flips local state.
    // Backend integration (CRM/email) is deferred to v2.
    setFormState("success");
  }

  return (
    <section
      id="contato"
      aria-labelledby="cta-heading"
      className="bg-pruma-cyan-pale py-section-y-mobile lg:py-section-y-desktop"
    >
      <Container as="div">
        {/* Section header */}
        <div className="text-center max-w-[60ch] mx-auto">
          <div className="flex justify-center">
            <Eyebrow tone="light">{CTA_FINAL.eyebrow}</Eyebrow>
          </div>
          <h2
            id="cta-heading"
            className="font-serif text-4xl lg:text-[52px] font-medium text-pruma-navy leading-[1.10] tracking-tight"
          >
            {CTA_FINAL.headline}
          </h2>
          <p className="font-sans text-base lg:text-lg text-pruma-navy leading-[1.6] mt-4">
            {CTA_FINAL.subheadline}
          </p>
        </div>

        {/* Form card */}
        <div className="mt-12 lg:mt-16 mx-auto max-w-[720px] bg-white border border-pruma-gray-soft rounded-pruma-md shadow-pruma-sm p-8 lg:p-10">
          <AnimatePresence mode="wait" initial={false}>
            {formState === "idle" ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                {/* 2-column grid: nome, email, telefone, empresa, cargo, vendedores */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Nome */}
                  <label className="flex flex-col gap-1.5">
                    <span className="font-sans text-sm font-medium text-pruma-navy">
                      {CTA_FINAL.fields.nome.label}
                    </span>
                    <input
                      type="text"
                      name="nome"
                      required
                      placeholder={CTA_FINAL.fields.nome.placeholder}
                      className={inputClass}
                    />
                  </label>

                  {/* Email */}
                  <label className="flex flex-col gap-1.5">
                    <span className="font-sans text-sm font-medium text-pruma-navy">
                      {CTA_FINAL.fields.email.label}
                    </span>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder={CTA_FINAL.fields.email.placeholder}
                      className={inputClass}
                    />
                  </label>

                  {/* Telefone */}
                  <label className="flex flex-col gap-1.5">
                    <span className="font-sans text-sm font-medium text-pruma-navy">
                      {CTA_FINAL.fields.telefone.label}
                    </span>
                    <input
                      type="tel"
                      name="telefone"
                      required
                      placeholder={CTA_FINAL.fields.telefone.placeholder}
                      className={inputClass}
                    />
                  </label>

                  {/* Empresa */}
                  <label className="flex flex-col gap-1.5">
                    <span className="font-sans text-sm font-medium text-pruma-navy">
                      {CTA_FINAL.fields.empresa.label}
                    </span>
                    <input
                      type="text"
                      name="empresa"
                      required
                      placeholder={CTA_FINAL.fields.empresa.placeholder}
                      className={inputClass}
                    />
                  </label>

                  {/* Cargo */}
                  <label className="flex flex-col gap-1.5">
                    <span className="font-sans text-sm font-medium text-pruma-navy">
                      {CTA_FINAL.fields.cargo.label}
                    </span>
                    <input
                      type="text"
                      name="cargo"
                      required
                      placeholder={CTA_FINAL.fields.cargo.placeholder}
                      className={inputClass}
                    />
                  </label>

                  {/* Vendedores select */}
                  <label className="flex flex-col gap-1.5">
                    <span className="font-sans text-sm font-medium text-pruma-navy">
                      {CTA_FINAL.fields.vendedores.label}
                    </span>
                    <select
                      name="vendedores"
                      required
                      defaultValue=""
                      className={`${inputClass} appearance-none`}
                    >
                      <option value="" disabled>
                        Selecione...
                      </option>
                      {CTA_FINAL.fields.vendedores.options.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                {/* Segmento select — full width */}
                <label className="flex flex-col gap-1.5">
                  <span className="font-sans text-sm font-medium text-pruma-navy">
                    {CTA_FINAL.fields.segmento.label}
                  </span>
                  <select
                    name="segmento"
                    required
                    defaultValue=""
                    className={`${inputClass} appearance-none`}
                  >
                    <option value="" disabled>
                      Selecione...
                    </option>
                    {CTA_FINAL.fields.segmento.options.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>

                {/* Desafio textarea — full width */}
                <label className="flex flex-col gap-1.5">
                  <span className="font-sans text-sm font-medium text-pruma-navy">
                    {CTA_FINAL.fields.desafio.label}
                  </span>
                  <textarea
                    name="desafio"
                    required
                    rows={4}
                    placeholder={CTA_FINAL.fields.desafio.placeholder}
                    className={`${inputClass} resize-y`}
                  />
                </label>

                {/* Submit */}
                <Button
                  variant="primary"
                  type="submit"
                  className="self-start mt-2"
                >
                  {CTA_FORM}
                </Button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-4 py-12 text-center"
                role="status"
                aria-live="polite"
              >
                <CheckCircle
                  className="w-10 h-10 text-pruma-cyan"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="font-serif text-2xl font-medium text-pruma-navy">
                  {CTA_FINAL.successHeadline}
                </h3>
                <p className="font-sans text-base text-pruma-gray-text max-w-[40ch]">
                  {CTA_FINAL.successSubtext}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
