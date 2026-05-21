"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { motion } from "framer-motion";
import {
  Monitor,
  Camera,
  Mic,
  Lightbulb,
  Wifi,
  Sparkles,
  Phone,
} from "lucide-react";

const KIT = [
  { Icon: Monitor, label: "3 monitors", sub: "Program · preview · chat" },
  { Icon: Camera, label: "Studio webcam", sub: "4K · auto-tracking" },
  { Icon: Mic, label: "Pro microphone", sub: "Broadcast-grade condenser" },
  { Icon: Lightbulb, label: "Adjustable lights", sub: "Key · fill · back" },
  { Icon: Sparkles, label: "Green screen", sub: "Roll-up chroma backdrop" },
  { Icon: Wifi, label: "Dedicated fiber", sub: "Private line · no contention" },
];

export function StreamStudio() {
  return (
    <section
      id="studio"
      className="relative isolate py-24 md:py-32 border-t border-ash"
    >
      <div className="absolute inset-0 dot-grid opacity-40" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 size-[32rem] rounded-full bg-hachimaki/8 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow="Streaming Studio"
          title={
            <>
              Go live,{" "}
              <span className="text-hachimaki italic">ready-made.</span>
            </>
          }
        />

        <p className="mt-6 max-w-2xl text-bone/75 text-base md:text-lg leading-relaxed">
          A private room with everything plugged in, levels set, and lights
          dialed — so you can show up, hit go-live, and play. No
          troubleshooting, no &ldquo;you&apos;re muted&rdquo;, no setup hour
          eating your stream time.
        </p>

        <div className="mt-14 grid lg:grid-cols-12 gap-px bg-ash border border-ash rounded-lg overflow-hidden">
          {/* Price + CTA side */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <Card className="h-full p-8 md:p-12 bg-panel border-0 rounded-none relative overflow-hidden">
              <div className="absolute -top-32 -left-32 size-64 rounded-full bg-hachimaki/10 blur-3xl" />
              <div className="relative">
                <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-hachimaki">
                  Private room · by reservation
                </div>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-7xl md:text-8xl text-bone font-medium leading-none">
                    $25
                  </span>
                  <span className="font-mono text-sm text-muted ml-2">
                    /hour
                  </span>
                </div>

                <p className="mt-5 text-bone/80 italic font-display text-lg md:text-xl leading-snug max-w-md">
                  One door closes. Your stream gets quiet, clean audio, and
                  studio lighting on tap.
                </p>

                <ul className="mt-8 space-y-3 text-sm text-bone/85">
                  <li className="flex items-start gap-3">
                    <span className="size-1 rounded-full bg-hachimaki mt-2 shrink-0" />
                    OBS preinstalled, scenes ready
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="size-1 rounded-full bg-hachimaki mt-2 shrink-0" />
                    Bring your own logins — Twitch, YouTube, Kick
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="size-1 rounded-full bg-hachimaki mt-2 shrink-0" />
                    Optional setup help — branding, scene design, lower-thirds
                  </li>
                </ul>

                <div className="mt-10 flex justify-center">
                  <a href="tel:+13479463656">
                    <Button variant="primary" size="lg">
                      <Phone className="size-4" />
                      Reserve the studio
                    </Button>
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Kit grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 bg-shadow"
          >
            <div className="grid grid-cols-2 gap-px bg-ash h-full">
              {KIT.map((k) => (
                <div
                  key={k.label}
                  className="bg-shadow p-6 md:p-7 group hover:bg-panel transition-colors duration-200"
                >
                  <k.Icon className="size-6 text-bone/65 group-hover:text-hachimaki transition-colors mb-5" />
                  <div className="font-display text-xl md:text-2xl text-bone font-medium tracking-tight">
                    {k.label}
                  </div>
                  <div className="mt-1 text-xs font-mono uppercase tracking-[0.2em] text-muted">
                    {k.sub}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
