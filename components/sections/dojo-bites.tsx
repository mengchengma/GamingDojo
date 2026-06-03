"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { motion } from "framer-motion";
import { ChefHat } from "lucide-react";

export function DojoBites() {
  return (
    <section
      id="bites"
      className="relative isolate py-24 md:py-32 border-t border-ash bg-shadow"
    >
      <div className="absolute inset-0 dot-grid opacity-40" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          index="04"
          eyebrow="Dojo Bites"
          title={
            <>
              Fuel that{" "}
              <span className="text-hachimaki italic">keeps up.</span>
            </>
          }
        />

        <p className="mt-6 max-w-2xl text-bone/75 text-base md:text-lg leading-relaxed">
          A real in-house kitchen — not vending machines, not delivery. Hot
          meals, sharp snacks, and drinks that pull their weight on the
          night-shift grind.
        </p>

        {/* Coming-soon card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 border border-ash bg-panel/60 rounded-lg p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-6"
        >
          <div className="flex size-12 items-center justify-center bg-hachimaki/15 text-hachimaki rounded-full shrink-0">
            <ChefHat className="size-5" />
          </div>
          <div className="flex-1">
            <div className="font-display text-xl text-bone font-medium tracking-tight">
              Full menu landing soon
            </div>
            <p className="mt-1 text-sm text-bone/70 leading-relaxed">
              We&apos;re still finalizing the kitchen lineup. Ask staff for
              today&apos;s menu and specials, or follow our socials — we drop the
              latest dishes there first.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
