"use client";

import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { motion } from "framer-motion";

const CONSOLES = [
  {
    name: "Xbox Series X",
    short: "XSX",
    tagline: "120 FPS · ultra low latency",
    bullets: [
      "120 FPS on supported titles",
      "Game Pass — full library on tap",
      "Ideal for shooters, racers, online MP",
    ],
    accent: "from-emerald-400/15 to-transparent",
    dot: "#7eb38a",
  },
  {
    name: "PlayStation 5",
    short: "PS5",
    tagline: "Exclusives · DualSense haptics",
    bullets: [
      "PS5 exclusives ready to play",
      "Lightning-fast SSD load times",
      "DualSense haptics + adaptive triggers",
    ],
    accent: "from-sky-400/15 to-transparent",
    dot: "#86b3d9",
  },
  {
    name: "Nintendo Switch",
    short: "NSW",
    tagline: "Smash · Mario Kart · party play",
    bullets: [
      "Mario Kart, Smash, Zelda — all here",
      "Local multiplayer made easy",
      "Tournaments and party rounds",
    ],
    accent: "from-amber-400/15 to-transparent",
    dot: "#e4a05b",
  },
];

export function ConsolePit() {
  return (
    <section
      id="consoles"
      className="relative isolate py-24 md:py-32 border-t border-ash"
    >
      <div className="absolute inset-0 dot-grid opacity-40" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          index="04"
          eyebrow="The Consoles"
          title={
            <>
              Xbox. PlayStation. Switch.
              <br className="hidden md:inline" />
              <span className="text-hachimaki italic">All on tap.</span>
            </>
          }
        />

        <p className="mt-6 max-w-2xl text-bone/75 text-base md:text-lg leading-relaxed">
          PC isn&apos;t the only ring in this lounge. Roll in solo, bring four
          friends, run a Smash bracket — the consoles are ready when you are.
        </p>

        <div className="mt-14 grid md:grid-cols-3 gap-px bg-ash border border-ash rounded-lg overflow-hidden">
          {CONSOLES.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Card
                className={`relative h-full p-8 md:p-10 bg-panel border-0 overflow-hidden group rounded-none`}
              >
                <div
                  className={`absolute -top-20 -right-20 size-48 rounded-full bg-gradient-to-br ${c.accent} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <div className="relative">
                  <div className="flex items-start justify-between mb-8">
                    <span
                      className="size-2 rounded-full mt-2"
                      style={{ background: c.dot }}
                    />
                    <div className="font-display text-5xl text-bone/10 leading-none italic font-medium">
                      {c.short}
                    </div>
                  </div>

                  <h3 className="font-display text-3xl md:text-4xl tracking-tight font-medium">
                    {c.name}
                  </h3>
                  <div className="font-mono text-xs text-hachimaki/85 uppercase tracking-[0.3em] mt-2">
                    {c.tagline}
                  </div>

                  <ul className="mt-8 space-y-3">
                    {c.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 text-sm text-bone/85"
                      >
                        <span className="font-display text-hachimaki shrink-0 mt-0.5">
                          ›
                        </span>
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
