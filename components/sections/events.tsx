/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useMemo, useEffect } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Calendar,
  MessageCircle,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DojoEvent {
  /** Month is 0-indexed (0 = January, 4 = May) */
  date: { year: number; month: number; day: number };
  title: string;
  time: string;
  game: string;
  /** Brand-color dot/stripe — defaults to amber if omitted */
  color?: string;
  /** Optional cover/poster image at /events/<filename> */
  image?: string;
}

interface RecurringEvent {
  /** Day of week: 0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday */
  dayOfWeek: number;
  title: string;
  time: string;
  game: string;
  color?: string;
  image?: string;
  /** Optional — recurring event starts on/after this date (omit to start immediately) */
  startDate?: { year: number; month: number; day: number };
  /** Optional — recurring event stops after this date (omit for forever) */
  endDate?: { year: number; month: number; day: number };
}

// ────────────────────────────────────────────────────────────
// ONE-OFF EVENTS — add specific-date events here.
// ────────────────────────────────────────────────────────────
const EVENTS: DojoEvent[] = [
  {
    date: { year: 2026, month: 4, day: 29 }, // month is 0-indexed → 4 = May
    title: "Super Smash Bros Ultimate Tournament",
    time: "8:00 PM",
    game: "Super Smash Bros Ultimate",
    color: "#dc2626",
  },
];

// ────────────────────────────────────────────────────────────
// RECURRING EVENTS — repeat weekly on a given day of the week.
// Auto-expand into every matching day of whichever month is being viewed.
//
//   dayOfWeek: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
//
// Example (uncomment + edit):
//   {
//     dayOfWeek: 5,                   // every Friday
//     title: "Valorant 5v5",
//     time: "7:00 PM",
//     game: "Valorant",
//     color: "#fa4454",
//     startDate: { year: 2026, month: 4, day: 1 },   // optional: starts May 1
//     endDate:   { year: 2026, month: 7, day: 31 },  // optional: ends Aug 31
//   },
// ────────────────────────────────────────────────────────────
const RECURRING: RecurringEvent[] = [
  {
    dayOfWeek: 4,                   // every Thursday
    title: "Tekken 8 Thursdays",
    time: "7:00 PM",
    game: "Tekken 8",
    color: "#fa4454",
    startDate: { year: 2026, month: 4, day: 1 },   // optional: starts May 1
    endDate:   { year: 2026, month: 7, day: 31 },  // optional: ends Aug 31
    image: "/events/tekken.png",
  },
];

/** Expand RECURRING into concrete events for the displayed month. */
function expandRecurring(
  recurring: RecurringEvent[],
  year: number,
  month: number,
): DojoEvent[] {
  if (recurring.length === 0) return [];
  const out: DojoEvent[] = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dow = date.getDay();

    for (const r of recurring) {
      if (r.dayOfWeek !== dow) continue;

      if (r.startDate) {
        const start = new Date(
          r.startDate.year,
          r.startDate.month,
          r.startDate.day,
        );
        if (date < start) continue;
      }
      if (r.endDate) {
        const end = new Date(r.endDate.year, r.endDate.month, r.endDate.day);
        if (date > end) continue;
      }

      out.push({
        date: { year, month, day },
        title: r.title,
        time: r.time,
        game: r.game,
        color: r.color,
        image: r.image,
      });
    }
  }
  return out;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface Cell {
  day: number | null;
  /** Day from prev/next month (for greyed-out fillers) */
  outside?: boolean;
}

/** Build a Sunday-first 6-row grid (always 42 cells) for the given month. */
function buildMonthGrid(year: number, month: number): Cell[] {
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();

  const cells: Cell[] = [];
  // Leading fillers from previous month
  for (let i = firstWeekday - 1; i >= 0; i--) {
    cells.push({ day: daysInPrev - i, outside: true });
  }
  // This month's days
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d });
  // Trailing fillers from next month
  let nextDay = 1;
  while (cells.length < 42) cells.push({ day: nextDay++, outside: true });

  return cells;
}

function eventsOnDay(events: DojoEvent[], y: number, m: number, d: number) {
  return events.filter(
    (e) => e.date.year === y && e.date.month === m && e.date.day === d,
  );
}

/** Sort by time (rough — assumes "H:MM AM/PM" format) so earlier shows first. */
function sortByTime(events: DojoEvent[]) {
  return [...events].sort((a, b) => {
    const toMin = (t: string) => {
      const m = t.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
      if (!m) return 0;
      let h = parseInt(m[1], 10);
      const min = parseInt(m[2], 10);
      const pm = m[3].toUpperCase() === "PM";
      if (pm && h !== 12) h += 12;
      if (!pm && h === 12) h = 0;
      return h * 60 + min;
    };
    return toMin(a.time) - toMin(b.time);
  });
}

