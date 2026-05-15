/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { Handshake, Sparkles } from "lucide-react";

interface Partner {
  name: string;
  tagline: string;
  /** Brand accent color — used for the top stripe + halo glow */
  accent: string;
  /** Optional logo at /partners/<slug>.svg (see public/partners/README.md) */
  image?: string;
}

// Each entry gets a styled placeholder card. Replace the `image` field with a
// real transparent logo at /public/partners/<slug>.svg whenever you have it.
const PARTNERS: Partner[] = [
  { name: "Red Bull", tagline: "Wings on tap", accent: "#cc1e2f" },
  { name: "Monster Energy", tagline: "Stocked cold", accent: "#88c533" },
  { name: "C4 Energy", tagline: "Pre-game fuel", accent: "#df1d28" },
  { name: "Logitech G", tagline: "Every station", accent: "#00b8fc" },
  { name: "NVIDIA", tagline: "RTX powered", accent: "#76b900" },
  { name: "MSI", tagline: "Display partner", accent: "#ff0000" },
];

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <div className="w-[240px] md:w-[280px] shrink-0 group">
      {/* Logo area */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-ash bg-panel">
        {/* Top accent stripe — grows on hover */}
        <span
          className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-16 rounded-full transition-all duration-300 group-hover:w-32"
          style={{ background: partner.accent }}
        />

        {/* Soft brand-color halo behind */}
        <div
          className="absolute -inset-8 opacity-30 blur-3xl pointer-events-none transition-opacity duration-300 group-hover:opacity-50"
          style={{ background: partner.accent }}
        />

        {partner.image ? (
          <img
            src={partner.image}
            alt={partner.name}
            loading="lazy"
            className="absolute inset-0 m-auto w-3/4 h-3/4 object-contain transition-transform duration-500 group-hover:scale-[1.05]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Big stylized brand initials as placeholder */}
            <span
              className="font-display text-5xl md:text-6xl font-bold tracking-tight text-bone"
              style={{ textShadow: `0 2px 24px ${partner.accent}40` }}
            >
              {partner.name}
            </span>
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="mt-3 px-1 text-center">
        <div className="font-display text-base md:text-lg text-bone font-medium tracking-tight">
          {partner.name}
        </div>
        <div className="mt-0.5 text-[10px] font-mono uppercase tracking-[0.3em] text-muted">
          {partner.tagline}
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  partners,
  reverse = false,
  duration = 50,
}: {
  partners: Partner[];
  reverse?: boolean;
  duration?: number;
}) {
  return (
    <div className="overflow-hidden">
      <div
        className="flex w-max gap-5 md:gap-6 hover:[animation-play-state:paused]"
        style={{
          animation: `marquee ${duration}s linear infinite ${reverse ? "reverse" : ""}`,
        }}
      >
        {[...partners, ...partners, ...partners].map((p, i) => (
          <PartnerCard key={`${p.name}-${i}`} partner={p} />
        ))}
      </div>
    </div>
  );
}

export function Partners() {
  return (
    <section
      aria-label="Brand partners"
      className="relative isolate py-20 md:py-28 border-t border-ash overflow-hidden"
    >
      <div className="absolute inset-0 dot-grid opacity-40" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 border border-ash bg-panel/60 px-3 py-1.5 rounded-full">
            <Handshake className="size-3.5 text-hachimaki" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/85">
              In good company
            </span>
          </div>

          <h2 className="mt-6 font-display text-3xl md:text-5xl tracking-tight leading-[1.05] font-medium max-w-3xl mx-auto">
            Stocked, sponsored, and{" "}
            <span className="text-hachimaki italic">powered by.</span>
          </h2>

          <p className="mt-4 max-w-xl mx-auto text-bone/70 leading-relaxed">
            The brands behind the gear, the fuel, and the late-night runs. Hover
            the row to pause.
          </p>
        </motion.div>
      </div>

      {/* Rotating partner row */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative mt-12 md:mt-16"
      >
        <MarqueeRow partners={PARTNERS} duration={50} />

        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-sumi to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-sumi to-transparent" />
      </motion.div>

      <p className="relative mt-10 text-center text-xs font-mono uppercase tracking-[0.3em] text-muted">
        <Sparkles className="inline size-3.5 mr-2 text-hachimaki" />
        Interested in partnering? Hit us up at the front desk.
      </p>
    </section>
  );
}
