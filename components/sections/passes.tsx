"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { motion } from "framer-motion";
import { Check, Calendar, CalendarDays, CalendarRange } from "lucide-react";
import { cn } from "@/lib/utils";

// NOTE: Placeholder pricing — swap with your real rates.
const PASSES = [
  {
    Icon: Calendar,
    name: "Day Pass",
    price: 50,
    suffix: "/day",
    tagline: "One long, lazy session — no clock-watching.",
    features: [
      "Unlimited play, open-to-close",
      "Any station: PC or console",
      "Use it on any single day",
    ],
    saving: "≈ 4 hrs free vs. hourly",
  },
  {
    Icon: CalendarDays,
    name: "Week Pass",
    price: 85,
    suffix: "/week",
    tagline: "Seven days, zero friction. Best for the regulars.",
    features: [
      "Unlimited play for 7 consecutive days",
      "Includes PC and console stations",
      "Member rate locks in automatically",
    ],
    saving: "≈ 19 hrs free vs. hourly",
    highlight: true,
  },
  {
    Icon: CalendarRange,
    name: "Month Pass",
    price: 199,
    suffix: "/mo",
    tagline: "Your second living room.",
    features: [
      "Unlimited play for 30 consecutive days",
      "All stations included — PC and console",
      "Exclusive Discord role",
    ],
    saving: "≈ 56 hrs free vs. hourly",
  },
];

export function Passes() {
  return (
    <section
      id="passes"
      className="relative isolate py-24 md:py-32 border-t border-ash bg-shadow"
    >
      <div className="absolute inset-0 dot-grid opacity-40" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow="Passes"
          title={
            <>
              Stay longer.{" "}
              <span className="text-hachimaki italic">Save more.</span>
            </>
          }
        />

        <p className="mt-6 max-w-2xl text-bone/75 text-base md:text-lg leading-relaxed">
          If you&apos;re here more than a few hours, a pass pays for itself.
          One price, all you can play — across every PC and console on the
          floor.
        </p>

        <div className="mt-14 grid md:grid-cols-3 gap-px bg-ash border border-ash rounded-lg overflow-hidden">
          {PASSES.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Card
                className={cn(
                  "h-full p-8 md:p-10 border-0 rounded-none relative overflow-hidden group",
                  p.highlight ? "bg-panel" : "bg-shadow",
                )}
              >
                {p.highlight && (
                  <>
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-hachimaki to-transparent" />
                    <div className="absolute -top-24 -right-24 size-48 rounded-full bg-hachimaki/12 blur-3xl" />
                  </>
                )}

                <div className="flex items-start justify-between mb-6">
                  <p.Icon
                    className={cn(
                      "size-7 transition-colors duration-300",
                      p.highlight
                        ? "text-hachimaki"
                        : "text-bone/60 group-hover:text-hachimaki",
                    )}
                  />
                  {p.highlight && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] px-2 py-1 bg-hachimaki text-sumi rounded-full">
                      Most popular
                    </span>
                  )}
                </div>

                <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted">
                  {p.name}
                </div>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-6xl md:text-7xl text-bone font-medium leading-none">
                    ${p.price}
                  </span>
                  <span className="font-mono text-sm text-muted ml-1">
                    {p.suffix}
                  </span>
                </div>

                <p className="mt-4 text-bone/80 italic font-display text-lg">
                  {p.tagline}
                </p>

                <ul className="mt-8 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check
                        className={cn(
                          "size-4 mt-0.5 shrink-0",
                          p.highlight ? "text-hachimaki" : "text-bone/60",
                        )}
                      />
                      <span className="text-bone/85 leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-ash">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-hachimaki">
                    {p.saving}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted max-w-2xl">
            Passes are non-transferable and start on first use. Members already
            get $8/hr — passes are for when you&apos;re here often enough that
            even that adds up.
          </p>
          <a href="/#visit">
            <Button variant="outline">Buy at the counter</Button>
          </a>
        </div>
      </div>
    </section>
  );
}
