"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const SCHEDULE = [
  { day: "Monday", short: "Mon", open: "10 AM", close: "3 AM", index: 1 },
  { day: "Tuesday", short: "Tue", open: "10 AM", close: "3 AM", index: 2 },
  { day: "Wednesday", short: "Wed", open: "10 AM", close: "3 AM", index: 3 },
  { day: "Thursday", short: "Thu", open: "10 AM", close: "3 AM", index: 4 },
  { day: "Friday", short: "Fri", open: "10 AM", close: "5 AM", index: 5, late: true },
  { day: "Saturday", short: "Sat", open: "12 PM", close: "5 AM", index: 6, late: true },
  { day: "Sunday", short: "Sun", open: "12 PM", close: "5 AM", index: 0, late: true },
];

export function Hours() {
  const [todayIdx, setTodayIdx] = useState<number | null>(null);

  useEffect(() => {
    setTodayIdx(new Date().getDay());
  }, []);

  return (
    <section
      id="hours"
      className="relative isolate py-24 md:py-32 border-t border-ash"
    >
      <div className="absolute inset-0 dot-grid opacity-40" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <SectionHeader
              index="07"
              eyebrow="Hours"
              title={
                <>
                  Open <span className="text-hachimaki italic">late.</span>
                  <br />
                  Open <span className="text-hachimaki italic">later</span> on
                  weekends.
                </>
              }
            />
            <p className="mt-6 max-w-md text-bone/75 leading-relaxed">
              We open mid-morning and stay up till the city sleeps. Friday
              through Sunday we run all the way to{" "}
              <span className="text-bone font-medium">5 AM</span> — for the
              after-shift crowd, the late-night players, and the tournament
              finals.
            </p>

            <div className="mt-8 inline-flex items-center gap-3 px-4 py-3 border border-ash bg-shadow rounded-full">
              <span className="size-2 rounded-full bg-hachimaki animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-bone/85">
                Walk-ins always welcome
              </span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border border-ash rounded-lg overflow-hidden">
              {SCHEDULE.map((row, i) => {
                const today = todayIdx === row.index;
                return (
                  <motion.div
                    key={row.day}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                    className={cn(
                      "grid grid-cols-12 items-center border-b border-ash last:border-b-0 px-5 md:px-8 py-5 md:py-6 transition-colors duration-300 relative",
                      today ? "bg-hachimaki/[0.08]" : "bg-panel/40 hover:bg-panel/80",
                    )}
                  >
                    {today && (
                      <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-hachimaki" />
                    )}
                    <div className="col-span-1 font-mono text-[10px] text-muted">
                      0{i + 1}
                    </div>
                    <div className="col-span-4 md:col-span-3">
                      <div
                        className={cn(
                          "font-display text-2xl md:text-3xl tracking-tight font-medium",
                          today && "text-hachimaki italic",
                        )}
                      >
                        {row.short}
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted hidden md:block mt-1">
                        {row.day}
                      </div>
                    </div>
                    <div className="col-span-5 md:col-span-6 flex items-center gap-3 md:gap-6">
                      <span className="font-display text-lg md:text-2xl text-bone font-medium">
                        {row.open}
                      </span>
                      <span className="text-bone/30 font-mono text-xs">→</span>
                      <span className="font-display text-lg md:text-2xl text-bone font-medium">
                        {row.close}
                      </span>
                    </div>
                    <div className="col-span-2 text-right">
                      {today ? (
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] px-2 py-1 bg-hachimaki text-sumi rounded-full">
                          Today
                        </span>
                      ) : row.late ? (
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-hachimaki/85">
                          Late
                        </span>
                      ) : null}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
