"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Gamepad2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Platform = "PC" | "XBOX" | "PS5" | "SWITCH";

interface LibraryGame {
  title: string;
  genre: string;
  platforms: Platform[];
}

interface GameLibraryModalProps {
  open: boolean;
  onClose: () => void;
}

const PLATFORM_STYLES: Record<Platform, string> = {
  PC: "text-hachimaki border-hachimaki/40",
  XBOX: "text-emerald-400 border-emerald-400/40",
  PS5: "text-sky-400 border-sky-400/40",
  SWITCH: "text-rose-400 border-rose-400/40",
};

// FULL GAME LIBRARY — edit / add / remove freely.
// The marquee in games.tsx is a curated subset; this is the full searchable list.
const ALL_GAMES: LibraryGame[] = [
  // — Esports / FPS —
  { title: "Valorant", genre: "Tactical FPS", platforms: ["PC"] },
  { title: "Counter-Strike 2", genre: "FPS", platforms: ["PC"] },
  { title: "Overwatch 2", genre: "Hero shooter", platforms: ["PC", "XBOX", "PS5"] },
  { title: "Rainbow Six Siege", genre: "Tactical FPS", platforms: ["PC", "XBOX", "PS5"] },
  { title: "Apex Legends", genre: "Battle royale", platforms: ["PC", "XBOX", "PS5"] },
  { title: "Call of Duty: MW3", genre: "FPS", platforms: ["PC", "XBOX", "PS5"] },
  { title: "Call of Duty: Warzone", genre: "Battle royale", platforms: ["PC", "XBOX", "PS5"] },
  { title: "Destiny 2", genre: "FPS / MMO", platforms: ["PC", "XBOX", "PS5"] },
  { title: "The Finals", genre: "FPS", platforms: ["PC", "XBOX", "PS5"] },
  { title: "Marvel Rivals", genre: "Hero shooter", platforms: ["PC", "XBOX", "PS5"] },
  { title: "XDefiant", genre: "FPS", platforms: ["PC", "XBOX", "PS5"] },
  { title: "Helldivers 2", genre: "Co-op shooter", platforms: ["PC", "PS5"] },
  { title: "Battlefield 2042", genre: "FPS", platforms: ["PC", "XBOX", "PS5"] },
  { title: "Halo Infinite", genre: "FPS", platforms: ["PC", "XBOX"] },
  { title: "Gears 5", genre: "Shooter", platforms: ["PC", "XBOX"] },

  // — MOBA —
  { title: "League of Legends", genre: "MOBA", platforms: ["PC"] },
  { title: "Dota 2", genre: "MOBA", platforms: ["PC"] },
  { title: "Smite", genre: "MOBA", platforms: ["PC", "XBOX", "PS5"] },

  // — Battle Royale —
  { title: "Fortnite", genre: "Battle royale", platforms: ["PC", "XBOX", "PS5", "SWITCH"] },
  { title: "PUBG: BATTLEGROUNDS", genre: "Battle royale", platforms: ["PC", "XBOX", "PS5"] },
  { title: "Naraka: Bladepoint", genre: "Battle royale", platforms: ["PC", "PS5"] },

  // — Sports / Racing —
  { title: "Rocket League", genre: "Sports", platforms: ["PC", "XBOX", "PS5", "SWITCH"] },
  { title: "EA Sports FC 24", genre: "Soccer", platforms: ["PC", "XBOX", "PS5", "SWITCH"] },
  { title: "NBA 2K24", genre: "Basketball", platforms: ["PC", "XBOX", "PS5", "SWITCH"] },
  { title: "F1 24", genre: "Racing", platforms: ["PC", "XBOX", "PS5"] },
  { title: "Forza Horizon 5", genre: "Racing", platforms: ["PC", "XBOX"] },
  { title: "Gran Turismo 7", genre: "Racing", platforms: ["PS5"] },
  { title: "Mario Kart 8 Deluxe", genre: "Racing", platforms: ["SWITCH"] },

  // — Fighting —
  { title: "Street Fighter 6", genre: "Fighting", platforms: ["PC", "XBOX", "PS5"] },
  { title: "Tekken 8", genre: "Fighting", platforms: ["PC", "XBOX", "PS5"] },
  { title: "Mortal Kombat 1", genre: "Fighting", platforms: ["PC", "XBOX", "PS5", "SWITCH"] },
  { title: "Super Smash Bros. Ultimate", genre: "Fighting", platforms: ["SWITCH"] },
  { title: "Guilty Gear Strive", genre: "Fighting", platforms: ["PC", "PS5"] },
  { title: "Dragon Ball FighterZ", genre: "Fighting", platforms: ["PC", "XBOX", "PS5", "SWITCH"] },
  { title: "The King of Fighters XV", genre: "Fighting", platforms: ["PC", "XBOX", "PS5"] },

  // — RPG / Action —
  { title: "Elden Ring", genre: "Action RPG", platforms: ["PC", "XBOX", "PS5"] },
  { title: "Baldur's Gate 3", genre: "RPG", platforms: ["PC", "XBOX", "PS5"] },
  { title: "Cyberpunk 2077", genre: "Open-world RPG", platforms: ["PC", "XBOX", "PS5"] },
  { title: "The Witcher 3: Wild Hunt", genre: "RPG", platforms: ["PC", "XBOX", "PS5", "SWITCH"] },
  { title: "Skyrim Special Edition", genre: "RPG", platforms: ["PC", "XBOX", "PS5", "SWITCH"] },
  { title: "Diablo IV", genre: "Action RPG", platforms: ["PC", "XBOX", "PS5"] },
  { title: "Black Myth: Wukong", genre: "Action RPG", platforms: ["PC", "PS5"] },
  { title: "Sekiro: Shadows Die Twice", genre: "Action", platforms: ["PC", "XBOX", "PS5"] },
  { title: "Final Fantasy XIV Online", genre: "MMORPG", platforms: ["PC", "PS5"] },
  { title: "Final Fantasy VII Rebirth", genre: "JRPG", platforms: ["PS5"] },
  { title: "Persona 5 Royal", genre: "JRPG", platforms: ["PC", "XBOX", "PS5", "SWITCH"] },
  { title: "Persona 3 Reload", genre: "JRPG", platforms: ["PC", "XBOX", "PS5"] },
  { title: "Hades II", genre: "Roguelike", platforms: ["PC"] },
  { title: "Hollow Knight", genre: "Metroidvania", platforms: ["PC", "XBOX", "PS5", "SWITCH"] },

  // — Open world / sandbox —
  { title: "Grand Theft Auto V", genre: "Open world", platforms: ["PC", "XBOX", "PS5"] },
  { title: "Red Dead Redemption 2", genre: "Open world", platforms: ["PC", "XBOX", "PS5"] },
  { title: "Minecraft", genre: "Sandbox", platforms: ["PC", "XBOX", "PS5", "SWITCH"] },
  { title: "Stardew Valley", genre: "Farming sim", platforms: ["PC", "XBOX", "PS5", "SWITCH"] },
  { title: "Palworld", genre: "Survival", platforms: ["PC", "XBOX"] },
  { title: "Valheim", genre: "Survival", platforms: ["PC", "XBOX"] },
  { title: "Terraria", genre: "Sandbox", platforms: ["PC", "XBOX", "PS5", "SWITCH"] },

  // — Co-op / party —
  { title: "It Takes Two", genre: "Co-op", platforms: ["PC", "XBOX", "PS5", "SWITCH"] },
  { title: "Overcooked! 2", genre: "Party", platforms: ["PC", "XBOX", "PS5", "SWITCH"] },
  { title: "Fall Guys", genre: "Party", platforms: ["PC", "XBOX", "PS5", "SWITCH"] },
  { title: "Gang Beasts", genre: "Party", platforms: ["PC", "XBOX", "PS5", "SWITCH"] },
  { title: "Mario Party Superstars", genre: "Party", platforms: ["SWITCH"] },
  { title: "Among Us", genre: "Social deduction", platforms: ["PC", "XBOX", "PS5", "SWITCH"] },
  { title: "Lethal Company", genre: "Horror co-op", platforms: ["PC"] },
  { title: "Phasmophobia", genre: "Horror co-op", platforms: ["PC"] },

  // — Console exclusives —
  { title: "Marvel's Spider-Man 2", genre: "Action", platforms: ["PS5"] },
  { title: "God of War Ragnarok", genre: "Action", platforms: ["PS5"] },
  { title: "The Last of Us Part II", genre: "Action", platforms: ["PS5"] },
  { title: "Horizon Forbidden West", genre: "Action RPG", platforms: ["PS5"] },
  { title: "Sea of Thieves", genre: "Adventure", platforms: ["PC", "XBOX", "PS5"] },
  { title: "The Legend of Zelda: Tears of the Kingdom", genre: "Adventure", platforms: ["SWITCH"] },
  { title: "Super Mario Bros. Wonder", genre: "Platformer", platforms: ["SWITCH"] },
  { title: "Pokémon Scarlet/Violet", genre: "RPG", platforms: ["SWITCH"] },
  { title: "Splatoon 3", genre: "Shooter", platforms: ["SWITCH"] },

  // — Live service / popular —
  { title: "Roblox", genre: "Platform", platforms: ["PC", "XBOX"] },
  { title: "Genshin Impact", genre: "Action RPG", platforms: ["PC", "PS5"] },
  { title: "Honkai: Star Rail", genre: "Turn-based RPG", platforms: ["PC"] },
  { title: "Wuthering Waves", genre: "Action RPG", platforms: ["PC"] },
];