export function Events() {
  // Default to the current month so the calendar always opens on "now".
  // The lazy initializer reads the visitor's clock on the client. On a
  // statically built page the server bakes in the build month, so if the
  // calendar month has since rolled over it snaps to the real current month
  // on load.
  const [view, setView] = useState(() => {
    const d = new Date();
    return { year: d.getFullYear(), month: d.getMonth() };
  });

  // Today highlight (only after hydration to avoid SSR mismatch)
  const [today, setToday] = useState<{
    year: number;
    month: number;
    day: number;
  } | null>(null);
  useEffect(() => {
    const d = new Date();
    setToday({ year: d.getFullYear(), month: d.getMonth(), day: d.getDate() });
  }, []);

  const cells = useMemo(
    () => buildMonthGrid(view.year, view.month),
    [view.year, view.month],
  );

  // One-off events + expanded recurring events for the displayed month
  const allEvents = useMemo(
    () => [...EVENTS, ...expandRecurring(RECURRING, view.year, view.month)],
    [view.year, view.month],
  );

  const prevMonth = () =>
    setView((v) =>
      v.month === 0
        ? { year: v.year - 1, month: 11 }
        : { year: v.year, month: v.month - 1 },
    );
  const nextMonth = () =>
    setView((v) =>
      v.month === 11
        ? { year: v.year + 1, month: 0 }
        : { year: v.year, month: v.month + 1 },
    );

  const isToday = (day: number | null) =>
    day !== null &&
    !!today &&
    today.year === view.year &&
    today.month === view.month &&
    today.day === day;

  return (
    <section
      id="events"
      className="relative isolate py-24 md:py-32 border-t border-ash bg-shadow"
    >
      <div className="absolute inset-0 dot-grid opacity-40" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          index="03"
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

        {/* Calendar header — month + nav arrows */}
        <div className="mt-14 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={prevMonth}
            aria-label="Previous month"
            className="inline-flex items-center justify-center size-10 rounded-full border border-ash bg-panel hover:border-hachimaki hover:text-hachimaki transition-colors cursor-pointer"
          >
            <ChevronLeft className="size-5" />
          </button>

          <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight">
            {MONTH_NAMES[view.month]}{" "}
            <span className="text-bone/55">{view.year}</span>
          </h3>

          <button
            type="button"
            onClick={nextMonth}
            aria-label="Next month"
            className="inline-flex items-center justify-center size-10 rounded-full border border-ash bg-panel hover:border-hachimaki hover:text-hachimaki transition-colors cursor-pointer"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        {/* Weekday header row */}
        <div className="mt-6 grid grid-cols-7 gap-px">
          {WEEKDAYS.map((d) => (
            <div
              key={d}
              className="text-center font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted py-3"
            >
              <span className="hidden sm:inline">{d}</span>
              <span className="sm:hidden">{d.slice(0, 1)}</span>
            </div>
          ))}
        </div>

        {/* Day grid — 6 rows × 7 cols = 42 cells */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-7 gap-px bg-ash border border-ash rounded-lg overflow-hidden"
        >
          {cells.map((cell, i) => {
            const events = cell.day
              ? sortByTime(
                  eventsOnDay(allEvents, view.year, view.month, cell.day),
                )
              : [];
            const todayCell = !cell.outside && isToday(cell.day);

            return (
              <div
                key={i}
                className={cn(
                  "relative min-h-[80px] sm:min-h-[100px] md:min-h-[120px] p-1.5 md:p-2 flex flex-col gap-1 transition-colors duration-200",
                  cell.outside
                    ? "bg-shadow/40"
                    : "bg-panel/40 hover:bg-panel",
                  todayCell && "bg-hachimaki/[0.08]",
                )}
              >
                {/* Day number */}
                {cell.day !== null && (
                  <div className="flex items-center justify-end px-1">
                    <span
                      className={cn(
                        "font-mono text-[10px] md:text-xs",
                        cell.outside
                          ? "text-muted/40"
                          : todayCell
                            ? "inline-flex items-center justify-center size-6 rounded-full bg-hachimaki text-sumi font-bold"
                            : "text-bone/65",
                      )}
                    >
                      {cell.day}
                    </span>
                  </div>
                )}

                {/* Events on this day */}
                {!cell.outside && events.length > 0 && (
                  <div className="flex flex-col gap-1 mt-auto">
                    {events.map((e, idx) => (
                      <button
                        key={idx}
                        type="button"
                        title={`${e.game} · ${e.title} · ${e.time}`}
                        className="group/event relative text-left rounded-md overflow-hidden cursor-pointer"
                      >
                        {e.image ? (
                          <span className="relative block aspect-[4/3]">
                            <img
                              src={e.image}
                              alt={e.title}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover/event:scale-105"
                            />
                            <span className="absolute inset-0 bg-gradient-to-t from-sumi/85 via-sumi/30 to-transparent" />
                            <span className="absolute bottom-1 left-1 right-1 text-[9px] md:text-[10px] text-bone leading-tight line-clamp-2 font-medium">
                              {e.title}
                            </span>
                          </span>
                        ) : (
                          <span
                            className="relative block px-1.5 py-1 md:py-1.5 bg-shadow/80 border-l-2 group-hover/event:bg-shadow transition-colors"
                            style={{ borderLeftColor: e.color ?? "var(--c-accent)" }}
                          >
                            <span className="block font-mono text-[9px] uppercase tracking-[0.1em] text-bone/85 leading-tight">
                              {e.time}
                            </span>
                            <span className="block text-[10px] md:text-[11px] text-bone leading-tight font-medium line-clamp-2 mt-0.5">
                              {e.title}
                            </span>
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>

        {/* Legend / footer */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted">
            <span className="inline-flex items-center gap-2">
              <span className="size-3 rounded-full bg-hachimaki" />
              Today
            </span>
            <span className="text-bone/30">·</span>
            <span className="inline-flex items-center gap-2">
              <Calendar className="size-3.5 text-hachimaki" />
              Schedule rotates weekly — Discord has more info.
            </span>
          </div>
          <a
            href="https://discord.gg/Gxq6HM8JKw"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline">
              <MessageCircle className="size-4" />
              More Info on Discord
              <ArrowUpRight className="size-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
