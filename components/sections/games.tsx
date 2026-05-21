/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { GameLibraryModal } from "@/components/ui/game-library-modal";
import { motion } from "framer-motion";
import { Gamepad2, Search } from "lucide-react";
import { cn } from "@/lib/utils";

type Platform = "PC" | "XBOX" | "PS5" | "SWITCH";

interface Game {
  title: string;
  genre: string;
  platforms: Platform[];
  /** Optional cover image at /games/<slug>.jpg (see public/games/README.md) */
  image?: string;
  hot?: boolean;
}

// PLACEHOLDER LINEUP — easy to edit. Drop cover art at /public/games/<slug>.jpg
// and reference it via the `image` field, e.g. image: "/games/valorant.jpg".
const ROW_1: Game[] = [
  { title: "Valorant", genre: "Tactical FPS", platforms: ["PC"], hot: true, image: "/games/valorant.png" },
  { title: "League of Legends", genre: "MOBA", platforms: ["PC"], image: "/games/leagueoflegends.png" },
  { title: "Counter-Strike 2", genre: "FPS", platforms: ["PC"], hot: true, image: "/games/counter-strike-2.png" },
  { title: "Overwatch 2", genre: "Hero shooter", platforms: ["PC", "XBOX", "PS5"], image: "/games/overwatch2.png" },
  { title: "Apex Legends", genre: "Battle royale", platforms: ["PC", "XBOX", "PS5"], image: "/games/apexlegends.png" },
  { title: "Marvel Rivals", genre: "Hero shooter", platforms: ["PC", "XBOX", "PS5"], hot: true, image: "/games/marvelrivals.png" },
  { title: "Rocket League", genre: "Sports", platforms: ["PC", "XBOX", "PS5", "SWITCH"], image: "/games/rocketleague.png" },
  { title: "Fortnite", genre: "Battle royale", platforms: ["PC", "XBOX", "PS5", "SWITCH"], image: "/games/fortnite.png" },
];

const ROW_2: Game[] = [
  { title: "PUBG", genre: "Battle royale", platforms: ["PC"], image: "/games/pubg.png" },
  { title: "DeltaForce", genre: "Shooter", platforms: ["PC"], image: "/games/deltaforce.png" },
  { title: "GTA V", genre: "Open world", platforms: ["PC", "XBOX", "PS5"], image: "/games/gtav.png" },
  { title: "Super Smash Bros.", genre: "Fighting", platforms: ["SWITCH"], hot: true, image: "/games/supersmashbros.png" },
  { title: "Mario Kart 8", genre: "Racing", platforms: ["SWITCH"], image: "/games/mariokart8.png" },
  { title: "Tekken 8", genre: "Fighting", platforms: ["PC", "XBOX", "PS5"], image: "/games/tekken8.png" },
  { title: "Rainbow Six Siege", genre: "Tactical FPS", platforms: ["PC", "XBOX", "PS5"], image: "/games/rainbowsixsiege.png" },
  { title: "Call of Duty: Modern Warfare II", genre: "Tactical FPS", platforms: ["PC", "XBOX", "PS5"], image: "/games/callofduty.png" },
];

const PLATFORM_STYLES: Record<Platform, string> = {
  PC: "text-hachimaki border-hachimaki/40",
  XBOX: "text-emerald-400 border-emerald-400/40",
  PS5: "text-sky-400 border-sky-400/40",
  SWITCH: "text-rose-400 border-rose-400/40",
};

// Placeholder gradient flavours so cards look different from each other while
// you wait for real artwork. Cycled by index.
const PLACEHOLDER_GRADIENTS = [
  "from-hachimaki/30 via-panel to-shadow",
  "from-emerald-500/25 via-panel to-shadow",
  "from-sky-500/25 via-panel to-shadow",
  "from-rose-500/25 via-panel to-shadow",
  "from-amber-500/25 via-panel to-shadow",
  "from-violet-500/25 via-panel to-shadow",
];