export function GameLibraryModal({ open, onClose }: GameLibraryModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // ESC + body scroll lock + focus search input on open
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => inputRef.current?.focus(), 80);
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = prevOverflow;
      clearTimeout(t);
    };
  }, [open, onClose]);

  // Reset query when closed so reopening starts fresh
  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_GAMES;
    return ALL_GAMES.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.genre.toLowerCase().includes(q) ||
        g.platforms.some((p) => p.toLowerCase().includes(q)),
    );
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <button
            type="button"
            aria-label="Close game library"
            onClick={onClose}
            tabIndex={-1}
            className="absolute inset-0 bg-sumi/80 backdrop-blur-md cursor-pointer"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="game-library-title"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative w-full max-w-2xl bg-panel border border-ash rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
          >
            {/* Top hairline */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-hachimaki to-transparent pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-ash">
              <div className="flex items-center gap-3 min-w-0">
                <Gamepad2 className="size-5 text-hachimaki shrink-0" />
                <h2
                  id="game-library-title"
                  className="font-display text-xl md:text-2xl font-medium tracking-tight truncate"
                >
                  Game library
                </h2>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted shrink-0">
                  {filtered.length}/{ALL_GAMES.length}
                </span>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="size-9 inline-flex items-center justify-center hover:bg-shadow transition-colors rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hachimaki shrink-0"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Search */}
            <div className="px-6 py-4 border-b border-ash">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted pointer-events-none" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by title, genre, or platform…"
                  className="w-full pl-10 pr-10 py-2.5 bg-shadow border border-ash rounded-full text-sm text-bone placeholder:text-muted focus:outline-none focus:border-hachimaki transition-colors"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute right-2 top-1/2 -translate-y-1/2 size-7 inline-flex items-center justify-center text-muted hover:text-bone rounded-full cursor-pointer"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-2 py-2">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                  <Gamepad2 className="size-8 text-bone/20 mb-3" />
                  <span className="font-display text-lg italic text-bone/70">
                    No matches
                  </span>
                  <span className="text-sm text-muted mt-1.5 max-w-xs">
                    Try a different search — or ask staff to install it. Most
                    games take five minutes.
                  </span>
                </div>
              ) : (
                <ul className="divide-y divide-ash/60">
                  {filtered.map((g) => (
                    <li
                      key={g.title}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-shadow/50 rounded-md transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-display text-base text-bone font-medium truncate">
                          {g.title}
                        </div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mt-0.5">
                          {g.genre}
                        </div>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        {g.platforms.map((p) => (
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
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-ash text-center bg-shadow/40">
              <p className="text-xs text-muted">
                Don&apos;t see your game? Most install in five — ask staff.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
