"use client";

import { Logo } from "@/components/ui/logo";
import { motion } from "framer-motion";

/**
 * Large brand-mark section — gives the GD shield a moment of its own.
 * Sits between two content sections as a quiet visual reset.
 */
export function BrandMark() {
  return (
    <section
      aria-label="Gaming Dojo brand mark"
      className="relative isolate overflow-hidden bg-shadow border-t border-ash"
    >
      <div className="absolute inset-0 dot-grid opacity-50" />
      {/* soft warm halo behind */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[36rem] rounded-full bg-hachimaki/8 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-5 md:px-8 py-20 md:py-28 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="inline-flex flex-col items-center gap-6"
        >
          <Logo
            variant="shield"
            className="h-32 w-32 md:h-44 md:w-44 drop-shadow-[0_8px_24px_rgba(var(--c-brand-rgb),0.25)]"
          />

          <div className="flex items-center gap-4 font-mono text-[10px] md:text-xs uppercase tracking-[0.5em] text-muted">
            <span className="h-px w-10 bg-ash" />
            <span>Est. 2025 · Flushing</span>
            <span className="h-px w-10 bg-ash" />
          </div>

          <h2 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05] font-medium max-w-3xl">
            Built by gamers,{" "}
            <span className="text-hachimaki italic">for gamers.</span>
          </h2>

          <p className="max-w-xl text-bone/75 text-base md:text-lg leading-relaxed">
            Every station, peripheral, and corner of the room was set up with
            one question: would <em className="not-italic text-bone font-medium">we</em> want to play here? If the
            answer was no, it didn&apos;t make the cut.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