function GameCard({ game, index }: { game: Game; index: number }) {
  return (
    <div className="w-[240px] md:w-[280px] shrink-0 group">
      {/* Cover area */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-ash bg-panel">
        {game.image ? (
          <img
            src={game.image}
            alt={game.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br flex items-center justify-center",
              PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length],
            )}
          >
            <span
              aria-hidden
              className="font-display text-[8rem] leading-none text-bone/12 font-bold select-none"
            >
              {game.title.charAt(0)}
            </span>
            <Gamepad2 className="absolute bottom-4 right-4 size-5 text-bone/25" />
          </div>
        )}

        {/* Hot dot */}
        {game.hot && (
          <span
            className="absolute top-3 right-3 size-2 rounded-full bg-hachimaki shadow-[0_0_0_3px_rgba(0,0,0,0.25)]"
            aria-label="Popular"
          />
        )}

        {/* Bottom gradient — keeps title legible if/when a real image lands */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-sumi/85 to-transparent pointer-events-none" />
      </div>

      {/* Meta */}
      <div className="mt-3 px-1">
        <h3 className="font-display text-lg md:text-xl text-bone font-medium tracking-tight leading-tight truncate">
          {game.title}
        </h3>
        <div className="mt-0.5 text-[10px] font-mono uppercase tracking-[0.2em] text-muted">
          {game.genre}
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {game.platforms.map((p) => (
            <span
              key={p}
              className={cn(
                "font-mono text-[9px] uppercase tracking-[0.15em] px-1.5 py-0.5 border rounded-sm",
                PLATFORM_STYLES[p],
              )}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  games,
  reverse = false,
  duration = 60,
}: {
  games: Game[];
  reverse?: boolean;
  duration?: number;
}) {
  // Render the row twice so the animation can translateX(-50%) seamlessly
  return (
    <div className="overflow-hidden">
      <div
        className="flex w-max gap-5 md:gap-6 hover:[animation-play-state:paused]"
        style={{
          animation: `marquee ${duration}s linear infinite ${reverse ? "reverse" : ""}`,
        }}
      >
        {[...games, ...games].map((g, i) => (
          <GameCard
            key={`${g.title}-${i}`}
            game={g}
            index={i % games.length}
          />
        ))}
      </div>
    </div>
  );
}

export function Games() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section
        id="games"
        className="relative isolate py-24 md:py-32 border-t border-ash overflow-hidden"
      >
        <div className="absolute inset-0 dot-grid opacity-50" />

        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            eyebrow="Game library"
            title={
              <>
                Every title you{" "}
                <span className="text-hachimaki italic">came for.</span>
              </>
            }
          />

          <div className="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <p className="max-w-2xl text-bone/75 text-base md:text-lg leading-relaxed">
              Ranked-ready esports loadouts, story-mode behemoths, party-game
              rotation — all installed, updated, ready when you sit down. Hover
              any row to pause.
            </p>

            <Button
              variant="primary"
              size="lg"
              className="shrink-0"
              onClick={() => setModalOpen(true)}
            >
              <Search className="size-4" />
              Browse all games
            </Button>
          </div>
        </div>

        {/* Two rows, opposite directions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mt-14 space-y-6"
        >
          <MarqueeRow games={ROW_1} duration={60} />
          <MarqueeRow games={ROW_2} duration={70} reverse />

          {/* Edge fades — softens the marquee ends */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-sumi to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-sumi to-transparent" />
        </motion.div>

        {/* Bottom note */}
        <div className="relative mt-10 mx-auto max-w-7xl px-5 md:px-8 flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-[0.3em] text-muted">
          <span className="text-hachimaki">●</span>
          <span>Popular right now</span>
          <span className="h-px flex-1 max-w-32 bg-ash" />
          <span>
            Don&apos;t see your game? Ask staff — most install in five.
          </span>
        </div>
      </section>

      <GameLibraryModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
