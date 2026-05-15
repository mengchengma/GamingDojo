"use client";

import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { motion } from "framer-motion";
import { Video, UtensilsCrossed, Tv } from "lucide-react";

const FEATURES = [
  {
    Icon: Video,
    eyebrow: "Streaming Room",
    title: "Built for content",
    body: "A private streaming room with pro-grade PCs or consoles, lighting, green screens, and studio-quality audio + video — wired into stable, high-speed fiber for uninterrupted broadcasts.",
    points: ["Lighting + green screen", "Studio audio + video", "Optional setup & branding help"],
  },
  {
    Icon: UtensilsCrossed,
    eyebrow: "Dojo Kitchen",
    title: "Fuel for the grind",
    body: "An in-house kitchen serving fresh, made-to-order hot meals so you never break focus mid-match. Built for late nights, long sessions, and bracket day.",
    points: ["Made-to-order hot meals", "Late-night menu", "Bring fuel to your station"],
  },
  {
    Icon: Tv,
    eyebrow: "Stream & Chill",
    title: "More than gaming",
    body: "Sign in to your own Netflix, Disney+, Paramount+, Crunchyroll — whatever you watch, watch it on a battle-grade rig with high-speed fiber backing every pixel.",
    points: ["Bring your own logins", "All major streaming services", "Smooth, uninterrupted playback"],
  },
];

export function Amenities() {
  return (
    <section
      id="amenities"
      className="relative isolate py-24 md:py-32 border-t border-ash bg-shadow"
    >
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          index="05"
          eyebrow="Beyond the screen"
          title={
            <>
              Stream. Eat.{" "}
              <span className="text-hachimaki italic">Stay a while.</span>
            </>
          }
        />

        <p className="mt-6 max-w-2xl text-bone/75 text-base md:text-lg leading-relaxed">
          A real lounge, not a row of cubicles. Whether you&apos;re grinding
          ranked, going live, or kicking back with a show — we&apos;ve got the
          room for it.
        </p>

        <div className="mt-14 grid md:grid-cols-3 gap-px bg-ash border border-ash rounded-lg overflow-hidden">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.eyebrow}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Card className="h-full p-8 md:p-10 bg-panel border-0 group hover:bg-raised transition-colors duration-300 rounded-none">
                <f.Icon className="size-8 text-bone/60 group-hover:text-hachimaki transition-colors duration-300 mb-8" />

                <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-hachimaki">
                  {f.eyebrow}
                </div>
                <h3 className="font-display text-3xl md:text-4xl tracking-tight mt-3 font-medium italic">
                  {f.title}
                </h3>
                <p className="mt-4 text-bone/80 text-sm md:text-base leading-relaxed">
                  {f.body}
                </p>

                <ul className="mt-6 space-y-2 border-t border-ash pt-6">
                  {f.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.15em] text-bone/65"
                    >
                      <span className="size-1 rounded-full bg-hachimaki" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
