"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, MessageCircle, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DojoEvent {
  /** Day-of-month, e.g. "16" */
  day: string;
  /** Three-letter day, e.g. "FRI" */
  dayShort: string;
  /** Three-letter month, e.g. "MAY" */
  month: string;
  /** Short tag — e.g. "Valorant", "Smash", "Mario Kart" */
  tag: string;
  title: string;
  time: string;
  /** Short descriptor below the time */
  subtitle: string;
  /** Entry copy — shown on the right meta column */
  entry: string;
  /** Optional secondary note next to entry */
  note?: string;
  /** When true, the row gets the amber highlight */
  today?: boolean;
}

// PLACEHOLDER EVENTS — swap with your real schedule.
const EVENTS: DojoEvent[] = [
  {
    day: "16",
    dayShort: "Fri",
    month: "May",
    tag: "Valorant",
    title: "Valorant 5v5 bracket",
    time: "7:00 PM",
    subtitle: "Open queue · sign up on Discord",
    entry: "Free for members",
    note: "$5 drop-in",
    today: true,
  },
  {
    day: "17",
    dayShort: "Sat",
    month: "May",
    tag: "Smash Bros",
    title: "Saturday slam · Smash Bros",
    time: "8:00 PM",
    subtitle: "Double elimination · 32 spots",
    entry: "$5 entry",
    note: "Cash prize",
  },
  {
    day: "18",
    dayShort: "Sun",
    month: "May",
    tag: "Mario Kart",
    title: "Mario Kart Sunday cup",
    time: "6:00 PM",
    subtitle: "Casual · bring your friends",
    entry: "Free",
    note: "All ages",
  },
  {
    day: "20",
    dayShort: "Tue",
    month: "May",
    tag: "League",
    title: "League co-op night",
    time: "7:00 PM",
    subtitle: "Casual flex · ARAM rounds",
    entry: "Free",
  },
  {
    day: "23",
    dayShort: "Fri",
    month: "May",
    tag: "CS2",
    title: "CS2 1v1 showdown",
    time: "8:00 PM",
    subtitle: "Single elim · 16 spots",
    entry: "$10 entry",
    note: "Cash + merch prize",
  },
];

export function Events() {
  return (
    <section
      id="events"
      className="relative isolate py-24 md:py-32 border-t border-ash bg-shadow"
    >
      <div className="absolute inset-0 dot-grid opacity-40" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          index="08"
          eyebrow="What's on"
          title={
            <>
              Coming up at{" "}
              <span className="text-hachimaki italic">the dojo.</span>
            </>
          }
        />

        <p className="mt-6 max-w-2xl text-bone/75 text-base md:text-lg leading-relaxed">
          Weekly brackets, casual co-op nights, and special tournaments. Most
          events are free for members — drop-ins welcome too. Sign up on
          Discord to lock your spot.
        </p>

        <div className="mt-14 border border-ash rounded-lg overflow-hidden">
          {EVENTS.map((e, i) => (
            <motion.div
              key={`${e.day}-${e.title}`}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={cn(
                "grid grid-cols-[88px_1fr] md:grid-cols-[140px_1fr_auto] border-b border-ash last:border-b-0 relative transition-colors duration-200",
                e.today
                  ? "bg-hachimaki/[0.06]"
                  : "bg-panel/30 hover:bg-panel/70",
              )}
            >
              {/* Today indicator stripe */}
              {e.today && (
                <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-hachimaki" />
              )}

              {/* Date column */}
              <div
                className={cn(
                  "flex flex-col items-center justify-center py-5 md:py-6 border-r border-ash",
                  e.today ? "bg-hachimaki/[0.04]" : "bg-shadow/50",
                )}
              >
                <div
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-[0.3em]",
                    e.today ? "text-hachimaki" : "text-muted",
                  )}
                >
                  {e.dayShort}
                </div>
                <div
                  className={cn(
                    "font-display text-4xl md:text-5xl font-bold mt-0.5 leading-none",
                    e.today ? "text-hachimaki" : "text-bone",
                  )}
                >
                  {e.day}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mt-1">
                  {e.month}
                </div>
              </div>

              {/* Event info */}
              <div className="px-5 md:px-7 py-5 md:py-6 flex flex-col justify-center">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "size-1.5 rounded-full",
                      e.today ? "bg-hachimaki animate-pulse" : "bg-hachimaki/70",
                    )}
                  />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-hachimaki">
                    {e.tag}
                    {e.today && (
                      <span className="ml-2 text-bone/85">· tonight</span>
                    )}
                  </span>
                </div>
                <h3 className="font-display text-xl md:text-2xl mt-1.5 font-medium tracking-tight">
                  {e.title}
                </h3>
                <div className="mt-1 text-sm text-bone/70 leading-relaxed">
                  <span className="text-bone/90 font-medium">{e.time}</span>
                  <span className="mx-2 text-bone/30">·</span>
                  {e.subtitle}
                </div>
              </div>

              {/* Right meta column — hidden on mobile */}
              <div className="hidden md:flex items-center justify-end pr-6 lg:pr-8 py-5 md:py-6">
                <div className="text-right">
                  <div
                    className={cn(
                      "font-mono text-xs uppercase tracking-[0.25em]",
                      e.today ? "text-hachimaki" : "text-bone/85",
                    )}
                  >
                    {e.entry}
                  </div>
                  {e.note && (
                    <div className="font-display italic text-xs text-muted mt-1">
                      {e.note}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer row */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted max-w-2xl flex items-center gap-2">
            <Calendar className="size-3.5 text-hachimaki" />
            Schedule rotates weekly — Discord has the full month.
          </p>
          <a
            href="https://discord.gg/Gxq6HM8JKw"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline">
              <MessageCircle className="size-4" />
              Full schedule on Discord
              <ArrowUpRight className="size-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
