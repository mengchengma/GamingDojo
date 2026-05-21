"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MessageCircle, Trophy, ArrowUpRight } from "lucide-react";

export function TournamentsCTA() {
  return (
    <section className="relative isolate py-24 md:py-32 border-t border-ash overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-50" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 size-[42rem] rounded-full bg-hachimaki/10 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-5 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 border border-ash bg-panel/80 px-3 py-1.5 mb-6 rounded-full">
            <Trophy className="size-3.5 text-hachimaki" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/85">
              Tournaments &middot; bracket nights
            </span>
          </div>

          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight font-medium">
            Compete on
            <br className="hidden md:inline" />{" "}
            <span className="text-hachimaki italic">our floor.</span>
          </h2>

          <p className="mt-8 max-w-xl mx-auto text-bone/75 text-base md:text-lg leading-relaxed">
            We run brackets across PC and console — from chill weekly Smash
            nights to ranked Valorant 5v5s. Schedule, signups, and prize info
            all live in our Discord.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://discord.gg/Gxq6HM8JKw"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" size="lg">
                <MessageCircle className="size-4" />
                Join the Discord
                <ArrowUpRight className="size-4" />
              </Button>
            </a>
            <a href="/#visit">
              <Button variant="outline" size="lg">
                Or come watch in person
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
