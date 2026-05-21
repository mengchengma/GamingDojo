"use client";

import { Spotlight } from "@/components/ui/spotlight";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  }),
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-sumi pt-20 md:pt-24 pb-16"
    >
      <div className="absolute inset-0 dot-grid opacity-50" />
      <Spotlight className="-top-40 left-1/2 -translate-x-1/2" />

      {/* Layered warm halos — primary glow behind the brand mark, secondary
          glows up top and lower for a column of light running down the hero. */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 size-[36rem] md:size-[44rem] rounded-full bg-hachimaki/8 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[48rem] md:size-[64rem] rounded-full bg-hachimaki/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 size-[36rem] md:size-[48rem] rounded-full bg-hachimaki/7 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        {/* Eyebrow */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={0}
          className="flex items-center justify-center gap-3 text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-bone/65"
        >
          <span className="text-hachimaki">●</span>
          <span>Est. Flushing — NYC</span>
          <span className="hidden md:inline-block h-px w-12 bg-ash" />
          <span className="hidden md:inline">36-29 Main St · 11354</span>
        </motion.div>

        {/* GD shield + wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-2 md:mt-4 flex justify-center"
        >
          <Logo
            variant="shield"
            className="h-44 w-44 sm:h-52 sm:w-52 md:h-64 md:w-64 lg:h-72 lg:w-72 drop-shadow-[0_12px_32px_rgba(var(--c-brand-rgb),0.25)]"
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={3}
          className="mt-4 md:mt-6 text-center font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] font-medium max-w-4xl mx-auto"
        >
          Built by gamers,{" "}
          <span className="text-hachimaki italic">for gamers.</span>
        </motion.h1>

        {/* Body */}
        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={5}
          className="mt-6 md:mt-8 max-w-2xl mx-auto text-center text-bone/80 text-base md:text-lg leading-relaxed"
        >
          Flushing&apos;s coziest gaming lounge. RTX-powered PCs, every major
          console, in-house kitchen, and a streaming room — open till{" "}
          <span className="text-bone font-medium">5 AM weekends</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={6}
          className="mt-8 md:mt-10 flex flex-col items-center gap-4"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="/#pricing">
              <Button variant="primary" size="lg">
                See pricing
                <ArrowUpRight className="size-4" />
              </Button>
            </a>
            <a href="/#visit">
              <Button variant="outline" size="lg">
                <MapPin className="size-4" />
                Find us
              </Button>
            </a>
          </div>
          <a
            href="/#games"
            className="group inline-flex items-center gap-1.5 font-display text-sm italic text-bone/70 hover:text-hachimaki transition-colors duration-200 cursor-pointer"
          >
            Or browse the games
            <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

      </div>

      {/* Marquee strip */}
      <div className="relative z-10 mt-16">
        <Marquee
          items={[
            "Ryzen 7",
            "RTX 5070",
            "32 GB DDR5",
            "1 TB NVMe",
            "MSI 280 Hz",
            "Logitech G",
            "Open till 5 AM",
            "Follow for −$2/hr",
            "Tournaments on Discord",
            "Dojo Kitchen",
          ]}
        />
      </div>
    </section>
  );
}
